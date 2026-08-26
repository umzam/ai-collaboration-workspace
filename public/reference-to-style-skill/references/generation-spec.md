# Generation Spec (structured intermediate layer)

The Generation Spec is a **structured intermediate artifact**, not the final image-generation
prompt. It sits between the **fixed Confirmed Style Profile** (`references/confirmed-style-profile.md`,
loaded directly — not re-analyzed) + **Minimal Cue Plan** (and Content Essence Card) and the
actual generation call, so the style intent is reviewable, backend-swappable, and auditable
without being coupled to prompt engineering. In v0.2.2 the spec is **compiled by the loose-line
compiler** and must pass the **Generation Spec Validator** (§6) before any image call.

**Style fields come from the fixed profile, not from user references.** The user supplies no
style references at runtime; the style is read from the fixed profile. Optional user
preserve / delete / emphasize notes are applied as **cue overrides** in the Minimal Cue Plan, which
then drives this spec.

---

## 1. Base fields (14)

| # | Field | Source |
|---|---|---|
| 1 | `subject` | **From the source photo** (via the Content Essence Card) — never from reference content (there are no references at runtime). |
| 2 | `composition` | Confirmed Style Profile (CORE). |
| 3 | `proportion` | Confirmed Style Profile. |
| 4 | `shape_language` | Confirmed Style Profile. |
| 5 | `edge_treatment` | Confirmed Style Profile. |
| 6 | `palette_behavior` | Confirmed Style Profile (core + preference). |
| 7 | `texture` | Confirmed Style Profile. |
| 8 | `material` | Confirmed Style Profile — observable mark-making only. |
| 9 | `background` | Confirmed Style Profile. |
| 10 | `feature_grammar` | Confirmed Style Profile (face-bearing subjects only). |
| 11 | `emotional_tone` | Confirmed Style Profile (soft hint). |
| 12 | `intentional_imperfection` | Confirmed Style Profile. |
| 13 | `avoid_rules` | Confirmed Style Profile (AVOID class). |
| 14 | `style_strength` | `LOW` / `MEDIUM` (default) / `HIGH`. |

---

## 2. Content-extension fields (only when a Source Content Image exists)

| Field | Meaning |
|---|---|
| `source_subject` | Subject taken from the Content Essence Card. |
| `content_essence` | Condensed expressive-essence summary. |
| `pose` | From Content Essence Card. |
| `gaze` / `expression` | From Content Essence Card (where applicable). |
| `must_preserve_content` | The **semantic** bucket that must survive restyling: `semantic_relation`, `expressive_direction`, `essential_action`, `identity-bearing cues`. **Translation rule:** each item is rendered as the *minimum visual cue* needed to communicate it, not a detailed depiction; salience-based extra strokes allowed only for highly salient / identity-bearing traits. See `references/content-essence.md` §2.1–2.2. |
| `may_discard_content` | Photographic geometry that may be **deleted by default** (not simplified): `photographic_pose_geometry`, `exact_limb_placement`, `exact_body_silhouette`, `tail_geometry`, `non_essential_perspective_geometry`. See `references/content-essence.md` §2.2. |
| `may_simplify_content` | Anatomy / texture / lighting / background the style may simplify. |
| `transferable_style_rules` | The Fixed Confirmed Style Profile's CORE/SECONDARY rules to apply. |
| `avoid_reference_content_leakage` | **Runtime: always empty.** No reference content exists at runtime (the user supplies no references). User "delete / don't include" requests are handled as cue overrides in the Minimal Cue Plan, not here. |

### 2.1 Feature-first reconstruction fields (when a Source Content Image exists)

These fields operationalize **principle 14 (feature-first reconstruction)**. They re-express the
Content Essence Card as a *reconstruction plan* rather than a silhouette to trace.

| Field | Meaning |
|---|---|
| `salient_features` | The critical identity / expression / action / relationship cues selected from the source (output of **Feature Selection**). Each entry names a cue plus the minimum visual cue that will represent it. |
| `essential_action_relation` | The key action or relationship to preserve even when most body detail is omitted (e.g., a contact / lead relation, a head tilted toward viewer). |
| `discarded_photo_geometry` | Explicit list of photographic geometry the result must NOT preserve — full source silhouette, exact limb positions, fur texture, volumetric shading, background scene. |
| `reconstruction_strategy` | Short plan for recombining the salient features into a new simplified composition (**Selective Reconstruction**) — e.g., "single open contour for body, one mark per limb, minimal face marks, relational cue kept". |
| `identity_signature` | The 2–4 cue combination whose proportions, asymmetry, placement, and expression relationships keep the source individual recognizable. |
| `source_relative_proportions` | Identity-bearing proportional relationships only; never full photographic geometry. |
| `asymmetry_to_preserve` | Identity- or expression-bearing asymmetry that must not be normalized. |
| `recognizability_floor` | Minimum identity cue combination required before further deletion stops. |

