# Testing & Releases

This is the initial **integration conformance checklist** for a Video Game Studio. It identifies the scenarios to exercise; it does not imply that Sbarter has already published a formal automated certification or production sign-off service.

## Before testing

- [ ] Your studio and game identifiers are registered for the target non-production environment: you have your slug and the `providerGameId` of each game.
- [ ] You have working OAuth client credentials for that environment and can obtain a scoped bearer token.
- [ ] `GET /v1/auth/check` on `https://partners.<env>.sbarter.com/<slug>` answers `204`. A `404` means an unknown slug, a `503` that your studio is not onboarded on this environment yet.
- [ ] For live testing: your Game Studio API base URL and a valid studio-generated `X-API-Key` are entered in the Studio Web Portal for this environment.
- [ ] All endpoints use HTTPS and expose meaningful non-sensitive error responses.
- [ ] Test players and the required game-side accounts are available.

## Sandbox and live testing

Each studio is in one mode at a time, and **sandbox is the default**:

1. **Sandbox.** Sbarter's simulator plays your studio: it answers the in-app linking and session calls and posts results back. Use it to exercise your calls to the Sbarter API end to end before your own Game Studio API exists.
2. **Live.** Enter your base URL and API key in the Studio Web Portal and switch to live; Sbarter's calls then reach your Game Studio API. Switching without both is refused (`467`, `errorCode` `VGP0002`).

The mode changes only where Sbarter's calls go. Your calls to the Sbarter API behave the same in both modes.

## Suggested conformance scenarios

| Scenario | Expected evidence |
| --- | --- |
| Credential check | `GET /v1/auth/check` answers `204` in each environment you use |
| Game-first account linking | Generate the deep link, open it in the Sbarter app, see **Game connected** and confirm `linked: true` on the status call |
| Deep link with a destination | A `tournament` destination works for an unlinked player; a `challenge` destination for an unlinked player is `403` |
| Sbarter-initiated linking | Answer `202` at once, process the in-game request and return the decision with `confirmedAt` to the supplied `webhookUrl` |
| Repeated or late in-app decision | A second decision on the same `requestId` gets `409`; a decision after `expiresAt` is stored as expired; a repeated validation request is treated as the same attempt |
| Binding conflicts and expired links | Reject safely without binding the wrong identities (`GI0023`; expired or used links refused to the player) |
| Accepted decision with profile snapshot | `accepted` carries `providerDisplayName`, `profileCapturedAt` and `profileStats` |
| Challenge created from the game | Read games and settings, mint `POST /v1/challenges/deeplink/generate`, see the prefilled creation screen in Sbarter |
| Challenge notifications | Each of `/v1/challenge/creation`, `/invite`, `/acceptance`, `/await-opponent` and `/completion` answers `2xx` within 10 seconds |
| Session registration | Register the players once, using Sbarter's `sessionId` |
| Duplicate registration | Same logical request does not create another session |
| Successful game-server result | Submit to Sbarter's callback and correlate the correct session |
| Duplicate or conflicting result | Demonstrate documented handling without double settlement |
| Missing or late result | Verify the outcome against an explicitly agreed missing-result policy |
| Failure and recovery | Exercise connectivity loss, token expiry, invalid API key and retry recovery; retry only `503` and network errors |
| Game return link | Validate launch, expiry and fallback behaviour **when that capability is available** |

## Evidence to retain

Keep test scenario IDs, anonymised correlation identifiers, the environment, timestamps and a pass/fail record. Never include raw secrets in conformance evidence.

## Go-live decision

Sbarter and the studio should review the conformance record, resolve contract ambiguities, agree support responsibilities and confirm production configuration before rollout. **Production approval, credential availability and supported territories require explicit confirmation**, rather than being assumed from a successful staging test.

Refer to [Security & Operations](../operations/index.md), [Quick Start](../getting-started/quickstart.md) and [Integration Status & Open Decisions](../operations/integration-status.md).
