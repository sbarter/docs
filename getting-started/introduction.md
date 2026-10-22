# Introduction

Sbarter enables eligible players to participate in skill-based challenges and tournaments using games they already play. The game studio integrates its existing game with Sbarter rather than implementing the competition, registration or financial-settlement experience itself.

## What your integration does

The published Level 3 integration contract covers three core functions:

1. **Account linking:** establish an association between a player's Sbarter identity and their stable game-studio account identifier.
2. **Session registration:** accept a game-session registration request from Sbarter for two linked players.
3. **Match results:** deliver the authoritative game result to Sbarter using the callback URL provided during session registration.

The integration also supports retrieval of the game studio's current player profile snapshot, which may contain game-specific statistics in `profileStats`.

## Responsibilities

| Sbarter | Game studio |
| --- | --- |
| Player experience for challenges and tournaments | Game-account identification and authentication |
| Competition participation and eligibility decisions | Game session registration and execution |
| Competition results interpretation and financial settlement | Authoritative gameplay data and match outcomes |
| Sbarter account linking and token issuance | In-game linking confirmation when used |

## Two API directions

**Sbarter API:** hosted by Sbarter; called by the game studio. Refer to `server.yaml` under **API Reference**.

**Game Studio API:** implemented and hosted by the game studio; called by Sbarter. Refer to `client.yaml` under **API Reference**.

## Continue

- [Integration Architecture](./architecture.md)
- [Quick Start](./quickstart.md)
- [Authentication & Credentials](./authentication.md)
