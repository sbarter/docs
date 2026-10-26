---
title: "7 · Tournaments"
description: "The Sbarter App – User Manual for Video Game Providers, Draft v0.2"
---

# 7 · Tournaments

A tournament is a scheduled single-elimination bracket on one title and one game mode: players register before the start by paying the entry fee, are paired round by round, and the reward pool is distributed to the finalists at settlement. Each pairing in the bracket is a contest in its own right, settled on the result the game reports for it; bracket progression is automatic.

## 7.1 Format and configuration

| Parameter | Description |
| --- | --- |
| Organiser | The VGP or a creator. The organiser’s name appears in the tournament details. Sbarter never organises tournaments. |
| Open to | Public, or restricted – for instance to a skill bracket, so that low-rated players compete among themselves. |
| Field | Minimum and maximum number of players (e.g. 8–8, 16). The tournament starts only if the minimum is reached; otherwise it is cancelled and entry fees are returned. |
| Start and duration | Scheduled start; expected duration derived from the number of rounds and the ruleset. |
| Game mode | The ruleset applied to every pairing. |
| Entry fee | Per player, escrowed at registration. Zero for VGP-funded free-entry tournaments. |
| Reward pool | Entry fees combined – or the amount funded by the organiser – less the oracle fee, the protocol fee on each pairing and, where a season is active, the season deduction; distributed per the reward table. |

## 7.2 Registering

![Figure 21](./images/figure-21.jpg)

*Figure 21 – Registration. Once registered, the card confirms the entry and the player can leave the waiting area; the participant list shows each player with their game account.*

Registration is open while the status is “Filling”. Tapping the card registers the player and escrows the entry fee; the card then shows the countdown to the start, with a leave control on the left and share on the right. The player receives a notification confirming the registration and a reminder before the start. A registered player can withdraw with a full refund until the cutoff before the scheduled start set in the tournament configuration; the final participant list is confirmed when registration closes.

## 7.3 Tournament details

![Figure 22](./images/figure-22.jpg)

*Figure 22 – Tournament details: organiser, access, field size, game, ruleset and reward pool.*

## 7.4 When the tournament starts

At the scheduled start the tournament page switches to three tabs. **Matches** shows the player’s current pairing: the round, the opponent, both readiness states and the countdown to the session, above the tournament chat. **Brackets** shows the whole bracket with the state of every pairing – “Preparing”, “In Play”, “Finished” – and “TBD” for pairings whose players are not yet known. **Players** lists the field.

![Figure 23](./images/figure-23.jpg)

*Figure 23 – A running tournament: the current pairing with its countdown, and the bracket as rounds complete.*

## 7.5 Playing a round and progressing

Each round follows the same sequence as a challenge: Sbarter registers the pairing as a two-player session with the game’s servers, both players are notified, they play the session in the game, the game reports the result, and the pairing is settled. The winner is moved to the next round and notified when the next pairing is ready; the loser remains in the tournament page and can follow the bracket to the end. Between rounds the player returns to the tournament page in the app – it is the single place where the bracket, the next opponent and the timing live. A player who does not show up for a pairing within its completion window forfeits it; what happens when the game produces no result is set out in 12.6.

## 7.6 Settlement

When the final pairing is settled, the smart contract distributes the reward pool according to the reward table of the tournament, pays the oracle fee to the VGP and records the event on-chain. Every player sees their outcome in the transaction history and in Recent Results; finalists see the reward credited to their wallet at settlement.

## 7.7 Tournament chat

![Figure 24](./images/figure-24.jpg)

*Figure 24 – Each tournament has a group chat open to the registered players from registration to settlement.*
