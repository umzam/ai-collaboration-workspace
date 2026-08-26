# Human Gate — build-time G1, runtime content question

This file defines the gate behavior for v0.2.0. The **style gate (G1) is resolved once at
build time** and baked into the fixed Style Profile. **Ordinary runtime has no style gate.**
The only user question allowed at runtime is a *single focused content question* when the source
photo itself is genuinely ambiguous.

---

## 1. G1 — Profile Gate (build time only; NOT a runtime step)

**Role (historical / build time):** during skill development, a human settled *subjective /
multi-solution* style calls before any image was generated. It did **not** confirm every field.

**Runtime status:** G1 is **not** re-run at runtime. Its outcome is the fixed internal Style
Profile (`references/confirmed-style-profile.md`), which the workflow loads directly. The ordinary
user is never asked to confirm the style, and the fixed profile is never re-negotiated.

The build-time design (for reference):

- The AI presented a recommended, already-resolved Profile. Low-risk observable features were
  settled by the AI and shown *for information*, not for confirmation.
- Only flagged items reached the human — typically boundary calls (what is CORE vs OPTIONAL vs
  AVOID) and any genuinely contested dimension.
- Pre-supplied inputs were never re-asked.
- Recommendations were shown with one-tap confirm, not open questionnaires.

**Language rule (principle 12 — presentation only):** all text a human reads to make an aesthetic
decision is written in the human's current language. Internal field names / schema keys / enum
values stay English underneath.

**v0.2 execution scope (fixed).** v0.2 supports exactly one execution family: `loose_line`. The
gate offered no `soft_brush_fill`, `line_plus_light_wash`, `auto_mix`, or any color / wash / fill
option. These remain deferred.

---

## 2. Runtime — no style gate, one focused content question only

At runtime the skill applies the fixed profile automatically. It may ask the user **at most one
focused question**, and only when the **source photo itself** is genuinely ambiguous — e.g., it is
unclear which action / relation / identity cue must be preserved ("which moment matters most?").
This is a *content* question (what to depict), not a style gate (how it should look). The fixed
profile is never re-opened.

Anti-over-ask guardrails (principles 4–5, 7): the question is focused + one-tap; provided
information is consumed silently; no per-field confirmation.

---

## 3. Post-generation: Human Feedback (NOT a blocking gate)

After generation + Style QA, present the image + a **concise QA summary**. The user may:

- **accept**, or
- give **one directional revision** (natural-language or structured — including a new
  preserve / delete / emphasize note).

On a directional revision, route to exactly **one** Revision (see SKILL.md §6). There is no
second post-generation gate loop. Only the build-time G1 blocks; everything after is iterative
feedback capped at a single revision.

---

## 4. Vague feedback

If the user's revision direction is unclear, ask **one focused question** (which dimension is
wrong?), not a full re-brief.

---

## 5. Constraints enforced here

- Exactly **one** blocking gate in the whole skill's life — G1, resolved at build time. No
  runtime gate.
- At most **one** Revision total.
- No re-asking of provided information.
- No per-field confirmation of the Content Essence Card.
- The runtime content question is optional and strictly bounded to one focused ask.
