---
name: prototype-to-prd
description: Convert an already substantially defined product prototype into an engineering-ready PRD by identifying specification gaps, applying only confirmed applicable rules, escalating genuine product decisions to the product manager, and reviewing consistency, exception closure, and implementation readiness. Use for Prototype → Gap Analysis → PRD → Review → Fix → Final Verification; do not use for zero-to-one brainstorming or broad product redesign.
---

# Prototype to PRD

Turn a substantially confirmed prototype into a complete PRD without inventing product decisions. Treat the prototype as evidence, not as a complete specification.

## Load references

- Read the supplied approved PRD template or organizational standard before drafting. If none is supplied, use [company-prd-standard.example.md](references/company-prd-standard.example.md) only as a structural prompt.
- Read supplied confirmed platform rules when they may cover a gap. Use [platform-rules.example.md](references/platform-rules.example.md) only to structure those rules; it contains no default product behavior.
- Read [review-checklist.md](references/review-checklist.md) during gap analysis and final review.

Never treat an example, historical answer, or unverified convention as a confirmed rule.

## Workflow

### 1. Read Prototype

Inspect every relevant page, state, annotation, and interaction. Record entry and exit points, roles, fields, controls, visible and disabled states, transitions, data shown, and demonstrated success or failure paths.

For each conclusion that affects a field, action, state, or rule, record:

`evidence source → time/version → scope → affected specification → confirmed, conflicting, or unresolved`

Do not silently choose between conflicting evidence, obsolete alternatives, demo data, or hidden remnants.

### 2. Analyze Specification Gaps

Trace each meaningful action through:

`precondition → action → system response → data change → state change → feedback → recovery → destination`

Check only dimensions credible for the feature:

- states and state ownership;
- fields, defaults, validation, null behavior, and editability;
- enums and option sources;
- triggers, guards, and state transitions;
- button visibility, enablement, repeated use, and post-action state;
- roles, permissions, and responsibility boundaries;
- data source, snapshot/version, write target, and history impact;
- empty, loading, unavailable, failure, retry, cancel, close, and back behavior;
- duplicate submission, concurrency, stale views, zero/one/many cases, and other evidenced boundaries.

Assign every surfaced issue to one disposition: already expressed by the prototype, covered uniquely by a confirmed rule, PRD-only defect, pending product decision, conflicting evidence, out of scope, routed specialist concern, or obsolete/demo remnant. Do not let an issue disappear and do not convert assumptions into requirements.

### 3. Route Responsibility and Use the Human Gate

Route unresolved issues in this order:

1. **Identify product semantics.** Treat an issue as product meaning when different answers change user-visible behavior, action conditions, business state, failure or recovery experience, permissions, role capabilities, or the definition of success.
2. **Apply confirmed meaning when unique.** Use current evidence or an applicable confirmed platform rule only when its object, trigger, prerequisite, data effect, and user-visible result uniquely match, with no contrary evidence.
3. **Ask only at the decision frontier.** If unresolved product meaning blocks the current scope or acceptance, ask the product manager. Keep upstream-dependent questions conditional and defer non-blocking questions without changing their owner.
4. **Split mixed issues.** Separate product meaning from data definition and implementation mechanism. Never route the entire mixed issue to the product manager or to engineering.
5. **Route implementation after meaning.** Route authoritative field definitions, types, keys, enum codes, references, and schemas to data review. Route interfaces, storage, locks, concurrency, idempotency, scheduling, retry mechanisms, performance, and capacity to technical review. Route security mechanisms to security review. Return to the product manager only when a constraint changes the confirmed product promise.

Ask the smallest root question first. Order decisions by dependency:

`scope and primary model → object and data meaning → state and permission → exception and field detail`

Each question must state the gap, confirmed evidence, viable options, impact, and whether it blocks the prototype/PRD, must resolve before development, or can be deferred.

Do not change only the PRD when closure requires new user-visible prototype behavior. Obtain confirmation, then update both artifacts.

### 4. Write the PRD

Follow the approved organizational format first. If none exists, default each function to:

`functional description → elements/interactions → business rules`

Add permissions, preconditions, postconditions, flows, states, exceptions, fields/enums, and acceptance criteria when complexity requires them. A short template never permits omission of information required for unique implementation.

Write confirmed behavior only. Mark unresolved decisions explicitly.

### 5. Review

Apply all three lenses in [review-checklist.md](references/review-checklist.md):

1. Prototype ↔ PRD Consistency
2. Product / Exception Closed Loop
3. Engineering Readiness

Review in both directions: Prototype → PRD and PRD → Prototype.

### 6. Fix

Fix PRD-only omissions, terminology, structure, and uniquely rule-backed details directly. Remove stale or contradicted content.

If a finding changes business behavior, state behavior, recovery, permissions, irreversible data handling, or visible prototype behavior, use the Human Gate before updating the prototype and PRD together.

### 7. Final Verification

Repeat all three reviews. Confirm that every valid prototype behavior is specified, every user-visible PRD behavior exists in the prototype, normal and exceptional paths close, unresolved decisions remain explicit, and engineers can implement and test without choosing among reasonable product interpretations.

## Human Gate Rules

### Handle automatically

- Correct obvious copy, terminology, naming, formatting, and structure problems.
- Add PRD content already unambiguously expressed by the prototype.
- Apply a confirmed rule only when its applicability uniquely determines the answer and it requires no new visible behavior.
- Flag conflicts and missing decisions without resolving them.

### Ask the product manager

Ask only when product meaning is not uniquely determined and is on the current decision frontier:

- add or change a business rule;
- add or change state behavior or a transition;
- add an exception recovery strategy;
- change permissions, roles, entry points, or responsibility boundaries;
- choose the user-visible consequence or success contract for an irreversible operation;
- choose among multiple reasonable product designs;
- change prototype behavior to close a flow or exception;
- resolve conflicting product evidence.

Never invent product rules for the sake of completeness.
