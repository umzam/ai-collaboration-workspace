# Company PRD Standard

Use the current approved company PRD or explicitly supplied template before this default. A shorter template never permits omission of information required for unique implementation.

## Default document structure

1. 文档属性
2. 阅读说明与范围边界
3. 概述：背景、功能定位、目标和角色
4. 做 / 不做 / 待确认（范围需要显式划分时）
5. 名词说明
6. 核心流程
7. 功能需求
8. 异常流程
9. 数据字段或数据字典

Add architecture, non-functional requirements, global rules, acceptance criteria, key decisions, or appendices only when they contain useful information. Do not create empty sections merely to mirror a template.

## Default functional structure

Use this structure by default:

1. 功能说明
2. 元素/交互
3. 业务规则

Expand dynamically when complexity requires it:

- 权限
- 前置条件
- 后置条件
- 业务流程
- 状态与转换
- 异常与恢复
- 字段与枚举
- 验收标准

Prefer the smallest structure that still makes the feature uniquely implementable and testable.

## Standard tables

### Document properties

| 文档属性 | 内容 |
| --- | --- |

Include at least the document name when required by the approved format, version, preparation date, and owner/editor.

### Elements and interactions

| 元素 | 类型 | 说明 | 交互 |
| --- | --- | --- | --- |

Use for every new or changed page, dialog, drawer, table, control, and user-visible state. Describe visibility, enablement, validation, action, and feedback in the Interaction column when relevant.

### Data dictionary

| 字段名 | 类型 | 必填 | 说明 | 示例值 |
| --- | --- | --- | --- | --- |

Define defaults, valid values, source, editability, null handling, and validation in the description or adjacent rules when relevant.

### Terminology

| 名词 | 说明 |
| --- | --- |

Define only terms whose meaning, scope, or lifecycle could otherwise be ambiguous.

### Adaptive tables

Use role/permission, state, exception, and decision tables when needed. Adapt their columns to the feature rather than forcing a single schema. Ensure they still answer:

- Role/permission: who can view and who can act.
- State: meaning, entry condition, exit condition, display, and allowed actions.
- Exception: trigger, retained data, resulting state, recovery, and user feedback.
- Decision: confirmed choice, rationale, and remaining uncertainty.

## Writing rules

- Describe only additions and changes; reference unchanged platform behavior instead of redesigning it.
- Separate confirmed scope into in scope, out of scope, and pending decisions when boundaries matter.
- Use exact names from the current prototype for pages, fields, buttons, dialogs, and states.
- Use declarative, testable language. Do not stop at “support”, “can view”, or “process according to rules”.
- Specify conditions, data effects, state effects, feedback, and recovery when they affect implementation.
- Keep implementation details out unless they define product behavior or acceptance.
- **S-13 — Separate prototype annotations from PRD specification.** Use prototype annotations only to explain key rules in the current version that the interaction cannot make self-evident. Put detailed fields, exceptions, historical discussion, and rejected alternatives in the PRD or decision record. Read annotation content as evidence, but do not treat the annotation's presentation pattern as production scope by default.
- Remove rejected and obsolete alternatives from the current version.
- Do not label a confirmed rule as pending, and do not present a pending decision as confirmed.
- Use “Prototype example: [page/state name]” as a placeholder when the approved format expects PM-inserted screenshots. Follow an approved document's image convention when it differs.

## Required level of detail

For each relevant operation, make these uniquely understandable:

- Entry point, actor, and permission.
- Preconditions and button visibility or enablement.
- Inputs, field rules, defaults, and enums.
- Data source and applicable snapshot or version.
- System action, data write, and state transition.
- Success feedback and destination.
- Loading or asynchronous behavior.
- Failure result, retained data, retry, cancel, or other recovery.
- Empty, unavailable, duplicate, concurrent, and boundary behavior when credible for the feature.
- Final result, history/version impact, and cross-page status where applicable.

Do not add irrelevant checklist content merely to make the PRD look complete.
