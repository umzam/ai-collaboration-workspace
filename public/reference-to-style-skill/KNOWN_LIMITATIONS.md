# Known Limitations — reference-to-style (v0.3)

Carried from the confirmed spec (§10) plus implementation notes.

## Frozen portfolio scope — 2026-08-21

- **Status:** `FROZEN_FOR_PORTFOLIO` at `v0.3.3`. These limitations are intentionally preserved;
  the freeze is documentation-only and does not attempt to perfect the runtime.
- **Runtime contract:** exactly one user source photo, with optional natural-language preserve /
  delete / emphasize notes and optional legacy `style_strength`; fixed Style Profile; native `1:1`
  square; `scene_focus_mode: animal_plus_interaction`; `loose_line` only.
- **Runtime workflow on disk:** Content Essence, Scene Selection / Inclusion Filter / Spatial Fact
  Map, Minimal Cue Plan, Loose-Line Compiler, Generation Spec, Validator, and Style QA are present
  under `references/` and linked from `SKILL.md`.
- **Build-time only:** artist reference images, reference audit / analysis, Draft Style Profile,
  G1 style confirmation, source provenance, and third-party reference-skill consultation. These are
  development records, not runtime dependencies.
- **Runtime:** source-photo analysis, scene selection, cue planning, fixed-profile loading,
  compilation, validation, image generation, QA, and at most one user-directed Revision.
- **Deferred:** color, brush-fill, wash, mixed-mode, painterly, gradient, and tonal execution.
- **Portfolio consumption:** `ai-collaboration-workspace` may read and display the frozen Skill and
  saved test artifacts. Displaying the snapshot does not require artist references, third-party
  reference skills, or a live generation backend; executing a new runtime generation still
  requires an available image-generation backend.

### Frozen test evidence

- **test1 — v0.3.3:** PASS. Expression-close scale, edge/support relation, scene reduction, square
  canvas, and source identity passed QA.
- **test2 — v0.3.3:** FAIL on `identity_signature_collapse`; the person/leash/dog interaction,
  relation-conditioned scale, scene selection, and mark language passed. The source `.JPG` carried
  an MPO payload and required a non-destructive standard-JPEG normalization before generation.
- **test3 — generated under v0.3.2:** human-accepted as substantially improved. Human feedback
  informed v0.3.3's relation-conditioned scale and contextual tolerance. It was not regenerated
  under v0.3.3 before freeze.
- This is a small internal evidence set, not a benchmark or a generalization guarantee.

## Validated-scope limitations

- **Limited three-case evidence.** v0.3.3 is source-agnostic by construction, but only three
  internal cases are recorded, with one v0.3.3 QA failure and one accepted image generated under
  v0.3.2. Generalization remains unproven.
- **Subjective style gate resolved at build time, not runtime.** G1 was confirmed once during
  skill development and baked into the fixed Style Profile; ordinary runtime has no style gate
  and performs no aesthetic sign-off. The only human input at runtime is the optional single
  focused *content* question on genuine photo ambiguity, and post-generation feedback.
- **Cannot infer creation medium.** The skill describes observable mark-making only; it
  will not and cannot state "this is watercolor vs Procreate" or any other specific medium.
- **Build-time depends on reference-set quality; runtime depends on source-photo quality.**
  During development, garbage / off-system / duplicated / low-res *reference* images degrade the
  fixed profile (mitigated by the build-time audit — the only guard for references). At runtime,
  the user supplies only a *source photo*; a low-res / watermarked / subject-less photo degrades
  the result and is flagged before generation. References are never a runtime input.
- **One Revision cap.** Some failures may need more than one pass; v0.3.3 intentionally stops to
  avoid drift/loop, which may leave hard cases unresolved.
- **No multi-backend guarantee.** Generation-call mechanics are described, but
  backend-specific adaptation is an implementation detail not yet built.

## Build-time vs runtime (where references live)

- **Build time (skill development):** reference images are analyzed (Visual Analysis → 5-class
  Style Profile), the Human Gate G1 settles key aesthetic calls, and the outcome is written into
  the fixed internal Style Profile (`references/confirmed-style-profile.md`). All source-specific
  strings, the source artist, the reference-set paths, and the build-time Human Gate log are
  recorded in `experiments/…` and `CHANGELOG.md` — **not** in the runtime engine.