The Source Content Image's subject **must not** be overwritten by the style.

### 2.2 Canvas, background & exaggeration (loose_line compiler-enforced)

These settings are owned by the loose-line compiler (see `references/loose-line-compiler.md` §4
and the `selective_exaggeration` setting). They are recorded here so the spec is auditable:

| Field | Value / meaning |
|---|---|
| `canvas_tone` | `warm_off_white` / `light cream` / `soft beige` — paper tone, **not** color rendering. Default is warm paper, never a blank white digital canvas. |
| `background_scene` | `none`. |
| `background_detail` | `none`. |
| `background_marks` | `0–1 minimal ground cue only`. |
| `canvas_aspect_ratio` | Fixed `1:1`. Compose natively for a square canvas; do not inherit the source-photo aspect ratio and do not achieve the square by post-generation cropping. |
| `mark_surface_behavior` | Role-scoped hierarchy: only 2–3 dominant structural / relation gestures may show pressure or width variation, uneven deposition, and tapered ends; secondary marks are thin, light, and single-pass; face marks are flat, compact, solid, and featureless. Final-prompt retraces and edge fragments = 0. |
| `selective_exaggeration` | `{ allowed_scope: "identity/action-bearing cues only; graphic proportion / directional emphasis shift (may be noticeable), never detail-increase", forbidden: ["whole-body cartoon","chibi proportions","extra contour lines","extra facial detail","cartoon decoration","detail-increase exaggeration"] }`. |

These are **not** color / wash / fill modes — v0 stays line-only.

---

## 2.3 Scene-level entity allow / forbid (driven by the Scene Selection Card)

The Scene Selection Card (`references/scene-selection.md`) is the sole authority on which source
entities may appear. The Generation Spec carries that decision as two explicit fields so the
Validator and the generation call cannot reintroduce excluded content:

| Field | Value |
|---|---|
| `allowed_entities` | `primary_subject`, `approved_interaction_partner`, `approved_interaction_object`, `approved_framing_cue` — only these may appear in the spec. |
| `forbidden_entities` | `excluded_elements` (everything the Scene Selection Card excluded) + scene clutter, decorative background objects, non-essential furniture, tabletop objects, and unrelated environment geometry. |

**Hard rule — Do not reward visual salience alone.** A large or prominent source object must still
be omitted if it is not interaction-relevant. Visual size, brightness, centrality, or original-
composition presence are **not** admission reasons (*prominent ≠ qualified*). If a non-animal
element is not in `allowed_entities`, it is treated as `forbidden` regardless of how visible it was
in the photo.

The `environment_budget` (`max_structural_context_cues: 1`) is also enforced here: at most one
structural / framing cue may appear, and only if it carries interaction / framing / containment /
spatial legibility.

These fields are compiled by the loose-line compiler and checked by the Generation Spec Validator
(§6, including the scene-level FAIL conditions `context_intrusion` / `subject_dilution` /
`interaction_underweight` in `references/style-qa.md`).

---

### 2.4 Composition intent (Minimal Cue Plan + fixed profile)

The Generation Spec carries the composition decision explicitly:

| Field | Value / meaning |
|---|---|
| `composition_mode` | Fixed value: `relation_conditioned_scale_with_active_negative_space`. |
| `relationship_scale_class` | `placement_wide`, `interaction_medium`, or `expression_close`. |
| `scale_evidence` | Spatial Fact Map evidence justifying the chosen class. |
| `subject_occupancy_target` | Relationship-resolved target; no universal small-subject value. |
| `composition_intent` | The Minimal Cue Plan's relation-conditioned composition intent. |
| `subject_scale_intent` | The scale needed to make identity plus the approved relation immediately readable. |
| `negative_space_strategy` | The broad blank field to keep open; never fill it for balance. |
| `positional_relation_priority` | The contact / containment / support / lead / edge relation whose placement must survive. |
| `subject_cluster_zone` | Source-conditioned page zone for the allowed subject + interaction cluster; never replaced by generic centering. |
| `dominant_blank_field` | The largest intentional empty region; threshold resolved by relationship class. |
| `primary_subject_long_axis_target` | `15%–35%`, `25%–50%`, or `35%–65%`, following the selected class. |

