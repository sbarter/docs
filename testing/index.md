# Testing & Releases

This is the initial **integration conformance checklist** for a Video Game Studio. It identifies the scenarios to exercise; it does not imply that Sbarter has already published a formal automated certification or production sign-off service.

## Before testing

- [ ] Your studio and game identifiers are registered for the target non-production environment.
- [ ] You have working OAuth client credentials and can obtain a scoped bearer token.
- [ ] Sbarter has the agreed Game Studio API base URL and a valid studio-generated `X-API-Key`.
- [ ] All endpoints use HTTPS and expose meaningful non-sensitive error responses.
- [ ] Test players and the required game-side accounts are available.

## Suggested conformance scenarios

| Scenario | Expected evidence |
| --- | --- |
| Game-first account linking | Generate the deep link, complete binding and confirm linking status |
| Sbarter-initiated linking | Process the in-game request and return the decision to the supplied callback |
| Binding conflicts and expired links | Reject safely without binding the wrong identities |
| Player profile retrieval | Return the agreed authenticated player's identifier and fields |
| Session registration | Register the players once, using Sbarter's `sessionId` |
| Duplicate registration | Same logical request does not create another session |
| Successful game-server result | Submit to Sbarter's callback and correlate the correct session |
| Duplicate or conflicting result | Demonstrate documented handling without double settlement |
| Missing or late result | Verify the outcome against an explicitly agreed missing-result policy |
| Failure and recovery | Exercise connectivity loss, token expiry, invalid API key and retry recovery |
| Game return link | Validate launch, expiry and fallback behaviour **when that capability is available** |

## Evidence to retain

Keep test scenario IDs, anonymised correlation identifiers, the environment, timestamps and a pass/fail record. Never include raw secrets in conformance evidence.

## Go-live decision

Sbarter and the studio should review the conformance record, resolve contract ambiguities, agree support responsibilities and confirm production configuration before rollout. **Production approval, credential availability and supported territories require explicit confirmation**, rather than being assumed from a successful staging test.

Refer to [Security & Operations](../operations/index.md), [Quick Start](../getting-started/quickstart.md) and [Integration Status & Open Decisions](../operations/integration-status.md).
