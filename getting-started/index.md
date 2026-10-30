# Getting Started

Integrating a video game with Sbarter involves **two API directions**: your backend calls the [Sbarter API](/server), while Sbarter calls the [Game Studio API](/client) hosted by your team.

## Recommended reading order

1. [Introduction](./introduction.md): Understand the player experience and the integration scope.
2. [Integration Model](./architecture.md): Identify which party owns each part of the lifecycle.
3. [Environments & Credentials](./authentication.md): Obtain Studio Web Portal access, generate OAuth credentials and secure the API-to-API connection.
4. [Quick Start](./quickstart.md): Follow the implementation and validation steps.

## Integration at a glance

| Stage | Your next action | Further information |
| --- | --- | --- |
| 1. Onboard | Arrange Studio Web Portal access, game registration and API connectivity | [Environments & Credentials](./authentication.md) |
| 2. Provide entry points | Add game-to-Sbarter entry points and linking deep links | [Notifications & Deep Linking](../guides/notifications.md) |
| 3. Link accounts | Bind the correct player identities | [Account Linking](../guides/account-linking.md) |
| 4. Register sessions | Implement the Sbarter-initiated session call | [1v1 Integration](../guides/one-v-one.md) |
| 5. Return to the game | Plan the game launch/return handler; final contract remains to be agreed | [Notifications & Deep Linking](../guides/notifications.md) |
| 6. Report a result | Submit the server-authoritative session result | [Game Results & Reconciliation](../guides/game-results.md) |
| 7. Test and release | Validate interoperability before any production rollout | [Testing & Releases](../testing/index.md) |

> **Implementation status:** The published OpenAPI reference defines specific account-linking, profile, session-registration and result operations. Not every step above has an available API contract yet. See [Integration Status & Open Decisions](../operations/integration-status.md).
