---
name: reference-to-style
description: >-
  Restyle the user's own photo in a FIXED, pre-confirmed visual language (warm-paper,
  loose-line, visible hand-drawn mark variation, high mark economy, and source-conditioned
  identity retention). The user supplies ONE source photo and may add
  natural-language preserve / delete / emphasize notes. The style is NOT re-derived at
  runtime — a confirmed Style Profile is loaded as a fixed internal config (built during
  skill development from reference images, but reference images are NEVER a runtime input).
  Covers scene-role assignment, an inclusion filter, content-essence extraction, feature
  selection, a minimal-cue plan, a loose-line compiler, a generation-spec validator, and
  visual-language-retention QA. Do NOT use for product/PRD decisions or for reproducing
  source content verbatim.
---

# Reference-to-Style (v0.3.3)

**Status:** `FROZEN_FOR_PORTFOLIO`  
**Frozen snapshot:** `v0.3.3` on `2026-08-21`. Runtime design rules are frozen; future design
changes require an explicit unfreeze / new iteration. The `ai-collaboration-workspace` project may
read and display this Skill, its references, and its preserved test-run records as a portfolio artifact.

Restyle the user's **own photo** in a **fixed, pre-confirmed** visual language — a warm-paper,
loose-line drawing with strong mark economy. The user supplies exactly one source photo; the
style is a baked-in internal config, not something re-derived from references at runtime.

This is a **style-frozen** skill. It keys behavior on the user's *photo* against a *fixed internal
Style Profile* (`references/confirmed-style-profile.md`). It never keys on an artist's name, a
style taxonomy name, or any source-specific string, and it never asks the user for reference
images.

---

## 0. Operating principles (the contract)

1. **Fixed style config, not runtime reference-driven.** The visual language is a
   pre-confirmed Style Profile loaded as an internal fixed config
   (`references/confirmed-style-profile.md`). It is **not** re-derived from user-supplied
   reference images, and it is **not** re-confirmed at runtime. Behavior never keys on an
   artist name. If a user names an artist and expects that artist's style, the skill still
   applies its frozen profile (the runtime is not artist-specific).
2. **No source-specific hardcoding.** No string, color value, rule, or branch specific
   to one test case belongs in this engine. (A full-text scan of this skill must yield
   zero source-specific strings.)
3. **Gate resolved at build time, not at runtime.** The single Human Gate (G1) that
   settles key aesthetic calls was confirmed during skill development and is baked into the
   fixed Style Profile. Ordinary runtime does **not** re-open G1. Only genuine ambiguity in
   the user's *own photo* (e.g., which action / relation must be preserved) triggers one
   focused question — and that is a *content* question, not a style gate.
4. **Do not over-ask.** Low-risk, observable features are decided by the AI (as a draft)
   and are not surfaced for confirmation.
5. **Do not re-ask provided information.** Subject, intent, `style_strength`, etc. that
   the user already supplied are consumed silently.
6. **AI auto-handles low-risk observable features.** Extraction produces a *draft*, not a
   final ruling.
7. **Only genuine photo ambiguity triggers a question.** If the user's own photo makes it
   genuinely unclear which action / relation / identity cue must be preserved, ask exactly
   one focused question. Aesthetic-style calls are already settled in the fixed profile and
   are never re-asked.
8. **Style QA ≠ pixel similarity.** QA measures whether the *visual language* is retained.
9. **QA evaluates visual-language retention**, checked against the confirmed Style
   Profile.
10. **Bounded iteration.** At most **one** Revision. No open-ended regenerate loops.
11. **Preserve expressive essence, not photographic rendering.** When a source content
    image is supplied, retain the subject's identity cues, gaze, facial expression, head
    angle, ear/tail attitude, body tension, pose, interaction state, and distinctive
    temperament — the user's "神态". Do **not** treat preservation as photographic: fur
    detail, exact lighting, depth of field, background clutter, camera noise, exact
    texture, and exact pixel geometry are explicitly droppable.
12. **User-facing Human Gate language follows the user's language.** All text the user
    actually reads to make an aesthetic decision — gate questions, explanations,
    recommendation reasons, option text, and action hints — is written in the user's
    current conversation language (e.g., Chinese in → Chinese out; English in → English
    out). Internal field names, schema keys, and enum values may stay in English; the user
    should never have to read English internal terminology just to make an aesthetic call.

