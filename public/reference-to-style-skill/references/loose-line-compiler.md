# loose_line Compiler (v0.3.3 execution — the only executable mode)

v0.3.3 supports **exactly one** execution family: `loose_line`. This compiler defines how that
mode is compiled into a generation intent. It is intentionally locked to line-only output.

---

## 1. Forced compiler settings (loose_line)

| Setting | Value |
|---|---|
| `fill` | none |
| `color_rendering` | none |
| `wash` | none |
| `depicted_surface_texture` | none |
| `depicted_surface_detail` | forbidden |
| `mark_surface_behavior` | role-scoped: 2–3 dominant structural / relation gestures may show pressure / width variation and uneven deposition; secondary marks are thin, light, single-pass; face marks are flat, compact, featureless |
| `purposeful_local_retrace_in_final_prompt` | 0 |
| `micro_fragments` | 0 |
| `shading` | none |
| `realistic_volume_modeling` | forbidden |
| `mark_economy` | primary objective |
| `open_broken_contour` | required (current profile) |
| `feature_first_reconstruction` | required |
| `composition_mode` | `relation_conditioned_scale_with_active_negative_space` |
| `canvas_aspect_ratio` | `1:1` square; never inherit source-photo aspect ratio |
| `relationship_scale_resolver` | required; choose `placement_wide`, `interaction_medium`, or `expression_close` from Spatial Fact Map evidence |
| `subject_occupancy_target` | resolved by relationship scale class; no universal small-subject target |
| `position_expressiveness` | required; preserve relational placement instead of enlarging the subject |
| `canvas_tone` | `warm_off_white` / `light cream` / `soft beige` (paper tone, **not** color rendering) |
| `background_scene` | none |
| `background_detail` | none |
| `background_marks` | 0–1 minimal ground cue only |
| `selective_exaggeration` | allowed, **identity/action cues only**; may **noticeably** alter graphic proportion or directional emphasis, but must **never** increase descriptive detail; never whole-body cartoon |

v0.3.3 must **never** emit: color fill, grey wash, watercolor, color block, brush fill, painterly
rendering, gradient, or tonal modeling. The fixed profile keeps a warm paper line-only language;
these deferred modes are never reintroduced at runtime. They are **deferred to a future iteration**
(see `KNOWN_LIMITATIONS.md`).

**Canvas default is warm paper, not white digital.** The ground is a warm paper tone
(`warm_off_white` / `light cream` / `soft beige`), never a blank white digital canvas. This is a
*paper tone*, not color rendering — it does **not** reinstate `soft_brush_fill`, `wash`, or `fill`.
Still forbidden on a paper-tone ground: watercolor fill, tonal wash, color shading, painterly fill,
grey wash, color block. Background stays scene-less (0–1 minimal ground cue only).

---

## 2. Hard information_budget (loose_line)

Descriptive words ("extremely low", "minimal", "sparse", "simplified") are no longer enough.
The compiler enforces an **executable** budget:

```yaml
information_budget:
  mode: EXTREME_REDUCTION
  # Primary lens: information units (not raw stroke count)
  information_units:
    primary_large_forms: 2–4
    expressive_marks: 1–3
    relation_marks: 1–2
    secondary_subject_forms: 1–3
    descriptive_marks: 0      # anything that only "completes" anatomy / pose is forbidden
  identity_signature_cues: 2–4; minimum 2 unless source genuinely offers only one
  # Compilation target (quality and semantic traceability are also mandatory)
  total_major_marks: 9–12
  face_marks: maximum 4
  body_connection_gestures: target 1; allow up to 3 when stance or interaction readability requires them
  contact_gestures: maximum 1 per essential relation
  interaction_partner_forms: 1–3
  anatomy_completion_marks: 0
  edge_fragment_accents_requested: 0
  background_marks: maximum 1
  depicted_surface_texture_lines: 0
  fur_texture_lines: 0
  shading_marks: 0
  purposeful_local_retraces_in_final_prompt: 0
  dominant_pressure_varying_gestures: 2–3
  secondary_marks: thin, light, single-pass
  face_marks_behavior: flat and compact; no eye construction requested
  realistic_eye_structure: forbidden
  closed_full_body_contour: forbidden
```

