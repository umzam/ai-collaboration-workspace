# Review Checklist

Use the same three lenses during initial gap analysis and after every fix. Apply only checks relevant to the feature.

## 1. Prototype ↔ PRD Consistency

- Compare in both directions: Prototype → PRD and PRD → Prototype.
- Match pages, entry and exit paths, steps, titles, fields, buttons, table columns, dialogs, annotations, and examples.
- Match visible, hidden, enabled, disabled, loading, empty, success, and failure states.
- Match read-only and editable behavior by role and entry point.
- Confirm that every prototype action has a PRD rule and every user-visible PRD behavior exists in the prototype.
- Detect stale alternatives, hidden remnants, obsolete names, and deleted-scope content.
- **S-08 — Sample behavior, not code patterns.** For critical interactions, sample whether a control value reaches the subsequent data or result, a success message agrees with authoritative persisted state, list and detail views refer to the same object, and the effective behavior is clear when hidden or duplicate logic exists. Do not turn this into a fixed list of code defects, storage mechanisms, field names, or implementation patterns.
- Classify each finding as a PRD-only defect, a prototype defect, a source conflict, or a new product decision.
- Fix PRD-only defects directly. If the fix changes visible prototype behavior, use the Human Gate and then update both artifacts.

## 2. Product / Exception Closed Loop

- Trace every meaningful action through precondition, action, processing, data change, state change, feedback, recovery, and destination.
- **S-07 — Review actual processing stages separately.** Identify only stages supported by evidence, then define each stage's trigger, result, blocking or warning effect, retained data, responsible party, recovery action, and destination. For a mixed issue, first separate user-visible product meaning—including behavior, business state, permission, failure experience, and success criteria—from data definitions and implementation mechanisms. Resolve product meaning through confirmed evidence, an applicable platform rule, or the S-03 Human Gate timing rules. Exclude only the data-definition and implementation portions after product meaning is determined; never let data or technical review determine the mixed issue as a whole.
- **S-09 — Check when prerequisites fail.** For every prerequisite, define its check time. Surface failures known at entry before the user invests in downstream work. If a check must be delayed, state why, how entered data is retained, and how the user recovers.
- Confirm that each state has a clear owner/object, meaning, entry condition, exit condition, display, and allowed action.
- Separate related but different state dimensions; do not use one status label for multiple business meanings.
- Cover normal completion, loading or queuing, empty results, validation failure, processing failure, write failure, and partial success when credible.
- Define what is retained, what remains unchanged, where the state stops, who can act, and how recovery works after each failure.
- Check retry scope, cancelable stages, close/leave behavior, back navigation, and result restoration.
- Check duplicate actions, concurrent updates, stale pages, and repeated submission when the feature can encounter them.
- Check zero/one/many items, missing or unreadable sources, unsupported input, unavailable dependencies, and other evidenced boundaries.
- Confirm that final results, versions, and related page states are synchronized before completion is shown.
- If closure requires new behavior not present in the prototype, stop and ask the PM; do not close it only in the PRD.

## 3. Engineering Readiness

- Ensure different engineers would implement the same behavior without choosing among reasonable interpretations.
- Define fields with type, requiredness, default, editability, validation, null behavior, source, and example where relevant.
- Define enums completely and identify option source, filtering, default, and treatment of disabled historical values.
- **S-10 — Detect duplicated state controls and orphan enums.** Identify the single authoritative state and its transition action when multiple controls can express contradictory states. Require every enum value to have a source and a real entry point, flow, filter, transition, or consumer; do not promote isolated examples into formal enums.
- Define button visibility, enablement, permission, confirmation, action, success feedback, failure feedback, and post-action state.
- Define state transitions with triggers, guards, side effects, persistence, and terminal conditions.
- Define data provenance, snapshot/version, write destination, timing, append/replace behavior, and history impact.
- **S-11 — Separate unlimited product semantics from technical capacity.** Preserve the confirmed user-facing semantic while technical review determines capacity, over-limit detection, truncation behavior, and feedback. Use a Human Gate only when the technical boundary changes the product promise.
- Distinguish missing, empty, not applicable, unreadable, and failed values.
- Define retry, cancel, back, close, and repeated-operation consequences.
- Replace vague phrases such as “support”, “can view”, “process normally”, and “according to platform rules” with the specific applicable behavior or a precise reference.
- Keep technical implementation detail out unless it changes product behavior or acceptance.
- Keep unresolved decisions explicit and prevent them from entering acceptance criteria as confirmed requirements.
