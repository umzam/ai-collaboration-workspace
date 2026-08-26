---
name: prototype-to-prd
description: Convert an already substantially defined product prototype into a company-format, engineering-ready PRD by identifying specification gaps, resolving only those covered by confirmed rules, escalating genuine product decisions to the PM, reviewing prototype-to-PRD consistency and closed loops, and fixing the artifacts. Use when a prototype exists and the task is Prototype → Gap Analysis → PRD → Review → Fix → Final Verification; do not use for zero-to-one brainstorming or broad product redesign.
---

# Prototype to PRD

Turn a substantially confirmed prototype into a complete PRD without inventing product decisions. Treat the prototype as evidence, not as a complete specification.

## Load references

- Read [company-prd-standard.md](references/company-prd-standard.md) before drafting or restructuring the PRD.
- Read [platform-rules.md](references/platform-rules.md) when the prototype belongs to the current data-processing platform. Apply only rules whose scope clearly matches the feature.
- Read [review-checklist.md](references/review-checklist.md) during gap analysis and again for the final review.

If a supplied approved template conflicts with the default company structure, follow the approved template without omitting information required for implementation.

## Decision discipline

**S-18 — Do not generalize historical answers.** Retain only reusable decision methods, trigger conditions, and behavioral invariants. Keep historical project answers in project-specific rules, and leave concrete technical mechanisms to technical design unless a confirmed mechanism changes product behavior.

## Workflow

### 1. Read Prototype

Inspect every relevant page, state, annotation, and interaction. Record the observable contract: entry and exit points, roles, fields, buttons, dialogs, visible and disabled states, transitions, data shown, and demonstrated success or failure paths.

Distinguish current behavior from demo data, stale alternatives, and hidden or obsolete prototype remnants. Report conflicting evidence instead of choosing silently.

**S-01 — Maintain an evidence applicability ledger.** For every conclusion that affects a field, action, state, rule, or priority decision, record:

`evidence source → time/version → scope → affected field/action/state/rule → conclusion status`

Use evidence in priority decisions only when its time/version and scope are confirmed. Treat unverified timing, conflicting evidence, and unclear scope as unresolved.

### 2. Perform Specification Gap Analysis

Trace each meaningful action through:

`precondition → user action → system response → data change → state change → feedback → recovery → destination`

**S-04 — Assign every surfaced issue.** Classify every issue already present in the input, prototype, annotations, or conflicting evidence as one of:

- In scope and already expressed by the prototype; expand it in the PRD.
- Covered uniquely by an applicable confirmed rule.
- A PRD-only wording, structure, or consistency defect.
- Pending confirmation or conflict resolution.
- Out of scope; record only the boundary without designing a solution.
- Routed to data, technical, security, or another responsible capability.
- A demonstration or obsolete remnant that must not enter the PRD.

Do not let a surfaced issue disappear merely because it is not implemented in the PRD. Do not convert assumptions into requirements.

### 3. Use a Human Gate When Necessary

Continue with independently determined work, but pause the affected decision. Ask concise, decision-oriented questions that state the gap, available evidence, viable options, and impact on the prototype and PRD.

Do not modify only the PRD when the missing closed loop requires a new or changed user-visible prototype behavior. Obtain PM confirmation, then update both artifacts.

**S-02 — Determine product semantics before routing implementation.** Process every unresolved issue in this order:

