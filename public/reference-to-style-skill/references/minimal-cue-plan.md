# Minimal Cue Plan (Source Photo → Loose-Line Generation Spec)

The Minimal Cue Plan sits **between** the Content Essence Card and the Generation Spec. Its
job is **not** to describe what the photo contains; it decides **which minimum visual cues are
allowed to enter the final image.**

In v0 it is the gate that converts an expressive description into a strict allow-list.

---

## 1. Core rule

**Only cues explicitly listed in the Minimal Cue Plan may enter the final generation.**

Any source-photo geometry that is **not** listed in the plan is **deleted by default**, not
simplified. The plan is the single source of truth for what gets drawn.

> Every permitted mark must map to one selected salient cue. No mark may exist only to
> complete anatomy, silhouette, texture, volume, or photographic resemblance.

> The result should read first as a sparse reconstruction from selected cues, and only
> secondarily as this specific source photo — not as a simplified tracing of the photo.

> Sparse does not mean generic. Preserve a source-conditioned identity signature before further
> compression. A primitive that has lost its semantic and positional anchor is not an acceptable
> representation.

---

## 2. Required sections

| Section | What it holds |
|---|---|
| `salient_identity_cues` | The identity-bearing features that survive restyling. |
| `expressive_cues` | Gaze / head angle / facial expression / temperament cues. |
| `essential_action_relation` | The key action or relationship to preserve even when most body detail is omitted. |
| `permitted_structural_marks` | The minimum structural marks allowed (e.g., one open body contour, one mark per needed limb). |
| `discarded_photo_geometry` | Explicit list of photographic geometry the result must **not** preserve. |
| `forbidden_details` | Explicit list of detail types that must never appear (fur strands, eye anatomy, hatching, …). |
| `composition_intent` | Fixed mode: `relation_conditioned_scale_with_active_negative_space`. |
| `relationship_scale_class` | `placement_wide`, `interaction_medium`, or `expression_close`, selected from the Spatial Fact Map. |
| `scale_evidence` | The approved relationship fact that requires the chosen scale. |
| `subject_scale_intent` | Source-resolved animal scale; never an automatic small-subject target. |
| `negative_space_strategy` | Which broad blank fields remain open and how balance-filling marks are prevented. |
| `positional_relation_priority` | The approved contact / containment / support / edge relation whose placement must survive without enlarging the subject. |
| `canvas_aspect_ratio` | Fixed `1:1` square output; never inherited from the source photo. |
| `subject_cluster_zone` | Source-conditioned placement zone inside the square; not a universal centered default. |
| `dominant_blank_field` | The largest intentionally empty region, sized for the chosen relationship scale class. |
| `primary_subject_long_axis_target` | Source-resolved band: 15%–35%, 25%–50%, or 35%–65%. |
| `identity_signature` | The minimum combined identity cues that distinguish this source subject from a generic class icon. |
| `source_relative_proportions` | Only the proportional relations that carry identity; not the full photo geometry. |
| `asymmetry_to_preserve` | Identity- or expression-bearing asymmetry that must not be normalized. |
| `recognizability_floor` | Minimum identity-signature subset that must remain together after compression. |

---

## 3. Cue schema

Every cue entry must contain:

| Field | Meaning |
|---|---|
| `feature` | The identity / expression / action / relation cue. |
| `minimal_representation` | The single minimum visual mark(s) that communicate it. |
| `max_major_marks` | Upper bound on how many major marks may represent this cue. |
| `why_essential` | Why this cue must survive (identity-bearing / expression-critical / relation-critical). |
| `exaggeration` | *(optional)* `slight` — allowed **only** when the cue is identity-bearing or action-bearing; omitted otherwise. Never whole-body or detail-based. |
| `source_evidence` | Observable source relationship supporting the cue; concise and non-photographic. |
| `relative_placement` | Where the primitive sits relative to other admitted cues. |
| `gesture_character` | Role assignment: `dominant_pressure_gesture` (2–3 total), `secondary_thin_single_pass`, or `face_flat_solid`. No final-prompt retrace / edge-fragment behavior. |
| `loss_if_removed` | What identity, expression, action, or relation becomes generic or unreadable if removed. |

Illustrative example (generic — not a hardcoded case):

