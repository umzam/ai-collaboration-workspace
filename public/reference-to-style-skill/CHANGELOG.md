# CHANGELOG — reference-to-style

## v0.0.1 (2026-08-18)

Initial v0 implementation of the Reference-to-Style skill, built from
`REFERENCE_TO_STYLE_SKILL_SPEC_V0.md` (the confirmed spec).

### Included

- **Trigger + two input roles.** Style Reference Images (`How should it look?`) vs Source
  Content Image (`What should be depicted?`), kept strictly separate.
- **Two paths.**
  - Path A — Text Subject: references → analysis → G1 → confirmed profile → spec →
    generation → QA → feedback → ≤1 revision.
  - Path B — Source Photo → Styled Result: adds automatic Content Essence Extraction in
    parallel with the style track, then merges into the Generation Spec.
- **Reference-driven style analysis** (`references/style-analysis.md`): 18 visual axes,
  5-class taxonomy (CORE / SECONDARY / OPTIONAL / CONTENT_SPECIFIC_DO_NOT_TRANSFER / AVOID),
  role-tagging, no medium inference, content/style separation.
- **Content Essence Card** (`references/content-essence.md`): 12-field auto extraction with
  the "preserve expressive essence, not photographic rendering" principle.
- **Generation Spec** (`references/generation-spec.md`): 14 base fields + content-extension
  fields, `style_strength` LOW/MEDIUM/HIGH (default MEDIUM), field classification, JSON
  template. `subject` comes from the user task only.
- **Style QA** (`references/style-qa.md`): 13 dimensions of visual-language retention + a
  dedicated Content Essence Fidelity check (not pixel similarity; temperament-drift guard).
- **Single blocking Human Gate G1** (`references/human-gate.md`): controls key aesthetic
  judgments only; low-risk items auto-settled; no re-asking; post-generation is feedback,
  not a gate.
- **Bounded iteration:** exactly one targeted Revision; no regenerate loops.
- **Default user-facing output:** generated image + concise QA summary; full Profile /
  Content Essence Card / Generation Spec / Run Record are internal / collapsible.
- **Architecture red lines** documented in SKILL.md §10 and asserted clean (no
  source-specific strings, no medium claims, single gate, ≤1 revision, role separation).

### v0.0.2 (2026-08-18)

- **User-facing Human Gate language rule (principle 12).** All user-readable gate text —
  questions, explanations, recommendation reasons, option text, action hints — follows the
  user's current conversation language. Internal field names / schema keys / enum values may
  stay English; the user is never required to read English internal terminology to make an
  aesthetic decision. Applied to SKILL.md principles + §4, and `references/human-gate.md`.
  Language presentation only; G1 product logic unchanged.

### v0.0.3 (2026-08-18) — post Case-01 real-photo feedback fix

Applied after the first real-photo generation of Real Photo Case 01 exposed a line-language
failure (realistic sketch-style line art: strand fur, fine detail lines, realistic eye
structure, near-closed contour). Human Gate confirmed the following; changes are scoped to the
confirmed ripo-tou profile and the generic engine's *calibrated* handling — no global "fewer
lines" rule was introduced.

- **Confirmed Style Profile (`ripo-tou-style-profile-confirmed-v0.md`):** `mark_economy` and
  `open / broken contour` promoted to **hard CORE**; `loose_line` redefined to embed strong mark
  economy (name kept, semantics changed); AVOID extended with salience-based detail-selection
  items; added "Salience-based detail selection" profile-level principle.
- **Generic engine (`SKILL.md`):** added principle 13 (mark economy / contour openness are
  profile-level, calibrated, not global); `execution_family pin` description updated; QA
  dimension count updated to 14.
- **`references/style-analysis.md`:** added observable axes 19 (line density / mark economy) and
  20 (contour completeness / openness); added profile-level AVOID extension note.
- **`references/content-essence.md`:** added §2.1 "preserve = minimum visual cue" translation
  rule with salience-based exception and "no new fixed G1 question" guard.
- **`references/generation-spec.md`:** `must_preserve_content` carries the minimum-cue
  translation rule; JSON `edge_treatment` example updated to strong mark economy.
- **`references/style-qa.md`:** added "Mark Economy / Omission" QA dimension (profile-calibrated).

