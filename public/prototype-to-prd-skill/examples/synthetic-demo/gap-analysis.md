# SproutCircle — Specification Gap Analysis

> Fictional analysis for demonstration only.

## Observable Contract

| Topic | Confirmed evidence |
| --- | --- |
| Entry | Signed-in household member opens Today |
| Eligible state | Plant card shows `Due today` |
| Action | Select `Mark watered` |
| Loading | Button is disabled and shows `Saving…` |
| Success | Status becomes `Watered today`; time and actor are displayed |
| Repeat on current screen | Action is no longer visible after success |
| Failure convention | `DEMO-UI-01` requires retained data, inline failure, and Retry |

## Gap Routing

| ID | Gap | Why it matters | Route | Disposition |
| --- | --- | --- | --- | --- |
| G-01 | Is watering shared per plant or personal per member? | Changes data meaning, what other members see, and success semantics | Product | Human Gate root question |
| G-02 | Can an accidental mark be undone? | Adds recovery behavior, a transition, and permissions | Product | Ask conditionally after G-01 |
| G-03 | What happens on service failure? | Required exception closure | Confirmed demo rule | Apply `DEMO-UI-01`; do not ask PM |
| G-04 | What should an already-open page show after another member waters? | User-visible state consistency depends on G-01 | Product + technical | Confirm product refresh expectation; route transport mechanism to technical review |
| G-05 | Which identifier, API, lock, and storage model are used? | Required for implementation, but does not decide product meaning | Data/technical | Route after G-01; do not ask PM for mechanisms |

## Root-Question Ordering

G-01 comes first because it determines the meaning of success, visibility across members, repeated actions, and the scope of any undo. G-02 and the product portion of G-04 are expanded only after G-01 is answered.

## Automatically Resolved Content

- Loading behavior is already explicit in the prototype.
- Failure retention, message location, and Retry are uniquely determined by the supplied fictional rule.
- Terminology can be normalized to `Due today` and `Watered today` without a product decision.

## Not Automatically Resolved

The Skill must not assume that a shared page implies a shared business record, or invent an undo action simply because it would improve recovery.
