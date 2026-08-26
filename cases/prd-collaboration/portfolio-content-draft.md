# Structured Mode — Portfolio Content Draft

## 1. Case Positioning

PRD Collaboration Agent 将 Prototype-to-PRD 生成能力与 PRD Review 独立评审能力，编排成一个受 Human Gate 控制的 PRD 协作流程。

## 2. Problem

Prototype 能表达页面、控件、跳转和操作顺序等可观察行为，却不能单独证明完整的产品规则。PRD 生成后，仍可能存在状态、权限、异常、范围和 Prototype ↔ PRD 一致性问题。如果 AI 为了完成规格而继续自行补齐，就会把未确认的产品语义写成已确认需求。

## 3. Evolution

`Prototype-to-PRD Skill → PRD Review Skill → PRD Collaboration Agent`

- **Prototype-to-PRD Skill：** 从 Prototype 中提取可观察事实、识别规格缺口，并把已确认内容转换为可开发 PRD。
- **PRD Review Skill：** 对生成后的 PRD 进行独立评审，聚焦产品逻辑、状态、权限、异常、范围和 Prototype ↔ PRD 一致性。
- **PRD Collaboration Agent：** 连续编排生成、评审、暂停、修订和定向复审，避免两个 Skill 各自完成后仍缺少恢复与收口机制。

现有 Prototype-to-PRD 内容作为这条演进的起点保留：Prototype 能直接观察什么、哪些产品语义不能唯一确定，以及 Human Gate 为什么存在。

## 4. Agent Flow

`Prototype → Generate PRD → Review → Human Gate → Revise → Targeted Re-review → Ready`

Human Gate 可以在任意阶段提前触发，Agent 不机械维持固定顺序。

## 5. Human / AI Boundary

- **AI：** 生成、检查、一致性比对和定向复审。
- **Human Gate：** 处理现有证据无法唯一决定的产品语义。
- **Agent：** 决定什么时候调用哪个 Skill、什么时候暂停、什么时候继续。

## 6. Representative Human Gate

Generate 阶段发现“审核员是否支持二次 AI 抽取”无法由当前证据唯一确定，Agent 因此停止自动扩写权限规则。

**Human Decision：** 审核员不属于当前需求范围，因此不补充审核员权限，并将该问题归为 `Out of Scope`。

**产品原则：** “缺失信息不等于必须补齐，先判断是否属于当前 Scope。”

## 7. Validation Evidence

**First full E2E**

`4 Findings → 4 Closed → 0 Remaining → Ready`

- Human Gate 在 Generate 阶段真实触发并中断自动执行。
- Human Decision 记录后，Agent 从受影响范围恢复执行。
- Targeted re-review 关闭全部 4 个 finding，最终达到 Ready。

这组数字仅作为流程真实跑通的辅助证据，不作为页面的主要视觉中心。

## 8. Result

这套 Agent 不追求让 AI 自主完成更多，而是通过 Skill + Human Gate + Agent orchestration，让 AI 在明确边界内连续完成 PRD 生成、评审和修订。

## 9. What to Show Visually

- 1 张 Prototype 输入截图，优先复用现有 Prototype 证据。
- 1 条 Agent 主流程。
- 1 个真实 Human Gate Scope 案例。
- 1 组低视觉权重的 `4 → 4 → 0 → Ready` 验证数字。
- 如有必要，1 个 Review finding 的修复前后对比。

不增加大量截图、运行日志、PRD 长图或完整 Review 表格。