The allowed subject is not automatically enlarged to fill the frame. Preserve relational
placement and surrounding blank space; recognizability alone does not justify scale-up.

---

## 3. style_strength behavior

A global intensity dial — it changes *strength* and whether HIGH-only sub-behaviors
activate; it does **not** change which fields exist.

- **LOW** — style applied gently; more of the source/content naturalism retained.
- **MEDIUM** (default) — balanced application.
- **HIGH** — style pushed firmly: preference-level rules become stricter (e.g.,
  warm-neutral locks, imperfection rises to pronounced, background pushes fully empty,
  negative space expands). `emotional_tone` appears only at MEDIUM+ (omitted at LOW).

There is **no** continuous 0–100 parameter.

---

## 4. Field classification (who supplies)

- **Fixed config (no runtime human step):** composition, proportion, shape_language,
  edge_treatment, palette_behavior (core + preference), depicted surface texture, material,
  `mark_surface_behavior`, background, `canvas_aspect_ratio`,
  avoid_rules, intentional_imperfection, feature_grammar, canvas_tone, background_*, and
  selective_exaggeration, `composition_mode`, `subject_occupancy_target`, and
  `default_max_subject_occupancy`, and `final_prompt_activation_firewall` — **all read from the fixed Confirmed Style Profile**
  (`references/confirmed-style-profile.md`). No Visual Analysis, no Draft Profile, no G1 at
  runtime.
- **AI auto-generated from the source photo:** `subject` (from Content Essence Card),
  `content_extension` fields, `salient_features`, `identity_signature`,
  `source_relative_proportions`, `asymmetry_to_preserve`, `recognizability_floor`, `essential_action_relation`,
  `discarded_photo_geometry`, `reconstruction_strategy`, `composition_intent`,
  `subject_scale_intent`, `negative_space_strategy`, `positional_relation_priority`,
  `subject_cluster_zone`, `dominant_blank_field`, and `primary_subject_long_axis_target`.
- **Optional user input:** `style_strength` (default MEDIUM; legacy intensity dial only);
  natural-language preserve / delete / emphasize notes (applied as Minimal Cue Plan overrides
  before spec compilation).
- **HIGH-only sub-behaviors:** warm-neutral lock, imperfection → pronounced, background →
  fully empty, negative-space expansion; `emotional_tone` present only at MEDIUM+.

---

## 5. JSON template (artist-agnostic placeholders)

```json
{
  "subject": "<user-described subject; never reference content>",
  "composition": "<isolated subject + generous negative space>",
  "proportion": "<simplified / compact / naive reduction>",
  "shape_language": "<rounded / compact / organic>",
  "edge_treatment": "<loose line with strong mark economy; extremely low line density; open/broken contour; one line may represent a limb; minimal facial marks; large blank areas>",
  "palette_behavior": {
    "saturation": "low (core)",
    "brightness": "high-key (core)",
    "hue_family": "warm-neutral (preferred, not mandatory)"
  },
  "texture": "<depicted subject / surface texture: none; line-only (loose_line)>",
  "material": "<observable line mark-making; no medium claim>",
  "canvas_aspect_ratio": "1:1",
  "source_aspect_ratio_inheritance": false,
  "mark_surface_behavior": "<2-3 dominant structural/relation gestures may vary in pressure and width; secondary marks thin, light, single-pass; face marks flat and compact; do not request retrace or edge fragments>",
  "background": "<minimal / sparse; no scene>",
  "feature_grammar": "<minimal marks on face-bearing subjects only>",
  "emotional_tone": "<soft hint; omitted at LOW>",
  "intentional_imperfection": "<moderate; pronounced at HIGH>",
  "avoid_rules": ["photorealism", "polished digital", "vector-clean",
                   "complex background", "high saturation", "cinematic lighting",
                   "detailed anatomy", "anime-cute", "glossy 3D", "excess decoration"],
  "style_strength": "MEDIUM",
  "composition_mode": "relation_conditioned_scale_with_active_negative_space",
  "relationship_scale_class": "<placement_wide | interaction_medium | expression_close>",
  "scale_evidence": "<approved relationship fact requiring this scale>",
  "subject_occupancy_target": "<relationship-resolved>",
  "composition_intent": "<relationship-readable scale + active negative space>",
  "subject_scale_intent": "<scale required by identity plus approved relation>",
  "negative_space_strategy": "<preserve broad blank fields; do not fill balance gaps>",
  "positional_relation_priority": "<preserve the approved relational placement without enlarging the subject>",
  "subject_cluster_zone": "<source-conditioned zone within the square page>",
  "dominant_blank_field": "<largest intentional empty field; threshold follows relationship class>",
  "primary_subject_long_axis_target": "<15%-35% | 25%-50% | 35%-65%>",
  "final_prompt_activation_firewall": {
    "texture_adjacent_identity_terms": "translate_then_remove",
    "detailed_anatomy_terms": "translate_then_remove",
    "body_completion_language": "forbidden",
    "source_identity_semantics": "keep_in_intermediate_only",
    "primitive_relationships": "keep"
  },
  "content_extension": {
    "source_subject": null,
    "content_essence": null,
    "pose": null,
    "gaze_expression": null,
    "must_preserve_content": [],
    "may_discard_content": [],
    "may_simplify_content": [],
    "transferable_style_rules": [],
    "avoid_reference_content_leakage": [],
    "salient_features": [],
    "identity_signature": [],
    "source_relative_proportions": [],
    "asymmetry_to_preserve": [],
    "recognizability_floor": null,
    "essential_action_relation": null,
    "discarded_photo_geometry": [],
    "reconstruction_strategy": null
  },
  "canvas_tone": "warm_off_white",
  "background_scene": "none",
  "background_detail": "none",
  "background_marks": "0-1 minimal ground cue only",
  "selective_exaggeration": {
    "allowed_scope": "identity/action-bearing cues only; graphic proportion / directional emphasis shift (may be noticeable), never detail-increase",
    "forbidden": ["whole-body cartoon", "chibi proportions", "extra contour lines",
                  "extra facial detail", "cartoon decoration", "detail-increase exaggeration"]
  }
}
```

