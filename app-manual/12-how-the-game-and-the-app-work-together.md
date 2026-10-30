---
title: "12 · How the game and the app work together"
description: "The Sbarter App – User Manual for Video Game Providers, Draft v0.2"
---

# 12 · How the game and the app work together

This chapter is for the VGP. It takes the cycle a player travels between your game and the Sbarter app and shows, for each handoff, what the player sees, what your systems do and what the protocol does. The authoritative technical specification – request and response schemas, authentication, environments – is the Sbarter developer portal (12.11); this chapter follows its structure and uses its operation names, so that product, marketing and support teams can read the same story engineering implements.

{% admonition type="info" name="Two APIs, two directions" %}
**Sbarter API** – hosted by Sbarter, called by your backend: account-linking operations and the result webhook. Authenticated with OAuth 2.0 client credentials issued in the Sbarter Studio Web Portal.

**Game Studio API** – hosted by you, called by Sbarter: in-game linking confirmation, player profile snapshot and game-session registration. Authenticated with an API key you issue.

Operations marked *under development* in the portal – one-tap launch into a provisioned session, in-game notifications, presence evidence and result reconciliation – are described here as the target experience and are agreed with each VGP before launch.
{% /admonition %}

## 12.1 The full loop

![Figure 30](./images/figure-30.png)

*Figure 30 – The full loop. Three published interfaces close the circuit: the linking link into Sbarter, the session registration from Sbarter to your servers, and the result webhook from your servers to Sbarter. Everything between them is handled by the app and the smart contracts.*

Two properties of the loop deserve attention. First, friction is zero until the moment of competitive commitment: discovery, registration, linking and exploration ask nothing of the player; verification and funding sit at the first entry and nowhere else. Second, every message that decides an outcome runs server-to-server between your backend and Sbarter: the result is produced by your game servers, never by the player, and neither Sbarter nor you can alter it once accepted.

## 12.2 Account linking

Linking associates a player’s Sbarter account with their authenticated game account, so that Sbarter can identify the two participants of a session and attribute your result to the right entries. The binding is one-to-one and permanent, and never asks the player to copy an identifier. Two journeys are published.

### Journey A – the player starts in your game

1. Your backend calls `POST /v1/linking/deeplink/generate` with the player’s account identifier in your system (`providerUserId`) and receives a **single-use linking link**, which you deliver through any surface – menu, banner, post-session screen, push, in-game message, e-mail.
2. The player taps it. If the app is installed it opens with the game context; otherwise a welcome page for your title leads to installation – store listing or direct download – and a deferred link preserves the context through the install.
3. The player signs in, or registers (2.2). Sbarter determines whether the account is new, registered but unbound, or already bound to the same game identity.
4. The player sees a **confirmation screen naming your game and the game account**, and confirms. Sbarter records the binding; your title appears in the player’s Game Library (4.1) with the game nickname shown next to the Sbarter ID.
5. The player lands on the referenced contest or on Browse filtered on your title, and continues into entry – eligibility, skill cap where configured, funds.

Your backend can check the outcome at any time with `POST /v1/linking/status`. Redeeming the link does not by itself trigger a callback to you.

### Journey B – the player starts in the Sbarter app

1. A registered player browses the contests of your title and taps Join, Create or Accept. If the account is already bound, nothing else happens.
2. If it is not, and Sbarter already knows the player’s game account identifier, Sbarter calls your `POST /v1/sbarter/gamer/validate/in-app`: you present the confirmation to the authenticated player inside your game and return the decision – accepted, rejected or expired – to the callback supplied with the request (`POST /v1/linking/in-app/{requestId}`).
3. On success the player returns to the contest, passes the eligibility and funds checks and enters.

Discovery of a game account that Sbarter does not yet know – the player is sent into your game with a one-time link code and your server returns the authenticated account – is the proposed completion of this journey and is under development.