```json
{
  "salient_identity_cues": [
    { "feature": "large ears",
      "minimal_representation": "two open angular / arc outline shapes",
      "max_major_marks": 2,
      "why_essential": "primary identity-bearing trait" }
  ],
  "expressive_cues": [
    { "feature": "direct upward gaze",
      "minimal_representation": "minimal expressive eye mark(s) — see §10 (eye marks are symbols, not anatomy)",
      "max_major_marks": 3,
      "why_essential": "core of the subject's calm, dignified bearing" }
  ],
  "essential_action_relation": [
    { "feature": "contact relation (one subject resting on / against another)",
      "minimal_representation": "minimal contact marks + one partial outline conveying the relation",
      "max_major_marks": 2,
      "why_essential": "key interaction that defines the photo" }
  ],
  "permitted_structural_marks": [
    "one open body contour (not closed)",
    "one contact-direction mark only when required by the essential relation"
  ],
  "discarded_photo_geometry": [
    "full source silhouette", "exact limb positions", "fur texture",
    "volumetric shading", "indoor background"
  ],
  "forbidden_details": [
    "fur strands", "individual hair", "eye anatomy / iris / highlight",
    "hatching", "shading", "volume rendering", "detailed anatomy", "surface texture"
  ]
}
```

---

## 4. Relationship to downstream

- The Minimal Cue Plan is the **input** to the Generation Spec and the loose-line compiler.
- The loose_line `information_budget` is checked against this plan's `max_major_marks` totals.
- The **Generation Spec Validator** enforces that nothing outside the plan enters generation.
- Style QA's **Cue Fidelity** dimension checks the final image against this plan's key cues.

### 4.1 Composition intent fields

Every plan must include:

```yaml
composition_intent: relation_conditioned_scale_with_active_negative_space
canvas_aspect_ratio: "1:1"
relationship_scale_class: <placement_wide | interaction_medium | expression_close>
scale_evidence: <approved Spatial Fact Map relationship requiring this scale>
subject_cluster_zone: <source-conditioned zone inside the square>
dominant_blank_field: <largest blank region; threshold resolved by relationship scale class>
primary_subject_long_axis_target: <relationship-resolved band>
subject_scale_intent: <scale required to make identity plus approved relation immediately readable>
negative_space_strategy: >-
  Preserve wide blank areas around the approved subject cluster; do not add marks to fill or
  balance gaps.
positional_relation_priority: >-
  Preserve the source's expressive contact, containment, support, lead, edge, or placement
  relation without enlarging the primary animal.
```

Rules:

- Resolve scale before prompt compilation:
  - `placement_wide`: 15%–35% long axis; usually ≥50% dominant blank field — for separation,
    leading, containment, or broad positional relations.
  - `interaction_medium`: 25%–50% long axis; usually ≥35% dominant blank field — for direct
    contact or two-party interaction requiring both participants to read.
  - `expression_close`: 35%–65% long axis; usually ≥25% dominant blank field — for support,
    edge-peeking, or expression/contact relations that depend on a closer view.
- These are compositional bands, not pixel-exact segmentation thresholds.
- Generate on the square canvas directly; do not preserve the source-photo aspect ratio and do not
  crop a non-square generation into a square afterward.
- Select `subject_cluster_zone` from the source's expressive placement and relation. Do not impose a
  universal center / corner / edge.
- Keep one clearly intentional dominant blank field at the threshold for the chosen class.
- Record `scale_evidence`; a scale class without relationship evidence fails validation.
- Preserve **relational topology**, not exact photographic coordinates: which entity touches,
  contains, supports, leads, frames, or sits near an edge matters more than pixel placement.
- Do not shrink the animal merely to satisfy a fixed small-subject quota, and do not enlarge it
  merely for generic recognizability.
- Do not add approved entities or extra marks to balance an intentionally empty region.
- Once the core subject and core interaction are readable, preserve blank space instead of
  completing anatomy or balancing the composition.

---

### 4.2 Identity signature and recognizability floor

Build `identity_signature` before final cue deletion. Select the smallest *combined* set of cues
whose proportions, asymmetry, placement, and expression relationships distinguish the source
subject from a generic class icon.

```yaml
identity_signature:
  cues: []
  source_relative_proportions: []
  asymmetry_to_preserve: []
recognizability_floor:
  required_cue_count: 2
  required_combination: []
  generic_substitution_forbidden: true
```

Rules:

- Prefer 2–4 mutually reinforcing identity cues; allow one only when the source genuinely offers
  no second observable cue.
- Preserve source-relative relationships, not exact geometry: relative size, directional spread,
  offset, tilt, compression, and spacing may be essential even when contours are simplified.
