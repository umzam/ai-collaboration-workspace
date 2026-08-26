# Reference-to-Style

Reference-to-Style is an experimental, portfolio-ready Codex Skill for translating one user-owned
source photo into a fixed sparse line-drawing language. It turns a subjective image-generation
task into a structured workflow for content admission, feature compression, prompt compilation,
pre-generation validation, and post-generation QA.

**Status:** `FROZEN_FOR_PORTFOLIO`  
**Version:** `v0.3.3`  
**Supported execution mode:** `loose_line` only

## Runtime contract

The ordinary runtime input is exactly **one user-owned source photo**. The user may optionally add
short preserve, delete, or emphasize notes. The visual language is already fixed in
[`references/confirmed-style-profile.md`](references/confirmed-style-profile.md); users do not
provide style-reference images at runtime.

The current runtime uses a warm off-white paper tone, sparse marks, active negative space, and an
`animal_plus_interaction` scene focus. Output is natively composed in a `1:1` canvas.

## Workflow

```text
Source Photo
→ Content Essence
→ Scene Role Assignment
→ Inclusion Filter
→ Spatial Fact Map
→ Scene Selection Card
→ Feature Selection
→ Minimal Cue Plan
→ Fixed Confirmed Style Profile
→ Loose-Line Compiler
→ Generation Spec
→ Validator
→ Image Generation
→ Style QA
→ Optional single user-directed revision
```

## Build time versus runtime

Build-time work established the fixed Style Profile through reference-image analysis, reference
audits, a human aesthetic gate, and architecture research. Those source images, provenance records,
and third-party Skill materials are not runtime dependencies and are not part of this public Skill
package.

Runtime starts from the user's source photo and loads the confirmed profile directly. It does not
request artist references, rerun style discovery, or ask ordinary users to reconfirm the style. A
single focused question is permitted only when the source content is genuinely ambiguous.

## Current limitations

- Single-photo input and fixed `animal_plus_interaction` scene focus.
- `loose_line` is the only enabled execution family.
- Color, brush fill, wash, mixed line-and-color, and multi-style runtime are deferred.
- The image-generation backend is stochastic and can exceed the compiled mark plan.
- Source identity can weaken in relation-wide, multi-subject scenes.
- The current evidence set contains three internal cases and is not a generalization benchmark.
- Output is fixed to a square canvas, and runtime revision is capped at one user-directed pass.

See [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md) for the complete frozen scope and test status.

## Repository contents

- [`SKILL.md`](SKILL.md) — frozen runtime instructions and source of truth.
- [`references/`](references/) — confirmed profile and runtime workflow specifications.
- [`CHANGELOG.md`](CHANGELOG.md) — design evolution and freeze record.
- [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md) — accepted limitations and evidence status.

This repository snapshot documents a complete failure-to-rule-to-regression design process. It is
portfolio-ready and experimental, not a claim of perfect or production-generalized image output.