| Situation | Behaviour |
| --- | --- |
| Already linked to the same account | Continue; linking is not repeated. |
| Sbarter account linked to a different game account, or game account linked to a different Sbarter account | The new binding is rejected – one-to-one, permanent. |
| Guest game account | The player authenticates or upgrades to a full account before linking. |
| Linking link expired or already used | No binding; the player restarts from your game. |
| Skill rating above the cap of an Entry contest | Shown as ineligible, with alternatives. The rating comes from your profile snapshot (12.4). |
| Insufficient funds | The app offers a top-up before entry (3.2). |

## 12.3 Entry points into Sbarter

Every surface in your game that promotes competition – a persistent entry point in the main menu, rotating banners, a tournament promotion, the post-session moment on the results screen, push notifications, newsletters and community channels – can carry a link into Sbarter. The published operation generates account-linking links; richer destinations are the proposed experience and are agreed per title:

| Destination | What the player lands on |
| --- | --- |
| Browse filtered on your title | The Arena, showing only the challenges and tournaments of your title (5.1). |
| A specific tournament | The tournament card with the join action visible (7.2). |
| A specific challenge (private invitation) | The challenge page, ready to accept (6.4). |
| The current season | The season leaderboard of your title (5.4), also available as an embeddable web module. |

A QR code is the same link on a different screen: printed, shown on a stream or displayed on a desktop version of the game. Links carry an attribution so that conversion can be measured per surface and campaign.

## 12.4 From commitment to the game session

When two linked players are committed – a challenge accepted and confirmed, or a tournament pairing set – and both stakes are in escrow, Sbarter registers the session with your servers: `POST /v1/session` on your Game Studio API, carrying your game identifier, the canonical Sbarter `sessionId`, the two players, an expiry time, the `webhookUrl` to which the result must be reported, and optional rules. The call is idempotent on `sessionId`: a retry with the same payload must not create a second session.

What the player sees: the challenge page or the tournament pairing shows the session as ready, with both players’ readiness and the time window (6.5, 7.4). The player opens your game, where the registered session is waiting for the two accounts; how your game presents it – a pending contest in a dedicated section, a lobby, an invitation – is your design. The target experience is a one-tap **“Play”** in Sbarter that lands directly in the provisioned session, with the first player waiting for the second; it requires a launch mechanism on your side and is under development with each VGP.

At any time Sbarter may request a **player profile snapshot** from `POST /v1/sbarter/gamer/profile` – display name, capture time and optional game statistics. This is what populates the game profile and “Sync Game Stats” (4.3), and what supplies the rating used for Entry contests with a skill cap.

## 12.5 Results: the webhook as the player sees it

When the session is over, your servers post the authoritative result to the `webhookUrl` supplied at registration (`POST /v1/webhooks/game-studio/match-result` on the Sbarter API): your game identifier, the `sessionId`, your own `matchId`, a status – win, draw, failed or voided – and the two players with their outcome, plus start and end timestamps where available. Requests carry an OAuth bearer token with the `webhook.write` grant; Sbarter answers 202, including for safe duplicate deliveries, and treats `sessionId` + `matchId` as the identity of a logical result, so that a retry never produces a second settlement.

On the player’s side the submission is invisible and its effect immediate: Sbarter validates that the identities, the session and the timing match the pending contest, the smart contract settles, the player is notified, the contest page shows the result, the transaction detail shows the net outcome, the settlement steps and the on-chain proof (3.5), and ratings and rankings update. In the ordinary path nothing is claimed, confirmed or disputed by the player.

## 12.6 When no result arrives

If no trusted result reaches Sbarter within the completion window, the contest is resolved by rule rather than by judgement. The published API does not yet include the evidence these rules need – whether each player was logged in during the window, or a way for Sbarter to retrieve a missed result – so the table below is the proposed policy, to be agreed and implemented with each VGP before real-stakes settlement depends on it.

