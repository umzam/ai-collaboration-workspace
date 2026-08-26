# Organization PRD Standard — Example Template

This file is a blank schema for recording an approved organizational PRD standard. It is not an approved standard and contains no organization-specific requirements.

Replace every placeholder with confirmed local guidance. Remove sections that are not used, but do not omit information required for unique implementation and testing.

## Source and Applicability

| Item | Confirmed value |
| --- | --- |
| Approved template or policy source | `[link or document identifier]` |
| Owner | `[role or team]` |
| Effective version/date | `[version or date]` |
| Applies to | `[product area or requirement type]` |
| Known exceptions | `[scope exceptions]` |

## Required Document Structure

Record the approved section order and whether each section is required or conditional.

| Order | Section | Required/conditional | What it must contain |
| --- | --- | --- | --- |
| `[1]` | `[section name]` | `[required/conditional]` | `[content requirement]` |

If no approved format exists, a compact functional default is:

1. Functional description
2. Elements and interactions
3. Business rules

Add permissions, preconditions/postconditions, flow, states, exceptions, fields/enums, and acceptance criteria only when needed for completeness.

## Required Tables

Record each approved table without inserting real project data.

### Document Metadata

| Field | Required | Format or rule |
| --- | --- | --- |
| `[metadata field]` | `[yes/no]` | `[format]` |

### Elements and Interactions

| Element | Type | Description | Interaction |
| --- | --- | --- | --- |
| `[prototype element]` | `[control type]` | `[purpose]` | `[visibility, enablement, action, feedback]` |

### Data Dictionary

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `[field name]` | `[type]` | `[yes/no/conditional]` | `[source, default, validation, null and editability rules]` | `[synthetic value]` |

### Conditional Tables

Record the approved schemas, if any, for:

- roles and permissions;
- states and transitions;
- exceptions and recovery;
- decisions and unresolved items;
- acceptance criteria.

## Writing Style

Record confirmed conventions for:

- terminology and naming;
- declarative and testable requirement language;
- prototype screenshot or annotation references;
- treatment of unchanged behavior;
- treatment of pending decisions and rejected alternatives;
- expected language, tone, numbering, and version notation.

## Required Granularity

State which information must be explicit for a relevant operation:

- actor, entry point, permission, and preconditions;
- inputs, defaults, validation, nulls, and enums;
- trigger, data effect, state transition, and feedback;
- loading or asynchronous behavior;
- failure, retained data, retry, cancel, and recovery;
- final result, destination, history/version impact, and acceptance boundary.

Do not use this checklist mechanically. Require only dimensions credible for the feature.