This is a generation **constraint**, not a requirement for pixel-exact counting. The budget is
expressed primarily as **information units** (see the yaml above); stroke count is a soft ceiling,
not a target. But the prompt compiler and the **Generation Spec Validator** must treat **obvious
over-budget** output as not allowed into generation.

The budget is **quality-aware**: recognizability and gesture quality outrank mechanical counting.
A low mark count that is generic, fragmented, redundant, or merely
descriptive (describing fur / face / body instead of stating decisive cues) still fails. See
`references/generation-spec.md` §6.1 and §6.7–§6.14.

---

## 3. Fixed generation order (feature-first reconstruction)

The compiler runs three fixed stages, in order:

### Stage A — Feature Selection
Find ONLY:
- identity cues
- the source-conditioned identity signature and recognizability floor
- expression / 神态 cues
- essential action
- essential relation

### Stage B — Feature Compression
Compress each feature into its minimum visual cue:
- "大耳朵" → 1–2 open angular / arc hints (NOT a full ear outline + fur).
- "直视" → minimal expressive eye mark — a tiny flat solid dot, compact featureless dark dab, or
  short solid slit with no internal reserve (NOT anatomical eyeball construction; see
  `references/minimal-cue-plan.md` §10).
- "轻微地包天" → 1 tiny mouth mark (NOT teeth structure).
- "contact relation" → minimal contact marks + one partial outline conveying the relation (NOT
  full limbs + full anatomy of either participant).

Compression must retain a cue's semantic anchor, relative placement, source-conditioned
proportion / asymmetry, and gesture character. A primitive detached from those relationships is
not a valid compression.

### Stage C — Selective Reconstruction
Recombine these cues into a new, sparse composition from blank paper:
- do NOT trace the source silhouette;
- do NOT preserve full photographic geometry;
- do NOT "simplify by outlining the photo".
- do NOT normalize identity-bearing asymmetry into mirrored mascot forms;
- establish the recognizability floor before deleting further cues.

**Core definition:** reconstruct from salient cues, not reduce from the full photograph.

### Selective exaggeration (within feature-first reconstruction)

Identity-bearing or action-bearing cues may be exaggerated to strengthen recognition — and this
exaggeration may **noticeably** alter graphic proportion or directional emphasis. Allowed graphic
shifts: ears can be clearly larger; the head may be slightly larger; the body may collapse into a
single arc; a limb direction may be made more decisive; a contact / lead line may be longer and
straighter.

- Exaggeration **must not increase descriptive detail** — it is a proportion / emphasis shift, not
  more marks. Extra contour lines, extra facial detail, and cartoon decoration remain forbidden.
- The **whole body must NOT become a cartoon** (no chibi / mascot whole-body proportions).
- Emphasis may increase a cue's *shape prominence*, never its *anatomical detail*.

---

## 4. Canvas tone — warm paper ground, still line-only

v0 keeps the reference's warm paper feel but stays **line-only** (no fill / wash / color
rendering). The canvas is a paper tone, not a blank digital white:

| Setting | Value |
|---|---|
| `canvas_tone` | `warm_off_white` / `light cream` / `soft beige` |
| `background_scene` | none |
| `background_detail` | none |
| `background_marks` | 0–1 minimal ground cue only |

Rules:
- The default canvas is **warm paper tone**, not a white blank digital canvas.
- This is a *paper tone*, not *color rendering* — it does not reinstate `soft_brush_fill`,
  `wash`, or `fill` modes.
- Forbidden even for paper-tone cases: watercolor fill, tonal wash, color shading, painterly
  fill, grey wash, color block.
- Background stays empty (scene = none, detail = none); only 0–1 minimal ground cue (e.g. a
  faint short line) is permitted.

## 5. Mode-conflict guard

If the execution mode is `loose_line`, the compiler rejects any spec fragment that introduces
watercolor / wash / color fill / soft brush fill / painterly rendering / gradient / tonal
modeling; it also rejects a "white blank digital canvas" default (the ground must be warm paper).
Conflicts are **auto-removed** by the compiler — no user question is asked.

