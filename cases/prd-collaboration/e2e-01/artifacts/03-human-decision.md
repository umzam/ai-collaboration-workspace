# Human Decision

## HG-001

- Decision: the separate reviewer role is outside the current AI enrichment increment.
- Scope handling: classify reviewer participation as `Out of Scope`, not as an unresolved permission design.
- PRD impact: remove the pending reviewer permission row and record the scope boundary.
- Prototype impact: none; do not add a reviewer perspective.
- Rejected handling: do not choose unsupported, read-only, or operational permissions on the user's behalf.
- Re-entry condition: reopen the decision only if the reviewer role is explicitly added to a later feature scope.

## Review boundary confirmed

The existence of a platform role, state, or module does not require the current increment to define it. It becomes a Finding or Human Gate only when it directly affects current implementation or acceptance.

This synthetic record preserves the Human Decision behavior without reproducing any real role model.
