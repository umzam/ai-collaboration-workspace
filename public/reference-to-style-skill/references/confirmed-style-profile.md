# Fixed Style Profile (runtime internal config)

**Role:** This is the **fixed, pre-confirmed** visual language that the v0.2.0 runtime loads
directly. It is **not** re-derived from user-supplied reference images, and it is **not**
re-confirmed at runtime. The single Human Gate (G1) that settled these aesthetic calls was
resolved once during skill development and is baked into this file.

**Provenance is out of this file.** The source reference set, the source artist, the build-time
Human Gate log, and any source-specific content rules live in `experiments/…` (dev record) and
`CHANGELOG.md` — **not** here. This file contains only the **generic, transferable** visual
language so the engine stays clean (no source-specific strings, no medium claim, no
species/prop/scene/pose-specific rules).

**How it is used at runtime:** the workflow loads this Profile at the *Fixed Confirmed Style
Profile* step. The Loose-Line Compiler reads its forced settings; the Generation Spec reads its
CORE/SECONDARY/AVOID classes; Style QA checks the result against it. No Visual Analysis, no Draft
Style Profile, and no G1 re-run happens at runtime.

---

## 1. Execution family (fixed)

v0.3.3 supports **exactly one** execution family: **`loose_line`**.

- `soft_brush_fill`, `line_plus_light_wash`, `auto_mix`, and any color / wash / fill execution
  are **disabled** and deferred (see `KNOWN_LIMITATIONS.md`).
- The execution mode is single and non-mixing within one generation.

---

## 2. CORE (always applied)

- generous negative space
- **relation-conditioned scale (hard CORE):** use
  `composition_mode: relation_conditioned_scale_with_active_negative_space`. Resolve subject scale
  from the approved animal–partner / animal–object relationship in the Spatial Fact Map. Wide
  separation, leading, containment, or placement relations usually need a smaller cluster; direct
  contact, support, edge-peeking, or expression-dominant relations may need a medium or close
  cluster. Never shrink merely to satisfy a style quota, and never enlarge merely for generic
  recognizability.
- **positional expressiveness (hard CORE):** the subject's placement within the page carries
  meaning. Preserve expressive relations such as edge / corner proximity, containment, support,
  contact, lead, or placement. Do not replace relational positioning with a larger centered
  subject.
- **negative space as active structure (hard CORE):** blank paper is a positive compositional
  element, not an area to balance or complete. Once the core subject and interaction read, stop;
  delete any additional mark that would compress the open field.
- isolated subject within a sparse frame
- simplified but recognizable subject
- rounded / compact / naive shape reduction with source-conditioned asymmetry; never generic,
  mirrored, or icon-like merely for cuteness
- low saturation
- high-key brightness
- minimal background complexity
- observable hand-drawn / tactile mark-making qualities
- **role-scoped mark hierarchy (hard CORE):** assign visible pressure / width variation and uneven
  deposition only to 2–3 dominant structural or relation gestures. Keep secondary relation /
  placement marks thin, light, and single-pass. Keep face marks flat and compact. Do not request
  local retrace or micro-fragments in final prompts; however, QA may accept a few naturally
  occurring dry edge interruptions confined to identity-bearing dominant forms, and one tiny paper
  reserve inside a compact dark face mark, when neither expands into texture or anatomy.
- irregular line / soft imperfect edge behavior; never uniform monoline or smooth vector-clean
  contour
- moderate intentional imperfection
- non-photorealistic rendering
- **mark economy / information economy (hard CORE):** omission is itself part of the style.
  Keep only the minimum marks needed to convey subject identity, pose, expression (神态), and
  necessary relationships. Non-essential detail is prioritized for *deletion*, not merely
  "simplified." Large undepicted areas, broken forms, and visual emptiness are expected outcomes,
  not information deficits.
- **source-conditioned recognizability floor (hard CORE):** economy begins only after the
  primary subject's minimum `identity_signature` is present. Preserve a small set of distinctive
  relative proportions, asymmetries, directional features, expression relationships, or
  characteristic mass cues. Do not replace them with generic symmetric mascot grammar.
- **open / broken contour (hard CORE):** contour is actively broken; the body need not form a
  complete closed silhouette; limbs / body / head may be hinted by a few local segments; no
  requirement for visually complete closure. The subject must still remain recognizable.
- **warm paper canvas (hard CORE):** the ground is a warm paper tone
  (`warm_off_white` / `light cream` / `soft beige`), never a blank white digital canvas. This is
  a *paper tone*, not color rendering — it does not reinstate fill / wash / color modes.
- **square canvas (hard CORE):** generate on a `1:1` square canvas. Source-photo aspect ratio must
  not propagate into the output. Compose the approved subject cluster and active blank field
  inside the square rather than cropping a portrait or landscape result afterward.

### 2.1 Fixed composition config

```yaml
composition_mode: relation_conditioned_scale_with_active_negative_space
canvas_aspect_ratio: "1:1"
relationship_scale_resolver: required
relationship_scale_classes:
  placement_wide: subject long axis 15%–35%; dominant blank field usually 50%+
  interaction_medium: subject long axis 25%–50%; dominant blank field usually 35%+
  expression_close: subject long axis 35%–65%; dominant blank field usually 25%+
subject_occupancy_target: resolved per source relationship
dominant_blank_field_target: resolved per relationship scale class
primary_subject_long_axis_target: resolved per relationship scale class
```