---

## 6. Shape-first compilation (shape_first_compilation)

The compilation order must be:

1. identity-bearing large forms
2. expressive direction
3. essential action / relation
4. minimum facial marks
5. only if absolutely necessary: secondary cue

The composition must **not** begin from:
- fur
- eye-area structure
- facial support lines
- decorative contour

For relation-dominant sources the order may flip to **relation-first** — see §11. In either case,
do not begin from fur, eye-area structure, facial support lines, or decorative contour.

---

## 7. Gesture-unity preference (gesture_unity_preference)

If a cue can be expressed as one decisive gesture, do not split it into multiple decorative short
strokes. Only a dominant structural or relation gesture may contain pressure variation or uneven
deposition. Do not request local retrace, edge fragments, or broken micro-strokes in the final
prompt. Priority order:

```
single decisive pressure-varying gesture
>
multiple descriptive strokes
```

A single stroke may represent:
- one complete ear direction
- a segment of body relation
- one necessary limb
- an action-relation hint

The aim is gestural unity and weight hierarchy, not either digitally uniform perfection or
fragmented sketch texture.

---

## 8. Body subordination (body_subordination_rule)

The body is **not** the information center.

Body contour may serve **only**:
- identity
- expression
- essential action
- semantic relation

Do **not** keep adding lines to "explain the body completely".

If the action-relation is already understandable, stop supplementing body structure.

For human / fully-bodied figure participants, apply §9 (figure reduction) on top of this rule.

---

## 9. Figure / human reduction (human_reduction_rule)

A human — or any fully-bodied figure participant — is represented as **action-bearing large
forms**, not as a figure sketch.

When such a figure is present, preserve only:
- gesture direction;
- head / hair mass **only if** identity-relevant;
- one or two torso / limb direction cues;
- the action-bearing limb or the contact relation.

Default-delete for the figure:
- full clothing silhouette;
- clothing layers / folds;
- fingers / hand detail;
- shoe structure;
- complete legs;
- complete torso closure;
- facial construction (the face follows §8 / §10, not a drawn portrait);
- hair strands.

> **Do not account for every limb.** A figure should read as a few large lines plus a pose
> relation — not as a carefully drawn person.

---

## 10. Graphic readability outranks photographic fidelity (graphic_distortion_allowed)

The reference language does **not** chase photographic geometric similarity. Proportion may
shift, ears may simplify, bodies may deform, perspective may be loose — and the result still
reads *correctly* when the cues are clear.

- **Graphic readability outranks photographic geometric fidelity.**
- **A large-form distortion is acceptable when it improves cue clarity and preserves expressive
  essence** — prefer the clearer reconstructed large form over the more photographically faithful
  one.
- This is what keeps the result a *reconstruction*, not a *photo traced and simplified*.

---

## 11. Relation-first compilation (relation_dominant_sources)

For sources whose meaning is primarily an interaction / action relation, let the relation lead:

1. essential action / relation
2. primary identity-bearing large form
3. expressive direction
4. secondary subject minimum cue
5. face marks only if still needed

This is the relation-first alternative to §6's identity-first order. The Minimal Cue Plan
(`references/minimal-cue-plan.md` §11) selects which ordering applies; the compiler follows it.
Once the relation is legible, stop adding body / clothing / limb marks for either participant.

---

## 12. Semantically anchored gestural final-prompt compilation

The Generation Spec remains semantic and auditable, but the **final prompt sent to the image
model** must be a **positive sparse gestural construction**. It must not restate the full subject or
use a long negative list, but it must retain enough semantic and positional anchoring to preserve
individual identity.

```yaml
semantic_to_visual_primitive_translation: required
semantic_anchor_retention: required
primitive_semantic_traceability: required
```

Before emitting the final prompt:

1. Keep the minimum semantic meaning in a 1–2 sentence anchor.
2. State the source-conditioned identity signature compactly: only the relative proportion,
   asymmetry, directional, mass, or expression relationships needed to prevent generic substitution.
3. Translate every admitted Minimal Cue Plan item into a countable visual primitive while keeping
   its semantic cue, relative placement, and gesture character attached.