| Evidence from your servers | 1v1 challenge | Tournament pairing |
| --- | --- | --- |
| Exactly one player was present | The present player wins by forfeit. | The present player advances by forfeit. |
| Neither player was present | Void; both stakes returned. | Void; both eliminated; the next-round opponent may receive a bye. |
| Both players were present | Void; both stakes returned. No player reporting in 1v1. | Both players are asked, in the app, to report the outcome within a short window – “I won”, “I lost”, “My opponent didn’t show”. Consistent reports settle the pairing; conflicting or missing reports void it. |
| No trustworthy evidence | Operational policy – never a silent default. | Operational policy – never a silent default. |

{% admonition type="warning" name="Proposed, tournament-only" %}
Player reporting exists only as a fallback for tournament pairings in which both players were present and the game produced no result; it is collected in the Sbarter app, never through a screen in your game, and is under development. A void final splits the combined first and second rewards equally between the finalists.
{% /admonition %}

## 12.7 What is specific to each format

| Format | Session registration | Result | Notes |
| --- | --- | --- | --- |
| 1v1 challenge | One two-player session per contest, after acceptance and confirmation. | One result for the session. | The ruleset – mode, completion window, what counts as a result – is configured in Sbarter; your game plays it. |
| Tournament | One two-player session per pairing, round by round; bracket and advancement live in Sbarter. | One result per pairing. | The session carries no tournament or round identifiers; Sbarter correlates each session with its bracket. Between rounds the player returns to the tournament page in the app. |
| Play & Compare | Score-based, all-vs-all: the published contract registers two-player sessions only; the Play & Compare contract – seed per instance, one best result per player, live updates – is published separately. | The result set at close. | Goes live title by title. |

## 12.8 Messages inside your game

Sbarter remains the system of record for eligibility, stakes, brackets and settlement; your game can relay the moments that bring the player back, each with a link to the right screen. No generic notification endpoint is published yet: the events, delivery direction, identities, expiry and idempotency are agreed per title.

| Moment | Proposed message | Destination |
| --- | --- | --- |
| Private invitation | “You have been challenged” | The challenge in Sbarter |
| Challenge accepted | “Opponent waiting” | The challenge page |
| Both stakes locked, session registered | “Play” | The session in your game |
| Bracket ready / next round ready | “Go to your pairing” | The assigned session |
| Missing tournament result, both present | “Report your result” | The reporting screen in Sbarter (12.6) |

## 12.9 What reaches you, and what never does

| You receive | You never receive |
| --- | --- |
| Statistical and informational data on game activity on your title – how often, at which entry tiers and in which formats your players compete – under the Terms & Conditions accepted by every player, in accordance with the GDPR, for performance marketing inside your own app. | Identity documents, biometric data, verification outcomes at individual level, wallet keys, payment details. These never leave Sbarter and its providers, under any circumstance. |
| The Sbarter identity of a linked player only as an opaque identifier next to the game-account identifier you issued yourself. | Personal data of players beyond what your own game account already holds. |
| Oracle fees, paid by the smart contract to your wallet at every settlement. | Any access to escrowed stakes or entry fees, or to the execution of a contest. |

## 12.10 Player support: who handles what

| Topic | Handled by |
| --- | --- |
| Sbarter account, wallet, top-up and withdrawal providers, verification, contest lifecycle, settlement, app issues | Sbarter Support Centre (11.2) |
| Gameplay, game accounts, in-game issues, sessions that did not start or complete inside the game | The VGP’s own support |
| A result that the player believes is wrong | Sbarter settles the result your servers reported; there is no dispute process in the app. A player who questions a result is referred to the on-chain proof and, for anything concerning the session, to your support. Missing results follow 12.6. |

## 12.11 The developer portal

- **Getting Started** – Introduction, Integration Architecture (operations by caller and receiver), Quick Start, Authentication & Credentials (client credentials from the Studio Web Portal; your API key for the Game Studio API).
- **Integration Guides** – Account Linking, 1v1 Challenge Integration, Tournament Integration, Game Results & Reconciliation, Notifications & Deep Linking.
- **API Reference** – Sbarter API (hosted by Sbarter, called by you) and Game Studio API (hosted by you, called by Sbarter), with the authoritative schemas.
- **Security & Operations** and **Testing & Releases** – request handling, operational considerations, validation and rollout.
