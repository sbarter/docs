---
title: "0 · About this manual"
description: "The Sbarter App – User Manual for Video Game Providers, Draft v0.2"
---

# 0 · About this manual

This manual describes the Sbarter app as a player experiences it, screen by screen, and shows how the app and an integrated game work together across the life of a contest. It is written for Video Game Providers (VGPs) – management, product, marketing, support and engineering teams – who need to understand what their players will see and do once their title is live on Sbarter, and what the integration does and does not touch.

It is not a technical reference. The integration itself – outbound and return deeplinks, account binding, the Oracle API and the additional query endpoints – is specified in the Sbarter Integration Documentation and in the API reference; this manual cross-references them and explains the same mechanisms from the player’s side of the screen.

## How to read this document

- **Chapters 1–2** position Sbarter and walk through installation, registration, eligibility and verification.
- **Chapters 3–5** cover the three permanent areas of the app: the Wallet, Games and game accounts, and the Arena where contests are listed and followed.
- **Chapters 6–8** describe the three competition formats – 1v1 challenges, tournaments and Play & Compare – from entry to settlement.
- **Chapters 9–11** cover community features, the player profile, settings and player-safety tools.
- **Chapter 12** is the chapter written specifically for VGPs: the full loop between the game and the app, what each handoff looks like to the player, and what the VGP receives and never receives.
- **The appendices** collect the contest states, the vocabulary and the screens still to be captured.

## Vocabulary

Sbarter uses a deliberate vocabulary, and this manual follows it. Where an in-app label differs from the term used here, the label is quoted in inverted commas so that the reader can find it on screen.

| Term | Meaning |
| --- | --- |
| Contest | The unit of competition settled by the protocol. A 1v1 challenge, each round of a tournament and each Play & Compare instance are contests. |
| Challenge | A 1v1 contest between two players. |
| Event | A tournament, a season or a creator-hosted competition. |
| Stake / entry fee | What a player commits to enter a contest. “Stake” is used for challenges, “entry fee” for tournaments and Play & Compare. Both are escrowed by the smart contract at entry. |
| Reward / reward pool | What the winner – or the ranked winners – receive at settlement. Shown in the app as “Prize Pool”. |
| Oracle fee | What the VGP earns on every result it verifies through the Oracle API. |
| Protocol fee | A fixed amount in SBT per contest, charged by the smart contract at settlement. |
| SBT | The protocol’s token, in which stakes, entry fees, rewards and oracle fees are denominated. The app also shows an indicative value in the player’s display currency. |
| Sbarter Wallet | The non-custodial wallet embedded in the app, created automatically with the account. Keys, tokens and funds remain under the player’s exclusive control. |
| Sbarter ID | The player’s public identifier in the app, used to find players, send SBT and link profiles. |
| VGP | Video Game Provider – the publisher or developer of an integrated title, and the only party that verifies results on that title. |
| Creator Partner Programme | The affiliation programme through which a VGP enrols creators who bring their communities to its title. Outside the perimeter of this manual. |

{% admonition type="warning" name="Status of this version" %}
Draft v0.2, based on app version 1.0.403 (iOS) and on the developer portal as published in October 2026. Screens of Play & Compare, identity verification and the deeplink entry from a game are not yet captured and are described from the product specifications; they are listed in Appendix C. Tournament screens from the September preview still show the preview-period token label (“SBTB”); they will be refreshed on the next capture.
{% /admonition %}