13. **Mark economy and contour openness are profile-level, calibrated settings — not global
    rules.** When a confirmed Style Profile sets `mark_economy` and/or `open / broken contour`
    as CORE, generation and QA honor that target level: `must_preserve` items are translated
    into minimal visual cues, and detail is admitted only by salience-based selection (a highly
    salient identity feature, an immediately noticeable characteristic, or a critical expression
    cue). A different reference set with a high-detail language may set a higher information
    budget; the engine must not impose "fewer lines" universally.

14. **Feature-first reconstruction — a source photo is NOT a trace-then-simplify template.** When
    a Source Content Image is present, do **not** treat it as a geometry template to outline and
    then simplify (photo-tracing). Run a three-step internal logic instead:
    - **Feature Selection** — identify the subject's most critical *identity*, *expression*,
      *action*, and *relationship* cues.
    - **Feature Compression** — each key feature keeps only the minimum visual cue needed to
      communicate it; non-key contours, fur, texture, volume, and background are **deleted first**,
      not merely simplified.
    - **Selective Reconstruction** — recombine those key features into a *new*, simplified
      composition, rather than tracing the source's full silhouette or doing photo-tracing-style
      reduction.
    When the execution family is `loose_line`, the following are explicit:
    - do not trace the source silhouette;
    - do not preserve full photographic geometry;
    - use partial contours only where needed;
    - one short mark may represent an entire limb or structural cue;
    - facial features should be symbolic / minimal marks, not anatomical rendering;
    - preserve action relationships (e.g., a contact / lead relation) even when most body
      detail is omitted.
    - **selective_exaggeration** — for identity-bearing or action-bearing cues only, and it may
      **noticeably** alter graphic proportion or directional emphasis (ears clearly larger, head
      slightly larger, body collapsed to an arc, a limb direction made more decisive, a contact /
      lead line longer and straighter); it must **never** increase descriptive detail — a
      proportion / emphasis shift, not more marks; the whole body must not become a cartoon (no
      chibi / mascot proportions); extra contour lines, extra facial detail, and cartoon
      decoration are forbidden.

These three steps are the **fixed generation order** for any source-photo restyle. They are
implemented as **Stage A (Feature Selection) → Stage B (Feature Compression) → Stage C
(Selective Reconstruction)** in `references/loose-line-compiler.md` and enforced by the
Generation Spec Validator.

15. **Warm paper canvas, not white digital — v0 `loose_line` keeps a warm paper tone as the ground.**
    The default canvas is a warm paper tone (`warm_off_white` / `light cream` / `soft beige`), never
    a blank white digital canvas. This is a *paper tone*, **not** color rendering — it does **not**
    reinstate `soft_brush_fill`, `wash`, or `fill`. Background stays scene-less: `background_scene`
    none, `background_detail` none, `background_marks` 0–1 minimal ground cue only. Color fill, tonal
    wash, watercolor, painterly fill, and grey wash remain forbidden (deferred modes). See
    `references/loose-line-compiler.md` §4.

16. **Allow graphic distortion; forbid descriptive completion.** Omission must be *structural*
    (build the image from selected cues) — never *subtractive* (draw the photo, then erase lines).
    A large-form distortion is acceptable when it improves cue clarity and preserves expressive
    essence; graphic readability outranks photographic geometric fidelity. A mark may exist only if
    it carries identity, expression, action, or relation — never merely to make a form look
    complete. This is the governing philosophy of v0.2.x (see `references/minimal-cue-plan.md`
    §10–§11, `references/loose-line-compiler.md` §9–§11, `references/style-qa.md` §1.5–§1.6).

17. **Scene selection is upstream of cue minimization.** Before deciding *how* to draw minimally,
    decide *what may enter the frame at all*. Every source entity must pass **Scene Role Assignment**
    + the **Inclusion Filter / Non-animal Inclusion Test** (`references/scene-selection.md`) before
    it can reach the Minimal Cue Plan. **Visual salience, size, proximity, or original-composition
    presence are NOT admission reasons** (*prominent ≠ qualified*). The output of this stage is the
    **Scene Selection Card**, which is the **sole authority** on allowed entities; everything it
    excludes is excluded downstream (Minimal Cue Plan, Compiler, Generation Spec, QA) and may not be
    auto-restored. The lower layers must never re-run scene selection.