1. **Test product meaning first.** Mark an issue as product semantics when different answers change what users see or can do, when they can act, the resulting business state, their failure and recovery experience, role or permission capabilities, or the definition of product success. Fields, versions, configuration, retry, locks, storage, or other technical terms do not override this test.
2. **Test whether product meaning is already unique.** Use the S-01 evidence discipline and applicable platform rules. Apply confirmed meaning directly when evidence or a platform rule uniquely determines the object, trigger time, prerequisite state, data effect, and user-visible result, with no applicable contrary evidence. If only part is determined, adopt that part and retain only the smallest unresolved product difference.
3. **Choose Human Gate timing.** Ask now only when unresolved product meaning is on the current decision frontier and blocks in-scope behavior or acceptance. Keep upstream-dependent meaning as `product semantics pending an upstream decision`; keep deferrable meaning product-owned and marked deferred.
4. **Split mixed issues.** Separate user-visible result, business state, permission, responsibility, failure experience, and success criteria from field representation or implementation mechanism. Never route the whole issue to the PM or the whole issue to data or technical review.
5. **Route implementation after meaning.** Send authoritative field definitions, types, keys, enum codes, references, and schemas to data rules or data review. Send interfaces, storage, locks, concurrency, idempotency, scheduling, retry mechanisms, performance, and capacity to technical review; send security mechanisms to security review. If a constraint cannot satisfy confirmed product meaning, return only the resulting user-visible tradeoff to the PM.
6. **Use conservative ownership when unclear.** Mark the issue `needs product confirmation whether this is product semantics`. Ask a minimal Gate only if it is on the current decision frontier; otherwise retain it as pending product semantics. Do not pass implementation details to the PM.

**S-03 — Ask the smallest root question first.** Order unresolved decisions by dependency:

`scope and primary model → object and data meaning → state and permission → exception and field detail`

When mutually exclusive approaches remain open, ask only the root question that closes the branch and expand dependent questions conditionally. Keep one independent product decision per question. Label it as `blocks PRD/prototype`, `must resolve before development`, or `can be deferred`.

Deferring a dependent question changes when it is asked, not who owns it. Preserve unresolved downstream product meaning as product-owned rather than reclassifying it as data or technical work.

### 4. Write the PRD

Use the current approved company format first. Otherwise use the default structure in [company-prd-standard.md](references/company-prd-standard.md).

Write only confirmed behavior. Make fields, enums, states, permissions, data sources, triggers, button conditions, failure behavior, and outcomes explicit where relevant. Mark unresolved items as pending decisions rather than selecting a default.

### 5. Review

Apply all three lenses in [review-checklist.md](references/review-checklist.md):

1. Prototype ↔ PRD Consistency
2. Product / Exception Closed Loop
3. Engineering Readiness

Review in both directions: Prototype → PRD and PRD → Prototype.

### 6. Fix

Fix PRD-only omissions, terminology, structure, and rule-backed details directly. Remove stale or contradicted content.

If a finding changes business behavior, state behavior, recovery, permissions, irreversible data handling, or visible prototype behavior, use the Human Gate before changing the prototype and PRD together.

### 7. Perform Final Verification

Repeat the three reviews after all fixes. Confirm that:

- Every valid prototype behavior is specified.
- Every user-visible PRD behavior exists in the prototype.
- Normal, exceptional, transition, and boundary paths close.
- No unresolved decision is presented as confirmed.
- No obsolete option remains in either artifact.
- Engineering can implement and test the requirement without selecting among multiple interpretations.

## Human Gate rules

### Fix automatically

- Correct obvious copy, terminology, naming, and formatting inconsistencies.
- Add PRD content already unambiguously expressed by the prototype.
- Apply a confirmed platform rule only when it passes the S-02 uniqueness test and does not require new visible prototype behavior.
- Fix document structure and company-format issues.
- Flag conflicts and missing decisions without resolving them.

### Ask the PM

Ask only for product meaning that is not uniquely determined by confirmed evidence or an applicable platform rule and is on the current S-03 decision frontier. Preserve dependent or deferrable product meaning without expanding it into the current Gate.

- Add or change a business rule.
- Add or change state behavior or a state transition.
- Add an exception recovery strategy.
- Change permissions, roles, entry points, or responsibility boundaries.
- Choose the user-visible guard, consequence, or success contract for an irreversible or potentially destructive operation.
- Choose among multiple reasonable designs when confirmed rules do not determine one.
- Change prototype behavior to make an exception or product flow close.
- Resolve a product-decision conflict among the prototype, confirmed scope, and approved platform rules.

Never invent product rules for the sake of completeness.
