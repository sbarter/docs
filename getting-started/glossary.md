# Glossary

The following terminology is used in Sbarter's technical documentation. Naming for the external organisation and its portal remains subject to the naming decision recorded in [Integration Status & Open Decisions](../operations/integration-status.md).

| Term | Meaning |
| --- | --- |
| Video Game Studio / VGP | The organisation operating the integrated game and its backend services. The documents currently contain both names; a single public term must be approved. |
| Sbarter | The competition application and associated services that coordinate account binding and contest participation. |
| Contest | A Sbarter competition unit; a 1v1 challenge or a tournament round may be associated with a game session. |
| Challenge | A player-entered skill-based competition in the Sbarter app. |
| Tournament | A scheduled multi-participant competition with a defined progression and result rules. |
| Game session | The game-side play context created or registered for participants. Existing API identifiers may contain the legacy word `match`. |
| Binding | Association between the player's Sbarter identity and game-side account identity. |
| `providerGameId` | Identifier of the integrated game in API requests. |
| `providerUserId` | Stable game-side player/account identifier. |
| `sessionId` | Session identifier supplied by Sbarter for game-side registration and result correlation. |
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
| Studio Web Portal | Current name shown in these docs for the portal used for studio administration and OAuth credentials. |
