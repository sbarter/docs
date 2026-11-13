# Quick Start

Integrating your Video Game with Sbarter follows seven steps, from Studio Web Portal onboarding to production launch. Your studio continues to operate the game and its backend; Sbarter manages competition participation, orchestration and settlement.

![Seven steps to integrate with Sbarter](./images/quickstart-seven-steps.svg)

## 1. Onboard

Complete the commercial and technical onboarding with Sbarter, obtain access to the **Studio Web Portal**, and register your studio and Video Game as instructed. Agree the supported game modes and rulesets. In the portal, open **API Credentials** (key icon) to create your OAuth `client_id` and one-time `client_secret`.

Sbarter gives you your studio's **slug** and registers each of your games with a `providerGameId`. Your backend calls the Sbarter API at `https://partners.<env>.sbarter.com/<slug>` (`partners.dev`, `partners.test` for staging, `partners.sbarter.com` for production), with credentials issued separately for each environment. Get a token and call `GET /v1/auth/check`: `204` confirms that your credentials, studio, slug and the Sbarter gateway are in place.

Your studio starts in **sandbox** mode: Sbarter's simulator plays your side, so you can call the Sbarter API end to end before your own Game Studio API exists. When your API is ready, enter its base URL and the API key for Sbarter-to-studio requests in the Studio Web Portal and switch to **live**.

**Next:** [Authentication & Credentials](./authentication.md)

## 2. Open the door

Add Sbarter entry points to your Video Game, such as a menu link or competition invitation. For a game-initiated journey, generate a linking deep link and hand it to the player. If the app is not installed, the link opens a Sbarter page showing your game with the app-store links, and the app picks the link up on its first start after installation. Your game can also open challenge creation in Sbarter, prefilled with a format and pledge the player chose in the game.

**Next:** [Notifications & Deep Linking](../guides/notifications.md)

## 3. Link accounts

Support one-time linking between each player's Video Game account and Sbarter account. The journey can start inside the Video Game or the Sbarter app. Use the applicable published linking operations: a deep link minted by your game, or an in-app confirmation requested by Sbarter after the player types their game account id in the Sbarter app. Check linking status when your game needs to confirm completion, including when it regains focus.

**Next:** [Account Linking](../guides/account-linking.md)

## 4. Register sessions

When a 1v1 challenge or tournament match is ready, Sbarter calls the studio-hosted `POST /v1/session` operation with the session and player context, including the `challengeId` also carried by the challenge notifications. Implement idempotent registration using `sessionId`. Direct match-launch information, such as a launch URL, is an integration capability to agree and verify against the current API contract.

**Next:** [1v1 Challenge Integration](../guides/one-v-one.md)

## 5. Bring the player back

Enable players to move from Sbarter into the correct Video Game session with as few steps as possible. Where supported, handle the match launch link so both players reach the preconfigured match; coordinate app-link handling, opponent waiting and fallback behaviour with Sbarter.

**Next:** [Notifications & Deep Linking](../guides/notifications.md)

## 6. Report the result

Send the authoritative server-side match result to the result callback supplied during session registration, with the required authentication and session identifiers. Sbarter validates the result and manages competition settlement or tournament progression. Any studio revenue share or oracle fee is subject to the applicable commercial agreement and supported settlement arrangements.

**Next:** [Game Results & Reconciliation](../guides/game-results.md)

## 7. Test and go live

Exercise the Sbarter API against the sandbox first, then switch to live and complete the agreed conformance scenarios, including linking failures, duplicate session registration, result retries and missing-result handling. Coordinate sign-off and production environment access with Sbarter before launch. Rollout sequencing and supported jurisdictions are agreed separately.

**Next:** [Testing & Releases](../testing/index.md)

> **Implementation status:** This page combines currently published API operations with planned journey capabilities. Follow the linked guides and API Reference for the authoritative contracts, and do not assume proposed launch, eligibility or reconciliation endpoints are already available. Challenge notifications (`/v1/challenge/...`) are published in the Game Studio API.