- The three bands are decision aids, not automatic thresholds. Record the chosen class and
  relationship evidence downstream.
- An interaction partner or framing cue remains subordinate and must not turn the approved subject
  cluster into a filled scene.
- Scale must make the relationship readable at first glance. A close animal is valid when contact,
  support, edge placement, or expression is the relationship; a smaller cluster is preferred when
  distance, pull, containment, or relative placement is the relationship.

---

## 3. SECONDARY (applied unless context overrides)

- warm-neutral palette preference (not mandatory)
- gentle / naive simplification (a *tendency*, never default kawaii, mascot, or mirrored icon grammar)
- minimal facial marks for face-bearing subjects only (never on faceless subjects)
- `loose_line` redefined for this profile: loose, irregular, hand-drawn line **with strong mark
  economy**; extremely low line density; uneven pressure / width / deposition restricted to 2–3
  decisive structural / relation gestures, contrasted with thin light single-pass secondary
  marks; only necessary lines kept; one line may represent a limb or relation; facial marks reduced
  to flat solid featureless cues; large areas allowed to remain unpainted; no local fine lines used
  to model realistic volume; inherits the hard-CORE `open / broken contour` rule.

---

## 4. OPTIONAL (content / spec level; not enforced as style)

- quiet / gentle / understated mood (soft hint only)
- exact numeric coordinates within the required positional relation
- a source-justified close-view exception to the default occupancy ceiling
- exact line-vs-fill balance

---

## 5. AVOID (hard negative rules)

- photorealism
- polished digital rendering
- vector-clean contour
- uniform synthetic monoline
- mirrored mascot symmetry
- generic cute-animal icon grammar that erases source individuality
- complex background
- high saturation
- dramatic cinematic lighting
- detailed anatomy
- exaggerated anime-cute expression
- glossy 3D look
- excessive decoration
- strand-by-strand fur rendering
- realistic sketch hatching
- realistic volume modeling (via line / hatching)
- detailed eye anatomy (iris / highlight / reflection)
- excessive facial detail
- excessive local texture lines
- over-complete / closed contour when open contour is required

---

## 6. Salience-based detail selection (profile-level principle)

The AVOID additions above are **not** an unconditional "any detail forbidden" rule. Default
behavior: use only the minimum visual cues. A detail may receive a *very small* amount of extra
strokes only when it is:

- a highly salient identity feature,
- an immediately noticeable visual characteristic, or
- critical to expression (神态) recognition.

Principle: **preserve the distinctive cue, not its photographic detail.**

---

## 7. Feature-first reconstruction (source-photo restyle)

When a Source Content Image drives the restyle, the result is built **from selected cues**, not
traced-and-simplified from the photo:

- **Feature Selection** — pick only identity / expression / action / relation cues.
- **Feature Compression** — each cue becomes its minimum visual mark.
- **Selective Reconstruction** — recombine into a new sparse composition from blank paper; do
  **not** trace the source silhouette or preserve full photographic geometry.

**Selective exaggeration:** identity- / action-bearing cues may be *slightly* exaggerated to
strengthen recognition — but only those cues, only slightly, never whole-body cartoon / chibi
proportions, never via added detail.

---

## 8. Hard information budget (loose_line)

```yaml
information_budget:
  mode: EXTREME_REDUCTION
  total_major_marks: compilation target 9–12; recognizability and relation clarity also required
  identity_signature_cues: target 2–4; minimum 2 unless the source genuinely offers only one
  face_marks: maximum 4
  body_connection_gestures: target 1; allow up to 3 when stance or interaction readability requires them
  contact_gestures: maximum 1 per essential relation
  interaction_partner_forms: 1–3
  anatomy_completion_marks: 0
  edge_fragment_accents: 0–4, confined to identity-bearing dominant forms; never repeated coat texture
  background_marks: maximum 1
  depicted_surface_texture_lines: 0
  fur_texture_lines: 0
  shading_marks: 0
  purposeful_local_retraces_in_final_prompt: 0
  dominant_pressure_varying_gestures: 2–3
  secondary_marks: thin, light, single-pass
  face_marks_behavior: flat and compact; one tiny internal paper reserve may survive if it remains graphic and non-anatomical
  realistic_eye_structure: forbidden
  closed_full_body_contour: forbidden
```

### 8.1 Final-prompt activation firewall

```yaml
final_prompt_activation_firewall:
  texture_adjacent_identity_terms: translate_then_remove
  detailed_anatomy_terms: translate_then_remove
  body_completion_language: forbidden
  source_identity_semantics: keep_in_intermediate_only
  primitive_relationships: keep
```

The final prompt retains only a 1–2 sentence semantic anchor and the translated visual
relationships. Source identity is carried through relative geometry, spacing, asymmetry, offset,
directional spread, flat dark dabs, open forms, contact topology, and blank space — not through
surface, anatomy, or complete-body description.