- Do not normalize meaningful asymmetry into mirrored forms.
- Do not compile identity cues into detached universal symbols. Each primitive retains its
  semantic anchor, relative placement, and gesture character.
- Represent identity in the final prompt through relative geometry, spacing, offset, directional
  spread, and flat dark masses. Keep texture-adjacent or anatomy-expanding identity language in the
  intermediate card only.
- If further deletion would make the result interchangeable with a generic mascot of the same
  class, stop deleting even when the soft major-mark target has been reached.

---

## 5. Selective exaggeration (optional, identity/action cues only)

A cue listed in the plan may carry `exaggeration` **only** if it is an identity-bearing
or action-bearing cue (e.g., a distinctive ear shape, a contact relation). Discipline:

- exaggerate **only** the selected cue; this may **noticeably** alter graphic proportion or
  directional emphasis, but must **never** increase descriptive detail;
- do **not** cartoonify the whole body (no chibi proportions, no mascot silhouette);
- do **not** achieve exaggeration by adding detail — a proportion / emphasis shift, not more
  marks;
- extra contour lines, extra facial detail, and cartoon decoration are forbidden even for
  exaggerated cues.

The plan operates on a **warm paper-tone canvas** (see `references/loose-line-compiler.md` §4):
background is scene-less, with 0–1 minimal ground cue only.

---

## 6. Optional user preserve / delete / emphasize notes (runtime overrides)

The user may attach natural-language requests alongside the photo. They are applied **here**, as
overrides on the auto-generated plan — never as style references, and never re-opening the fixed
profile:

| User request type | How it maps into the plan |
|---|---|
| **preserve** ("重点保留这个动作") | Force-include the cue in `salient_identity_cues` / `expressive_cues` / `essential_action_relation` even if the AI would have dropped it; raise its `why_essential`. |
| **delete** ("不要旁边的人") | Add the element / region to `discarded_photo_geometry` (or `forbidden_details`); for a non-subject element (a bystander, a prop), exclude it from the allowed cues entirely so no mark represents it. |
| **emphasize** ("耳朵明显一点") | Mark that cue with `exaggeration: slight` (allowed only because it is identity-bearing); do **not** add extra detail to achieve it. |

The plan remains an allow-list: anything not selected (including user-deleted items) is deleted by
default. If a request is internally contradictory or conflicts with the fixed profile's hard CORE
(e.g., "make it photorealistic"), the Validator / compiler resolves it toward the fixed profile and
surfaces the conflict in the QA summary — no new gate is opened.

---

## 7. Large-form priority (large_form_priority)

The plan must prioritize **large-form cues** before any local cue:

- Prefer **one large contour / shape cue** to express an ear, head, body, or action-relation.
- Do **not** allow several small fragmentary lines to substitute for a single cue that could be
  expressed by a large form.
- Plan large-form cues first, then consider local cues.
- A large-form cue is a decisive whole-shape hint (e.g., one open arc for an ear), not an assembly
  of small strokes that merely approximates the shape.

---

## 8. Face cue budget — not a facial component checklist (facial_reduction_rule)

The face receives **only the minimum cue set necessary for recognition and expression**. This is a
*cue budget*, not a checklist that every facial component must be drawn.

- Do **not** complete facial anatomy merely because a facial component exists in the source.
- Which cues are actually needed depends on the view and the subject's role:
  - front-facing primary subject → two eye marks + nose + mouth may all be needed;
  - side profile → one eye mark + nose direction may suffice;
  - secondary / relational subject → the face may be **omitted entirely**.
- The prohibited lines below are the kinds of marks that count as *over-description*. The real test
  is whether each facial line **earns its place** (carries identity / expression), not whether a
  fixed set of components is present.

Default-prohibited facial lines:
- eye socket support lines
- cheek lines
- muzzle construction lines
- brow lines
- nose bridge lines
- facial contour explanation lines

Only allow an extra facial line when it is an **absolutely necessary identity-bearing cue**.

> **Eye marks are a special case — see §10.** They are minimal expressive symbols, not rendered
> eye anatomy.

**Principle — recognition before description.** The face must read as *recognized*, not as
*described*.

---

## 9. No descriptive furry edge (no_furry_edge_rule)

Fur "fluffiness" must **not** be expressed via fragmentary fur edges.

Prohibited:
- ear-edge fur spikes
- face-edge hair fragments
- zig-zag furry contour
- clusters of short fur strokes
- repeated short marks suggesting coat texture

