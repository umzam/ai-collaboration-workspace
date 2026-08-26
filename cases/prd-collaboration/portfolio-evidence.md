# PRD Collaboration Agent — Portfolio Evidence

## 1. Core Story

PRD Collaboration Agent 的价值不是简单地“生成 PRD”，而是将负责生成的 `prototype-to-prd` 和负责独立评审的 `prd-review` 编排成一个受 Human Gate 控制的 PRD 协作流程。Agent 决定什么时候调用、什么时候停止、什么时候继续；Human Gate 阻止 AI 自行跨过未确认的产品语义。

## 2. End-to-End Flow

`Prototype → Generate PRD → Human Gate（如触发）→ Human Decision → Revise → Review → Revise affected artifact → Targeted Re-review → Ready`

Human Gate 可以在任何阶段提前出现，Agent 不要求机械维持固定的阶段顺序。

## 3. First E2E Validation

Actual path:

`Prototype → Generate PRD → Human Gate → Human Decision → Revise PRD → Review → Revise Prototype → Targeted Re-review → Ready`

Review:

- Findings: 4
- Confirmed mismatches: 4
- Human Gates: 0
- Blockers: 0

Targeted re-review:

- Closed findings: 4
- Remaining findings: None
- New findings: None
- New blocker: None
- Human Gates: None
- Prototype-PRD mismatches: None
- Ready status: Ready

## 4. Representative Human Gate

**问题来源：** Generate 阶段识别到“独立 Reviewer 角色是否参与当前 AI enrichment 功能”无法从当前证据唯一确定。

**Human Decision：** 当前 synthetic increment 不涉及 Reviewer，因此不应将缺失信息扩展为新的产品权限设计。

**最终判断：** 将该问题归为 `Out of Scope`，而不是要求补齐审核员权限。

> Missing information ≠ 必须补齐。先判断是否属于当前需求 Scope。

## 5. Representative Review Findings

- “—”不应被当作空值覆盖。
- 已应用 / 已放弃任务不应继续显示应用或放弃操作。
- 没有有效模型时不能进入创建确认。
- 提示词管理入口需符合当前状态与范围规则。

这些问题来自 publication-safe synthetic Prototype ↔ PRD 一致性及产品规则检查，并在 targeted re-review 中全部关闭。

## 6. What This Validates

- 两个 Skill 可以被一个 Agent 连续编排。
- Human Gate 可以真实中断自动执行。
- Agent 不会为了继续流程而自行补产品语义。
- Human Decision 后可以恢复执行。
- Agent 能只修改受影响的 PRD / Prototype。
- Targeted re-review 可以关闭问题并最终达到 Ready。

## 7. Portfolio Use

### 页面主流程

`Prototype → Generate → Review → Human Gate → Revise → Targeted Re-review → Ready`

### 数据证据

`4 Findings → 4 Closed → 0 Remaining → Ready`

### Human Gate 示例

`Missing ≠ 必须补齐`

先判断是否属于当前 Scope。

### 核心结论

Skill 定义如何完成单项能力；Agent 决定什么时候调用、什么时候停、什么时候继续；Human Gate 定义 AI 不应自行跨越的产品判断边界。
