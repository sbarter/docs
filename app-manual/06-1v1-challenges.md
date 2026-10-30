---
title: "6 · 1v1 challenges"
description: "The Sbarter App – User Manual for Video Game Providers, Draft v0.2"
---

# 6 · 1v1 challenges

A challenge is a contest between two players on a title and a game mode, each committing the same stake. The creator publishes the challenge; another player accepts it; both play the session in the game; the game reports the result; the smart contract pays the reward pool to the winner. Nobody at Sbarter touches any of these steps.

## 6.1 Lifecycle

| Step | What happens | Where |
| --- | --- | --- |
| Create | The creator picks the game, the game mode and the stake, and publishes. The stake is escrowed. The challenge appears in Browse under “Created by me” and, for other players, under “Open challenges”. | App |
| Accept | An eligible player accepts. Their stake is escrowed. Both players see the challenge in the Lobby with the readiness of each side and a private chat channel. | App |
| Prepare | Sbarter registers the two-player session with the game’s servers (12.4). Both players see the session as ready on the challenge page. | Sbarter → VGP |
| Play | The players open the game, where the registered session is waiting for them – with one tap from “Play” on an integrated title once direct launch is in place, or following the setup instructions on a public-API title. | Game |
| Report | The game’s servers post the authoritative result for the session to Sbarter’s webhook (12.5). | VGP → Sbarter |
| Settle | The smart contract releases the reward pool to the winner, the oracle fee to the VGP and the protocol fee; the result, the net outcome and the on-chain proof appear in both players’ transaction history and profiles. | Protocol |

## 6.2 Creating a challenge

Challenge creation is a four-step flow – Game, Settings, Stake, Publish – with a progress bar at the top.

![Figure 17](./images/figure-17.jpg)

*Figure 17 – Steps 1 and 2. The player selects a linked title, then a game mode from the rulesets defined by the VGP (each with an information icon and “Game Rules”). “Set as private challenge” hides the challenge from Browse so that it can only be accepted through its link.*

![Figure 18](./images/figure-18.jpg)

*Figure 18 – Steps 3 and 4. The stake is chosen within the range allowed for the title (quick amounts offered), with the wallet balance shown above. The Publish screen previews the card as other players will see it, including the reward pool.*

The reward pool shown on the card is what the winner receives: the two stakes combined, less the protocol fee – a fixed amount in SBT per contest – and, for a title integrated through the Oracle API, the oracle fee earned by the VGP. In the example above, two stakes of SBT 10 produce a reward pool of SBT 19.

When the creation flow is opened from a link inside the game (12.2), the game and the game mode are pre-filled and the player lands directly on the stake step.

## 6.3 Managing open challenges

From “Created by me” the creator can open a challenge and edit the game mode or the stake, duplicate it, delete it, or share its link – to a friend, a community channel or a creator’s audience. A challenge edited while open is republished with the new parameters; a deleted challenge returns the stake to the creator.

![Figure 19](./images/figure-19.jpg)

*Figure 19 – Managing an open challenge: delete, edit, duplicate, share. The creator’s win record on Sbarter is shown on the card.*

## 6.4 Accepting a challenge

In Browse, each open challenge shows the creator, their Sbarter win record, the game mode, the stake and the reward pool. Accepting escrows the acceptor’s stake and moves the challenge into both players’ Lobby. A player can only accept a challenge on a title they have linked, and only if their country and verification status allow it; otherwise the action is disabled with an explanation.

## 6.5 Playing the session

![Figure 20](./images/figure-20.jpg)

*Figure 20 – The challenge page once accepted: both players with their readiness, the “Stop Challenge” control, the setup instructions, the contest parameters, and the private chat channel with the opponent.*

The challenge page is the hub of the contest: both players with their game accounts and their readiness, the game mode, the stake and the reward pool, and a private chat channel in which the players coordinate; system messages mark the challenge going live and the session starting.

On an integrated title, once both stakes are locked Sbarter registers the session with the game’s servers and the page shows it as ready; the player opens the game and finds the session waiting – the target is a one-tap “Play” landing directly in it (12.4). On a title connected through its public API, the “Match setup instructions” explain how to find the opponent and start the right mode.

## 6.6 Result and settlement

When the game reports the result, the smart contract settles the contest immediately. Both players are notified; the result appears under Recent Results, the title ELO and the rankings update, and the transaction detail (3.5) shows the net result, the settlement steps and the on-chain proof. There is nothing to claim and nothing to confirm: the reward is in the winner’s wallet at settlement.

## 6.7 Stopping a challenge

Before the session starts, either player can leave – the creator with “Stop Challenge”, the acceptor by leaving the Lobby – and the stakes are returned. Once the session has started, the contest is settled on the result the game reports, according to the ruleset defined by the VGP, which covers timeouts and abandoned sessions. A settlement step that cannot be executed is shown as failed in the transaction detail, with the amount concerned left in escrow (Figure 9).