**Deferred (explicitly not done this round):** D-6 backend `input_fidelity` tuning; redefinition
of `soft_brush_fill` (no real failure observed yet). See the fix-record summary under
`experiments/reference-to-style-tests/summaries/`.

### v0.0.4 (2026-08-19) — feature-first reconstruction

Added a generic core principle so a Source Content Image is treated as a **reconstruction source**,
not a trace-then-simplify geometry template. No image generation this round (rules-only update).

- **`SKILL.md`:** added **principle 14 (feature-first reconstruction)** with the three-step internal
  logic — **Feature Selection → Feature Compression → Selective Reconstruction** — and explicit
  `loose_line` constraints (do not trace the source silhouette; do not preserve full photographic
  geometry; use partial contours only where needed; one short mark may represent an entire limb or
  structural cue; facial features are symbolic / minimal marks, not anatomical rendering; preserve
  action relationships such as "paw stepping on human foot" even when most body detail is omitted).
  Updated the `execution_family pin` row, §3 / §5 / §6 references, and the reference index to
  reflect the new principle and the dimension count (14 → 15).
- **`references/generation-spec.md`:** added section **2.1 Feature-first reconstruction fields** with
  `salient_features`, `essential_action_relation`, `discarded_photo_geometry`, `reconstruction_strategy`,
  and mirrored them in the JSON template's `content_extension`.
- **`references/style-qa.md`:** added the **Feature-first Reconstruction** QA dimension (source-image
  only) with FAIL conditions: result looks like traced / simplified photo outline; too much source
  silhouette preserved; non-salient geometry retained; key identity / expression / action cues
  weakened while irrelevant geometry remains. QA dimension count is now 15.

**Scope guard:** the principle and QA dimension are generic (apply whenever a source photo drives the
restyle); they do not hardcode any species / scene / case. No global change to `soft_brush_fill`;
`input_fidelity` tuning still deferred.

### v0.1.0 (2026-08-19) — v0 scope contraction + generation-control refactor

Restricted v0 to a single stable execution path and added hard generation controls. Rules-only
update; no image generation this round.

- **Scope contraction — v0 supports only `loose_line`.** Disabled in the v0 runtime / Generation Spec
  / Human Gate: `soft_brush_fill`, `line_plus_light_wash`, `auto_mix`, and any color / wash / fill
  execution. If the user requests a disabled mode, note it is out of v0 scope and continue with
  `loose_line`. Historical experiments are preserved; only the executable path is contracted.
- **New `references/minimal-cue-plan.md`.** A new stage between Content Essence and the Generation
  Spec: the allow-list of minimum cues that may enter the final image. Required sections
  (`salient_identity_cues`, `expressive_cues`, `essential_action_relation`, `permitted_structural_marks`,
  `discarded_photo_geometry`, `forbidden_details`), a cue schema (`feature` / `minimal_representation` /
  `max_major_marks` / `why_essential`), and the two core rules (every mark maps to one selected cue; the
  result reads first as a sparse reconstruction, secondarily as this photo).
- **New `references/loose-line-compiler.md`.** The only v0 execution compiler: forced line-only
  settings (`fill: none`, `color_rendering: none`, `wash: none`, `texture: none`, `surface_detail:
  forbidden`, `shading: none`, `realistic_volume_modeling: forbidden`), a hard `information_budget`
  (mode `EXTREME_REDUCTION`; total_major_marks target 8–12; face_marks ≤4; body_contour_segments ≤3;
  background_marks ≤1; texture / fur / shading / realistic-eye = 0 / forbidden; closed full body
  contour forbidden), the fixed Stage A → B → C generation order (Feature Selection → Feature
  Compression → Selective Reconstruction), and a mode-conflict guard that auto-removes color/wash/fill
  fragments.
- **Preservation split (semantic vs photographic).** `must_preserve` now means `semantic_relation`,
  `expressive_direction`, `essential_action`, `identity-bearing cues`; `may_discard` covers
  `photographic_pose_geometry`, `exact_limb_placement`, `exact_body_silhouette`, `tail_geometry`,
  `non_essential_perspective_geometry`. `pose` is no longer a broad must-preserve item. Applied to
  `content-essence.md` §2.2 and `generation-spec.md` (`may_discard_content` field + JSON).
