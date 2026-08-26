# Style QA — visual-language retention

Style QA runs after generation (first pass, and again after a Revision). It checks whether
the **visual language** is retained against the **fixed Confirmed Style Profile**
(`references/confirmed-style-profile.md`, loaded directly — not re-analyzed at runtime). **It is
not pixel similarity** and never uses a per-pixel metric.

---

## 1. Verdict scale

Each dimension → `pass` / `fail(type)` / `n/a`. A single summary verdict plus the
dimension table is returned to the user as the **concise QA summary**.

---

## 1.5 Top-priority judgment — Distilled Cue Drawing

This judgment runs **before** all 18 dimensions and can override them. It is the single most
important pass/fail decision.

**Core question:** *Does the result read as a distilled cue drawing, not a reduced descriptive
sketch?*

- A **distilled cue drawing** = a few key features were extracted and then recomposed into a new
  image. It reads as a sparse drawing first.
- A **reduced descriptive sketch** = a realistic sketch had some lines deleted. It still reads as
  "the photo, minus a few lines".

FAIL if the result still shows any of:
- describing fur through repeated edge fragments or coat texture; a few dry interruptions inside
  dominant identity forms are acceptable;
- describing facial structure (eye-area support, muzzle construction, brow / nose-bridge lines);
- describing the body beyond what source identity, stance, or the approved relationship needs;
- describing the original photo geometry (traced / outlined photo, full silhouette preserved);
- reading as a carefully drawn figure (human / participant) with every limb, clothing item,
  shoe, finger, or hair strand accounted for;
- both participants clearly drawn but the core contact / lead relation is not the prominent
  element.

Observable grain, pressure variation, and tapered ends belong mainly to 2–3 dominant structural
or relation gestures. Secondary marks should remain lighter and simpler. A few dry interruptions
confined to identity-bearing dominant forms are acceptable when they read as mark behavior rather
than repeated coat description.

> **Face-mark rule:** an eye cue is compact and graphic. One tiny internal paper reserve may pass;
> iris/pupil hierarchy, rings, eyelid modeling, multiple optical highlights, or volume do not.

Even if the **line count is already reduced**, it is still judged **FAIL** when it reads as a
reduced descriptive sketch rather than a distilled cue drawing.

This judgment makes explicit the boundary the Mark Economy, Feature-first Reconstruction, and Cue
Fidelity dimensions enforce: omission must be *structural* (built from cues), not *subtractive*
(photo with lines erased).

## 1.6 Second top-priority judgment — every mark must earn its place

Runs alongside §1.5. Core question:

> **Does every visible mark earn its place by carrying identity, expression, action, relation,
> placement, or essential gestural construction?**

- If a mark exists only to make a body / form "look complete", it does **not** earn its place →
  FAIL. A non-contact limb or body connection may pass when it materially establishes source
  stance, support, or interaction readability.
- Pressure changes and sparse dry interruptions may earn their place inside dominant structural /
  relation gestures. They fail only when they multiply into descriptive surface texture.
- Practical test for figure participants: **if deleting this line, can the action / relation still
  hold?** If yes → delete it. The lead / contact line, the action-bearing limb, and the contact
  relation must stay; an extra hem, second arm, second trouser leg, shoe, hair strand, finger, or
  portrait face should go.

This judgment upgrades "draw less" into the sharper v0.2.x rule:
**allow graphic distortion; forbid descriptive completion.**

## 1.7 Scene-level FAIL — context_intrusion

Runs alongside §1.5 / §1.6. It verifies the **Scene Selection Card** (`references/scene-selection.md`)
was honored downstream — no excluded element crept back in.

FAIL if:
- non-essential background enters the result;
- scene clutter reappears;
- excluded objects are rendered;
- decorative environment detail appears.

This includes — but is not limited to — bowls, mugs, tissues, laptops, food detail, parked cars,
pavement texture, cables, and room clutter. These are illustrative examples of *non-essential
background*, not a species / prop / scene-specific rule (see the overfitting guard in
`references/scene-selection.md` §9 and `SKILL.md` §10 rule 12).

> **Prominent ≠ qualified.** A large or central source object that failed the Inclusion Filter is
> still a fail here if it appears. Visual salience is never an admission reason.

## 1.8 Scene-level FAIL — subject_dilution

