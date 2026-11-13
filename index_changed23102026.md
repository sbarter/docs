# Sbarter Developer Hub

Integrate your video game with Sbarter's skill-based competition platform. This hub explains how a game studio links player accounts, registers game sessions and supplies authoritative contest results while Sbarter manages the competition experience.

## Choose where to start

### [Getting Started](./getting-started/introduction.md)
Learn the integration model, required credentials and the minimum steps for your first connection.

### [Integration Guides](./guides/index.md)
Follow end-to-end player journeys, including account linking, 1v1 challenges, tournaments and result handling. Availability of individual capabilities is identified in each guide.


## [API Reference](/api/)

Explore the authoritative OpenAPI specifications
for both integration interfaces:

- **Sbarter API:** Endpoints hosted by Sbarter
  and called by game studios.
- **Game Studio API:** Endpoints implemented by
  game studios and called by Sbarter.

### [Security & Operations](./operations/index.md)
Understand authentication, permissions, error handling, retries and idempotency.

### [Testing & Releases](./testing/index.md)
Find integration testing guidance, versioning information and the development roadmap.

## Integration at a glance

1. **Connect accounts.** Associate a Sbarter player with a stable game-studio player identifier using one of the supported linking flows.
2. **Create game sessions.** Once two eligible, linked players have been matched by Sbarter, Sbarter registers the session with the game studio.
3. **Report results.** The game studio posts the contest outcome to the callback supplied by Sbarter when the session was registered.

Sbarter handles challenge and tournament participation, competition rules and financial settlement. The game studio remains responsible for its game accounts, gameplay and game-server results.

> **API availability:** The published OpenAPI specifications are the source of truth for released HTTP operations. Features described in journey diagrams but not included in the published specification must be explicitly marked as **Under Development** until verified and released.