- **New Generation Spec Validator (`generation-spec.md` §6).** Runs before any image call and
  **auto-fixes** conflicts (no user question): cue budget, geometry leakage, detail leakage (fur /
  hair / eye anatomy / hatching / shading / volume / detailed anatomy / surface texture), and
  mode-conflict (loose_line forbids watercolor / wash / color fill / soft brush fill / painterly /
  gradient / tonal). A focused Human Gate triggers only when the AI cannot tell which cue the user
  truly wants.
- **QA additions.** Reinforced the **Feature-first Reconstruction** FAIL conditions (photo subtraction
  vs feature reconstruction). Added a new **Cue Fidelity** dimension that checks the final image
  against the Minimal Cue Plan's key cues (identity / expression / action / relation), not photo
  geometry. QA dimension count is now **16**.
- **`SKILL.md`:** principle 14 reinforced as the fixed Stage A/B/C order; §2 `execution_family pin`
  row scoped to `loose_line`; §3 workflow inserts Minimal Cue Plan + Validator stages; §5 references
  the cue plan / compiler / validator; §6 dimension count 15 → 16; reference index updated.
- **`human-gate.md`:** added a note that v0 execution is fixed to `loose_line` (no disabled-mode
  options offered).

**Scope guard / deferred:** color / brush-fill / wash / line-plus-light-wash / auto_mix modes are
deferred to a future iteration (recorded in `KNOWN_LIMITATIONS.md`). No image generation this round;
`input_fidelity` tuning still deferred; `soft_brush_fill` redefinition still pending real failure
data.

### v0.1.1 (2026-08-19) — warm paper canvas + selective exaggeration (line-only tightening)

Further tightened the line-only v0 without adding execution modes or generating images.

- **Warm paper canvas (principle 15 + loose-line compiler §4).** v0 `loose_line` now defaults to a
  warm paper tone (`warm_off_white` / `light cream` / `soft beige`) — never a blank white digital
  canvas. This is a *paper tone*, not color rendering; it does **not** reinstate `soft_brush_fill` /
  `wash` / `fill`. Background stays scene-less (`background_scene` none, `background_detail` none,
  `background_marks` 0–1 minimal ground cue only). Still line-only; watercolor fill, tonal wash,
  color shading, painterly fill, grey wash remain forbidden.
- **`selective_exaggeration` (principle 14 + compiler + cue plan + spec + QA + validator).** Identity-
  / action-bearing cues may be *slightly* exaggerated to strengthen recognition, but only those
  cues and only slightly: no whole-body cartoon / chibi proportions, no exaggeration via added
  detail, no extra contour lines / facial detail / cartoon decoration. Illustrative examples (oversized
  ears, dot-like eyes, tiny underbite, paw-on-foot relation, upward gaze) are non-binding examples,
  not hardcoded case rules.
- **`references/loose-line-compiler.md`:** added `canvas_tone` / `background_*` / `selective_exaggeration`
  to forced settings; new §4 Canvas tone; §5 Mode-conflict guard now also rejects a white-digital-canvas
  default; added Selective-exaggeration block in the Stage logic.
- **`references/minimal-cue-plan.md`:** cue schema gains optional `exaggeration: slight` (identity/
  action cues only); new §5 Selective exaggeration discipline.
- **`references/content-essence.md`:** new §2.3 Selective exaggeration (optional, identity/action cues
  only).
- **`references/generation-spec.md`:** new §2.2 Canvas/background/exaggeration fields (compiler-enforced);
  JSON template carries `canvas_tone` / `background_*` / `selective_exaggeration`; Validator gains
  §6.5 Canvas tone guard and §6.6 Selective exaggeration discipline.
- **`references/style-qa.md`:** new **Canvas Tone Fidelity** and **Selective Exaggeration Discipline**
  QA dimensions; total QA dimensions now **18**.
- **`SKILL.md`:** added principle 15 (warm paper canvas, not white digital); principle 14 gains the
  `selective_exaggeration` bullet; §5 / §6 / reference index updated.

**Overfitting guard.** Both rules are generic: a warm paper ground and "slight exaggeration of
identity/action cues only" apply to any reference set / subject. The Case-01-flavored examples are
illustrative. No species / pose / scene-specific rule was added; architecture red lines (§10) remain
clean (warm_off_white etc. are enums, not specific color values). Color / brush-fill / wash modes
stay deferred — warm paper tone is explicitly *not* color rendering.

