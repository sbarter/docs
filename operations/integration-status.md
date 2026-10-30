# Integration Status & Open Decisions

This page separates **published API operations**, **documented integration patterns**, and **capabilities whose contracts or production policies are not yet final**. A published OpenAPI operation does not by itself establish that an end-to-end publisher flow is production-ready.

## Published API surface

| Operation group | Contract |
| --- | --- |
| Linking deep-link generation, linking status and in-app linking decision | [Sbarter API](/server) |
| Studio profile retrieval, in-app linking validation and session registration | [Game Studio API](/client) |
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
| Environments and operating limits | Multiple hosts in examples; complete canonical table unavailable | Base URLs, egress addresses, limits, timeouts |
| VGP / Video Game Studio naming | Inconsistent in present materials | Approve one public term and one portal name |
| API `match` identifiers | Exist in published technical contracts | Retain as backwards-compatible identifiers or approve migration |

> **Do not assign release dates or compatibility guarantees to these capabilities until their owners have approved them.**
