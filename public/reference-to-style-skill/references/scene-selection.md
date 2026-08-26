# Scene Selection (Source Photo → Approved Entities)

Scene Selection is the stage **upstream of** the Minimal Cue Plan. Its job is **not** to decide
how to draw something minimally; it decides **what is even allowed to enter the frame**.

The v0 line-only engine has a recurring failure mode: the model first treats *every* element in the
source image — the animal, a human limb, a table, a bowl, a mug, a tissue pack, a cable — as
"content that must be drawn", and only *then* simplifies those elements. The result becomes sparse
but still cluttered with irrelevant objects.

This file fixes that by forcing a **role assignment + inclusion filter** before any cue planning
happens. **Decide what may enter the frame first; decide how to draw it minimally second.**

---

## 1. Fixed `scene_focus_mode`

v0 ships with exactly one fixed mode (a frozen internal config, **not** a runtime input the user
chooses):

```yaml
scene_focus_mode: animal_plus_interaction
```

Definition:

- The **primary visual subject must be an animal**.
- Only humans / animals / objects that form a **key interaction** with the animal may be retained.
- Unrelated background / clutter is **default-excluded**.
- **Visual salience alone is NOT an admission reason** — being prominent in the photo does not earn
  a place in the drawing.

> **Core principle — 显眼 ≠ 有资格进入画面 (prominent ≠ qualified).**
> A large, bright, or central source object is still excluded unless it passes the Inclusion Filter
> (§3–§4).

---

## 2. Scene Role Assignment

Every entity the AI recognizes in the source image must be assigned a **scene role** *before* it can
reach the Minimal Cue Plan. An entity with no role assigned cannot enter the plan.

```yaml
scene_roles:
  primary_subject:
    - the main animal subject of the frame
    - must be the visual and expressive center
  interaction_partner:
    - a human or another animal in direct interaction with the animal
  interaction_object:
    - an object that directly connects, mediates, or defines the interaction relation
  framing_cue:
    - a structural hint kept ONLY when it genuinely helps express the animal's
      spatial relation / containment
  background_context:
    - visible scene information that does NOT affect understanding of identity,
      expression, action, or relation
  noise:
    - clutter / miscellaneous objects unrelated to the core expression
```

Rules:

- Every recognized source entity gets exactly one role (the most specific role that applies).
- `primary_subject` is mandatory and unique.
- A `framing_cue` is **not** a free pass for scenery — it qualifies only when it carries relation /
  containment information (see §4.3 and §8).
- If an entity does not fit `primary_subject` / `interaction_partner` / `interaction_object` /
  `framing_cue`, it defaults to `background_context` or `noise` (both default-deleted).

---

## 3. Inclusion Filter

Hard admission rules applied after role assignment:

```yaml
must_include:
  - primary_subject

conditionally_include:
  - interaction_partner      # only when it carries core relation information
  - interaction_object       # only when it carries core relation information
  - framing_cue              # only when it carries core relation information

default_delete:
  - background_context
  - noise
```

- `must_include` entities always survive to the Scene Selection Card.
- `conditionally_include` entities survive **only if** they actually carry core relation
  information (they must pass the Non-animal Inclusion Test in §4 where applicable).
- `default_delete` entities are excluded by default and may **not** be restored by later stages.

---

## 4. Non-animal Inclusion Test

Every **non-animal** element must pass at least one of the following four tests to enter the
drawing:

1. **Direct physical contact** — it is in direct physical contact with the animal.
2. **Direct mediation** — it directly mediates the interaction (the object through which the
   relation happens).
3. **Key spatial framing / containment** — it defines the animal's key spatial framing or
   containment (e.g., the structure the animal leans on / is enclosed by).
4. **Removal breaks legibility** — removing it would make the core action or relation unreadable.

If **none** applies → **exclude it completely.**

Do **NOT** keep an element for any of these reasons:

- it is visually large;
- it is visually salient / eye-catching;
- it is near the animal;
- it is present in the original composition;
- it would help realism;
- it would help scene completeness.

This test is the operational form of *prominent ≠ qualified*.

---

## 5. Interaction taxonomy

The interaction types v0 recognizes (used to justify an `interaction_partner` /
`interaction_object` / `framing_cue` admission):

```yaml
interaction_types:
  direct_contact:
    - direct bodily contact with the animal
    - e.g., a foot / hand / embrace / a paw resting on something
  support_or_perch:
    - the structure the animal stands on / lies on / leans against / peers from
    - e.g., a sofa edge, a knee, a chair edge
  lead_or_link:
    - the object that connects the two parties of a relation
    - e.g., a leash
  containment_or_framing:
    - forms a key spatial relation
    - e.g., two legs cradling the animal, a sofa edge forming a foreground limit
  approach_or_reach:
    - an action relation of reaching / extending / approaching
  gaze_target_if_essential:
    - kept only when the core action is unreadable without the gaze target
```