- **Runtime (ordinary user):** the user supplies **one source photo** and may add natural-language
  preserve / delete / emphasize notes. **No reference images, no Visual Analysis, no Draft Style
  Profile, no G1.** The fixed Style Profile is loaded directly. Runtime additionally runs an
  upstream **Scene Selection** stage (Scene Role Assignment → Inclusion Filter → Spatial Fact Map →
  Scene Selection Card) that decides which source entities may enter the frame *before* cue
  minimization; excluded entities are excluded downstream and may not be auto-restored. This
  satisfies the requirement that reference-related capability is retained for record but never
  required as ordinary-user runtime input.

## Source-photo (Path B) specific

- **"神态 / expressive character" is high-level visual semantics.** The AI can only
  approximate it from observable cues; perfect fidelity of temperament is not guaranteed.
- **Higher stylization weakens source identity.** The more strongly the reference style is
  applied, the more the source's identity and expressive essence may be diluted.
- **Style↔content trade-off.** Some strongly-styled references may conflict with the
  source's real structure; v0 must sometimes trade style fidelity against content-essence
  fidelity — the QA dimensions surface this, but resolution is bounded by the single
  revision.
- **Identity can collapse in relation-wide scenes.** When a human/object relation consumes much of
  the information budget, the animal may remain class-readable while losing source-conditioned
  mass, head/body proportion, or individual identity; frozen test2 demonstrates this failure.
- **Generation is stochastic and may exceed the compiled mark plan.** A backend may add compact eye
  reserves, dry edge interruptions, extra body connections, or altered proportions even when the
  prompt is constrained. QA and human review classify the result; the compiler cannot guarantee
  exact mark counts.
- **Some camera files require normalization.** A `.JPG` filename may contain an MPO payload, which
  the current image-generation backend rejects. Runtime integration may need a non-destructive
  conversion to standard JPEG before the generation call.
- **Relationship scale is heuristic.** `placement_wide`, `interaction_medium`, and
  `expression_close` are evidence-driven composition bands, not a deterministic geometric solver.
- **Square output only.** The frozen runtime composes natively at `1:1`; portrait and landscape
  output are outside this snapshot.
- **Fixed scene focus.** The primary subject must be an animal and context is admitted only when it
  carries the approved interaction. Other scene-focus families are outside this snapshot.

## Profile nature

- **Style Profile is a recommendation, not law.** Even confirmed, it encodes the user's
  *desired* transferable set, which may not perfectly predict generation outcome.

## Deferred v0 execution modes (out of current scope)

The frozen v0.3.3 snapshot is intentionally scoped to a single stable execution path. The
following are **deferred** and must not enter its runtime / Generation Spec / Human Gate:

- `soft_brush_fill` (brush / color fill execution)
- `line_plus_light_wash` (line + wash mixing)
- `auto_mix` (auto execution-family mixing)
- any color fill, grey wash, watercolor, color block, painterly rendering, gradient, or tonal
  modeling

Historical experiments that exercised these modes remain on record; only the *executable path* is
contracted. See `CHANGELOG.md` v0.1.0.

**Warm paper canvas tone is NOT color rendering.** v0's warm paper ground (`warm_off_white` /
`light cream` / `soft beige`) is a paper *tone*, not a fill / wash / brush mode. It does **not**
reinstate any deferred execution mode; color fill, tonal wash, watercolor, painterly fill, and grey
wash remain forbidden. The ground carries only 0–1 minimal ground cue; no scene, no detail.

## What v0 does NOT do (non-goals, enforced)

- ❌ Trigger or behave based on an artist name.
- ❌ Hardcode any source-specific rule, value, color, or branch into the engine.
- ❌ Build a multi-artist classifier, database, or auto-clustering.
- ❌ Run a large-scale benchmark.
- ❌ Provide a complex UI (file/conversation-driven only).
- ❌ Modify reference images (read-only).
- ❌ Introduce a product-decision Gate (that is another skill's concern).
- ❌ Copy external reference skills' visual style / specific prompts / aesthetic rules.
- ❌ Inherit reference **content** into the generated subject.
- ❌ Treat source-image preservation as photographic.
