# Research Notes Workspace — AI Enrichment PRD

> Synthetic reconstruction based on observed product workflow patterns. All product names, roles, datasets, values, and interface labels are fictional.

## 1. Goal

Allow a workspace operator to select passages from fictional research notes, generate candidate rows asynchronously, and decide whether those candidates should change a selected target dataset.

## 2. Scope

In scope:

- select passages and one target dataset;
- choose an applicable enabled prompt and model;
- create and inspect an asynchronous enrichment job;
- preview, copy, apply, manually handle, discard, retry, or run again;
- manage prompt and model availability.

Out of scope:

- automatic modification before human confirmation;
- unconfirmed processing scenarios;
- production model infrastructure or security mechanisms.

## 3. Human Gate

| ID | Decision needed | Current handling |
|---|---|---|
| HG-001 | Does the separate reviewer role participate in this feature? | Do not infer permissions. Pause affected scope pending a Human Decision. |

## 4. Roles

| Role | Confirmed capability |
|---|---|
| Workspace operator | Select content, create a job, inspect results, apply or discard, and run again |
| System administrator | Maintain prompt configurations and model availability |
| Reviewer | Pending HG-001; no permissions are defined |

## 5. Main flow

1. The operator chooses a target dataset.
2. The operator selects one or more passages.
3. The system filters enabled prompts and models applicable to that dataset.
4. The operator chooses a prompt and model and confirms job creation.
5. The system creates a background job and returns to the workspace.
6. The operator opens job details and previews candidate rows.
7. The operator selects Append, Replace, Manual handling, or Discard.
8. The system updates the formal dataset only after a confirmed apply action.
9. The completed job remains available in history and can seed Run Again.

## 6. States

| State | Available actions | Data effect |
|---|---|---|
| Queued | View, Cancel | No formal-data change |
| Running | View | No formal-data change |
| AI Failed | Retry, Discard, Run Again | No formal-data change |
| Awaiting Apply | Preview, Apply, Discard, Run Again | Candidate output only |
| Write Failed | Preview, Retry Write, Discard, Run Again | Candidate output retained; formal data unchanged |
| Applied | View, Preview, Copy, Run Again | Prior apply result retained; cannot apply or discard again |
| Discarded | View, Preview, Copy, Run Again | No formal-data change; cannot apply or discard again |
| Cancelled | View, Run Again | No candidate output |

## 7. Data rules

- The target dataset is fixed at job creation.
- Candidate output remains separate until a human applies it.
- Append fills only `''` or `null` values.
- `—` is valid data and must not be treated as empty.
- Replace substitutes the selected dataset only after confirmation.
- Manual handling records completion without automatically writing candidate rows.

## 8. Creation requirements

The confirmation action is enabled only when all three conditions are satisfied:

- at least one passage is selected;
- an applicable enabled prompt is selected;
- an applicable enabled model is selected.

The system validates the same conditions again before creating the job.

## 9. Administration boundary

- Prompt list status is Enabled or Disabled.
- Draft belongs to the prompt edit process and does not appear as a public list status.
- Only explicitly confirmed processing scenarios appear in the current configuration surface.
- Model connection details are represented only by fictional placeholders in this public prototype.

## 10. Acceptance criteria

- Formal data never changes before a human apply decision.
- Append never overwrites `—` or another non-empty value.
- Applied and Discarded jobs do not expose Apply or Discard again.
- No job can be confirmed without an applicable enabled model.
- The management surface does not expose Draft as a list state or unconfirmed scenarios.
- HG-001 remains unresolved until a Human Decision is recorded.