4. Merge primitives that carry the same information; never repeat a cue as full anatomy.
5. Emit only the resulting semantically anchored primitive allow-list. Anything not listed is
   absent by construction.
6. Realize excluded entities through omission; do not copy the excluded-entity inventory into the
   final prompt.

### 12.1 Final-prompt activation firewall

The source photo remains attached to the image call, so identity semantics that are useful in the
intermediate plan can over-activate anatomy or texture in the image model. Apply this filter after
primitive translation and before final-prompt validation:

```yaml
final_prompt_activation_firewall:
  texture_adjacent_identity_terms: translate_then_remove
  detailed_anatomy_terms: translate_then_remove
  body_completion_language: forbidden
  source_identity_semantics: keep_in_intermediate_only
  primitive_relationships: keep
```

- Keep the semantic anchor limited to subject class, expressive direction, and core relation.
- Keep source identity in the final prompt through unequal proportions, spacing, offset,
  directional spread, flat dark masses, and contact topology.
- Translate coat / hair / fluffy / surface descriptors into large-form proportion, then remove the
  texture-adjacent noun.
- Translate mouth / muzzle / underbite detail into one offset dash or gap, then remove the anatomy
  term from the gestural list.
- Translate body-mass descriptions into one incomplete connecting arc followed by reserved blank.
- Do not ask the image model to reproduce the source's surface, anatomy, or body completeness.

### Primitive vocabulary

Prefer:

- `dot`
- `short stroke`
- `arc`
- `open form`
- `overlap`
- `gap`
- `reserved blank`
- `blank space`
- `pressure-weighted gesture`
- `tapered dominant gesture`
- `flat solid dark dab`
- `thin light single-pass arc`

Reduce anatomical nouns, depicted-texture nouns, and descriptive body-part language in the final
prompt, but do not erase identity-bearing semantics. An anatomical noun may appear once as the
semantic anchor of a primitive when needed for identity, expression, or action. Use:
`semantic cue + count + primitive + relative placement + gesture character`.

Generic translation grammar:

| Semantic cue type | Final-prompt primitive |
|---|---|
| identity-bearing projection / direction | one or two unequal open angular / curved gestures preserving relative spread and asymmetry |
| gaze / attention | one or two flat, solid, featureless dark dabs preserving source spacing and direction |
| small central identity cue | one flat solid dab with source-relative placement |
| expression direction | one short offset dash or gap carrying the source expression |
| body continuity | maximum one incomplete open connecting arc followed by reserved blank |
| action-bearing extension | one decisive directional gesture whose contact role is named |
| direct contact | explicit touch / overlap between two named primitives |
| secondary participant | one to three subordinate open large forms with relation-only semantics |
| spatial containment | source-relative placement, gap, or open framing axis between approved forms |

The list is the final image's **complete gestural allow-list**. Do not re-expand primitives into
full anatomy, but do not reduce them to universal icon tokens detached from the source.

---

## 13. Final prompt shape and activation guard

Emit exactly three compact sections, in this order:

### 1. Semantic anchor

- Use 1–2 sentences only.
- Name only the primary subject, expressive direction, and core action / relation.
- Do not enumerate anatomy, texture, pose geometry, or excluded scene content.

### 2. Allowed gestural marks

- Lead with a `1:1` square warm paper-tone blank ground and the dominant blank field. State that
  source aspect ratio is not inherited.
- Assign hand-drawn surface behavior by role: only 2–3 dominant structural / relation gestures use
  visible pressure / width variation and uneven deposition; secondary marks are thin, light, and
  single-pass; face marks are flat, compact, solid, and featureless.
- State the approved subject cluster's relationship-resolved scale class, target band, scale
  evidence, and meaningful page position before listing marks. Never impose a universal small
  subject.
- List only numbered / countable visual primitives compiled under §12. Each item must name the cue
  it carries, its relative placement, and its gesture character.
- State that only these marks may appear.
- Express relations through `overlap`, `touch`, `gap`, `placement`, or `open framing`, not through
  expanded object descriptions.

### 3. Hard stop rule

Always include:

