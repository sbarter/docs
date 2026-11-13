---
title: "6 · Play & Compare"
description: "Play & Compare is an all-vs-all, score-based contest for games in which players compete against the game itself rather than against a live opponent: a…"
---

# 6 · Play & Compare

## 6.1 Format

Play & Compare is an all-vs-all, score-based contest for games in which players compete against the game itself rather than against a live opponent: a player joins, plays immediately and is ranked against everyone else at the close of the contest. There is no matchmaking and no waiting. It suits asynchronous and casual titles – cards, puzzles, racing, score chasers – and league-style formats on competitive titles.

Contests are instantiated by the system from a configuration defined by the VGP – game mode, entry fee, duration, minimum participants, reward table, attempt model – and renew automatically: when one instance closes for entries, the next one is already open, so that a joinable contest is always available. Three attempt models exist, chosen by the VGP among those the title supports:

| Model | Attempts | Counted result | Typical titles |
| --- | --- | --- | --- |
| Single Run | One session per entry, on a seed unique to the instance so that every player faces identical conditions. | The single session | Cards, randomised puzzles |
| Rebuy | Additional sessions, each paid at the entry fee, up to the configured maximum. | The player’s best result | Cards, match-3, score chasers |
| Time Trial | Unlimited sessions within the window on one entry fee; fixed content, no seed. | The player’s best result | Racing, speedruns, fixed courses |

## 6.2 Player flow

1. **Browse.** Play & Compare contests appear as cards with the format badge, the time to close, the game mode, the entry fee, the live reward pool with its guaranteed minimum, the minimum-players threshold and the live season pool. Parallel configurations of the same title (fee tiers, durations) appear as separate cards.
2. **Join.** Joining escrows the entry fee and moves the contest to the Lobby, where the card shows “Play” in place of “Join”. Entries close a configured number of minutes before the end time, so that every entrant has a playable window.
3. **Enter game.** The contest page shows the countdown, the completion deadline, the live leaderboard with every participant linked to their profile and the player’s own position pinned, and the “Enter game” button, which opens the game on the session with the contest seed applied. Under Rebuy and Time Trial, “Play again” relaunches the session and the page shows the attempts counter.
4. **Live leaderboard.** Scores are public during the contest and move as the game transmits results; in the multi-attempt models each improvement of a player’s best result updates the leaderboard.
5. **Close and settlement.** At the end time the game transmits the final result set – one best result per player. The smart contract ranks the scores, applies the reward table to the effective pool and distributes the rewards. A player who joined but did not complete a session is ranked last. If the minimum number of participants is not reached, the instance is voided and every entry fee is refunded automatically.
6. **Results.** The settled instance appears in the results history with its final leaderboard, the player’s outcome and reward, the season points earned and the updated season rank; “Join the next contest” leads into the successor instance already open.

## 6.3 Seasons and the Season Final

The instances of a configuration are grouped into four-week seasons. A season deduction from each instance’s reward pool feeds a season pool, visible live on the cards and on the season leaderboard ([3.4](./03-the-arena-finding-and-following-contests.md#34-season-leaderboards)); each settled instance awards season points by placement, weighted by field size, with only each player’s best results per week counted so that the leaderboard measures quality rather than available time. At season end the top players qualify for the Season Final – a free-entry contest, reserved to the qualifiers and verifiable on-chain, whose reward pool is the accumulated season pool, optionally topped up by the VGP. The next season starts immediately.