### v0.2.0 (2026-08-19) — runtime decoupling: style frozen, references out of runtime

Changed the runtime input contract so the skill is a **style-frozen** restyle skill. Artist
reference images are now a **build-time-only** input; ordinary runtime requires no references and
never re-runs Visual Analysis, Draft Style Profile, or G1. No image generation this round
(rules-only update).

- **New fixed internal config `references/confirmed-style-profile.md`.** The confirmed visual
  language is extracted into a generic, transferable internal config (CORE / SECONDARY / OPTIONAL /
  AVOID, warm paper, hard mark economy, open/broken contour, loose_line forced settings, hard
  `information_budget`). It contains **no source-specific strings and no provenance** — those stay
  in `experiments/…`. The workflow loads it directly at the *Fixed Confirmed Style Profile* step.
- **Runtime required input = 1 Source Content Image** (the user's own photo). Removed the
  "Reference image set = Required" input and the "two distinct image roles" section; at runtime
  there is exactly one image role (the source photo). Style References exist only at build time.
- **Runtime optional input = natural-language preserve / delete / emphasize notes** (e.g.,
  "重点保留这个动作", "不要旁边的人", "耳朵明显一点"). These are applied as **cue overrides** in the
  Minimal Cue Plan — force-include / force-exclude / slight-exaggerate — never as style references.
- **Removed from runtime:** reference image set requirement, style reference role tagging,
  per-run Visual Analysis, per-run Draft Style Profile, per-run G1 re-confirmation.
- **Human Gate moved to build time.** G1 is resolved once during development and baked into the
  fixed profile. Runtime has **no style gate**; the only allowed user question is one focused
  *content* question when the source photo is genuinely ambiguous (which action / relation to
  keep). `references/human-gate.md` rewritten accordingly.
- **`SKILL.md`:** description / intro reframed to style-frozen; principles 1 / 3 / 7 rewritten
  (fixed config, build-time gate, photo-ambiguity-only question); §1 Trigger (single source photo,
  no references); §2 Inputs (photo required, NL notes optional, removed reference set + two-role
  section); §3 Workflow collapsed to the single runtime path specified by the user; §4 Human Gate
  (build-time only); §5 Generation Spec (style from fixed config); §8 Failure handling (source-photo
  issues, no reference-set audit); §9 Stop conditions (source-photo blocking); §10 red lines gain
  rule 11 (references are build-time-only); reference index updated (adds confirmed-style-profile.md,
  marks style-analysis.md as build-time-only).
- **`references/generation-spec.md`:** style fields now sourced from the fixed profile; `subject`
  from the photo; `avoid_reference_content_leakage` documented as runtime-empty; §4 field
  classification rebuilt around the fixed config + photo + optional notes; §6 Validator unchanged
  (auto-fix, no gate).
- **`references/content-essence.md`:** §1 reframed (no parallel style track; fixed profile loaded
  later); added optional user preserve / delete / emphasize notes handling.
- **`references/minimal-cue-plan.md`:** new §6 maps user preserve / delete / emphasize notes to
  cue overrides (force-include / force-exclude / slight-exaggerate).
- **`references/loose-line-compiler.md`:** removed "even if the style references contain such
  patterns" phrasing; warm paper + line-only enforced from the fixed profile; version tags → v0.2.
- **`references/style-qa.md`:** QA now checks against the fixed Confirmed Style Profile; Mark
  Economy calibrated to it; white-background example updated to warm-paper.

**Runtime contract after v0.2.0:**
`Source Photo → Content Essence Extraction → Feature Selection → Minimal Cue Plan → Fixed Confirmed
Style Profile → Loose-Line Compiler → Generation Spec Validator → Image Generation → Style QA →
optional one user-directed revision`.

**Overfitting guard.** The fixed config and all edits stay generic (no species / pose / scene /
artist-specific rule, no color values, no medium claim). Reference provenance is preserved in
`experiments/…` and this changelog, satisfying the requirement that reference-related content is
retained for record but never required as ordinary-user runtime input.

### v0.2.1 (2026-08-19) — line-only tightening: distilled cue drawing, anti-fragmentation

Tightened the line-only v0 enforcement so the result reads as a **distilled cue drawing**, not a
reduced descriptive sketch. No image generation this round (rules-only update); v0 scope unchanged
(runtime = 1 source photo, fixed confirmed style, loose_line only, warm paper, no color / fill /
wash / shading / texture / brush, feature-first reconstruction, selective exaggeration for
identity / expression / action cues only).

- **`references/minimal-cue-plan.md`:** new §7 `large_form_priority` (plan large-form cues first,
  one large contour beats many small lines), §8 `facial_reduction_hard_rule` (face limited to
  eyes / nose / mouth / underbite; default-prohibited facial support lines; recognition before
  description), §9 `no_furry_edge_rule` (no fur-edge spikes / hair fragments / zig-zag furry
  contour / short fur clusters; long-haired subjects via silhouette + proportion + limited marks).
- **`references/loose-line-compiler.md`:** new §6 `shape_first_compilation` (order: identity
  large forms → expressive direction → essential action/relation → min facial marks → secondary
  only if necessary; never start from fur / eye-area structure / facial support / decorative
  contour), §7 `single_stroke_preference` (single decisive stroke beats multiple descriptive
  strokes; one stroke may carry an ear direction / limb / relation), §8 `body_subordination_rule`
  (body serves identity/expression/action/relation only; stop adding body lines once the
  relation reads). §2 budget note now quality-aware.
- **`references/generation-spec.md`:** §6.1 Cue budget is now **quality-aware** (checks scale /
  fragmentation / redundancy / descriptive function, not just count — 10 decisive lines may pass,
  10 furry/descriptive short lines fail). New hard FAIL conditions §6.7 `furry_edge_leak`, §6.8
  `facial_over_description`, §6.9 `body_completion_drift`, §6.10 `small_line_fragmentation`.
- **`references/style-qa.md`:** new highest-priority judgment **§1.5 Distilled Cue Drawing** —
  runs before the 18 dimensions; FAIL if the result still describes fur / facial structure /
  complete body / original photo geometry even when line count is reduced.
- **Version tags** SKILL.md title and loose-line-compiler.md → v0.2.1; generation-spec.md "In
  v0.2" → v0.2.1. Fixed Confirmed Style Profile content unchanged (constraints live in the
  enforcement layers).