18. **Subject scale follows the approved relationship; negative space stays active.** v0
    `loose_line` uses `composition_mode: relation_conditioned_scale_with_active_negative_space`.
    Resolve `placement_wide`, `interaction_medium`, or `expression_close` from the Spatial Fact
    Map. Separation / leading / containment usually needs a smaller cluster; direct contact,
    support, edge-peeking, or expression may need a medium or close cluster. Never shrink blindly
    to satisfy a style quota, and never enlarge merely for generic recognizability. Preserve
    contact / containment / support / lead / edge placement as compositional meaning. See
    `references/minimal-cue-plan.md` §4.1, `references/loose-line-compiler.md` §14, and
    `references/style-qa.md` §1.10–§1.12.

19. **Economy must not erase individuality; line economy is not icon grammar.** Before deleting
    cues, establish a source-conditioned `identity_signature` and `recognizability_floor`.
    Preserve the minimum set of relative proportions, asymmetries, directional features,
    expression relationships, and characteristic mass cues that keep the individual recognizable.
    Keep every visual primitive attached to its semantic cue, source-relative placement, and
    gesture character. Before final-prompt compilation, translate texture-adjacent identity terms,
    detailed anatomy, and body-completion language into relative geometry, flat dark dabs, open
    forms, arcs, gaps, overlaps, and directional strokes, then remove the activating semantic
    terms. Hand-drawn variation is role-scoped: only 2–3 dominant structural / relation gestures
    may carry pressure / width variation and uneven deposition; secondary marks stay thin, light,
    and single-pass; face marks stay flat, compact, solid, and featureless. See
    `references/minimal-cue-plan.md` §4.2 and `references/loose-line-compiler.md` §12–§13.

20. **The runtime canvas is a native square.** v0 `loose_line` always generates on a `1:1`
    canvas. Never inherit the source-photo aspect ratio and never obtain the square by cropping a
    differently composed image. Resolve the source-conditioned subject cluster, interaction, and
    dominant blank field directly inside the square. Blank-field and long-axis targets follow the
    relationship scale class rather than a universal small-subject percentage.

---

## 1. Trigger

Activate when **all** hold:

