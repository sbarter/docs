---
navigation:
  actions:
    hide: true

markdown:
  toc:
    hide: true
  lastUpdatedBlock:
    hide: true
---
<div class="sbarter-hero">

  <div class="sbarter-hero__inner">

    <div class="sbarter-hero__media">
      <img
        src="./images/Phone-new.png"
        alt="Sbarter mobile application"
      />
    </div>

    <div class="sbarter-hero__content">
      <div class="sbarter-hero__eyebrow">
        Sbarter for Developers
      </div>

      <h1>
        Build skill-based competition into your game
      </h1>

      <p class="sbarter-hero__lead">
        Integrate your video game with Sbarter's
        skill-based competition platform.
        Link player accounts, register game sessions
        and submit authoritative match results,
        while Sbarter manages the competition experience.
      </p>

      <div class="sbarter-hero__actions">
        <a class="sbarter-btn sbarter-btn--primary"
           href="/getting-started/introduction/">
          Get Started
        </a>

        <a class="sbarter-btn sbarter-btn--secondary"
           href="/guides/">
          Integration Guides
        </a>
      </div>
    </div>
  </div>
</div>
Connect your video game to Sbarter so players can link their game accounts, enter skill-based challenges and tournaments, play in your game, and receive competition results and payouts through Sbarter.


**Your studio runs the game. Sbarter manages the competition experience.**

{% cards %}
  {% card title="Start integrating" to="./getting-started/introduction.md" %}
    Understand the integration model, prerequisites and the steps to establish your first connection.

    **Read Getting Started →**
  {% /card %}
  {% card title="Explore integration journeys" to="./guides/index.md" %}
    Follow player account linking, 1v1 challenges, tournaments, match results, notifications and deep links.

    **Browse integration guides →**
  {% /card %}
  {% card title="Explore the API reference" to="./api/index.md" %}
    Find the request and response contracts for both Sbarter-hosted and studio-hosted interfaces.

    **Open API Reference →**
  {% /card %}
{% /cards %}

## How the integration works

Sbarter handles the competition lifecycle while your game remains the authoritative source for gameplay and game-server match results.

| Stage | Sbarter | Video Game Studio |
| --- | --- | --- |
| **1. Link accounts** | Connects a Sbarter player to a game account | Identifies and validates the game account |
| **2. Enter competitions** | Manages eligibility, challenges, tournaments and wager or entry-fee handling | Supplies relevant player and game information |
| **3. Prepare matches** | Determines the opponents and requests a session | Registers or provisions the game session |
| **4. Play and report** | Coordinates competition status and evaluates outcomes | Runs gameplay and supplies authoritative results |
| **5. Complete the contest** | Applies competition rules and settles outcomes | Supports agreed exception-handling and reconciliation mechanisms |

[See the integration architecture →](./getting-started/architecture.md)

## Your first integration

Follow this sequence to get from technical onboarding to a first end-to-end test.

1. **Understand the integration model.** Review system responsibilities and the communication direction of each API. [Integration Architecture →](./getting-started/architecture.md)
2. **Set up authentication.** Obtain the relevant credentials and understand how requests are authenticated. [Authentication & Credentials →](./getting-started/authentication.md)
3. **Implement account linking.** Associate the player's Sbarter identity with the correct Video Game account. [Account Linking →](./guides/account-linking.md)
4. **Register and complete a game session.** Use the published session and result contracts as the technical reference. [Quick Start →](./getting-started/quickstart.md)

## Two APIs, two responsibilities

{% cards %}
  {% card title="Sbarter API" to="./server.yaml" %}
    **Hosted by Sbarter · Called by the Video Game Studio**

    Includes account-linking operations and match-result submission. View the published endpoint definitions, authentication and payload schemas.

    **View Sbarter API →**
  {% /card %}
  {% card title="Game Studio API" to="./client.yaml" %}
    **Hosted by the Video Game Studio · Called by Sbarter**

    Includes in-game linking validation, player profile retrieval and session registration. These are the endpoints your studio implements.

    **View Game Studio API →**
  {% /card %}
{% /cards %}

## Design for real player journeys

The technical contracts fit into an end-to-end experience. Use the guides to understand what happens before, during and after a match, including cases where a result is missing or a player does not participate.

{% cards %}
  {% card title="Account linking" to="./guides/account-linking.md" %}
    See both the game-first and Sbarter-first account-binding journeys.
  {% /card %}
  {% card title="1v1 challenges" to="./guides/one-v-one.md" %}
    Understand acceptance, match preparation, game launch and settlement.
  {% /card %}
  {% card title="Tournaments" to="./guides/tournaments.md" %}
    Follow registration, brackets, individual rounds and prize distribution.
  {% /card %}
  {% card title="Results and recovery" to="./guides/game-results.md" %}
    Learn about authoritative results, incomplete sessions and exceptional outcomes.
  {% /card %}
{% /cards %}


## Build and operate reliably

Review [Security & Operations](./operations/index.md) for authentication, request handling and operational considerations. Before release, use [Testing & Releases](./testing/index.md) to plan integration validation and rollout.