FAIL if the animal is not clearly the **primary visual subject**:
- the animal is not the clear visual and expressive center;
- a human / object / environment receives comparable or stronger visual attention;
- context competes with the animal for attention.

The drawing must read as *the animal + its core relation*, not as *a scene in which an animal
happens to appear*. (Reinforces `scene_focus_mode: animal_plus_interaction`.)

## 1.9 Scene-level FAIL — interaction_underweight

FAIL if the participants are present but the **core interaction is not visually readable**:
- the interaction partner is drawn, but its relation to the animal is unclear;
- the action relation is weaker than non-essential body / scene information;
- the core contact / lead / containment / framing relation is buried under participant anatomy or
  background.

Examples (illustrative, not hardcoded case rules):
- the animal and a foot are both present, but "paw resting on foot" is not clear;
- a person, the animal, and a leash are present, but the "walking / leading" relation is unclear;
- the animal between two legs is present, but the containment / framing relation is lost.

This is the scene-level companion to §1.6's "every mark must earn its place" and to the
Generation Spec Validator's `relation_underweighted` (§6.13): once the relation is legible, stop
adding body / scene marks.

## 1.10 Composition-level FAIL — subject_fill_drift

FAIL if:

- the primary animal occupies too much of the page;
- the composition feels filled by the subject or approved subject cluster;
- the result reads like a large portrait rather than a small placed subject;
- the animal scale contradicts the recorded relationship class and Spatial Fact Map evidence;
- an interaction partner / object / framing cue expands until the combined composition feels full.

Use the recorded relationship band: `placement_wide` 15%–35%, `interaction_medium` 25%–50%, or
`expression_close` 35%–65%. These are visual composition bands, not pixel-exact segmentation.

## 1.11 Composition-level FAIL — negative_space_loss

FAIL if:

- blank space is insufficient;
- added lines compress the open field;
- the composition feels crowded despite reduced detail;
- empty regions look treated as gaps to fill or balance rather than active style structure.

Once the core subject and interaction read, additional marks must stop. Preserve blank space
instead of completing anatomy or balancing the composition.

## 1.12 Composition-level FAIL — position_relation_flattening

FAIL if:

- the image shows the animal and approved partner / object / framing cue but loses the expressive
  sense of the animal's small placement;
- subject enlargement replaces relational positioning;
- contact, containment, support, lead, edge / corner proximity, or the single structural anchor is
  flattened into a generic centered arrangement;
- the correct entities remain, but their positional topology no longer communicates the source's
  core relation.

This checks expressive **where / placement**, not pixel-level coordinate fidelity.

## 1.13 Identity-level FAIL — generic_mascot_drift

FAIL if the subject reads as a generic cute class icon rather than a source-conditioned
individual: mirrored default forms replace meaningful asymmetry, universal face symbols replace
the selected expression relationships, or the result would remain unchanged if substituted with
another member of the same class.

## 1.14 Mark-level FAIL — synthetic_monoline_drift

FAIL if the drawing uses uniform width / opacity, smooth digital curves, evenly rounded ends, or
equal visual weight across all marks. The fixed language requires a hierarchy: 2–3 dominant
structural / relation gestures show observable uneven deposition, pressure / width variation,
tapered ends, and slight wobble, while secondary marks remain thin, light, and single-pass.

## 1.15 Identity-level FAIL — identity_signature_collapse

FAIL if the final image falls below the Minimal Cue Plan's `recognizability_floor`: a required
source-relative proportion, asymmetry, directional feature, characteristic mass cue, or expression
relationship is missing or normalized away even though the subject class remains readable.

## 1.16 Compiler-level FAIL — primitive_semantic_detachment

FAIL if countable primitives appear but no longer communicate their selected semantic cue,
relative placement, or gesture character. Correct primitive count alone cannot pass QA.

## 1.17 Canvas-level FAIL — square_canvas_drift

FAIL if the delivered image is not `1:1`, if it inherits the source-photo aspect ratio, or if a
square result was obtained by cropping away the intended subject placement, interaction, or
dominant blank field. The composition must be solved natively on a square canvas.

## 1.18 Mark-level FAIL — mark_surface_scope_drift

FAIL if pressure / width variation, uneven deposition, heavy darkness, or dry interruptions spread
indiscriminately across most marks and become depicted surface texture. A few interruptions within
identity-bearing dominant forms pass; face marks remain compact and graphic.

