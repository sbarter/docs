---
title: "4 · Games and game accounts"
description: "The Sbarter App – User Manual for Video Game Providers, Draft v0.2"
---

# 4 · Games and game accounts

## 4.1 The Game Library

The Game Library lists every title available on Sbarter (“All Games”) and the titles the player has linked (“My Games”). A linked title carries a link badge on its tile. The library is reached from Settings, from the “Add Game” tile on the profile and from the first step of challenge creation.

![Figure 11](./images/figure-11.jpg)

*Figure 11 – The Game Library and the Games section of the profile. A title must be linked before the player can compete on it.*

## 4.2 Linking a game account

To compete on a title, the player’s game account must be linked to the Sbarter account, so that the result transmitted by the game can be attributed to the right player. There are two ways for this to happen:

- **From the game.** The player taps a single-use linking link issued by the VGP for their authenticated game account; after signing in or registering, a confirmation screen names the game and the account, and one tap binds them. The game nickname then appears next to the Sbarter ID on the profile. This is the standard path for an integrated title (12.2, Journey A).
- **From the app.** A player already on Sbarter who taps Join, Create or Accept on a title not yet linked is asked to confirm the link inside the game: Sbarter requests the confirmation from the VGP, the game shows it to the authenticated player, and the decision comes back to Sbarter (12.2, Journey B). No identifier is typed by the player.

The binding is one-to-one and permanent: a game account already linked to another Sbarter account, or a Sbarter account already linked to another account on the same title, cannot be linked again. For titles connected through their public API during the preview period, the player links the account manually from “Add Game” by entering the game username; this path is not the reference experience for an integrated title.

## 4.3 Game profile, statistics and rankings

Each linked title has its own profile page: the game account and the Sbarter ID side by side, the player’s recent results against Sbarter opponents, the win rate, the ELO rating for that title with its evolution over the week, month or year, and the ranking among Sbarter players on that title, with the player’s own row highlighted. “Sync Game Stats” refreshes the statistics from the game; “Your Leaderboard” jumps to the player’s position in the ranking.

![Figure 12](./images/figure-12.jpg)

*Figure 12 – Game profile: linked account, recent results, title ELO and ranking.*

Rankings are per title and are driven only by contests settled on Sbarter. They allow the VGP to configure skill brackets – contests reserved to players within a rating band – so that newcomers are not systematically paired with the strongest players (see 7.1).