### v0.2.2 (2026-08-19) — eye symbol / face cue budget / figure reduction / relation dominance / graphic distortion

Continued line-only tightening, this round driven by the gap that "eye minimal" had collapsed into
"two black dots" and that generic figure reduction (especially multi-subject relation scenes) was
missing. No image generation this round (rules-only update); v0 scope unchanged (runtime = 1 source
photo, fixed confirmed style, loose_line only, warm paper, no color / fill / wash / shading /
texture / brush, feature-first reconstruction, selective exaggeration for identity / expression /
action cues only).

- **`references/minimal-cue-plan.md`:**
  - §8 **face cue budget** replaces the old "minimum recognition set" checklist — the face receives
    only the cues recognition/expression require given view + role; do **not** complete facial
    anatomy merely because a component exists in the source; secondary subjects may omit the face.
  - §10 **eye representation (eye_mark_rule)** — eye marks are minimal expressive symbols, not
    rendered anatomy: allowed = tiny solid dot / compact dark shape with reserved white gap / short
    slit / one side-view mark; forbidden = eyeball construction, iris+pupil, catchlight, eyelid,
    socket/support lines. Key sentence: a white reserve inside a dark eye mark is allowed graphic
    negative space, not optical highlight. Adds `eye_expression_priority` (minimal /
    allow_compact_emphasis / reduce_or_omit; emphasis may raise shape prominence, not detail).
  - §11 **subject_priority + relationship_dominance_rule** — primary subject keeps identity +
    expression; relational secondary keeps only action direction / interaction / minimum identity
    class; generic (no species/figure privileging). `essential_action_relation` outranks subject
    body; relation-first vs identity-first compilation selected by the cue plan.
- **`references/loose-line-compiler.md`:** §2 `information_budget` re-expressed as **information
  units** (primary_large_forms 2–4, expressive_marks 1–3, relation_marks 1–2,
  secondary_subject_forms 1–3, descriptive_marks 0) with stroke count as a soft ceiling. §3
  selective exaggeration now allows *noticeable* graphic proportion / directional shift, never
  detail-increase. New §9 figure / human reduction (`human_reduction_rule`: action-bearing large
  forms, default-delete clothing/folds/fingers/shoes/complete legs/torso closure/facial
  construction/hair; "do not account for every limb"). New §10 graphic readability outranks
  photographic fidelity (large-form distortion acceptable). New §11 relation-first compilation.
  Stage B eye example no longer hardcodes "2 black dots".
