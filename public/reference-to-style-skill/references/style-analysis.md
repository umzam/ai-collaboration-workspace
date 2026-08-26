# Reference-driven Style Analysis

This file defines how the skill turns a **set of reference images** into a draft Style
Profile. It is the engine's understanding stage — it runs *before* any generation and
*before* the Human Gate (G1).

---

## 1. Guiding discipline

- **Reference-driven only.** The visual language is *derived* from the images. Nothing
  here keys on an artist name, a style taxonomy label, or any source-specific string.
- **Describe, don't infer medium.** Report only *observable* mark-making / surface / edge
  / texture behavior. Never assert a specific creation medium (paper, watercolor, gouache,
  acrylic, charcoal, crayon, "Procreate", "digital mimicking paper", etc.). If a medium
  cannot be observed with confidence, say so and describe the visible output
  characteristics instead.
- **Separate content from style.** Species, props, scenes, specific poses, exact color
  values, and specific compositions observed in the references are *content* — they are
  **not** transferable style and must not become style rules.
- **Propose a draft, not a ruling.** Low-risk, observable features are settled by the AI
  and shown for information at G1. Only contested / subjective items are flagged.

---

## 2. Reference role-tagging (AI auto)

For each reference image, propose a role:

- `style_core` — exemplifies the stable, recurring visual system.
- `negative` — shows what the user does **not** want (drift boundary / anti-example).
- `variation` — shows acceptable variation within the system (different subject, pose,
  composition, color, or subject count).

These roles are hints, not rigid buckets; `negative` and `variation` are optional. A user
with only normal style references completes the flow without them.

---

## 3. Visual axes to observe

Analyze across these axes, each with `observation` / `confidence` (high|medium|low) /
`evidence across references` / `transferable` (yes|partial|no) / `overfitting_risk`:

1. composition
2. subject scale
3. proportion
4. shape language
5. line / edge treatment
6. color palette
7. saturation
8. brightness / value
9. mark-making / surface (see §1 — no medium claim)
10. texture
11. lighting
12. background complexity
13. facial / feature grammar (if applicable)
14. spatial density
15. emotional tone
16. decorative elements
17. intentional imperfection
18. realism ↔ abstraction level
19. line density / mark economy — how sparse vs dense the linework is; whether omission is a deliberate, style-defining feature.
20. contour completeness / openness — whether contours are closed / silhouette-complete or actively broken / open.
21. mark-surface articulation — observable pressure / width / opacity variation, grain, broken /
    tapered ends, local retrace, and dominant-vs-secondary line hierarchy; distinguish line-surface
    behavior from depicted object texture.
22. individuality vs icon normalization — whether recurring simplification preserves
    source-conditioned proportion / asymmetry or collapses subjects into generic mirrored mascot
    grammar.

Record only what is **observable and recurring**. Single-image quirks stay as evidence, not
as rules.

---

## 4. Five-class Style Profile taxonomy

From the analysis, propose a draft Profile with these classes:

- **CORE** — always applied; the stable, recurring, non-negotiable visual system.
- **SECONDARY** — applied unless context overrides; preferred tendencies.
- **OPTIONAL** — present in references but not enforced; free variation.
- **CONTENT_SPECIFIC_DO_NOT_TRANSFER** — things that appear in the references but must
  **not** migrate to new work (species, breeds, props, specific scenes, specific poses,
  exact background values, specific two-subject layouts, etc.).
- **AVOID** — hard negative rules. Generic, source-agnostic examples:
  - photorealism
  - polished digital rendering
  - vector-clean contour
  - complex background
  - high saturation
  - dramatic / cinematic lighting
  - detailed anatomy
  - exaggerated anime-cute expression
  - glossy 3D look
  - excessive decoration

> The AVOID list above is **generic**. Never add a source-specific entry (e.g., a specific
> animal, a specific color, a specific scene) to AVOID.

> **Profile-level extension (not global):** when a confirmed Style Profile sets `mark_economy`
> and/or `open / broken contour` as CORE, its AVOID list should additionally forbid
> strand-by-strand fur rendering, realistic sketch hatching / volume modeling, detailed eye
> anatomy (iris / highlight / reflection), excessive facial detail, excessive local texture
> lines, and over-complete contour. These are *profile-specific*; the generic engine does not
> impose them on every reference set. `mark_economy` / contour openness are observed as
> optional profile-level dimensions (axes 19–20) and promoted to CORE only when the reference
> style actually uses them.

---

## 5. Overfitting guardrails

For each transferable feature, record `overfitting_risk` and, where risk is medium/high,
note the boundary (e.g., "cute proportion is a tendency, not a rigid large-head rule";
"warm-neutral is a preference, not a lock"). This is what G1 reviews.

---

## 6. Output of this stage

A **Visual Analysis Card** (per-axis observations) and a **Style Profile draft**
(five-class taxonomy). Both feed G1 (§human-gate) and, after confirmation, the Generation
Spec (§generation-spec). Neither is the final prompt.
