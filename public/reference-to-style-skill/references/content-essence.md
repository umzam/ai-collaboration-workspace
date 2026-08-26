# Content Essence Extraction (Source Photo → Styled Result)

Use this stage **only when the user supplies a Source Content Image** (their own photo — the
only image role at runtime). It answers *"What should be depicted?"*. The visual language
(*"How should it look?"*) is answered by the **fixed Confirmed Style Profile**, loaded later as a
fixed config — there are no Style References at runtime. This stage is **not** a Human Gate.

**Optional user preserve / delete / emphasize notes.** If the user attaches natural-language
requests (e.g., "重点保留这个动作", "不要旁边的人", "耳朵明显一点"), record them alongside the
extraction; they are applied as **cue overrides** in the Minimal Cue Plan (force-include a cue,
force-exclude a region / non-subject element, or mark a cue for slight exaggeration). They are
never treated as style references.

---

## 1. Core principle

**Preserve expressive essence, not photographic rendering.**

Preserve enough source-conditioned identity that the result reads as this individual subject,
not merely as a generic member of its class. Minimality begins after recognizability, not before.

The goal is to keep the subject's *identity* and *神态* (expressive character) when the
image is restyled into the reference visual language. Preservation is **semantic and
expressive**, never photographic.

```
preserve: semantic identity + expressive essence
allow:    stylistic simplification of anatomy, texture, lighting, background
```

---

## 2. What to preserve (must keep across the restyle)

- subject identity cues
- pose
- orientation / head angle
- gaze direction
- facial expression
- body relaxation vs tension
- ear / tail attitude (where relevant)
- interaction state
- distinctive temperament / expressive character

In short: the user's "神态". If the source reads as relaxed, blank, alert, aggrieved,
excited, or sleepy, the result should read the same **unless the user explicitly redirects**.

### 2.1 Translation rule: preserve = minimum visual cue

Each item in `must_preserve` / `must_preserve_content` must be translated downstream into **the
minimum visual cue needed to communicate that trait — not a detailed rendering of it.** Examples:

- "large ears" → two simplified big shapes, not an ear drawn with internal feathering.
- "head markings" → a single suggestive mark, not a realistic patch.
- "slight underbite" → one tiny mouth mark, not a rendered lower-lip / teeth study.

**Salience-based exception.** If a trait is *highly salient / identity-bearing* (an immediately
noticeable visual characteristic or critical to expression recognition), it may receive slightly
more than the bare minimum of strokes — but still far below photographic detail. Ordinary
photographic texture (e.g., generic fur strands) is deleted, not depicted. Principle: **preserve
the distinctive cue, not its photographic detail.**

**No new fixed Human Gate question.** Do NOT add a per-run G1 question "which features need more
than the minimum cue." The AI judges salience automatically from the source image; ask a focused
question only when essence is genuinely ambiguous (per §4 ambiguity handling).

### 2.2 Preservation split — semantic, not photographic (post v0.1 scope contraction)

Stop treating `pose` (and similar) as a broad must-preserve item. Split preservation into two
buckets:

**`must_preserve` (semantic / expressive — survives restyling):**
- `semantic_relation` — how the subject relates to others / the scene.
- `expressive_direction` — gaze / head angle / facial direction that carries the 神态.
- `essential_action` — the one action that defines the photo.
- `identity-bearing cues` — the traits that make this individual recognizable.

**`may_discard` (photographic geometry — deleted by default, not simplified):**
- `photographic_pose_geometry` — exact body pose as captured.
- `exact_limb_placement` — precise position of each leg / arm.
- `exact_body_silhouette` — the full outlined shape of the body.
- `tail_geometry` — exact tail shape / position.
- `non_essential_perspective_geometry` — viewpoint-specific perspective lines.

Example: for a photo of a subject, what truly must survive is **"subject looks up + a contact
relation (one resting on another)"** — not the exact position of every leg, the precise body
outline, or the tail. The semantic relation and essential action are preserved; the photographic
pose geometry is allowed to go.

### 2.3 Selective exaggeration (optional — identity/action cues only)

When the downstream Minimal Cue Plan represents a cue, an identity-bearing or action-bearing cue
may be exaggerated to strengthen recognition (e.g., a distinctive ear, a contact relation). This
may **noticeably** alter graphic proportion or directional emphasis, but must **never** increase
descriptive detail. Rules:
- exaggerate **only** that cue;
- do **not** cartoonify the whole body (no chibi / mascot proportions);
- do **not** exaggerate by adding detail — a proportion / emphasis shift, not more marks;
- extra contour lines, extra facial detail, and cartoon decoration are forbidden.
Synced with `references/minimal-cue-plan.md` §5 and `references/loose-line-compiler.md` (Stage
logic + `selective_exaggeration` setting).

---

## 3. What is explicitly droppable (NOT required to preserve)

- photorealistic fur / hair detail
- exact lighting
- photographic depth of field
- background clutter
- camera noise
- exact texture
- exact pixel geometry

Do **not** treat these as preservation targets. Stylization and simplification of them are
expected and allowed.

---

## 4. Content Essence Card (auto-generated)

The AI produces this card automatically. Minimum fields:

| Field | Meaning |
|---|---|
| `subject_identity` | What the subject is (species / object class), generically. |
| `pose` | Body pose / action. |
| `orientation` | Facing direction, head angle. |
| `gaze` | Where the eyes look; attention direction. |
| `facial_expression` | Expression read from observable cues. |
| `body_posture` | Relaxed / tense / coiled / sprawled, etc. |
| `interaction_state` | Alone, with another subject, with a human, etc. |
| `distinctive_visible_traits` | Recognizable marks, shapes, proportions of *this* individual. |
| `identity_signature` | The smallest combined set of traits whose relative placement keeps the individual recognizable. |
| `source_relative_proportions` | Only identity-bearing proportional relations; never full photographic geometry. |
| `asymmetry_to_preserve` | Source-visible asymmetry that materially carries identity or expression. |
| `recognizability_floor` | The minimum subset of identity-signature cues that must remain together downstream. |
| `expressive_character` | The temperament the image conveys (calm / wary / playful / etc.). |
| `must_preserve` | The subset above that is essential to keep. |
| `may_simplify` | Anatomy / texture / lighting / background the style may simplify. |
| `must_not_inherit_from_style_reference` | Reference-specific content (species, props, scenes) that must NOT leak into the new work. |

### Ambiguity handling

Default: **fully automatic, no questions.** Ask the user **at most one focused question**
only if essence is genuinely ambiguous (e.g., "which trait matters most to preserve?").
Never require per-field confirmation.

---

## 5. Link to downstream stages

- `must_preserve` / `may_discard`, `identity_signature`, `source_relative_proportions`,
  `asymmetry_to_preserve`, and `recognizability_floor` feed the **Minimal Cue Plan** (the allow-list of cues that may
  enter generation); `must_not_inherit_from_style_reference` feeds `avoid_reference_content_leakage`.
- The Minimal Cue Plan then drives the Loose-Line Generation Spec.
- The card is checked by **Content Essence Fidelity** and **Cue Fidelity** in Style QA (§style-qa).
- The source photo's content must **never** be overwritten by the Style References.