```text
Once identity, expression, relation, and mark rhythm are readable, stop drawing.
Do not complete anatomy or polish contours.
Do not add a mark without an identity, expression, action, relation, placement, or essential
gestural role.
```

Compress negative prompting to these five categories only:

```text
No coat-description or repeated fur strokes.
No rendered eye anatomy.
No shading or volume modeling.
No polished closed contours.
No generic mascot completion or decorative marks.
```

Do not expand these categories into lists of subparts. Repeated mentions of detailed anatomy,
texture, or excluded objects are an **activation leak** even when phrased negatively.

### Final-prompt compiler check

Before the image call, require all of the following:

- `semantic_to_visual_primitive_translation: required` is satisfied for every admitted cue;
- `semantic_anchor_retention: required` and `primitive_semantic_traceability: required` are
  satisfied for every identity / expression / relation cue;
- `final_prompt_activation_firewall` has translated then removed texture-adjacent identity terms,
  detailed anatomy terms, and body-completion language;
- the `identity_signature` meets its `recognizability_floor` before mark deletion stops;
- `mark_surface_behavior` is role-scoped rather than global and is distinct from depicted surface
  texture;
- `canvas_aspect_ratio: 1:1` is explicit and source aspect-ratio inheritance is disabled;
- `composition_mode: relation_conditioned_scale_with_active_negative_space` is present;
- `relationship_scale_class`, its target band, and `scale_evidence` agree with the Spatial Fact Map;
- the subject's approved positional relation is stated without substituting enlargement;
- the prompt has exactly the three sections above;
- the semantic anchor is no longer than two sentences;
- every allowed mark has a count or explicit spatial relation;
- no semantic cue is re-expanded into full anatomy or reduced to a detached universal icon token;
- the negative list contains no more than the five compressed categories;
- the three-line stop rule above is present;
- the final prompt is materially shorter than the full Generation Spec and does not restate it.

---

## 14. Relation-conditioned composition compiler

```yaml
composition_mode: relation_conditioned_scale_with_active_negative_space
canvas_aspect_ratio: "1:1"
relationship_scale_classes:
  placement_wide: long axis 15%–35%; dominant blank usually 50%+
  interaction_medium: long axis 25%–50%; dominant blank usually 35%+
  expression_close: long axis 35%–65%; dominant blank usually 25%+
subject_occupancy_target: relationship-resolved
dominant_blank_field_target: relationship-resolved
primary_subject_long_axis_target: relationship-resolved
```

Compile these composition fields from the Minimal Cue Plan before emitting visual primitives:

- `composition_intent`
- `relationship_scale_class`
- `scale_evidence`
- `subject_scale_intent`
- `negative_space_strategy`
- `positional_relation_priority`

Rules:

- Choose `placement_wide` when separation, leading, containment, or broad placement is the
  relationship; choose `interaction_medium` for readable two-party contact; choose
  `expression_close` when support, edge-peeking, contact, or expression requires proximity.
- Never default to small merely because the style uses negative space.
- Generate natively on a square canvas; do not generate another ratio and crop afterward.
- Record the source-conditioned `subject_cluster_zone` and `dominant_blank_field`; do not hardcode
  a universal corner or edge.
- Preserve one dominant blank field at the chosen class's approximate threshold.
- Do not shrink merely to satisfy a style quota; do not enlarge merely for generic recognizability.
- Keep an interaction partner / object / framing cue subordinate; its admission does not permit
  the approved cluster to fill the page.
- Prefer positional readability over anatomical completion.
- Prefer one interaction cue plus a large blank field over a larger, more complete subject.
- Keep surrounding empty space active and intentional; never add marks to balance it.
- Preserve relational placement — contact, containment, support, lead, edge / corner proximity,
  or anchoring by the single approved structural cue — without reproducing exact photo geometry.
- Once the core subject and core interaction are readable, stop drawing. Preserve blank space
  instead of completing anatomy or balancing the composition.
- If an extra line reduces the large open field without improving identity, expression, action,
  or relation, delete it.

The bands are approximate and composition-facing. The compiler must record relationship evidence,
not merely a desire for easier recognition, stronger centering, or visual balance.