## 2. Dimensions (against the confirmed Profile)

Base dimensions 1–12 below, plus six extensions — **Content Essence Fidelity** (source-image),
**Mark Economy / Omission**, **Feature-first Reconstruction** (source-image), **Cue Fidelity**
(source-image), **Canvas Tone Fidelity** (always-on for v0 line-only), and **Selective Exaggeration
Discipline** (when exaggeration is used) — for a total of 18 QA dimensions.

1. **Negative space / isolation** — native `1:1` square canvas; one active dominant blank field;
   subject scale matches `placement_wide`, `interaction_medium`, or `expression_close` relationship
   evidence; no automatic shrinking, enlargement, or rigid centering.
2. **Low saturation** — palette stays low-saturation (CORE, forced).
3. **High-key brightness** — overall high-key (CORE, forced).
4. **Warm-neutral preference** — warm-neutral honored unless the user required a different
   hue (preference; stricter at HIGH).
5. **Mark-making / edge behavior** — role-scoped hand-drawn hierarchy: 2–3 dominant structural /
   relation gestures may show uneven deposition, pressure / width change, tapered ends, and slight
   wobble; secondary marks are thin, light, and single-pass; face marks are flat, compact, solid,
   and featureless; **no physical-medium claim**.
6. **Shape language** — rounded / compact / naive reduction with source-conditioned asymmetry;
   not generic, mirrored, or icon-like.
7. **Abstraction level** — recognizable but strongly simplified (not photoreal, not
   unrecognizable).
8. **Background minimalism** — minimal / sparse; no scene / complex background.
9. **Feature grammar correctness** — minimal marks only on face-bearing subjects; **none**
   on faceless subjects.
10. **Intentional imperfection** — visible brushwork retained at the set level (moderate
    default; pronounced at HIGH).
11. **AVOID-rule violations** — scan for any hard negative (photorealism, polished digital,
    vector-clean, complex background, high saturation, cinematic lighting, detailed
    anatomy, anime-cute, glossy 3D, excess decoration).
12. **Subject fidelity (content)** — the *new* subject is depicted as requested and does
    **not** leak reference-specific content.

### Mark Economy / Omission (calibrated to the confirmed Style Profile)

*Additional QA dimension — NOT a global "fewer lines" rule.* Check whether the result respects
the profile's information budget:

- line density not higher than the profile requires (extremely low for a minimal style);
- contour not over-complete / closed when the profile requires open contour;
- no unnecessary fur detail (no strand-by-strand rendering);
- no excessive facial detail;
- no realistic eye structure; one tiny graphic paper reserve may pass, but rings, modeled optics,
  multiple highlights, or volume fail;
- sparse dry interruptions confined to dominant forms may pass; repeated coat-description fragments fail;
- pressure / width emphasis remains concentrated in the dominant structural / relation gestures;
- no carefully drawn figure (human / fully-bodied participant) where every limb, clothing item,
  shoe, finger, or hair strand is accounted for — figures read as action-bearing large forms;
- no hatching / local fine lines used to model realistic volume;
- active omission is present (large blank areas, broken forms) — not merely "simplified";
- overall information budget of the image matches the fixed Confirmed Style Profile.

A result that is non-photorealistic, black-line, and warm-paper can STILL fail here if it
is over-detailed for the profile's economy target. This dimension is evaluated against the
fixed Confirmed Style Profile's economy level.

### Feature-first Reconstruction (only when a Source Content Image was supplied)

*Additional QA dimension — applies when a source photo drove the restyle; enforces principle 14.*
Verifies the result is a **reconstruction**, not a traced-and-simplified photo outline.

Checks:
- the result does **not** look like a traced / simplified photo outline;
- source silhouette is not over-preserved — the subject is recomposed from salient features,
  not outlined from the photo;
- no non-salient geometry is retained (irrelevant contours, exact limb positions, photographic
  fur / texture, volumetric shading);
- key identity / expression / action cues are **not** weakened while irrelevant geometry remains
  — omission targets the non-essential, not the essential.

Core distinction: the result must be **feature reconstruction**, not **photo subtraction**.
"Photo subtraction" = the full photograph is drawn, then details are erased; the structure still
reads as the photo. "Feature reconstruction" = the image is built only from the selected cues and
reads as a sparse drawing first.