- **`references/generation-spec.md`:** §6.1 budget re-expressed as information units (quality over
  count). §6.8 `facial_over_description` now tests the face *cue budget*, not a fixed component set.
  New hard FAILs §6.11 `eye_anatomy_drift` (white reserve allowed), §6.12 `human_figure_sketch_drift`,
  §6.13 `relation_underweighted`, §6.14 `descriptive_completion`. `selective_exaggeration`
  allowed_scope updated to graphic-proportion shift (never detail).
- **`references/style-qa.md`:** §1.5 Distilled Cue Drawing gains figure-sketch + relation-underweight
  FAIL bullets and an eye negative-space allowance note. New §1.6 **Every mark must earn its place**
  (second top judgment; "if deleting this line, can the action/relation still hold?" → delete). Mark
  Economy gains figure / eye-negative-space bullets; Cue Fidelity gains relation fidelity + fail.
- **`SKILL.md`:** title → v0.2.2; principle 14 selective-exaggeration wording allows noticeable
  graphic proportion/directional shift (never detail); new **principle 16 — Allow graphic distortion;
  forbid descriptive completion** as the governing v0.2.x philosophy. Reference index updated.

**Overfitting guard.** All new rules are generic: no species / prop / scene / pose-specific rule, no
color values, no medium claim. Relation / figure examples use generic actions (lead / hold /
embrace / contact); the human/figure rule is framed as "any fully-bodied figure participant". Source
provenance remains only in `experiments/…` and this changelog.

### v0.3.0 (2026-08-19) — scene selection upstream of cue minimization

Shifted the tightening upstream: before deciding *how* to draw minimally, the engine now decides
*what may enter the frame at all*. This stops the prior failure mode where every source element
(the animal, a human limb, a table, a bowl, a mug, a tissue pack, a cable) was first treated as
"content to draw", then merely simplified — leaving too many irrelevant objects. No image
generation this round (rules-only update); v0 scope unchanged (runtime = 1 source photo, fixed
confirmed style, `loose_line` only, warm paper, no color / fill / wash / shading / texture / brush,
feature-first reconstruction, selective exaggeration for identity / expression / action cues only).

- **New `references/scene-selection.md`** — the upstream stage. Contains:
  - §1 fixed `scene_focus_mode: animal_plus_interaction` (primary subject must be an animal; only
    interaction-relevant humans/animals/objects retained; unrelated background default-excluded;
    **visual salience alone is NOT an admission reason** — *prominent ≠ qualified*).
  - §2 **Scene Role Assignment** — six roles (`primary_subject`, `interaction_partner`,
    `interaction_object`, `framing_cue`, `background_context`, `noise`); every recognized source
    entity must get a role before reaching the cue plan.
  - §3 **Inclusion Filter** — `must_include` (primary_subject), `conditionally_include`
    (interaction_partner / interaction_object / framing_cue, only when they carry core relation
    info), `default_delete` (background_context / noise).
  - §4 **Non-animal Inclusion Test** — a non-animal element may enter only if it passes ≥1 of four
    criteria (direct physical contact / direct mediation / key spatial framing or containment /
    removal breaks legibility); explicitly forbidden to keep an element for size / salience /
    proximity / original-composition presence / realism / scene completeness.
  - §5 **Interaction taxonomy** — six types (`direct_contact`, `support_or_perch`, `lead_or_link`,
    `containment_or_framing`, `approach_or_reach`, `gaze_target_if_essential`).
  - §6 **Scene Selection Card** — structured intermediate (scene_focus_mode, primary_subject,
    interaction_partners, interaction_objects, framing_cues, excluded_elements, core_interaction,
    environment_budget) with an illustrative example.
  - §7 **Spatial Fact Map** — core contact / relation / framing geometry of *approved* entities
    only, between Inclusion Filter and Minimal Cue Plan.
  - §8 **Environment Budget** — `max_structural_context_cues: 1`; the single cue must carry
    interaction / framing / containment / spatial legibility; legal vs illegal enumerations.
  - §9 downstream authority + overfitting guard (excluded once = excluded downstream; generic, no
    species / prop / scene-specific rule).
