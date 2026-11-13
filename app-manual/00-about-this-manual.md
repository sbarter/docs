---
title: "0 · About this manual"
description: "This manual describes the Sbarter app as a player experiences it, screen by screen, and shows how the app and an integrated game work together across…"
---

# 0 · About this manual

This manual describes the Sbarter app as a player experiences it, screen by screen, and shows how the app and an integrated game work together across the life of a contest. It is written for Video Game Providers (VGPs) – management, product, marketing, support and engineering teams – who need to understand what their players will see and do once their title is live on Sbarter, and what the integration does and does not touch.

It is not a technical reference. The integration itself – account linking, session registration, the result webhook and the player profile endpoint – is specified in the Sbarter developer portal; this manual cross-references it and explains the same mechanisms from the player’s side of the screen.

## 0.1 Vocabulary

Sbarter uses a deliberate vocabulary, and this manual follows it. Where an in-app label differs from the term used here, the label is quoted in inverted commas so that the reader can find it on screen.

| Term | Meaning |
| --- | --- |
| Contest | The unit of competition settled by the protocol. A 1v1 challenge, each pairing of a tournament and each Play & Compare instance are contests. |
| Challenge | A 1v1 contest between two players. |
| Event | A tournament, a season or a creator-hosted competition. |
| Stake / entry fee | What a player commits to enter a contest. “Stake” is used for challenges, “entry fee” for tournaments and Play & Compare. Both are escrowed by the smart contract at entry. |
| Reward / reward pool | What the winner – or the ranked winners – receive at settlement. Shown in the app as “Prize Pool”. |
| Oracle fee | What the VGP earns on every result it verifies. |
| Protocol fee | A fixed amount in SBT per contest, charged by the smart contract at settlement. |
| SBT | The protocol’s token, in which stakes, entry fees, rewards and oracle fees are denominated. The app also shows an indicative value in the player’s display currency. |
| Sbarter Wallet | The non-custodial wallet embedded in the app, created automatically with the account. Keys, tokens and funds remain under the player’s exclusive control. |
| Sbarter ID | The player’s public identifier in the app, used to find players, send SBT and link profiles. |
| VGP | Video Game Provider – the publisher or developer of an integrated title, and the only party that verifies results on that title. The API reference calls the VGP the “Video Game Studio”. |
