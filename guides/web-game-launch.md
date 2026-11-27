# Web Game Launch

A web game is played inside the Sbarter app: when both players are ready, each taps **Start match** and the app opens your game page in its WebView. The player has one login, the Sbarter one. They never sign up in your game and never link an account; Sbarter creates the game account for them, server to server.

This guide is everything your studio implements for a web game. The step-by-step sequence is on the [Web Game Launch Flow](/level-3-web-game-launch-flow.html) page.

## What you implement

| Piece | Direction | Contract |
| --- | --- | --- |
| Create or reuse a player account | Sbarter → your backend | [`POST /v1/sbarter/gamer/provision`](/client/web-game-player-provisioning) |
| Register the match, return your match id | Sbarter → your backend | [`POST /v1/session`](/client/session/paths/~1v1~1session/post) (response `matchId`) |
| Game page that receives the launch | Sbarter app WebView → your page | [`POST <your launch URL>`](/client/web-game-launch), form fields `launchCode`, `codeVerifier` |
| Redeem the launch code | Your backend → Sbarter | [`POST /v1/game-launches/redeem`](/server/web-game-launch), scope `launch.redeem` |
| Report the result | Your backend → Sbarter | [`POST /v1/webhooks/game-studio/match-result`](/server/webhook/postmatchresultwebhook), scope `webhook.write` |

## Before the first match

- **Launch URL.** Give Sbarter the HTTPS page the app opens for your game, per environment. Only HTTPS origins you registered are allowed in the WebView. It is not your website link.
- **Client credentials** with the scopes `launch.redeem` and `webhook.write`, created in the Sbarter web portal. Check the `scope` claim of the issued token.
- **Base URL and API key** for Sbarter → studio calls, entered in the Studio Web Portal, as for every Level 3 game.

## 1. Player accounts

Sbarter calls `POST /v1/sbarter/gamer/provision` with a `playerId` and your `providerGameId` before it registers the player's first match.

- `playerId` is an opaque UUID per player **and per studio**. It never changes for that player, it is not the player's Sbarter user id, and another studio gets a different one for the same person. No personal data comes with it.
- Use it as the account key. From then on it is the player's `providerUserId` in every call, both ways.
- The call is idempotent on `playerId`: create the account the first time (`201`), answer `200` and change nothing on a repeat. Sbarter repeats it after a timeout or a 5xx.

## 2. Match registration

When both players are ready, Sbarter calls `POST /v1/session`, as for any Level 3 game, with these differences:

- Each player's `internalId` and `providerUserId` both carry the player's `playerId`.
- Players are ordered by seat: seat **1** is the challenge creator, seat **2** the opponent.
- Answer with your own match id: `{"matchId": "..."}`. It is required for web games. Return the same `matchId` when the same `sessionId` is registered again.
- `expiresAt` is the end of the play window.

A match is only offered to the players once registration succeeded. If your backend cannot be reached, Sbarter retries; the players see the match as being prepared.

## 3. Launch

When a player taps **Start match**:

1. The app generates a random `codeVerifier` (PKCE, RFC 7636) and asks Sbarter for a launch code, sending only its S256 challenge. Sbarter checks that the signed-in player takes part in this match and that the match is open, and issues a one-time `launchCode` for that player's seat. It lives **60 seconds**.
2. The app opens your launch URL in its WebView with an HTTPS form POST (`application/x-www-form-urlencoded`): `launchCode` and `codeVerifier`.
3. Your page hands both to your backend, which calls `POST /v1/game-launches/redeem`.
4. Sbarter answers `200` with `providerGameId`, `sessionId`, `matchId`, `playerId`, `seat` and `matchExpiresAt`, and the code is consumed.
5. Start a session for that seat (for example a `Secure`, `HttpOnly` cookie scoped to your host) and redirect to a clean game URL without the code.

Rules for your side:

- **Trust only the redeem answer.** A match id, player id or seat in a page URL identifies nothing. A copied game URL must not let anyone in.
- **Enforce the seat** on every gameplay request and WebSocket connection.
- **Relaunch.** A player may tap **Start match** again while the match is open (the app was closed, the WebView crashed). They arrive with a new code; replace their previous play session for that seat.
- **End access** when the match is over or `matchExpiresAt` has passed.
- **Keep the code and the verifier out of URLs, logs and analytics.**

### When the redeem is refused

Every refusal of the code itself answers `467` with `errorCode` `GI0030`: unknown, expired, already used, issued for a game that is not yours, or a verifier that does not match. Sbarter does not tell these apart, so codes cannot be probed.

| Status | Meaning | What to do |
| --- | --- | --- |
| `467` `GI0030` | The code cannot be redeemed | Show a page with a way back to the app; the player taps **Start match** again |
| `400` | Body does not match the schema | Fix the request |
| `401` / `403` | Token missing or expired / no `launch.redeem` scope, or no `User-Agent` | Fix credentials |
| `503` | Sbarter temporarily unavailable | Retry with the same code while it is still valid |

Do not retry a redeem that may have succeeded: a code works once. If your backend lost the answer, the player gets a new code by tapping **Start match** again.

## 4. Return to the app

The app closes the WebView when your game navigates to the return address agreed at onboarding, and always offers a **Back to challenge** action. Use the return navigation only to close the WebView; it carries no result.

## 5. Result

Send the result to `POST /v1/webhooks/game-studio/match-result` as for any Level 3 game, with these rules:

- `matchId` must be the one you returned at registration; another one is refused with `409`.
- Identify each player by their `playerId` in `providerUserId` and `internalId`.
- Your result is **final**. Web games have no dispute and no manual result reporting in Sbarter.
- Retries are safe: `sessionId` + `matchId` is the idempotency key.

## Security summary

| Threat | Protection |
| --- | --- |
| Someone copies the game URL | The URL carries no permission; only a redeemed code does |
| A launch code leaks on its own | Useless without its verifier, which never leaves the app except in the form POST |
| A code is used twice | Consumed atomically by the first redeem |
| A player takes the other seat | The seat comes from the redeem answer; your game enforces it |
| Another studio redeems your players' codes | A code for another studio's game is refused like an unknown one |
