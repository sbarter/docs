# Quick Start

This guide shows how to prepare a game-studio integration against the currently published API contract.

## Prerequisites

- Your studio and game must be registered with Sbarter.
- You need a stable `providerGameId` for the game and a stable `providerUserId` for each player.
- Obtain access to the **Sbarter Studio Web Portal** from your Sbarter integration contact, then create OAuth 2.0 client credentials from **API Credentials** (key icon). Credential self-service is currently available in **staging**; production access and permissions are provisioned separately.
- Host the Game Studio API operations described in `client.yaml`, secured with a studio-issued `X-API-Key` that Sbarter can use.
- Use the agreed non-production environment and test accounts for integration testing.

## 1. Create credentials and obtain a Sbarter access token

### Obtain access to the Studio Web Portal

Request access to the **Sbarter Studio Web Portal** through your Sbarter integration contact. After Sbarter grants access, sign in using your assigned account. The credential-management feature shown here is currently available in the **staging** portal.

### Generate your API credentials

1. Select **API Credentials** using the **key icon** in the portal's main navigation.
2. If no credentials exist, select **Create Credentials**.
3. Copy the generated **Client ID** (`client_id`) and **Client Secret** (`client_secret`).
4. **Save the client secret immediately** in a secure, server-side secret manager. The portal displays it only once. If it is lost, use **Rotate Secret** to generate a replacement; rotation immediately invalidates the previous secret.

Do not embed the secret in the Video Game, a mobile app, browser JavaScript or source control. The portal also provides a **Revoke** action; use it only when you intend to disable those credentials.

For the detailed procedure, see [Authentication & Credentials](./authentication.md#obtaining-api-credentials).

### Request a bearer token

Use the OAuth 2.0 Client Credentials token endpoint documented in the **Sbarter API** reference. The request uses `application/x-www-form-urlencoded` and includes `grant_type=client_credentials`, `client_id` and `client_secret`.

Use the returned bearer token when calling Sbarter. Verify the token's `scope` claim because grants are issued independently. Credential creation alone does not imply access to every operation.


## 2. Link a game account

Choose one of the existing methods:

**Studio-initiated deep link:** call `POST /v1/linking/deeplink/generate`, open the returned `deepLink` for the player, and check completion with `POST /v1/linking/status`.

**Sbarter-initiated in-game confirmation:** implement `POST /v1/sbarter/gamer/validate/in-app` and return the player's decision to the exact callback URL provided by Sbarter.

The two methods may coexist.

## 3. Implement the studio profile endpoint

Implement `POST /v1/sbarter/gamer/profile`. Return the required `providerDisplayName` and `profileCapturedAt` fields. Game-specific metrics belong in optional `profileStats`.

## 4. Implement session registration

Implement `POST /v1/session`. Accept the canonical Sbarter `sessionId`, exactly two players, `expiresAt` and `webhookUrl`. Repeating a registration with the same `sessionId` and effective payload must be idempotent.

## 5. Submit a contest result

Post the authoritative result to the callback URL supplied with the session, using the required OAuth bearer token and `webhook.write` grant. The published Sbarter receiving operation is `POST /v1/webhooks/game-studio/match-result`.

Retry transient delivery failures and preserve the existing `sessionId + matchId` correlation for duplicate-safe processing.

## 6. Verify integration behavior

Test successful and unsuccessful linking, expired and redeemed links, repeated session registration, valid results, duplicate result submissions, invalid credentials and transient failures.

> **Important:** This quick start covers the *published* API operations. The full one-tap contest-launch and missing-result exception journeys require additional capabilities tracked separately as **Under Development** until their contracts are published.

## Next

- [Authentication & Credentials](./authentication.md)
- See **API Reference → Sbarter API** and **API Reference → Game Studio API** in the navigation.