## 6. Generation Spec Validator (runs before any image call)

Before the spec reaches image generation, the validator checks the compiled spec and **auto-fixes**
conflicts — it does **not** ask the user. A focused Human Gate is triggered only when the AI cannot
tell which cue the user truly wants to keep.

### 6.1 Cue budget — information units, not stroke count
The budget is expressed primarily as **information units** (see `references/loose-line-compiler.md`
§2), not a raw stroke count:

- `total_major_marks`: 9–12
- `primary_large_forms`: 2–4
- `expressive_marks`: 1–3
- `relation_marks`: 1–2
- `secondary_subject_forms`: 1–3
- `descriptive_marks`: 0  (anything that only "completes" anatomy / pose / silhouette is forbidden)
- `identity_signature_cues`: target 2–4; minimum 2 unless the source genuinely offers only one
- `face_marks`: maximum 4; flat, compact, solid, featureless
- `body_connection_gestures`: target 1; allow up to 3 with explicit stance / relation justification
- `contact_gestures`: maximum 1 per essential relation
- `anatomy_completion_marks`: 0
- `edge_fragment_accents_requested`: 0; QA may tolerate 0–4 naturally occurring interruptions confined to dominant forms
- `local_retraces_in_final_prompt`: 0
- `dominant_pressure_gestures`: 2–3; all remaining marks thin / light / single-pass

The 9–12 range is a hard compilation target, but **stroke count is not the only target** — a small
set of fragmented or generic marks still fails when the marks do not carry selected cues.

- The validator checks each mark's **scale**, **fragmentation**, **redundancy**, and
  **descriptive function**, not merely the number:
  - complete, necessary, decisive lines may PASS;
  - furry / facial-descriptive / completion short lines should FAIL.
- `max_major_marks` totals must stay within these units; obvious over-budget → compress / merge.
- Do **not** mechanically satisfy a numeric budget by counting strokes.

### 6.2 Geometry leakage
- No unlisted source-photo geometry preserved — anything outside the Minimal Cue Plan is dropped.
- No "full source silhouette" / "complete body outline" description present.

### 6.3 Detail leakage (forbidden in any generation description)
fur texture, individual hair, fluffy detail, realistic eye construction, hatching, shading,
volume rendering, detailed anatomy, depicted surface texture. Do not remove permitted role-scoped
`mark_surface_behavior`: pressure / width variation belongs only to 2–3 dominant structural or
relation gestures. Secondary marks remain thin, light, and single-pass; face marks remain flat,
compact, solid, and featureless. Final-prompt retraces, microfragments, and edge fragments are
forbidden.

