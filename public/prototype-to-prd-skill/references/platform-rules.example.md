# Confirmed Platform Rules — Example Template

This file defines how to record reusable platform rules. It intentionally contains no actual platform behavior or business rule.

Only add a rule after its owner, evidence, effective version, and scope are confirmed. A convention, historical answer, or implementation habit is not automatically a platform rule.

## Rule Record

Copy this block for each confirmed rule:

### `[Rule ID] — [Rule name]`

| Attribute | Confirmed value |
| --- | --- |
| Rule statement | `[precise, testable behavior]` |
| Product meaning | `[what users see/can do and resulting business state]` |
| Applies to | `[objects, surfaces, roles, actions, states]` |
| Does not apply to | `[explicit exclusions]` |
| Trigger and prerequisites | `[when the rule activates]` |
| Data effect | `[create/update/delete/no change, stated without implementation assumptions]` |
| User-visible result | `[feedback, destination, and resulting state]` |
| Failure/recovery contract | `[confirmed behavior or explicit unknown]` |
| Owner | `[responsible role or team]` |
| Evidence | `[approved source]` |
| Effective version/date | `[version or date]` |
| Conflicts or overrides | `[precedence rule]` |
| Verification status | `[confirmed/pending/deprecated]` |

## Suggested Categories

Use categories only when the platform actually has confirmed rules for them:

- navigation and shared UI behavior;
- permissions and role capabilities;
- state and lifecycle semantics;
- data provenance and version behavior;
- background or asynchronous work;
- failure, retry, cancellation, and restoration;
- destructive actions and confirmation;
- cross-surface consistency;
- completion and success criteria.

## Applicability Test

Before applying a recorded rule, confirm that it uniquely matches:

1. the same object and operation;
2. the same actor or role scope;
3. the same prerequisite state and trigger time;
4. the same data effect;
5. the same user-visible result;
6. the current effective version, with no applicable contrary evidence.

If only part matches, use only the confirmed part and retain the smallest unresolved product difference for the Human Gate.
