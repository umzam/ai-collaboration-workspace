---
name: prd-review
description: Review PRDs and product prototypes for high-value product gaps that block deterministic implementation, testing, or acceptance. Use for daily PRD reviews, requirement reviews, delivery-readiness reviews, product-spec reviews, and HTML prototype ↔ PRD consistency checks. Focus on flows, states, permissions, exception closure, delivery readiness, unconfirmed prototype assumptions, and decisions that require a product or business owner; do not perform exhaustive documentation audits by default.
---

# Product PRD Review v0.2

Perform a lightweight, evidence-based product review. Find the few issues that materially affect product meaning, deterministic implementation, testability, or acceptance. Do not optimize for exhaustive completeness.

## Review Contract

- Read the PRD and all user-designated behavior references, including HTML prototypes.
- Treat a prototype as important behavioral evidence, not as automatic business truth.
- Do not modify the PRD or prototype. Only write the review artifact requested by the user.
- Do not invent or complete unconfirmed business rules.
- Do not default to technical design. Mention technical or AI concerns only when they expose a product decision, feasibility risk, or acceptance blocker.
- Ignore low-value wording, formatting, template compliance, and generic non-functional concerns unless they block development or acceptance.
- Prefer a short list of high-value findings over a comprehensive checklist dump.

## Evidence Labels

Keep these distinctions explicit in reasoning and findings:

- **Stated**: directly defined by the PRD or another confirmed source.
- **Inferred**: a reasonable interpretation, but not explicitly confirmed.
- **Missing**: information required for deterministic product behavior or acceptance is absent.
- **Question**: a semantic decision must be made by a product manager or business owner.

When useful, place labels directly in the `Issue` cell, for example: `Stated: ...; Missing: ...` or `Question: ...`.

## Route and Human Gate

Assign exactly one `Route` to identify the primary owner of the next action. Set `Human Gate` independently to `Yes` or `No`; it is not a route. A finding may be `Product Issue` with `Human Gate = Yes`.

### Product Issue

Use when product intent is incomplete, internally inconsistent, or not acceptance-ready. This includes prototype assumptions that require product or business confirmation.

### Technical / AI Issue

Use when product behavior is sufficiently clear but a concrete technical or AI constraint threatens feasibility or verifiability. Do not use this route for generic advice about architecture, locks, transactions, idempotency, retries, security implementation, or model operations.

### Prototype-PRD Mismatch

Use for a **Confirmed Prototype-PRD Mismatch**: the PRD states a rule and the prototype clearly behaves differently. Aligning the prototype to the confirmed rule is the primary next action.

### Human Gate field

- Set `Yes` when product or business semantics require a decision and the available materials do not provide a unique answer. Do not select the answer for them.
- This includes unresolved AI quality release standards, data-conflict behavior, permission or responsibility boundaries, and other high-impact product choices. Technical owners may provide constraints or candidate options, but the appropriate product or business owner must confirm the behavior.
- Set `No` when the finding can be resolved from confirmed material or by technical validation without a new product/business decision.
- Human Gate does not replace or override Route.

## Prototype Relation

Classify each finding independently from Route and Human Gate:

- **Confirmed Mismatch**: PRD and prototype define clearly conflicting behavior. Normally route to `Prototype-PRD Mismatch`.
- **Prototype Assumption**: PRD does not define the rule, but the prototype has implemented one product behavior. Do not treat either artifact as correct by default. Normally route to `Product Issue` and set `Human Gate = Yes` when adopting or rejecting the assumption requires product judgment.
- **None**: the issue does not rely on prototype behavior.

Do not label a prototype assumption as a confirmed mismatch merely because the PRD is silent.

## Secondary Tags

Use one or more concise tags as needed:

- `flow`
- `state`
- `permission`
- `exception`
- `data`
- `scope`
- `acceptance`
- `ai-behavior`
- `external-dependency`

Tags describe the affected rule; they do not replace the primary route.

## Severity

- **Blocker**: a core flow cannot be implemented or accepted deterministically, or proceeding would embed an unconfirmed high-impact product decision.
- **High**: likely to cause materially different behavior, failed acceptance, or significant rework, but does not stop all useful progress.
- **Medium**: meaningful localized gap worth fixing; omit lower-value issues by default.

## Required Workflow

1. **Ingest sources**
   - Read the complete PRD and the current prototype or other designated behavior references.
   - Preserve source locations using section names, line numbers, element labels, or short source phrases.
   - Note material review limits such as unreadable diagrams or unavailable interactions.

2. **Trace core behavior**
   - Identify the main user flow and important alternate/terminal paths without outputting a separate business-model essay.
   - Check only the product rules needed to understand triggers, actors, choices, results, and side effects.

