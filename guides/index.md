# Integration Overview

This section explains how a video game publisher connects its game services to Sbarter so players can link accounts, enter skill-based competitions, play contests in the publisher's game and receive results and rewards through Sbarter.

Sbarter owns the competition experience for skill-based contests with real stakes. The VGP owns the game, the game accounts and the authoritative game-server data. Players find, create, accept and join challenges or tournaments in the Sbarter app, including when they arrive through a link displayed inside the game.

## Integration Architecture

Sbarter provides the competition infrastructure while the Video Game Studio remains responsible for gameplay and authoritative game results.

The integration supports account linking initiated from either the Video Game or the Sbarter app.

![Sbarter Integration Architecture](./images/Sbarter_Integration_Architecture.png)

The diagram illustrates the main interactions between players, Sbarter and the Video Game Studio, from account linking through contests settlement.

For more technical details, see the
[Integration Architecture](/getting-started/architecture/).

## Integration lifecycle

| Stage | Player-facing experience | Sbarter responsibility | Publisher responsibility |
| --- | --- | --- | --- |
| 1. Account linking | Connect game identity with Sbarter identity | Registration, eligibility and binding | Identify the authenticated game account; participate in approved binding flow |
| 2. Discover and join | Browse and enter a 1v1 challenge or tournament | Discovery, rules, eligibility, stake and registration | Provide relevant game identity / skill data; optionally link from in-game UI |
| 3. Prepare the contest | Receive a contest-ready action | Pair participants, hold funds, create session request | Register / provision a game session for the identified players |
| 4. Play the contest | Open the publisher's game and play | Coordinate competition window and status | Run gameplay; record contest activity and authoritative result |
| 5. Determine outcome | View result and reward | Validate result, apply contest rules, settle | Submit contest result; support agreed recovery information if missing |

The published OpenAPI contracts currently specify the account-linking, player-profile, session-registration and contest-result interfaces. Certain interactions shown in the proposed Video Game integration journeys require additional contracts as they depend on publisher decisions. These are identified as **Under Development** below.

## API ownership and direction

| Operation | Direction | Published endpoint |
| --- | --- | --- |
| Generate a linking deep link | Publisher → Sbarter | `POST /v1/linking/deeplink/generate` |
| Check linking status | Publisher → Sbarter | `POST /v1/linking/status` |
| Request user linking confirmation | Sbarter → Publisher | `POST /v1/sbarter/gamer/validate/in-app` |
| Complete a linking decision | Publisher → Sbarter | `POST /v1/linking/in-app/{requestId}` |
| Retrieve game-player profile | Sbarter → Publisher | `POST /v1/sbarter/gamer/profile` |
| Register a game session | Sbarter → Publisher | `POST /v1/session` |
| Submit contest result | Publisher → Sbarter | `POST /v1/webhooks/game-studio/match-result` |

See **API Reference → Sbarter API** and **API Reference → Game Studio API** for the authoritative schemas, parameters, authentication and response definitions.

## Responsibility boundaries

**Sbarter controls:** player registration and identity verification; challenges, tournament brackets; stakes and reward-pool escrow.

**The publisher controls:** game-account identity, authentication in its game, playable contest implementation, fair matchmaking, ratings, dispute resolution, gameplay and trusted game-server contest results. Publishers may surface Sbarter links and messages inside their games, without recreating Sbarter's competition management functions.

## Integration Guides

- **[Account Linking](./account-linking/):** Two generic onboarding journeys, published API mapping, conflict handling and open decisions.
- **1v1 Challenge Integration (planned):** Challenge creation, acceptance, contest creation, play, results and settlement.
- **Tournament Integration (planned):** Registration, brackets, rounds, game launch and reward handling.
- **Game Results & Reconciliation (planned):** Server-authoritative results, missing-result paths and recovery rules.
- **Notifications & Deep Linking (planned):** In-game messages and one-tap journeys between the app and game.

## Integration status and assumptions

| Area | Current documentation status |
| --- | --- |
| Published API operations in the table above | **Published contract**. Consult the OpenAPI reference before implementation. |
| Direct launch into an existing publisher contest | **Under Development**. Proposed journey depends on publisher support. |
| Publisher in-game invitation / contest-ready notifications | **Under Development**. Requires agreed notification contract. |
| Publisher account discovery from a Sbarter-first user | **Under Development**. Published in-app validation needs an already-known game-account identifier. |
| Player presence or login-window evidence for missing results | **Under Development**. Requires publisher confirmation and an agreed interface. |
| Reconciliation lookup if a result callback never arrives | **Under Development**. Requires a published recovery interface. |

> **Source and scope:** These guides map the account-onboarding and competition journey design flows to the currently published API contracts. The flows contain agreed product intentions, assumptions and items awaiting Video Game Studio confirmation. An item appearing in a flow does not imply that its API has already been implemented.

**Next:** [Account Linking](./account-linking/).
