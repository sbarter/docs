# Security & Operations

Secure integration requires coordinated controls on **both API directions**. This page distinguishes documented requirements from operational details that Sbarter and the integrating Video Game Studio must confirm before production.

## Authentication and secrets

| API direction | Authentication | Responsibility |
| --- | --- | --- |
| Video Game Studio → Sbarter API | OAuth 2.0 Client Credentials bearer token | The studio generates and safeguards credentials through the Studio Web Portal. See [Environments & Credentials](../getting-started/authentication.md). |
| Sbarter → Game Studio API | `X-API-Key` | The studio generates a dedicated API key per environment and enters it, with its Game Studio API base URL, in the Studio Web Portal. Sbarter forwards both to the studio adapter, never shows the key again and never logs it; a replaced key is used from the next call. |

Protect every API with HTTPS. Do not place client secrets, API keys or bearer tokens in mobile game builds, browser JavaScript, public source repositories or telemetry.

## OAuth token handling

Cache the access token in the studio backend, respect `expires_in` and request a new token before expiry. The documented Client Credentials grant does **not** rely on refresh tokens; avoid requesting a token for every API call. Handle `401` and `403` according to the receiving operation's published semantics.

## Idempotency and duplicate delivery

- For [`POST /v1/session`](/client/session/paths/~1v1~1session/post), use the supplied `sessionId` as the stable registration key. Processing a retry must not create a second game session for the same logical request.
- For result callbacks, correlate duplicate deliveries using the identifiers documented by the [result operation](/server/webhook/postmatchresultwebhook).
- Distinguish an identical retry from a conflicting payload: answer a repeated `POST /v1/session` with the same payload `200`, and the same `sessionId` with a different payload `409`.
- For `POST /v1/sbarter/gamer/validate/in-app`, Sbarter may send the same request again, with the same `requestId` and `expiresAt`; treat it as the same attempt. Your decision on a `requestId` is final: a repeat is answered `409` and changes nothing.

## Sbarter calls to your API

Every Sbarter → studio call is a `POST` with `Content-Type: application/json` and `X-API-Key`. Sbarter waits up to **10 seconds**.

| Your answer | How Sbarter reads it |
| --- | --- |
| Any `2xx` | Delivered. The body is not read, except where an operation defines a response body |
| `4xx` (except `401` / `403`) | Your API refused that request: bad input, unknown account or game |
| `401` / `403` | A configuration problem on Sbarter's side (wrong key), not a player error |
| `5xx`, `429` or no answer within 10 seconds | Your API is unavailable |

## Errors and retries

Error bodies from the Sbarter API are JSON with a fixed `error` text per status. **Rely on the HTTP status and `errorCode`, not on the text**, which is not a stable contract. Business refusals use the non-standard status `467` and add a machine-readable `errorCode`:

```json
{ "error": "Some conditions were not met", "errorCode": "GI0023", "additionalData": {} }
```

| Status | Meaning |
| --- | --- |
| `400` | The payload or query does not match the schema |
| `401` | Token missing, expired or issued by another environment |
| `403` | Token of another studio, missing scope, or missing `User-Agent` (HTML body) |
| `404` | Unknown slug, `providerGameId`, game, linking request or session |
| `409` | Already processed: a repeat of a finished request |
| `467` | Business rule refusal; see `errorCode` |
| `503` | Temporarily unavailable: your studio is not onboarded on this environment yet, or a Sbarter service is down or too slow. Retry later |

| `errorCode` | Meaning | Where you see it |
| --- | --- | --- |
| `GI0021` | Deep link already used | Shown to the player who taps the link, never returned to your studio |
| `GI0022` | Deep link expired or unknown | Shown to the player who taps the link, never returned to your studio |
| `GI0023` | Game account already linked to another Sbarter player | Returned by link generation and by an `accepted` in-app decision |
| `VGP0002` | Live mode needs both a base URL and an API key | Returned when switching your studio to live without them |

**Retry `503` and network errors** with a bounded exponential backoff. **Do not retry `400`, `401`, `403`, `404` or `467`** without changing the request.

| Call | Safe to retry? |
| --- | --- |
| `POST /v1/webhooks/game-studio/match-result` | Yes: `sessionId` + `matchId` is the key; a repeat is recognised, not applied twice |
| `POST /v1/linking/in-app/{requestId}` | Yes: a request is decided once; a repeat of a finished request answers `409` |
| `POST /v1/linking/deeplink/generate`, `POST /v1/challenges/deeplink/generate` | Each call mints a new link; retry only if you did not get one |
| `GET` endpoints, `POST /v1/linking/status` | Yes: they change nothing |

## Timeouts, retries and availability

Clients should implement bounded timeouts, exponential backoff for transient failures and safe replay of idempotent operations. Sbarter waits up to 10 seconds for each call to your API. **Retry counts, delivery windows and rate limits have not yet been confirmed as shared contractual limits** and must not be inferred from example responses.

## Result finality and reconciliation

The game backend is the authoritative source of gameplay results. Sbarter consumes the reported result to drive the contest lifecycle and non-custodial settlement. Late results, correction requests and missing-result policies require an agreed contract before production use. See [Game Results & Reconciliation](../guides/game-results.md).

## Data protection and observability

Log request correlation identifiers, operation, environment, response status and delivery timestamps. Avoid logging full tokens, player identity documentation or unnecessary personal data. Treat security logs and API credentials as restricted operational information.

## Production readiness

Before enabling production traffic, agree and record: your production slug, `providerGameId` values and Game Studio API base URL (Sbarter's hosts are listed in [Environments](../getting-started/authentication.md#environments)); allowable network sources; credential exchange and rotation owners; the studio's on-call incident contact; result delivery/recovery rules; any supported-country restrictions; and escalation channels. Do not assume an SLA, support mailbox or status page exists until Sbarter provides it.

Continue with [Testing & Releases](../testing/index.md) and [Integration Status & Open Decisions](./integration-status.md).