### 6.4 Mode conflict (execution = loose_line)
If the execution mode is `loose_line`, the spec must NOT contain: watercolor, wash, color fill,
soft brush fill, painterly rendering, gradient, tonal modeling. Any conflict is auto-removed by the
validator (no user question). See `references/loose-line-compiler.md` §5.

### 6.5 Canvas tone guard
- `canvas_tone` must be a warm paper tone (`warm_off_white` / `light cream` / `soft beige`) — a
  blank white digital canvas is **not** allowed as the default ground.
- `canvas_aspect_ratio` must be `1:1`; the image must be composed natively as a square, must not
  inherit the source aspect ratio, and must not rely on post-generation cropping.
- `background_scene` = none, `background_detail` = none, `background_marks` ≤ 1.
- The paper tone must **not** become color rendering: forbid watercolor fill, tonal wash, color
  shading, painterly fill, grey wash, color block (auto-remove; no user question). See
  `references/loose-line-compiler.md` §4.

### 6.6 Selective exaggeration discipline
- Exaggeration may appear **only** on identity-bearing / action-bearing cues, and only as `slight`.
- Auto-remove any: whole-body cartoon / chibi proportions, extra contour lines, extra facial
  detail, cartoon decoration, or exaggeration achieved by adding detail.
- The whole body must remain a sparse reconstruction, not a mascot.

### 6.7 furry_edge_leak (FAIL)
FAIL if:
- dominant edges accumulate repeated fragments beyond a few sparse dry interruptions;
- face edges acquire repeated local short strokes;
- zig-zag / fragmentary strokes are used to suggest fur;
- any tendency to create a "furry feeling" through fine-line count.

### 6.8 facial_over_description (FAIL)
FAIL if the face exceeds its **cue budget** (see `references/minimal-cue-plan.md` §8 / §10) — i.e.,
more facial marks than recognition / expression require given the view and subject role:
- auxiliary structure lines appear around the eyes;
- redundant structural explanation appears around the nose;
- descriptive sketch lines appear at the mouth / chin;
- facial support lines noticeably increase the realistic feel;
- a facial component is completed merely because it exists in the source, despite not earning its
  place.

### 6.9 body_completion_drift (FAIL)
FAIL if:
- the body contour trends toward complete closure;
- the limbs are each clearly accounted for;
- body structure grabs more information than the action-relation itself;
- unnecessary lines are added to maintain a photographic pose.

### 6.10 small_line_fragmentation (FAIL)
FAIL if:
- many short fragmentary lines appear outside dominant identity forms;
- a large form is split into enough small lines to read as surface description rather than one gesture;
- the image, though sparse in line count, still reads as visually fragmented;
- mark count looks low but lacks complete, decisive large-form organization.

### 6.11 eye_anatomy_drift (FAIL)
FAIL if the eye drifts toward rendered anatomy:
- a complete eyeball is drawn;
- eyelid construction appears;
- realistic catchlight / reflection appears;
- eye-area auxiliary / support lines appear.
- iris / pupil hierarchy, ring construction, eyelid modeling, or multiple optical highlights appear.
A single tiny internal paper reserve may pass when the enclosing mark remains flat and graphic;
expression still comes primarily from relative spacing, size, offset, and direction.

### 6.12 human_figure_sketch_drift (FAIL)
FAIL if a human / fully-bodied figure participant reads as a **figure sketch** rather than a
relation-bearing large form:
- the figure looks like a carefully drawn person (every limb / clothing item accounted for);
- clothing structure / layers / folds are explained;
- shoes, fingers / hands, or hair are drawn with care;
- the figure's anatomical information outweighs the relation it participates in.
- Applies the `human_reduction_rule` (`references/loose-line-compiler.md` §9).

### 6.13 relation_underweighted (FAIL)
FAIL if, in a relation-dominant source, both participants are clearly drawn but the core
interaction / contact / lead relation between them is **not** the most prominent element:
- the action / contact relation is buried under subject anatomy;
- limbs / bodies are completed while the relation cue is weak or missing.
- The relation should consume more of the budget than either subject's anatomy once it is legible.

### 6.14 descriptive_completion (FAIL)
FAIL if the model adds any mark only to make the image "look complete":
- drawing the other leg / other ear interior / clothing hem / tail / side-of-face line merely to
  finish a form;
- any mark that exists only to complete anatomy, silhouette, texture, volume, or photographic
  resemblance — not to carry identity / expression / action / relation.
- This is the umbrella check behind `body_completion_drift` and `human_figure_sketch_drift`.
- Final-prompt local retraces and extra secondary traces have zero allowance; structural emphasis
  belongs inside the 2–3 dominant gestures themselves.

