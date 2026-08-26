# Research Notes Workspace — AI Enrichment PRD (Revised)

> Synthetic reconstruction based on observed product workflow patterns. All product names, roles, datasets, values, and interface labels are fictional.

## Human Decision applied

HG-001 is resolved as `Out of Scope`: the separate reviewer role does not participate in the current increment. No reviewer entry, visibility, or action permission is defined. The decision may be reopened only if a later scope explicitly introduces that role.

## Goal and scope

Allow a workspace operator to select passages from fictional notes, create an asynchronous AI enrichment job for a target dataset, inspect candidate rows, and decide whether those candidates should change formal data.

In scope: selection, job creation, prompt/model choice, status, preview, apply modes, retry, discard, history, Run Again, and administration of available prompts/models.

Out of scope: automatic writes before human confirmation, reviewer permissions, unconfirmed processing scenarios, and production infrastructure claims.

## Roles

| Role | Confirmed capability |
|---|---|
| Workspace operator | Select content, create a job, inspect results, apply or discard, and run again |
| System administrator | Maintain prompt configurations and model availability |

## Flow

1. Select a target dataset and one or more passages.
2. Choose an applicable enabled prompt and model.
3. Confirm creation of a background enrichment job.
4. Inspect candidate output without changing formal data.
5. Apply through Append, Replace, or Manual handling, or discard the result.
6. Reopen the terminal job for viewing or use Run Again to start a new job.

## State and action contract

| State | Available actions | Data effect |
|---|---|---|
| Queued | View, Cancel | None |
| Running | View | None |
| AI Failed | Retry, Discard, Run Again | None |
| Awaiting Apply | Preview, Apply, Discard, Run Again | Candidate output only |
| Write Failed | Preview, Retry Write, Discard, Run Again | Candidate output retained; formal data unchanged |
| Applied | View, Preview, Copy, Run Again | Prior apply retained; Apply and Discard hidden |
| Discarded | View, Preview, Copy, Run Again | No data change; Apply and Discard hidden |
| Cancelled | View, Run Again | None |

## Data contract

- Target dataset and source selection are retained with the job.
- Append fills only `''` or `null`; `—` and every other non-empty value are preserved.
- Replace changes the selected dataset only after confirmation.
- Manual handling records the decision without an automatic write.
- Empty output is an AI failure; write failure preserves candidates for write-only retry.

## Creation and administration contract

- Confirmation requires selected content, an applicable enabled prompt, and an applicable enabled model.
- The same conditions are revalidated when Create is pressed.
- Prompt list status is Enabled or Disabled; Draft remains inside the edit process.
- Unconfirmed processing scenarios do not appear in the current management surface.
- All model/provider values in the public prototype are fictional placeholders.

## Acceptance criteria

- `—` is never overwritten by Append.
- Terminal Applied/Discarded views expose neither Apply nor Discard.
- Missing model availability blocks confirmation and creation.
- Prompt management exposes only the confirmed states and scenarios.
- No reviewer permission or unresolved reviewer Gate remains.