3. **Run the high-value checks**
   - Treat delivery readiness as a cross-cutting lens over the same product rules, not as a second independent review pass.
   - **Flow**: Can the main flow start, progress, finish, cancel, retry, and recover?
   - **State**: Are states, transitions, available actions, and terminal states consistent?
   - **Permission**: Is it clear who may view or perform consequential actions across all entry points?
   - **Exception**: Do important failure, empty-result, cancellation, retry, and partial-result paths reach a defined outcome?
   - **Data semantics**: Are product-level identity, overwrite, merge, preservation, and result-application rules deterministic? Do not prescribe technical implementation.
   - **Delivery readiness**: For every material rule already described, determine whether it supports:
     - **Implementation Readiness**: Development can derive one expected behavior from the PRD, prototype, and confirmed decisions.
     - **Testability**: QA can define main-flow, exception, boundary, state, permission, and data-validation cases with one expected result.
     - **Acceptance Readiness**: Product acceptance can judge the key behavior and result as Pass or Fail.
   - Prioritize readiness gaps where a rule exists but remains non-executable, non-testable, or non-verifiable. Look especially for:
     - ambiguous terms such as “recent,” “necessary,” “reasonable,” “appropriate,” “default,” “related,” or “as much as possible” when they permit materially different implementations;
     - validation concepts without explicit pass/fail conditions, including field type, required fields, key completeness, illegal values, empty output, and partial failure;
     - mentioned states, permissions, or exceptions that still lack executable triggers, actions, outcomes, or transitions;
     - AI behavior described only as successful or correct without representative samples, quality/completeness criteria, tolerance rules, or an acceptance threshold when such a threshold is required for release;
     - input limits, timeout/rate-limit behavior, output completeness, partial completion, or boundary conditions that prevent one implementation or test expectation.

4. **Compare prototype ↔ PRD**
   - Classify direct behavioral conflicts as `Confirmed Mismatch`.
   - Classify controls, states, defaults, validations, or outcomes present only in the prototype as `Prototype Assumption` when they encode product behavior.
   - Find PRD-required behavior missing from the prototype when the prototype claims to cover that flow.
   - Distinguish prototype demonstration shortcuts from apparent product assumptions where the source supports that distinction.

5. **Prioritize and route**
   - Include only findings with material product, development, or acceptance impact.
   - Assign severity, one Route, Human Gate `Yes/No`, Prototype Relation, and secondary tags.
   - Set Human Gate to `Yes` for every unresolved product/business semantic decision without changing its Route.
   - Merge duplicate symptoms into one finding with multiple locations.
   - Do not create a second finding when readiness only explains the implementation, testing, or acceptance impact of an existing issue. Extend that finding's `Why it matters` instead.
   - Add a readiness finding only when it identifies a distinct executable, testable, or acceptable gap not already represented by another finding.

6. **Suggest direction, not the answer**
   - Explain why the issue matters.
   - Recommend the next handling step: clarify a decision, define an action matrix, align one artifact to a confirmed rule, or ask technical/AI owners to validate a constraint.
   - Do not choose a business rule on behalf of product. Do not write a full implementation design or a test matrix unless the user explicitly asks.
   - For AI or technical findings, state the observable problem and the capability boundary that needs confirmation. Do not select a model, architecture, or implementation strategy for engineering.

## Ready Status

Use one status:

- **Not Ready**: at least one unresolved Blocker or core-flow Human Gate prevents deterministic implementation, testing, or acceptance.
- **Ready with Conditions**: no core blocker remains, but High findings or non-core Human Gates must be resolved before they affect implementation, testing, or acceptance.
- **Ready**: no material unresolved finding prevents development from forming one implementation expectation, QA from forming one test expectation, or product from applying Pass/Fail acceptance criteria to the core functionality.

State readiness for the stage relevant to the request. If unspecified, assess readiness for development, testing, and acceptance.
Allow non-blocking TBDs to remain. Do not create low-value findings merely to make the document appear complete.

## Required Output

Use exactly this compact structure unless the user requests another format:

```markdown
# Review Summary

- Ready status: [Not Ready / Ready with Conditions / Ready]
- Blocking issues: [count and IDs, or None]
- Human Gates: [count and IDs, or None]
- Confirmed Prototype-PRD Mismatches: [count and IDs, or None]
- Prototype Assumptions: [count and IDs, or None]

# Findings

| ID | Severity | Route | Human Gate | Prototype Relation | Tag | Location | Issue | Why it matters | Suggested action |
|---|---|---|---|---|---|---|---|---|---|

# Human Gates

| ID | Decision needed | Why product/business must decide | Affected findings |
|---|---|---|---|
```

## Output Rules

- Keep IDs stable and concise, such as `PRD-001`.
- Route must be exactly one of `Product Issue`, `Technical / AI Issue`, or `Prototype-PRD Mismatch`.
- Human Gate must be exactly `Yes` or `No` and must not appear as a Route.
- Prototype Relation must be exactly `Confirmed Mismatch`, `Prototype Assumption`, or `None`.
- Count confirmed mismatches and prototype assumptions separately; never combine them into one mismatch total.
- In `Human Gates`, include only genuine semantic decisions absent from current materials. Do not repeat ordinary Product or Technical / AI findings.
- Do not add business understanding, object maps, module maps, separate module/cross-module sections, full test matrices, scoring, or generic checklists by default.
- Do not repeat the same issue in multiple sections; the Human Gates table should reference finding IDs rather than restating the full finding.
- Keep the tone direct, specific, and constructive.
