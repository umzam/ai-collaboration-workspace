# PRD Collaboration Agent — Web Copy

## Case Header

**PRD Collaboration Agent**

将 PRD 生成与独立评审能力编排成受 Human Gate 控制的协作流程。

Prototype-to-PRD 是这一能力的演进起点。

## Problem

原型能表达可观察行为，但不能证明完整的产品规则。

PRD 生成后仍可能存在状态、权限、异常和原型一致性问题，未确认的产品语义不能由 AI 自行补齐。

## Evolution

`Prototype-to-PRD Skill → PRD Review Skill → PRD Collaboration Agent`

**Prototype-to-PRD Skill**

从原型中提取可观察事实、识别规格缺口，并将已确认内容转化为 PRD。

**PRD Review Skill**

独立检查产品逻辑、状态、权限、异常及原型 ↔ PRD 一致性。

**PRD Collaboration Agent**

编排生成、评审、暂停、修订与定向复审，并负责 Human Gate 后的恢复与收口。

Prototype-to-PRD 是整个演进故事的起点。

## Agent Flow

`原型 → 生成 PRD → 评审 → Human Gate → 修订 → 定向复审 → Ready`

Human Gate 可以在任意阶段提前触发，Agent 不机械维持固定顺序。

## Human / AI Boundary

**AI**

生成、检查、一致性比对、定向复审。

**Human Gate**

处理现有证据无法唯一决定的产品语义。

**Agent**

决定什么时候调用哪个 Skill、什么时候暂停、什么时候继续。

## Human Gate Evidence

发现一个“缺失信息”：当前材料没有定义某个角色是否参与该功能。

Agent 没有直接补充权限规则，而是先判断：这个角色是否属于当前需求范围？

**Human Decision**

该角色不属于当前需求 Scope，因此归为 `Out of Scope`，不新增权限规则。

**产品原则**

“缺失信息 ≠ 必须补齐，先判断是否属于当前 Scope。”

真实案例：生成 PRD 时发现“审核员是否支持二次 AI 抽取”无法由现有证据唯一确定。

## Validation

`4 Findings → 4 Closed → 0 Remaining → Ready`

Human Gate 真实中断流程，Human Decision 后恢复执行，4 个评审问题经定向复审全部关闭。

## Result

这套 Agent 的目标不是让 AI 自主完成更多，而是让两个可复用 Skill 在明确边界内连续协作，并在需要产品判断时停下来交还给人。
