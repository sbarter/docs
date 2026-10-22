# Sbarter Developer Hub

Integrate your video game with Sbarter's skill-based competition platform. This hub explains how a game studio links player accounts, registers game sessions and supplies authoritative match results while Sbarter manages the competition experience.

## Choose where to start

### [Getting Started](./getting-started/introduction.md)
Learn the integration model, required credentials and the minimum steps for your first connection.

### [Integration Guides](./guides/index.md)
Follow end-to-end player journeys, including account linking, 1v1 challenges, tournaments and result handling. Availability of individual capabilities is identified in each guide.

### API Reference
Use the **API Reference** section in the navigation for the authoritative request and response schemas:

- **Sbarter API:** endpoints hosted by Sbarter and called by the game studio, including linking, linking status and match-result submission (`server.yaml`).
- **Game Studio API:** endpoints the game studio implements and Sbarter calls, including in-app linking confirmation, profile retrieval and session registration (`client.yaml`).

### [Security & Operations](./operations/index.md)
Understand authentication, permissions, error handling, retries and idempotency.

### [Testing & Releases](./testing/index.md)
Find integration testing guidance, versioning information and the development roadmap.

## Integration at a glance

1. **Connect accounts.** Associate a Sbarter player with a stable game-studio player identifier using one of the supported linking flows.
2. **Create game sessions.** Once two eligible, linked players have been matched by Sbarter, Sbarter registers the session with the game studio.
3. **Report results.** The game studio posts the match outcome to the callback supplied by Sbarter when the session was registered.

Sbarter handles challenge and tournament participation, competition rules and financial settlement. The game studio remains responsible for its game accounts, gameplay and game-server results.

> **API availability:** The published OpenAPI specifications are the source of truth for released HTTP operations. Features described in journey diagrams but not included in the published specification must be explicitly marked as **Under Development** until verified and released.
