# SproutCircle — Human Gate

> Fictional decision record for demonstration only.

## Question 1 — Root Product Meaning

**Gap:** The page is shared, but the prototype does not establish whether **Mark watered** changes one household-level plant state or only the acting member's personal acknowledgment.

**Options:**

- A. One shared state per plant and day. One member's success is visible to all members.
- B. A separate acknowledgment per member. Each member may mark the same plant independently.

**Impact:** Determines success semantics, repeated action behavior, cross-member visibility, data meaning, and the scope of recovery.

**Timing:** Blocks PRD and prototype consistency.

**Fictional PM decision:** Option A. Watering is one shared state per plant and calendar day in the household's configured timezone.

## Question 2 — Conditional Recovery

Asked only after Question 1 confirmed a shared state.

**Gap:** The prototype provides no recovery for an accidental successful action.

**Options:**

- A. No user undo; correction requires a separate support process.
- B. The acting member may undo for a limited period.

**Impact:** Changes visible actions, permission behavior, state transitions, and what all household members see.

**Timing:** Must resolve before development.

**Fictional PM decision:** Option B. Only the member who marked the plant may undo within five minutes. After five minutes, no undo action is available.

## Question 3 — Cross-Member Visible Behavior

**Gap:** Another member may keep an older card open while the shared state changes.

**Options:**

- A. Update the open card when the shared state changes.
- B. Update only when the member manually reloads.

**Impact:** Changes the visible freshness promise. The transport mechanism remains a technical decision.

**Timing:** Must resolve before acceptance criteria are final.

**Fictional PM decision:** Option A. An open Today page must reflect the shared state within ten seconds. Engineering chooses the delivery mechanism.

## Required Artifact Change

Questions 2 and 3 add user-visible behavior absent from the input prototype. The Skill therefore updates both the prototype contract and the PRD; it does not place these answers only in the PRD.
