# Confirmed Platform Rules

Apply these rules only to features on the current data-processing platform and only when the relevant platform capability is in scope. If applicability is uncertain or the prototype intentionally changes a rule, use a Human Gate.

## Incremental platform extension

- Describe new and changed behavior only.
- Reuse unchanged platform navigation, lists, pagination, common dialogs, and other established behavior by reference.
- Do not redesign existing platform layout or workflow without a confirmed product decision.

## Permission separation and action reuse — S-15

- Separate view permission from operation permission.
- Access to a list, detail page, result, or log does not automatically grant edit, retry, apply, complete, or administrative actions.
- Before reviewing permissions, classify each item as a new action, an existing platform action, or a read-only state.
- Reuse the existing permission definition for an existing platform action.
- Use a Human Gate only for a new sensitive action, a role difference introduced by the requirement, or behavior that conflicts with existing permissions.
- Validate each permitted operation against its current business state.

## Source and result separation

- Keep source inputs read-only when the feature creates a processed result.
- Perform edits or generated changes in a working copy or candidate result.
- Do not change the formal source or target data until the confirmed apply, submit, or complete action.
- Preserve the original source and make the committed result traceable.

## Save and version behavior

- Reuse the platform's automatic-save capability for in-progress changes when the current page participates in that capability.
- Use “Save version” to create an explicit recoverable version; it does not by itself create a final business result.
- Reuse modification history and rollback or restore capabilities instead of inventing a separate version system.
- Preserve current work when saving or version creation fails.

## Asynchronous task behavior

- Treat long-running processing as a persistent background task with explicit states.
- Closing a dialog or leaving a page does not cancel a task unless the user executes a supported cancel action.
- Restore the current task state and available result when the user returns.
- Distinguish queued, running, validation, waiting-for-user, failure, and terminal behavior when those stages exist.

## Failure and completion integrity — S-14

- Display completion only when every required submission item confirmed as part of this operation's success boundary has been persisted and the authoritative state returns a consistent result.
- Determine whether versions, history, notifications, indexes, or other side effects are hard success conditions from an applicable platform rule or confirmed requirement. Do not expand or shrink the success boundary by assumption.
- Preserve usable working copies, candidate results, and versions according to the failure stage.
- Retry the failed stage when possible; do not rerun successful expensive stages without a confirmed reason.
- Keep formal target data unchanged when validation or write fails before commit.

## Cross-surface consistency

- Keep business state and results consistent across relevant lists, detail pages, work areas, and related objects.
- Read the persisted business state instead of independently inferring a different state in each page.
- Do not show a frontend-only success when the persisted state update failed.