FAIL conditions (any one fails the dimension):
- result looks like a simplified / traced outline of the source photo;
- too much original source contour is preserved;
- non-key geometry is retained *more* than key features;
- the result is "photo subtraction" rather than "feature reconstruction".

### Cue Fidelity (only when a Source Content Image was supplied)

*Additional QA dimension — checks the final image against the **Minimal Cue Plan**.* Verifies the
key cues the plan selected are actually present and effectively expressed — it does **not** check
photo-geometry consistency.

Checks:
- the Minimal Cue Plan's key `salient_identity_cues` are present (minimum representation exists);
- the `identity_signature` meets its `recognizability_floor`, including required relative
  proportions and meaningful asymmetry;
- the `expressive_cues` (gaze / head angle / expression) read in the result;
- the `essential_action_relation` is conveyed (a contact / lead / embrace relation is legible);
- the relation is the **most prominent** element where the source is relation-dominant — not
  buried under participant anatomy (relation fidelity);
- each permitted mark maps to a selected cue — no orphan mark exists only to complete anatomy /
  silhouette / texture / volume / photographic resemblance.
- each countable primitive remains semantically and positionally attached to its selected cue.

FAIL conditions (any one fails the dimension):
- a key identity / expression / action / relation cue from the plan is missing or unreadable;
- the subject remains class-recognizable but its required identity signature collapses;
- the result preserves photo geometry the plan explicitly `discarded`;
- orphan marks appear that map to no selected cue;
- the core contact / lead relation is weak or missing while both participants are fully drawn
  (relation underweighted).

### Canvas Tone Fidelity (v0 loose_line — always applicable)

*Additional QA dimension — checks the ground reads as warm paper, not a blank white digital
canvas.* v0 keeps the reference's warm paper feel while staying line-only.

Checks:
- the ground reads as a warm paper tone (`warm_off_white` / `light cream` / `soft beige`), not a
  stark white digital canvas;
- background has no scene and no detail (scene = none, detail = none);
- at most 0–1 minimal ground cue is present (a faint short line is fine);
- the warm tone is a *paper tone*, not color rendering — no watercolor fill, tonal wash, color
  shading, painterly fill, or grey wash has crept in.

FAIL conditions:
- the ground is a blank white digital canvas (no warm paper tone);
- the warm tone is realized as color fill / wash / painterly rendering (i.e., it has become color
  mode);
- background has a scene, detail, or more than 1 ground mark.

### Selective Exaggeration Discipline (when exaggeration is used)

*Additional QA dimension — checks that any exaggeration stays targeted and discipline-bound.* It
enforces principle 14's selective-exaggeration rule and the loose-line compiler's
`selective_exaggeration` setting.

Checks:
- only identity-bearing / action-bearing cues are exaggerated, and only slightly;
- the whole body is **not** cartoonified (no chibi / mascot proportions);
- exaggeration is achieved by proportion / emphasis shift, **not** by adding detail;
- no extra contour lines, extra facial detail, or cartoon decoration appear.

FAIL conditions:
- whole-body cartoon / chibi proportions;
- exaggeration via added detail (more marks than the minimum cue);
- extra contour lines, extra facial detail, or cartoon decoration present.

---

## 3. Content Essence Fidelity (only when a Source Content Image was supplied)

Checks the result retains the source's:

- identity cues
- pose
- gaze
- facial expression
- body attitude
- expressive character
- identity signature, source-relative proportions, and meaningful asymmetry at or above the
  recorded recognizability floor

**This is not pixel similarity.** Allowed: anatomical simplification, brush/touch
variation, background simplification, color stylization.

**Not allowed without user direction:** flipping the subject's temperament. If the source
reads as relaxed / blank / alert / aggrieved / excited / sleepy, the output must not
silently become a wholly different one (e.g., calm → frantic, sleepy → alert, blank →
exaggerated happy, cautious → playful). A temperament rewrite with no user direction is a
**Content Essence Fidelity fail** — the user's "神态" must not be silently rewritten.

---

## 4. Fail handling

Each `fail` carries a `type` (off-style / broken-invariant / over-realistic / high-saturation
/ complex-background / essence-drift / etc.). Fail-types feed the **single targeted
Revision**: fix the failed dimension(s), do not repaint wholesale. After the Revision, QA
re-runs; if still failing, **STOP and report**.
