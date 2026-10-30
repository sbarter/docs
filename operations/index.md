# Security & Operations

Secure integration requires coordinated controls on **both API directions**. This page distinguishes documented requirements from operational details that Sbarter and the integrating Video Game Studio must confirm before production.

## Authentication and secrets

| API direction | Authentication | Responsibility |
| --- | --- | --- |
| Video Game Studio → Sbarter API | OAuth 2.0 Client Credentials bearer token | The studio generates and safeguards credentials through the Studio Web Portal. See [Environments & Credentials](../getting-started/authentication.md). |
| Sbarter → Game Studio API | `X-API-Key` | The studio generates a dedicated API key and transfers it to Sbarter using an agreed secure channel. Key-distribution and rotation procedures need operational confirmation. |

Protect every API with HTTPS. Do not place client secrets, API keys or bearer tokens in mobile game builds, browser JavaScript, public source repositories or telemetry.

## OAuth token handling

Cache the access token in the studio backend, respect `expires_in` and request a new token before expiry. The documented Client Credentials grant does **not** rely on refresh tokens; avoid requesting a token for every API call. Handle `401` and `403` according to the receiving operation's published semantics.

## Idempotency and duplicate delivery

- For [`POST /v1/session`](/client/session/paths/~1v1~1session/post), use the supplied `sessionId` as the stable registration key. Processing a retry must not create a second game session for the same logical request.
- For result callbacks, correlate duplicate deliveries using the identifiers documented by the [result operation](/server/webhook/postmatchresultwebhook).
- Distinguish an identical retry from a conflicting payload. Detailed status-code behaviour for conflicts remains an [open API-contract decision](./integration-status.md).

## Timeouts, retries and availability

Clients should implement bounded timeouts, exponential backoff for transient failures and safe replay of idempotent operations. **Exact numerical timeouts, retry counts, delivery windows and rate limits have not yet been confirmed as shared contractual limits** and must not be inferred from example responses.

## Result finality and reconciliation

The game backend is the authoritative source of gameplay results. Sbarter consumes the reported result to drive the contest lifecycle and non-custodial settlement. Late results, correction requests and missing-result policies require an agreed contract before production use. See [Game Results & Reconciliation](../guides/game-results.md).

## Data protection and observability

Log request correlation identifiers, operation, environment, response status and delivery timestamps. Avoid logging full tokens, player identity documentation or unnecessary personal data. Treat security logs and API credentials as restricted operational information.

## Production readiness

Before enabling production traffic, agree and record: API base URLs and identity-provider hosts; allowable network sources; credential exchange and rotation owners; the studio's on-call incident contact; result delivery/recovery rules; any supported-country restrictions; and escalation channels. Do not assume an SLA, support mailbox or status page exists until Sbarter provides it.

Continue with [Testing & Releases](../testing/index.md) and [Integration Status & Open Decisions](./integration-status.md).
