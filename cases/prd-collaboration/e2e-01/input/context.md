# Synthetic Product Context

This E2E package is a synthetic reconstruction based on observed product workflow patterns. It preserves the collaboration decisions and validation logic without reproducing a real product, company workflow, schema, or dataset.

## Product concept

Research Notes Workspace lets a workspace operator select passages from fictional notes and create an asynchronous AI enrichment job for a chosen target dataset.

The operator can:

- select one or more passages;
- choose an enabled prompt configuration and model;
- create a background job;
- preview candidate rows;
- append candidates, replace the dataset, handle them manually, or discard them;
- reopen job history and run again with the previous selection.

The system administrator can maintain prompt configurations and model availability. A separate reviewer role exists elsewhere in the fictional platform, but the supplied evidence does not establish whether that role participates in this feature.

## Synthetic datasets

- Topic Catalog
- Source Index
- Notes Register

All labels, values, identifiers, dates, prompts, models, and records in the prototype are fictional.

## Confirmed product rules

- The selected target dataset is fixed when a job is created.
- Candidate rows never change the formal dataset before a human selects an apply mode.
- Append fills only truly empty values; the visible value `—` is valid data and must not be overwritten.
- Applied and Discarded jobs remain viewable and can be used as the starting point for Run Again, but cannot be applied or discarded again.
- A source selection, an applicable enabled prompt, and an applicable enabled model are required before confirmation.
- Prompt list status is limited to Enabled and Disabled. Draft belongs to the edit process, not the public list state.
- Unconfirmed processing scenarios are outside this increment.

## Evidence boundary

Only this synthetic input package, the two bundled Skills, the recorded Human Decision, and the generated artifacts are in scope. No real project artifact or historical answer is an input to this public reconstruction.
