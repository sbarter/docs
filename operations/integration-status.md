# Integration Status & Open Decisions

This page separates **published API operations**, **documented integration patterns**, and **capabilities whose contracts or production policies are not yet final**. A published OpenAPI operation does not by itself establish that an end-to-end publisher flow is production-ready.

## Published API surface

| Operation group | Contract |
| --- | --- |
| Credential check, linking deep-link generation, linking status and in-app linking decision | [Sbarter API](/server) |
| Games, challenge settings, active challenges, challenge types and challenge-creation deep link | [Sbarter API](/server) |
| In-app linking validation, session registration and challenge notifications | [Game Studio API](/client) |
| Studio profile retrieval (published, not called in the current Level 3 flow) | [Game Studio API](/client) |
| Game-server result submission | [Sbarter API](/server) |

## Contracts and policies needing confirmation

| Topic | Current documentation status | Decision required |
| --- | --- | --- |
| Return-to-game deep link / launch URL | Proposed integration capability | Return payload, signature, expiry, app-link handler and fallback |
| Session-registration response | Published operation with response details requiring review | `providerSessionId`, optional `launchUrl`, response codes |
| Result status and corrections | Existing fields; meaning and finality incomplete | Status matrix, late delivery, duplicate conflicts, correction policy |
| Missing-result resolution | Internal player journeys contain candidate rules | Approved policy consistent with server-authoritative results |
| Play & Compare / League result APIs | Described in [Sbarter App User Manual](../app-manual/index.md); not covered by present two-player result operation | Single-player score, updates and leaderboard contract |
| Additional query APIs | Not in published contracts | Bracket, opponent, contest and league query requirements |
| Environments and operating limits | Hosts and token URLs published in [Environments](../getting-started/authentication.md#environments); Sbarter waits 10 seconds for studio calls | Egress addresses, rate limits |
| VGP / Video Game Studio naming | Both terms used for the same party; the portal is the Studio Web Portal | Approve one public term for the studio |
| API `match` identifiers | Exist in published technical contracts | Retain as backwards-compatible identifiers or approve migration |

> **Do not assign release dates or compatibility guarantees to these capabilities until their owners have approved them.**