- **`SKILL.md`:** title → v0.3.0; description + §2 gain `scene_focus_mode` as a fixed internal
  config; new **principle 17** (scene selection upstream of cue minimization, prominent ≠ qualified,
  Scene Selection Card is sole authority on allowed entities); §3 workflow inserts Scene Role
  Assignment → Inclusion Filter → Spatial Fact Map → Scene Selection Card before the Minimal Cue
  Plan, and labels the new scene-level FAIL sites; §5 Generation Spec now constrained by the
  allowed / forbidden entities; §6 Style QA notes the three scene-level FAILs; §10 red-line rule 12
  (scene-selection example enumerations are illustrative, not keyed rules); reference index updated.
- **`references/minimal-cue-plan.md`:** new §12 **input permission** — the plan may use only
  entities approved by the Scene Selection Card; excluded = excluded downstream (no re-entry into
  plan / compiler / spec / auto-restore).
- **`references/generation-spec.md`:** new §2.3 **scene-level allowed / forbidden entities**
  (`allowed_entities` = primary_subject + approved interaction partner/object/framing cue;
  `forbidden_entities` = excluded_elements + scene clutter + decorative background + non-essential
  furniture + tabletop objects + unrelated environment geometry) and the hard rule "Do not reward
  visual salience alone"; new §6.15 pre-generation scene-entity containment guard (mirrors the QA
  scene-level FAILs).
- **`references/style-qa.md`:** new top-priority scene-level FAILs — §1.7 `context_intrusion`
  (excluded background / clutter / objects / decorative detail reappear; enumerations bowl / mug /
  tissues / laptop / food / parked car / pavement / cable / room clutter are illustrative),
  §1.8 `subject_dilution` (animal must be the clear primary subject; context must not compete),
  §1.9 `interaction_underweight` (participants present but core relation not readable; companion to
  §1.6 and validator §6.13).

**Overfitting guard.** All scene-selection roles, tests, and enumerations are generic. The example
entities (animal, human foot, bowl, mug, tissues, cable, car, pavement, furniture, wall) illustrate
the *non-essential background* rule, not bindings to any specific species / prop / scene. The engine
must not branch on, prioritize, or exclude any specific subject class. Architecture red lines
(`SKILL.md` §10) remain clean; warm paper tone stays a paper tone, not color rendering.

### v0.3.1 (2026-08-21) — identity-preserving gestural compiler

- Split depicted subject texture from observable mark-surface behavior. The former remains absent;
  the latter now requires uneven deposition, pressure / width variation, broken or tapered ends,
  slight wobble, and decisive-vs-secondary weight hierarchy, with 0–2 purposeful local retraces.
- Added `identity_signature`, source-relative proportion / asymmetry fields, and a
  `recognizability_floor` so mark economy cannot collapse the source into generic mascot grammar.
- Replaced detached mark-only compilation with semantically anchored gestural primitives. Each
  primitive retains its cue, relative placement, and gesture character.
- Changed the major-mark count from a hard 8–12 target to a quality-aware soft 8–16 range;
  recognizability and gesture quality outrank counting.
- Added Validator / QA failures: `generic_mascot_drift`, `synthetic_monoline_drift`,
  `identity_signature_collapse`, and `primitive_semantic_detachment`.
- Kept scene selection, inclusion filtering, single-photo runtime, fixed profile, line-only mode,
  warm ground, small-subject composition, and bounded revision unchanged.

### v0.3.2 (2026-08-21) — role-scoped marks + activation firewall + native square canvas

- Replaced globally applied hand-drawn texture with a role-scoped mark hierarchy: only 2–3
  dominant structural / relation gestures may carry pressure / width variation and uneven
  deposition; secondary marks are thin, light, and single-pass; face marks are flat, compact,
  solid, and featureless.
- Added a final-prompt activation firewall. Texture-adjacent identity terms, detailed anatomy, and
  body-completion language remain in intermediate reasoning only; they must be translated into
  relative geometry, flat dark dabs, open forms, arcs, gaps, overlaps, directional strokes, and
  blank space before the image prompt, then removed.
- Tightened the final compilation budget to 9–12 major marks, with at most one body-connection
  gesture, zero anatomy-completion marks, zero edge fragments, and zero requested local retraces.
