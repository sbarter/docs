# Quick Start

This guide shows how to prepare a game-studio integration against the currently published Level 3 API contract.

## Prerequisites

- Your studio and game must be registered with Sbarter.
- You need a stable `providerGameId` for the game and a stable `providerUserId` for each player.
- Obtain Sbarter-issued OAuth 2.0 client credentials and the required grants.
- Host the Game Studio API operations described in `client.yaml`, secured with a studio-issued `X-API-Key` that Sbarter can use.
- Use the agreed non-production environment and test accounts for integration testing.

## 1. Obtain a Sbarter access token

Use the OAuth 2.0 client-credentials token endpoint documented in the **Sbarter API** reference. The token request is `application/x-www-form-urlencoded` and includes `grant_type=client_credentials`, `client_id`, and `client_secret`.

Use the returned bearer token when calling Sbarter. Check the token's `scope` claim because grants are issued independently.

## 2. Link a game account

Choose one of the existing methods:

**Studio-initiated deep link:** call `POST /v1/linking/deeplink/generate`, open the returned `deepLink` for the player, and check completion with `POST /v1/linking/status`.

**Sbarter-initiated in-game confirmation:** implement `POST /v1/sbarter/gamer/validate/in-app` and return the player's decision to the exact callback URL provided by Sbarter.

The two methods may coexist.

## 3. Implement the studio profile endpoint

Implement `POST /v1/sbarter/gamer/profile`. Return the required `providerDisplayName` and `profileCapturedAt` fields. Game-specific metrics belong in optional `profileStats`.

## 4. Implement session registration

Implement `POST /v1/session`. Accept the canonical Sbarter `sessionId`, exactly two players, `expiresAt` and `webhookUrl`. Repeating a registration with the same `sessionId` and effective payload must be idempotent.

## 5. Submit a match result

Post the authoritative result to the callback URL supplied with the session, using the required OAuth bearer token and `webhook.write` grant. The published Sbarter receiving operation is `POST /v1/webhooks/game-studio/match-result`.

Retry transient delivery failures and preserve the existing `sessionId + matchId` correlation for duplicate-safe processing.

## 6. Verify integration behavior

Test successful and unsuccessful linking, expired and redeemed links, repeated session registration, valid results, duplicate result submissions, invalid credentials and transient failures.

> **Important:** This quick start covers the *published* API operations. The full RB3 one-tap match-launch and missing-result exception journeys require additional capabilities tracked separately as **Under Development** until their contracts are published.

## Next

- [Authentication & Credentials](./authentication.md)
- See **API Reference → Sbarter API** and **API Reference → Game Studio API** in the navigation.
