# Glossary

The following terminology is used in Sbarter's technical documentation. Naming for the external organisation and its portal remains subject to the naming decision recorded in [Integration Status & Open Decisions](../operations/integration-status.md).

| Term | Meaning |
| --- | --- |
| Video Game Studio / VGP | The organisation operating the integrated game and its backend services. VGP (video game provider) is the same party; the name appears in API tags and in *VGP API*, the Game Studio API that Sbarter calls. |
| Sbarter | The competition application and associated services that coordinate account binding and contest participation. |
| Contest | A Sbarter competition unit; a 1v1 challenge or a tournament round may be associated with a game session. |
| Challenge | A player-entered skill-based competition in the Sbarter app. |
| Tournament | A scheduled multi-participant competition with a defined progression and result rules. |
| Game session | The game-side play context created or registered for participants. Existing API identifiers may contain the legacy word `match`. |
| Binding | Association between the player's Sbarter identity and game-side account identity. |
| `providerGameId` | Your identifier of the integrated game, sent in every call and received in every Sbarter request. Set by Sbarter when it registers the game against your studio; it is not the game name shown in the Studio Web Portal. |
| `gameUUID` | Sbarter's own identifier of a game, the `id` returned by `GET /v1/games`. Used by the settings and challenge endpoints; not the same as `providerGameId`. |
| `gameSettingsId` | Identifier of a challenge format of a game (the `uuid` from `GET /v1/games/{gameUUID}/settings`), used to create a challenge from the game. |
| `challengeId` | Sbarter challenge identifier, carried by the challenge notifications and by `POST /v1/session`; the `uuid` in `GET /v1/challenges`. |
| `providerUserId` | Stable game-side player/account identifier. |
| `internalId` | Sbarter's identifier of a player, sent alongside `providerUserId`. |
| `sessionId` | Session identifier supplied by Sbarter for game-side registration and result correlation. |
| `requestId` | Identifier of one in-app linking attempt. It is already inside the `webhookUrl` Sbarter sends; call that URL as given instead of building it. |
| `webhookUrl` | Sbarter callback URL supplied with an in-app linking request or a session registration; the studio returns the decision or the result to that exact URL. |
| Slug | Short name of your studio in the Sbarter API host, `https://partners.<env>.sbarter.com/<slug>`, given by Sbarter at onboarding. |
| Studio adapter | The Sbarter-side component behind your slug that verifies your token, calls your Game Studio API and builds callback URLs. |
| Sandbox / live mode | Where Sbarter's calls to your studio go: Sbarter's simulator (sandbox, the default) or your own Game Studio API (live). |
| `errorCode` | Machine-readable reason added to a `467` business refusal, for example `GI0023` (game account already linked to another player). |
| `matchId` | Existing technical field name used by the published result contract; not a replacement for the player-facing term *contest*. |
| Deep link | A link opening a specific Sbarter app destination. |
| Deferred deep link | An app link intended to preserve destination context across installation, subject to supported client implementation. |
| Client ID / secret | OAuth credentials managed by authorised studio representatives through the Studio Web Portal. |
| `X-API-Key` | Credential supplied by the studio to authenticate Sbarter's server-to-server requests. |
| Stake / entry fee | Amount committed by a participant for an eligible contest. |
| Reward / reward pool | Value distributable under the contest's published rules. |
| Protocol fee | Fee defined by Sbarter's protocol/commercial rules, subject to confirmed configuration. |
| Oracle fee | Agreed remuneration to the game-data provider for supplying verified results, subject to commercial terms. |
| SBT | Native utility token used in the Sbarter ecosystem. |
| Studio Web Portal | The Sbarter portal where authorised studio representatives manage the studio, OAuth credentials, the Game Studio API base URL and API key, and sandbox or live mode. |
