# Review Checklist

Use the same three lenses during initial gap analysis and after every fix. Apply only checks relevant to the feature.

## 1. Prototype ↔ PRD Consistency

- Compare in both directions: Prototype → PRD and PRD → Prototype.
- Match pages, entry/exit paths, steps, titles, fields, buttons, columns, dialogs, annotations, and examples.
- Match visible, hidden, enabled, disabled, loading, empty, success, and failure states.
- Match read-only and editable behavior by role and entry point.
- Confirm every prototype action has a PRD rule and every user-visible PRD behavior exists in the prototype.
- Detect stale alternatives, hidden remnants, obsolete names, and removed-scope content.
- Sample effective behavior: confirm a control value reaches the resulting data, success feedback agrees with authoritative state, and related views refer to the same object.
- Classify each finding as a PRD-only defect, prototype defect, evidence conflict, or new product decision.
- Fix PRD-only defects directly. Use the Human Gate before changing visible behavior, then update both artifacts.

## 2. Product / Exception Closed Loop

- Trace each action through precondition, action, processing, data change, state change, feedback, recovery, and destination.
- For each evidenced processing stage, define trigger, result, blocking/warning effect, retained data, responsible party, recovery, and destination.
- Define when each prerequisite is checked. Surface known failures before users invest in downstream work; when checks must be delayed, specify retention and recovery.
- Give each state a clear object/owner, meaning, entry condition, exit condition, display, and allowed action.
- Separate different state dimensions rather than overloading one status.
- Cover credible loading, queuing, empty, validation failure, processing failure, write failure, and partial-success paths.
- Define what is retained, what remains unchanged, where processing stops, who can act, and how recovery works.
- Check retry scope, cancelable stages, close/leave behavior, back navigation, and result restoration.
- Check duplicate actions, repeated submission, concurrent updates, stale pages, and evidenced boundary cases.
- Confirm related views and persisted states agree before completion is shown.
- If closure requires new behavior, use the Human Gate; do not close the gap only in the PRD.

## 3. Engineering Readiness

- Ensure different engineers would implement the same behavior without choosing among reasonable product interpretations.
- Define relevant field type, requiredness, default, editability, validation, null behavior, source, and example.
- Define enums completely, including option source, filtering, default, and disabled historical values when applicable.
- Identify one authoritative state when multiple controls could conflict; ensure every enum value has a real source and consumer.
- Define button visibility, enablement, permission, confirmation, action, success/failure feedback, and resulting state.
- Define transitions with triggers, guards, side effects, persistence, and terminal conditions.
- Define data provenance, snapshot/version, write destination, timing, append/replace behavior, and history impact.
- Distinguish missing, empty, not applicable, unreadable, and failed values.
- Define retry, cancel, back, close, and repeated-operation consequences.
- Replace vague phrases with specific behavior or a precise confirmed-rule reference.
- Keep implementation details out unless they change product behavior or acceptance.
- Keep unresolved decisions explicit and out of confirmed acceptance criteria.
