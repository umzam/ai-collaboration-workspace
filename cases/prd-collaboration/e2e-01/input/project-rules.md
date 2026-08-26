# Confirmed Rules — Synthetic Reconstruction

1. The workspace operator may create, inspect, retry, apply, discard, and run enrichment jobs again.
2. Participation by the separate reviewer role is unresolved and must not be inferred.
3. A job is bound to the selected target dataset and preserves its source selection.
4. Candidate output is separate from formal data until a human applies it.
5. Append fills only `''` or `null`; `—` is a valid retained value.
6. An empty AI result is treated as an AI failure; the formal dataset remains unchanged.
7. Write failure preserves candidate output and allows write-only retry.
8. Applied and Discarded are terminal states: view and Run Again remain available; Apply and Discard do not.
9. Confirmation requires selected source content, an applicable enabled prompt, and an applicable enabled model.
10. Prompt list status is Enabled or Disabled. Draft is an edit-process state only.
11. Unconfirmed processing scenarios are outside the current increment.

These rules are fictional and exist only to validate orchestration, Human Gate, revision, and targeted re-review behavior.