Long-haired subjects must be expressed primarily through:
- large silhouette cue
- shape proportion
- limited identity marks

— **not** by drawing fur.

Final generation prompts do not explicitly request edge-fragment accents. Translate surface
identity into large-form proportion or directional gesture, then remove the texture-adjacent noun.
QA may tolerate 0–4 naturally occurring dry interruptions confined to identity-bearing dominant
forms; repeated edge marks that read as coat texture still fail.

---

## 10. Eye representation — minimal expressive symbol, not anatomy (eye_mark_rule)

Eye marks are **minimal expressive symbols, not rendered eye anatomy.**

Allowed representations (choose the minimum that preserves gaze / expression):
- tiny solid dot;
- compact flat solid dark dab with no internal structure;
- short line / slit;
- one minimal eye mark for a side-view subject.

Forbidden:
- anatomical eyeball construction;
- iris + pupil hierarchy;
- realistic catchlight / reflection rendering;
- eyelid construction;
- eye socket support lines;
- brow / under-eye descriptive lines.

Do not request eye construction in final prompts. QA may accept one tiny internal paper reserve in
a compact dark eye mark when it reads as graphic mark behavior rather than iris, pupil, catchlight,
or volume. Preserve expression primarily through spacing, size, direction, offset, and unequal
flat dark shapes.

### eye_expression_priority

```yaml
eye_expression_priority:
  default: minimal
  if_expression_bearing: allow_flat_shape_emphasis
  if_secondary_subject: reduce_or_omit
```

- `allow_flat_shape_emphasis` — permitted to make the flat solid mark slightly larger, slightly
  more present, unequal, or spaced more expressively — **but must not add internal structure**.
- `reduce_or_omit` — for a secondary / relational subject, reduce the eye to a single dot or omit
  it.

> **Emphasis may increase shape prominence, not anatomical detail.**

---

## 11. Subject priority & relationship dominance (subject_priority + relationship_dominance_rule)

### subject_priority

Not every subject in the frame deserves equal visual weight.

```yaml
subject_priority:
  primary_subject:
    preserve_identity: true
    preserve_expression: true
  relational_secondary_subject:
    preserve_only:
      - action_direction
      - interaction_relation
      - minimum_identity_class
```

The **primary expressive subject** keeps identity + expression cues. A **relational secondary
subject** keeps only its action direction, the interaction / relation it participates in, and the
minimum identity class needed to read "what it is" — not its full anatomy.

This is a **generic** rule: it does not privilege any species or figure type. Whichever participant
carries the expression is the primary subject; the other is compressed more aggressively.

### relationship_dominance_rule

When the source is primarily defined by an **interaction / action relation** (e.g., one subject
leading / holding / embracing / contacting another), the relation may consume **more** of the
information budget than either subject's anatomy.

- `essential_action_relation` is ranked **above** subject-body cues in the cue plan.
- Once the relation is legible, **stop describing the participating bodies** — do not keep drawing
  limbs, clothing, or contours to "finish" either subject.

### Relation-first vs identity-first compilation

- **Identity-first** (default, single-subject sources): identity-bearing large forms lead, then
  expression, then relation, then facial, then secondary.
- **Relation-first** (relation-dominant sources): the action / contact relation leads, then the
  primary identity-bearing large form, then expressive direction, then the secondary subject's
  minimum cue, then facial marks only if still needed.

The cue plan chooses the ordering from the source's dominant structure, not by default.

---

## 12. Input permission — only approved entities (downstream authority of the Scene Selection Card)

The Minimal Cue Plan may **only** use entities approved by the **Scene Selection Card**
(`references/scene-selection.md`).

- Entities the Scene Selection Card judged `excluded` (background_context / noise, or a
  non-animal element that failed the Non-animal Inclusion Test) **must not** re-enter the Minimal
  Cue Plan.
- They **must not** re-enter the Loose-Line Compiler.
- They **must not** re-enter the Generation Spec as "optional context".
- They **must not** be auto-restored for compositional / framing convenience.

> **Core principle — Excluded once = excluded downstream.** Scene Selection decides *what may be
> drawn*; the cue plan decides *the minimum cues* for those allowed entities; the compiler decides
> *how to express* them. The lower layers never re-run scene selection, and they never pull an
> excluded element back in. A large or salient but excluded object stays excluded (see
> `references/scene-selection.md` §1, §4).
