---
title: "1 · Sbarter in brief"
description: "The Sbarter App – User Manual for Video Game Providers, Draft v0.2"
---

# 1 · Sbarter in brief

Sbarter enables players to run competitive gaming events with real stakes in the games they already play. It is a neutral competitive layer, not a game and not a destination: a player who competes on your title through Sbarter is still your player, playing your game on your servers. Sbarter provides the infrastructure around the session – identity, wallet, contest creation, escrow, settlement, rankings, notifications and support – and nothing else.

## 1.1 Three participants, one protocol

| Participant | What they do in Sbarter |
| --- | --- |
| Players | Challenge each other 1v1, register for tournaments and join Play & Compare contests, with a stake or an entry fee that makes the outcome matter. They prove their skill, back their ability and build a rating. |
| Video Game Providers | Open their title to competition without changing gameplay or economy. The VGP is the sole source of truth for what happens in the game: it verifies every result through the Oracle API and earns the oracle fee on each one. |
| Creators | Bring their communities to a title through the Creator Partner Programme, configured and rewarded by the VGP. Not covered in this manual. |

## 1.2 Principles the app embodies

Four principles shape every screen described in this manual. They are structural – enforced by the smart contracts and by the way the app is built – rather than promises.

- **Skill only.** Player performance inside the game decides every outcome. Sbarter never sets odds, never relies on chance and never profits from a player’s loss: its revenue is a fixed protocol fee per contest, identical whoever wins.
- **Non-custodial.** Stakes and entry fees are escrowed by a smart contract on Solana at entry and released at settlement. Neither Sbarter nor the VGP can access the escrow or intervene in the execution of a contest. Sbarter never holds player funds and never intermediates fiat: funding runs through authorised third-party providers integrated in the app.
- **Neutral.** Sbarter is never the organiser of an event and never the arbiter of a result. Events are organised by VGPs and creators; results come exclusively from the VGP’s servers. There is no manual intervention and no dispute process: what the game reports is what the contract settles.
- **Verified before the first stake.** Browsing is open to everyone; competing requires an identity-verified adult player in a supported country. Verification happens once, at the first entry, and is enforced on-chain through a privacy-preserving eligibility attestation.

## 1.3 The app at a glance

The app is organised around three permanent tabs in the bottom bar, plus a header that is present on every main screen.

| Area | Icon | What it contains |
| --- | --- | --- |
| Wallet | Sbarter mark (left) | Balance, top-up, send, receive, withdraw, transaction history with on-chain proof (chapter 3). |
| Arena | Controller (centre) | Browse open challenges and upcoming tournaments; Lobby for the contests the player has entered or created; filters; season leaderboards (chapters 5–8). |
| Community | People (right) | Chats – tournament lobbies and private channels with opponents – and friends (chapter 9). |
| Header | Avatar · bell · bubble | Avatar and nickname open the Profile (chapter 10); the bell opens Notifications; the bubble opens Chats. Settings are reached from the Profile (chapter 11). |

![Figure 1](./images/figure-01.jpg)

*Figure 1 – The three tabs of the bottom bar. The header (avatar, notifications, chats) is identical on each.*
