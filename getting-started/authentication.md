# Authentication & Credentials

The Sbarter integration uses different authentication schemes depending on which party initiates the call.

## Game studio calling Sbarter

Sbarter issues `client_id` and `client_secret` credentials to each studio. Obtain a bearer access token using the OAuth 2.0 client credentials grant and include it on protected Sbarter API calls:

```http
Authorization: Bearer <access_token>
```

The published token route is:

```http
POST /realms/studio_investor/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded
```

Request body:

```text
grant_type=client_credentials&client_id=<client_id>&client_secret=<client_secret>
```

Use the correct Keycloak host for the selected environment, as specified in the Sbarter API reference. Never include real client secrets in documentation, logs or source control.

## OAuth grants

| Grant | Purpose |
| --- | --- |
| `linking.deeplink.write` | Generate linking deep links |
| `linking.read` | Query linking status |
| `linking.write` | Submit in-app linking decisions |
| `webhook.write` | Submit match results |

Grants are assigned individually. Inspect the `scope` claim on the issued token instead of assuming all grants are present.

## Sbarter calling the game studio

The published Game Studio API uses the `X-API-Key` request header:

```http
X-API-Key: <studio-issued-api-key>
```

The studio issues this credential for Sbarter's server-to-server calls, including in-app linking confirmation, profile retrieval and session registration.

## Credential handling

- Use TLS for all API interactions.
- Keep credentials in a secret-management system rather than in application code or Markdown files.
- Respect token expiry and refresh tokens as needed.
- Limit credential access to the intended environment and integration.
- Avoid including tokens, secrets or raw personal data in logs.
- Use the sandbox/test environment before production.

## Common authentication errors

| HTTP status | Meaning / action |
| --- | --- |
| `401 Unauthorized` | Missing, expired or invalid credential; obtain a valid token or verify API key |
| `403 Forbidden` | Token does not provide the required grant, or access is not permitted |
| `429 Too Many Requests` | Back off according to the receiving API's rate limits, where applicable |

See the individual operations in **API Reference** for the definitive supported response codes and security requirements.