### 6.15 scene-entity containment (pre-gen guard, mirrors the QA scene-level FAILs)
Before the spec reaches image generation, enforce the Scene Selection Card's authority:
- **No `forbidden_entities`** may appear in the spec — `excluded_elements`, scene clutter,
  decorative background objects, non-essential furniture, tabletop objects, and unrelated
  environment geometry are removed (auto-fix, no user question).
- **No salience-based admission** — a large / prominent source object that is not in
  `allowed_entities` is still removed.
- **`environment_budget` honored** — at most one structural / framing cue, and only if it carries
  interaction / framing / containment / spatial legibility.
- The full scene-level FAIL definitions (`context_intrusion`, `subject_dilution`,
  `interaction_underweight`) live in `references/style-qa.md` §1.7–§1.9 and are re-checked after
  generation.

### 6.16 relation-conditioned composition guard

Before the image call:

- require `composition_mode: relation_conditioned_scale_with_active_negative_space`;
- require `canvas_aspect_ratio: 1:1` and native square composition;
- require `relationship_scale_class` and `scale_evidence` from the Spatial Fact Map;
- require the matching long-axis band: `placement_wide` 15%–35%, `interaction_medium` 25%–50%,
  or `expression_close` 35%–65%;
- reject both automatic shrinkage for style quota and scale-up performed only for recognizability,
  centering, or visual balance;
- require the interaction partner / object / framing cue to remain subordinate and not fill the
  page collectively;
- require `negative_space_strategy` to preserve a broad open field;
- require one dominant blank field at the chosen class's approximate threshold (50% / 35% / 25%);
- require a source-conditioned `subject_cluster_zone`; never replace it with generic centering;
- require `positional_relation_priority` to retain relational placement rather than substitute a
  large centered subject;
- auto-remove marks introduced only to fill blank space or balance the composition.

Post-generation failures are `subject_fill_drift`, `negative_space_loss`, and
`position_relation_flattening` (`references/style-qa.md` §1.10–§1.12).

### 6.17 generic_mascot_drift (FAIL)

FAIL if the compiled subject could be replaced by a generic cute class icon without losing any
selected source-conditioned identity cue. Reject mirrored default forms, universal dot-dot-mark
face grammar with no retained proportion / asymmetry relationship, and whole-subject mascot
normalization.

### 6.18 synthetic_monoline_drift (FAIL)

FAIL if the prompt permits uniform width / opacity, smooth digital curves, evenly rounded ends,
or equal visual weight for every line. Require positive `mark_surface_behavior` and a dominant-
versus-secondary mark hierarchy.

### 6.19 identity_signature_collapse (FAIL)

FAIL if the spec does not meet `recognizability_floor`, drops a required relative proportion or
asymmetry, or preserves the subject class while losing the source individual's signature.

### 6.20 primitive_semantic_detachment (FAIL)

FAIL if a final-prompt primitive has a count but no semantic cue, relative placement, or gesture
character. Auto-repair by reattaching the corresponding Minimal Cue Plan fields; never repair by
expanding into complete anatomy.

### 6.21 final_prompt_activation_leak (FAIL)

FAIL if the final image prompt retains texture-adjacent identity language, detailed anatomy
language, body-completion language, or source-surface descriptors after primitive translation.
Keep those semantics in intermediate artifacts only. The final prompt may retain only the short
semantic anchor plus primitive relationships: dot / dab, arc, open form, short stroke, overlap,
gap, relative spacing, directional spread, and blank field.

### 6.22 mark_surface_scope_drift (FAIL)

FAIL if uneven deposition, pressure / width variation, broken behavior, or heavy darkness is
requested globally. Emphasis belongs mainly to 2–3 dominant structural / relation gestures.
Secondary marks stay lighter; a few naturally occurring dry interruptions inside dominant forms
are acceptable when they do not become depicted texture.

### 6.23 body_support_overbudget (FAIL)

FAIL if body-connection or limb gestures exceed what the recorded stance / relation evidence needs.
Target one connection; allow up to three when they materially clarify stance, support, contact, or
identity. Extra anatomy added only for completion still fails.

### 6.24 square_canvas_missing (FAIL)

FAIL if the spec does not request a native `1:1` canvas, inherits the source-photo ratio, or plans
to obtain a square by cropping. Auto-repair by setting the canvas to `1:1` before generation and
re-solving the subject cluster and blank field within that square.

---

When no Source Content Image is supplied, `content_extension` is `null` and `subject` comes
from text intent.