- The user supplies **exactly one source photo** (their own photo) and wants it restyled in
  the frozen loose-line visual language ("restyle this", "draw my photo like this", "turn
  this into a minimal line sketch").
- The task is **restyling a user photo**, not reproducing reference content.

Rules:

- **Reference images are NOT a runtime trigger input.** The style is a fixed internal config;
  the user is never asked for style references.
- **Artist name / style name alone is NOT a trigger.** The frozen profile is applied regardless
  of any named artist; do not assume or fetch a different style.
- The user may attach **optional natural-language notes** (preserve / delete / emphasize). Their
  presence does not change the trigger.
- Implicit trigger is fine (user drops one photo + "do one like this").

---

## 2. Inputs

| Input | Required? | Notes |
|---|---|---|
| **Source Content Image** (the user's own photo) | **Required** | Exactly one. Drives Content Essence Extraction → *"What should be depicted?"* Real image is passed into the generation call, never described-only. |
| **Preserve / delete / emphasize notes** (natural language) | Optional | The user's own requests, e.g. "重点保留这个动作", "不要旁边的人", "耳朵明显一点". Fed into the Minimal Cue Plan as cue overrides (force-include / force-exclude / slight-exaggerate). Never a style reference. |
| **style_strength** | Optional (default `MEDIUM`) | `LOW` / `MEDIUM` / `HIGH`. Legacy intensity dial only; does not change which fixed style applies. If supplied, never re-asked. |
| **execution_family pin** | Optional (v0.3.3: only `loose_line`) | v0.3.3 supports **exactly one** execution family: `loose_line` (source-conditioned identity, role-scoped hand-drawn mark variation, strong mark economy, feature-first reconstruction, and partial contours). Other modes — `soft_brush_fill`, `line_plus_light_wash`, `auto_mix`, and **any color / wash / fill execution** — are disabled and deferred. If the user requests a disabled mode, note it is out of scope and continue with `loose_line`. |

### Fixed internal config (not a runtime input)

- **`scene_focus_mode`** is a frozen internal config (default `animal_plus_interaction`): the
  primary visual subject must be an animal, only interaction-relevant humans / animals / objects are
  retained, unrelated background / clutter is default-excluded, and visual salience alone is **not**
  an admission reason. It is loaded as part of the skill, not chosen by the user at runtime.
- **`composition_mode`** is frozen as
  `relation_conditioned_scale_with_active_negative_space`. The Spatial Fact Map resolves
  `placement_wide` (15%–35%), `interaction_medium` (25%–50%), or `expression_close` (35%–65%) and
  records relationship evidence. There is no universal small-subject default.
- **`canvas_aspect_ratio`** is frozen at `1:1`. Compose natively in the square; never inherit the
  source-photo aspect ratio or use post-generation cropping. Blank field and subject long-axis
  targets follow the relationship scale class.

### Runtime has exactly ONE image role

- **Source Content Image** → answer *"What should be depicted?"* Drive Content Essence
  Extraction → Minimal Cue Plan. Extract: subject identity, pose, orientation, gaze, facial
  expression, body posture, interaction state, distinctive visible traits, expressive character.

The **Style Reference** role exists **only at build time** (skill development, where reference
images produced the fixed profile). It is documented in `experiments/…` provenance and
`CHANGELOG.md` — **not** supplied by the ordinary user and **not** re-run at runtime. There is
no "style reference role tagging", no per-run Visual Analysis, no per-run Draft Style Profile, and
no per-run G1.

---

## 3. Workflow — single runtime path

```
SOURCE PHOTO (1, user's own)
  → [AI] Content Essence Extraction → Content Essence Card            (auto; NOT a gate)
  → [AI] Scene Role Assignment     (assign a scene role to every source entity)   (NEW — principle 17)
  → [AI] Inclusion Filter          (must_include / conditionally_include /
                                    default_delete + Non-animal Inclusion Test)   (NEW — principle 17)
  → [AI] Spatial Fact Map          (core contact / relation / framing geometry of
                                    APPROVED entities only)                         (NEW)
  → [AI] Scene Selection Card      (sole authority on allowed entities; excluded = excluded downstream)
  → [AI] Feature Selection                                          (principle 14, Stage A)
  → [AI] Minimal Cue Plan        (only APPROVED entities; minimum cues;
                                  composition / scale / negative-space / position intents;
                                  unlisted geometry deleted by default;
                                  optional user preserve/delete/emphasize notes applied here)
  → [FIXED CONFIRMED STYLE PROFILE]                                 (loaded directly — NO re-analysis, NO G1)
  → [AI] Loose-Line Compiler      (forced line-only settings + quality-aware mark budget;
                                   native 1:1 relation-conditioned composition + role-scoped marks +
                                   activation-firewalled gestural final prompt; Stage A→B→C)
  → [AI] Generation Spec          (compiled from fixed profile + cue plan +
                                    allowed/forbidden entities from Scene Selection Card)
  → [AI] Generation Spec Validator (cue budget / geometry leak / activation leak / square canvas /
                                    mark-surface scope / scene-level FAILs — auto-fix, no user gate)
  → [AI] Image Generation         (source photo passed in; style from fixed profile)
  → [AI] Style QA                 (visual-language retention vs fixed profile + Content Essence
                                    Fidelity + scene-level FAILs)
  → [HUMAN FEEDBACK]             (accept / one directional revision — NOT a blocking gate)
  → [AI] Revision (≤1)           (targeted, user-directed)
  → STOP
```

If the source photo is genuinely ambiguous on *which action / relation must be preserved*, ask
**exactly one focused question** before Feature Selection — this is a content question, not a
style gate, and the fixed profile is not re-opened. The Scene Selection stage runs before that
question only if the photo's *content* (not style) ambiguity also blocks role assignment.

**Stage ownership**

- **AI auto:** Content Essence Extraction, Scene Role Assignment, Inclusion Filter, Spatial Fact
  Map, Scene Selection Card, Feature Selection, Minimal Cue Plan, Loose-Line Compiler, Generation
  Spec, Generation Spec Validator, Image Generation, Style QA (first pass), Revision compilation.
- **Fixed config (no human step):** the Confirmed Style Profile is loaded as-is. No Visual
  Analysis, no Draft Style Profile, no G1 at runtime.
- **Human:** post-generation is *feedback*, not a gate — the user accepts or gives one directional
  revision. A focused content question is allowed only on genuine photo ambiguity.

See `references/confirmed-style-profile.md`, `references/scene-selection.md`,
`references/content-essence.md`, `references/minimal-cue-plan.md`,
`references/loose-line-compiler.md`, `references/generation-spec.md`, `references/style-qa.md`,
`references/human-gate.md`.

---

## 4. Human Gate — resolved at build time, not at runtime

The single Human Gate (G1) that settles key aesthetic calls was confirmed **once, during skill
development**, and is baked into the fixed Style Profile (`references/confirmed-style-profile.md`).
**Ordinary runtime does not re-open G1.** The user is never asked to confirm the style.

Runtime may ask the user **at most one focused question** only when the *source photo itself* is
genuinely ambiguous — e.g., it is unclear which action / relation / identity cue must be preserved.
This is a **content** question (what to depict), not a style gate (how it should look). The fixed
profile is never re-negotiated.

Post-generation feedback is **not** a blocking gate (see §6). Full design in
`references/human-gate.md`.

**Language rule (principle 12):** any user-readable text — the optional focused question,
explanations, recommendation reasons, option text, and action hints — is in the user's current
language. Internal keys/enums may stay English; the user is never asked to read English internal
terminology to make a decision.

---

## 5. Generation Spec

A structured intermediate layer (NOT the final prompt). Its style fields are read **from the
fixed Confirmed Style Profile** (loaded directly — not re-analyzed). It is **driven by the
Minimal Cue Plan** (the allow-list of cues that may enter generation, including any optional
user preserve / delete / emphasize overrides) and **constrained by the allowed / forbidden
entities** produced by the Scene Selection Card (`references/scene-selection.md` — only
`primary_subject`, `approved_interaction_partner`, `approved_interaction_object`, and
`approved_framing_cue` may appear; everything excluded downstream stays excluded). It is
**extended** with content-essence fields and **feature-first reconstruction fields** from the
source photo: `source_subject`, `content_essence`, `pose`, `gaze / expression (where applicable)`,
`must_preserve_content`, `may_discard_content`, `may_simplify_content`, `transferable_style_rules`,
`salient_features`, `identity_signature`, `recognizability_floor`,
`source_relative_proportions`, `asymmetry_to_preserve`, `essential_action_relation`, `discarded_photo_geometry`,
`reconstruction_strategy`, plus line-only canvas settings (`canvas_tone`, `canvas_aspect_ratio`,
`source_aspect_ratio_inheritance`, `background_scene`, `background_detail`, `background_marks`,
`mark_surface_behavior`), composition settings (`composition_mode`,
`relationship_scale_class`, `scale_evidence`, `subject_occupancy_target`, `composition_intent`,
`subject_scale_intent`, `negative_space_strategy`, `positional_relation_priority`,
`subject_cluster_zone`, `dominant_blank_field`, `primary_subject_long_axis_target`), the
`final_prompt_activation_firewall`, and
`selective_exaggeration` (all loose-line
compiler-enforced). Every field is compiled by the **loose-line compiler** and passed through
the **Generation Spec Validator** before any image call. The source photo's content must **not**
be overwritten by the style. Schema and field classification in `references/generation-spec.md`;
cue-plan schema in `references/minimal-cue-plan.md`; loose-line compiler + hard budget in
`references/loose-line-compiler.md`; scene-selection schema in `references/scene-selection.md`;
the fixed style in `references/confirmed-style-profile.md`.

---

## 6. Style QA + Revision

**Style QA** checks **retention of visual language** against the confirmed Profile across
18 dimensions (incl. **Content Essence Fidelity**, **Mark Economy / Omission**,
**Feature-first Reconstruction**, **Cue Fidelity**, **Canvas Tone Fidelity**, and **Selective
Exaggeration Discipline** when applicable; Mark Economy / Feature-first Reconstruction / Cue
Fidelity are calibrated to the confirmed Profile's economy level and to source-image presence;
Canvas Tone Fidelity is always-on for v0's line-only path), plus three **scene-level FAILs**
(**context_intrusion**, **subject_dilution**, **interaction_underweight**) that verify the
Scene Selection Card was honored — no excluded background re-entered, the animal stays the
primary subject, and the core interaction reads clearly — and three **composition-level FAILs**
(**subject_fill_drift**, **negative_space_loss**, **position_relation_flattening**) that enforce
relationship-consistent scale, active blank space, and expressive placement, plus
`generic_mascot_drift`, `synthetic_monoline_drift`, `identity_signature_collapse`,
`primitive_semantic_detachment`, `square_canvas_drift`, and `mark_surface_scope_drift`. It is *not* pixel similarity. Detail in
`references/style-qa.md`.

**Human Feedback (post-generation, NOT a gate):** present the image + a concise QA
summary. The user may **accept**, or give **one directional revision**. On a directional
revision, route to exactly **one** Revision targeting the failed dimension(s). After the
revision, QA re-runs; if still failing, **STOP and report** — no further auto-regeneration.

---

## 7. Output (default user-facing)

By default return **only**:

- the **generated image**, and
- a **concise Style QA summary**.

The full **Style Profile**, **Content Essence Card**, **Generation Spec**, and **Run
Record** default to **internal / collapsible** records — not expanded in the normal
return. (If the user explicitly asks, show any of them.)

---

## 8. Failure handling

| Failure | Handling |
|---|---|
| Source photo unusable (low-res, heavily watermarked / UI-cluttered, no clear subject) | Flag the specific issue; do **not** silently proceed. Ask the user to supply a clearer photo. |
| Generation fails / errors | Report error; do not auto-loop; ask user to retry or adjust intent. |
| Style QA fail | Classify fail-type; feed into ≤1 targeted user-directed Revision. |
| Content Essence ambiguous | Ask exactly **one** focused question (which action / relation must be preserved?); never per-field confirmation. The fixed profile is not re-opened. |
| Feedback vague | Ask one focused question (which dimension is wrong?); not a full re-brief. |
| User requests a disabled mode (color / wash / fill) | Note it is out of v0.2 scope; continue with `loose_line`. |

---

## 9. Stop conditions

- Human Feedback **accept** → success, emit Run Record, stop.
- **One Revision** completed (accepted or not) → stop. No second revision loop.
- User abort at any point → stop, preserve partial Run Record.
- Source-photo **BLOCKING** finding (no usable subject) → stop before generation, ask user to fix the input.

---

## 10. Architecture red lines (static check — keep this skill clean)

A full-text scan of this skill must confirm:

1. No source-specific artist name strings.
2. No source-specific image filenames.
3. No species/prop/scene/pose-specific rules.
4. No test-case-specific color values.
5. No claim that infers a specific creation medium (paper / watercolor / gouache /
   Procreate, etc.) — only observable mark-making is described.
6. No copied visual prompt / aesthetic rule from any external reference skill.
7. No more than **one** Revision.
8. No Human Gate other than **G1**.
9. Style Reference Images and Source Content Image roles are never confused.
10. No new aesthetic rule beyond what the confirmed Style Profile expresses
    generically.
11. **Reference images are a build-time-only input.** Ordinary runtime never requires
    reference images, never re-runs Visual Analysis, never re-generates a Draft Style
    Profile, and never re-opens G1. The confirmed Style Profile is loaded as a fixed
    internal config. All reference provenance lives in `experiments/…` and `CHANGELOG.md`,
    not in the runtime engine.

12. **Scene-selection example enumerations are illustrative, not keyed rules.** The
    `scene-selection.md` reference lists example objects (bowl / mug / tissues / cable / car /
    pavement / furniture / wall, etc.) only to illustrate the generic *non-essential background*
    rule. They must never become species / prop / scene-specific admission or exclusion rules;
    the Inclusion Filter and Non-animal Inclusion Test are generic and may not branch on any
    specific subject class. (See the overfitting guard in `references/scene-selection.md` §9.)

---

## Reference index

- `references/confirmed-style-profile.md` — **the fixed internal Style Profile loaded at runtime.**
  Generic, transferable visual language only (CORE / SECONDARY / OPTIONAL / AVOID, warm paper,
  hard mark economy, open/broken contour, relation-conditioned composition, loose_line forced settings,
  hard information_budget).
  No source-specific strings, no provenance — those live in `experiments/…`.
- `references/scene-selection.md` — **NEW in v0.3.0, upstream of the Minimal Cue Plan.** Fixed
  `scene_focus_mode` (`animal_plus_interaction`), Scene Role Assignment (six roles), the Inclusion
  Filter (must_include / conditionally_include / default_delete), the Non-animal Inclusion Test
  (four admission criteria), the interaction taxonomy (six types), the structured **Scene Selection
  Card**, the Spatial Fact Map, and the Environment Budget (`max_structural_context_cues: 1`). Sole
  authority on which source entities may enter the frame; everything excluded downstream stays
  excluded. Generic — no species / prop / scene-specific rule.
- `references/style-analysis.md` — **build-time only.** Reference-driven Visual Analysis → 5-class
  Style Profile. Used during skill development to produce the fixed profile; not run at runtime.
- `references/content-essence.md` — Source Photo → Content Essence Card (12 fields) and the
  expressive-essence preservation principle.
- `references/minimal-cue-plan.md` — the allow-list stage between Content Essence and Generation
  Spec; cue schema (feature / minimal_representation / max_major_marks / why_essential) and the
  two core rules; accepts optional user preserve / delete / emphasize notes. v0.2.2 adds §8 face
  cue budget (not a component checklist), §10 eye representation (minimal expressive symbol), §11 subject priority +
  relationship dominance (relation-first compilation). v0.3.0 adds §12 **input permission** —
  the plan may use only entities approved by the Scene Selection Card (excluded = excluded
  downstream). Composition intent fields define subject scale, active negative space, and
  positional-relation priority. v0.3.1 adds a source-conditioned `identity_signature`,
  `recognizability_floor`, relative proportion / asymmetry fields, and semantic-to-primitive
  traceability so cue compression cannot collapse into generic mascot grammar. v0.3.2 adds native
  square composition fields, a dominant blank field, and flat solid face-mark rules.
- `references/loose-line-compiler.md` — the only v0.3 execution compiler: forced line-only settings
  (incl. warm paper `canvas_tone`, scene-less background, `selective_exaggeration`), hard
  `information_budget` (EXTREME_REDUCTION, now expressed as **information units** — primary /
  expressive / relation / secondary-subject forms + zero descriptive marks), fixed Stage A/B/C,
  selective-exaggeration discipline (graphic proportion / directional shift, never detail),
  canvas-tone + mode-conflict guards. v0.2.2 adds §9 figure / human reduction, §10 graphic
  readability outranks photographic fidelity, §11 relation-first compilation. v0.3.0 operates only
  on **approved entities** from the Scene Selection Card. §12–§14 define semantically anchored
  gestural prompt compilation, the final-prompt activation firewall, role-scoped hand-drawn
  mark-surface behavior, identity retention, native `1:1` composition, and relationship-
  conditioned scale enforcement.
- `references/generation-spec.md` — structured Generation Spec schema (style fields from the fixed
  profile + content extension) and field classification; includes the Generation Spec Validator.
  v0.3.0 adds §2.3 **scene-level allowed / forbidden entities** (allowed = primary_subject +
  approved interaction partner/object/framing cue; forbidden = excluded_elements + scene clutter +
  decorative background + non-essential furniture + tabletop objects + unrelated environment
  geometry), the hard rule "Do not reward visual salience alone", and the composition-intent /
  occupancy guard. v0.3.2 adds native-square fields and validator failures for activation leakage,
  global mark-surface drift, body-support overbudget, and missing square composition.
- `references/style-qa.md` — 18 QA dimensions incl. Content Essence Fidelity, Mark Economy /
  Omission, Feature-first Reconstruction, Cue Fidelity, Canvas Tone Fidelity (always-on for v0.3
  line-only), and Selective Exaggeration Discipline (profile-calibrated; Feature-first
  Reconstruction / Cue Fidelity source-image-applicable). v0.2.2 adds §1.5 Distilled Cue Drawing
  and §1.6 Every-mark-earns-its-place (the two top judgments), relation fidelity, and figure /
  eye negative-space handling. v0.3.0 adds three **scene-level FAILs** — §1.7 `context_intrusion`,
  §1.8 `subject_dilution`, §1.9 `interaction_underweight` — that verify the Scene Selection Card
  was honored — plus §1.10–§1.12 `subject_fill_drift`, `negative_space_loss`, and
  `position_relation_flattening` for relationship-conditioned composition.
  v0.3.1 adds anti-mascot, anti-monoline, identity-signature, and primitive-semantic-link checks.
  v0.3.2 adds `square_canvas_drift` and `mark_surface_scope_drift`; v0.3.3 makes scale evidence-
  driven and accepts sparse dry interruptions / one tiny graphic eye reserve when non-anatomical.
- `references/human-gate.md` — post-generation feedback and the single focused content question;
  notes that G1 is resolved at build time and runtime has no style gate.

See also `CHANGELOG.md` and `KNOWN_LIMITATIONS.md`.