An interaction type is **admission justification**, not decoration: it is recorded only when it lets
a non-animal element pass §4.

---

## 6. Scene Selection Card

A structured intermediate artifact produced **after** Content Essence and **before** the Minimal
Cue Plan. It is the **sole authority** on which entities are allowed into the drawing.

```yaml
scene-selection-card:
  scene_focus_mode:        animal_plus_interaction
  primary_subject:         [<the animal>]
  interaction_partners:    [<human/animal in direct interaction>]
  interaction_objects:     [<object mediating the interaction>]
  framing_cues:            [<structural hint carrying containment/framing>]
  excluded_elements:       [<everything default-deleted>]
  core_interaction:        [<the one relation that defines the photo>]
  environment_budget:      { max_structural_context_cues: 1 }
```

Example logic (illustrative — **not** a hardcoded case rule; the engine must not key on any specific
species / prop / scene):

> Suppose the source contains: an animal, a human's feet, a cable, carpet texture, furniture, a
> wall — and the true core relation is *paw resting on the human foot*.
>
> ```yaml
> scene-selection-card:
>   scene_focus_mode:     animal_plus_interaction
>   primary_subject:      [animal]
>   interaction_partners: [human feet]            # direct contact (test 1)
>   interaction_objects:  [none]
>   framing_cues:         [optional minimal foreground foot relation]
>   excluded_elements:    [cable, carpet texture, furniture, wall, unrelated room context]
>   core_interaction:     paw resting on human foot
>   environment_budget:   { max_structural_context_cues: 1 }
> ```

The excluded list may include any object that fails §4 — bowls, mugs, tissue packs, laptops, food
detail, parked cars, pavement texture, cables, room clutter, etc. These enumerations are examples of
*non-essential background*, **not** a species / prop / scene-specific rule.

---

## 7. Spatial Fact Map

Produced alongside the Scene Selection Card, **between** Inclusion Filter and Minimal Cue Plan. It
captures only the essential spatial facts among the **approved** entities — the geometry the Minimal
Cue Plan must preserve as the core interaction:

- who is in direct contact with whom;
- containment / framing relationships;
- the framing axis (if the single allowed `framing_cue` is used).

The Spatial Fact Map does **not** record excluded elements and does **not** record background
geometry. It exists so the Minimal Cue Plan never re-derives scene inclusion from the photo — it
works only from approved entities and their core relation.

---

## 8. Environment Budget

Hard limit on structural / environmental context:

```yaml
environment_budget:
  max_structural_context_cues: 1
```

- At most **one** environment / structural hint may exist in the final drawing.
- That single cue must carry **interaction**, **framing**, **containment**, or **spatial
  legibility** — it is never kept merely because "it was in the original".
- A `framing_cue` from §2 counts against this budget.

Legal (one cue, relation-carrying):

- one sofa edge;
- one table-edge axis;
- one ground axis;
- two leg masses acting together as **one** framing relationship.

Illegal (multiple unrelated context cues, even if all present in the source):

- table + bowl + mug + tissues;
- wall + car + pavement texture;
- carpet + cable + furniture + baseboard.

---

## 9. Downstream authority + overfitting guard

**Division of labor (do not let the lower layers re-do scene selection):**

- **Scene Selection** decides *what may be drawn* (this file).
- **Minimal Cue Plan** (`references/minimal-cue-plan.md`) decides the *minimum cues* for those
  allowed entities.
- **Loose-Line Compiler** (`references/loose-line-compiler.md`) decides *how many / what kind of
  lines* express those cues.

**Excluded once = excluded downstream.** Anything the Scene Selection Card marks `excluded` may
**not** re-enter the Minimal Cue Plan, the Loose-Line Compiler, the Generation Spec (not even as
"optional context"), or be auto-restored for compositional reasons.

> **Overfitting guard.** All roles, tests, and enumerations in this file are **generic**. The
> example entities (animal, human foot, bowl, mug, tissues, cable, car, pavement, furniture, wall)
> are illustrative of the *non-essential background* rule, not bindings to any specific species /
> prop / scene. The engine must not branch on, prioritize, or exclude any specific subject class.
> The architecture red lines in `SKILL.md` §10 still apply (no source-specific string, no
> artist name, no medium claim).