- Replaced eye white-reserve allowances with flat, solid, featureless eye dabs. Expression is
  carried through relative spacing, scale, offset, and direction rather than eye anatomy.
- Added a fixed native `1:1` canvas. Runtime generation must not inherit the source-photo aspect
  ratio and must not obtain a square through post-generation cropping. The square composition
  reserves a dominant blank field of at least 50%; the primary subject long axis targets 20%–35%
  with 40% as the default maximum.
- Added Validator failures `final_prompt_activation_leak`, `mark_surface_scope_drift`,
  `body_support_overbudget`, and `square_canvas_missing`; added post-generation QA failures
  `square_canvas_drift` and `mark_surface_scope_drift`.

No image generation was performed in this rules-only update.

### v0.3.3 (2026-08-21) — relationship-conditioned subject scale

- Replaced the universal small-subject target with
  `relation_conditioned_scale_with_active_negative_space`. The Spatial Fact Map now selects
  `placement_wide`, `interaction_medium`, or `expression_close` and records the relationship fact
  that justifies the scale.
- Added relationship-aware guide bands: 15%–35% long axis for broad placement / separation,
  25%–50% for two-party contact, and 35%–65% for expression, support, or edge-peeking relations.
  These are compositional bands, not automatic pass/fail percentages.
- Kept the native `1:1` square and active negative space, but made the dominant blank-field target
  follow the selected relationship class instead of a universal 50% threshold.
- Human-reviewed tolerance update: one tiny graphic paper reserve inside a compact dark eye mark,
  a few dry interruptions confined to identity-bearing dominant forms, and additional body /
  non-contact-limb cues may pass when they materially support identity, stance, or interaction.
  They still fail when they expand into optical anatomy, coat texture, or descriptive completion.

### Freeze note (2026-08-21) — `FROZEN_FOR_PORTFOLIO`

Version `v0.3.3` is frozen as the portfolio-ready snapshot. This freeze does **not** change or bump
the version and introduces no design-rule, prompt, compiler, validator, QA, or generation changes.

- **Runtime input:** exactly one user source photo; optional natural-language preserve / delete /
  emphasize notes and optional legacy `style_strength`.
- **Fixed runtime config:** `references/confirmed-style-profile.md`, fixed
  `scene_focus_mode: animal_plus_interaction`, native `1:1` canvas, and relation-conditioned scale.
- **Supported execution:** `loose_line` only.
- **Persisted runtime workflow:** Content Essence → Scene Role Assignment → Inclusion Filter →
  Spatial Fact Map / Scene Selection Card → Feature Selection → Minimal Cue Plan → fixed Style
  Profile → Loose-Line Compiler → Generation Spec → Validator → Image Generation → Style QA →
  optional single user-directed Revision.
- **Deferred scope:** `soft_brush_fill`, `line_plus_light_wash`, `auto_mix`, and all color / fill /
  wash / painterly / tonal execution remain deferred.
- **Build-time only:** artist reference images, reference analysis, Draft Style Profile, G1 style
  confirmation, provenance, and any third-party reference-skill consultation. None is a runtime
  dependency.
- **Runtime:** source-photo content analysis, scene selection, cue planning, fixed-profile loading,
  compilation, validation, generation, QA, and bounded user feedback.
- **Frozen test status:** test1 (`v0.3.3`) PASS; test2 (`v0.3.3`) FAIL on animal identity retention
  while interaction/composition passed; test3 image (`v0.3.2`) was human-accepted and its feedback
  produced `v0.3.3`, but test3 was not regenerated under `v0.3.3`.
- **Accepted limitations:** limited three-case evidence, stochastic backend compliance, possible
  identity collapse in multi-subject relation scenes, MPO source normalization, subjective QA,
  fixed square output, single-photo / animal-plus-interaction scope, and one-Revision cap.
- **Portfolio use:** the main `ai-collaboration-workspace` project may read and present this frozen
  Skill, reference documentation, changelog, limitations, and saved run artifacts without treating
  them as an actively evolving production system.

### Not included (per spec non-goals)

- No artist-name triggering or behavior.
- No source-specific hardcoding in the engine.
- No multi-artist classifier / database / auto-clustering.
- No large-scale benchmark / complex UI.
- No modification of reference images (read-only).
- No Prototype-to-PRD-style product-decision gate.
- No copied visual prompt / aesthetic rule from external reference skills.
