# Homepage Content Specification

## Status

`FROZEN_FOR_IMPLEMENTATION`

## Content Rules

- Chinese and English use the same information hierarchy.
- The page displays one language at a time; bilingual paragraphs are not shown together.
- Each Collaboration Lane displays only: Task Nature, Collaboration Mode, Name, Problem, Workflow, and Result.
- Homepage copy does not include Evidence detail, Regression detail, historical project detail, version history, or Known Limitation detail. Delivery Readiness is described as a second review lens; detailed evidence remains in the repository.
- In the expanded Structured Case, the Agent flow is shown before the Generation Stage and Review Stage evidence. PRD Review belongs to the Review Stage, not to a separate Case or result section.
- Exploration is a Collaboration Mode, not a Case Study.
- PRD Collaboration Agent and Reference-to-Style are the two Case Evidence entries. Prototype-to-PRD remains the generation Skill and evolution starting point inside the Structured Case.
- The following terms remain unchanged in both locales:
  - AI Collaboration Workspace
  - PRD Collaboration Agent
  - Prototype-to-PRD
  - Reference-to-Style
  - Human Gate
  - Skill

---

# 1. Header

## English

| Element | Visible text |
|---|---|
| Brand | AI Collaboration Workspace |
| Navigation | Modes |
| Navigation | About |
| Language switch | 中文 |

## 中文

| 元素 | 可见文案 |
|---|---|
| 品牌 | AI Collaboration Workspace |
| 导航 | 协作模式 |
| 导航 | 关于 |
| 语言切换 | EN |

Header does not contain Prototype-to-PRD or Reference-to-Style navigation links.

---

# 2. Hero

## English

| Element | Visible text |
|---|---|
| Title | AI Collaboration Workspace |
| Core value | Different tasks require different AI collaboration methods. |
| Supporting text | I choose Conversation, Skill, or Human Gate based on uncertainty, repeatability, subjectivity, and decision risk. |

## 中文

| 元素 | 可见文案 |
|---|---|
| 标题 | AI Collaboration Workspace |
| 核心价值 | 不同任务，需要不同的 AI 协作方式。 |
| 辅助说明 | 我根据任务的不确定性、重复性、主观性与决策风险，选择 Conversation、Skill 或 Human Gate。 |

## Hero Workflow Labels

| Element | English | 中文 |
|---|---|---|
| Input | TASK NATURE | 任务性质 |
| Task signal 01 | High uncertainty | 高不确定 |
| Task signal 02 | Stable and repeatable | 稳定且可重复 |
| Task signal 03 | Subjective output | 主观输出 |
| Collaboration mode 01 | Conversation | Conversation |
| Collaboration mode 02 | Skill | Skill |
| Collaboration mode 03 | Skill + Human Evaluation | Skill + Human Evaluation |
| Boundary label | HUMAN GATE | HUMAN GATE |
| Boundary text | When evidence cannot support a unique decision. | 当现有证据无法支持唯一决定。 |

---

# 3. Collaboration Modes

## Section Copy

| Element | English | 中文 |
|---|---|---|
| Section label | COLLABORATION MODES | 协作模式 |
| Section title | How I Collaborate with AI | 我如何与 AI 协作 |
| Introduction | Start with the nature of the task, then choose the collaboration method. | 先判断任务性质，再选择协作方式。 |

## 3.1 Exploration Mode

Conversational Prototyping is presented as a practice under Exploration Mode. It is not labeled as Case Evidence.

| Lane field | English | 中文 |
|---|---|---|
| Task Nature | High uncertainty · Direction still changing | 高不确定 · 方向仍在变化 |
| Collaboration Mode | Open Conversation | 开放式对话 |
| Name | Conversational Prototyping | Conversational Prototyping |
| Problem | A Skill would freeze assumptions before the problem becomes stable. | 在问题稳定之前，Skill 会过早固化尚未验证的假设。 |
| Workflow | Idea → Questions → Prototype → Feedback → Iteration | 想法 → 提问 → 原型 → 反馈 → 迭代 |
| Result | A clearer, testable product direction. | 将模糊想法收敛为可体验、可继续判断的产品方向。 |

Do not display Evidence, Regression, Version, Freeze, or Case Study labels in this Lane.

## 3.2 Structured Mode

PRD Collaboration Agent is the Case Evidence associated with Structured Mode. Prototype-to-PRD remains its generation Skill and evolution starting point.

| Lane field | English | 中文 |
|---|---|---|
| Task Nature | Multi-stage · Independently reviewable · Judgment boundary | 多阶段 · 可独立评审 · 存在判断边界 |
| Collaboration Mode | Skill orchestration + Human Gate | Skill 编排 + Human Gate |
| Name | PRD Collaboration Agent | PRD Collaboration Agent |
| Problem | A prototype cannot directly become an implementation-ready PRD. | 原型不能直接成为可开发的 PRD。 |
| Workflow | Prototype → Generate PRD → Review → Human Gate → Revise → Targeted Re-review → Ready | 原型 → 生成 PRD → 评审 → Human Gate → 修订 → 定向复审 → 开发就绪 |
| Result | Two validated Skills collaborate within explicit judgment boundaries. | 两个已验证 Skill 在明确判断边界内连续协作。 |

The homepage does not display Project A / B, Historical Regression, Evidence labels, regression metrics, or version numbers.

### PRD Review lenses

| Review lens | English | 中文 |
|---|---|---|
| Product Logic Review | Checks whether product logic is missing, conflicting, or undefined. | 看产品逻辑有没有缺失、冲突或未定义。 |
| Logic checks | Completeness · Consistency · Definition | 完整性 · 一致性 · 明确性 |
| Review Skill provenance | Started from a public PRD Review Skill, distilled the high-value checks, then added a specification-writing lens through Delivery Readiness. | 以公开的 PRD Review Skill 为起点，提炼高价值检查，再加入规格撰写视角（Delivery Readiness）。 |
| Delivery Readiness | Checks whether already-defined rules can produce one implementation, testing, and acceptance expectation. | 看即使规则已经写了，是否还能形成唯一的实现、测试与验收预期。 |
| Readiness checks | Implementation · Testability · Acceptance | 可开发 · 可测试 · 可验收 |

## 3.3 Creative Mode

Reference-to-Style is the Case Evidence associated with Creative Mode.

| Lane field | English | 中文 |
|---|---|---|
| Task Nature | Subjective output · No single correct answer | 主观输出 · 没有唯一正确答案 |
| Collaboration Mode | Structured Skill + Human Evaluation | 结构化 Skill + Human Evaluation |
| Name | Reference-to-Style | Reference-to-Style |
| Problem | Open-ended style language can cause unwanted reconstruction. | 开放式风格语言会触发不需要的视觉重建。 |
| Workflow | Failure → Diagnosis → Rule → Result | 失败 → 诊断 → 规则 → 结果 |
| Result | A constrained, reviewable style output | 受约束、可评审的风格输出 |

Mixed Regression Evidence belongs to the Reference-to-Style Case Detail and is not displayed on the homepage.

---

# 4. Shared Principle

## Section Copy

| Element | English | 中文 |
|---|---|---|
| Section label | SHARED PRINCIPLE | 共同原则 |
| Section title | What Is AI Allowed to Infer? | AI 被允许推断到什么程度？ |
| Introduction | The boundary changes with the task, but the underlying rule stays the same. | 协作边界会随任务变化，但底层判断保持一致。 |

## AI Space

| Element | English | 中文 |
|---|---|---|
| Heading | AI transforms | AI 负责转换 |
| Verbs | Ask · Extract · Structure · Validate | 提问 · 提取 · 结构化 · 验证 |
| Description | Work with information that the available evidence can support. | 处理现有证据能够支持的信息。 |

## Human Space

| Element | English | 中文 |
|---|---|---|
| Heading | Humans decide | 人负责决定 |
| Verbs | Direct · Define · Resolve · Accept | 定方向 · 定义规则 · 解决歧义 · 判断接受度 |
| Description | Decide what the evidence cannot uniquely determine. | 决定现有证据无法唯一确定的事项。 |

## Human Gate Boundary

| Element | English | 中文 |
|---|---|---|
| Boundary label | HUMAN GATE | HUMAN GATE |
| Boundary text | Evidence no longer supports a unique answer. | 现有证据不再支持唯一答案。 |

## Closing Principle

| English | 中文 |
|---|---|
| AI should transform what the evidence supports. Humans should decide what the evidence cannot uniquely determine. | AI 处理证据能够支持的转换；人决定证据无法唯一确定的事项。 |

---

# 5. Footer

## English

| Element | Visible text |
|---|---|
| Brand | AI Collaboration Workspace |
| Group label | COLLABORATION MODE |
| Mode name | Conversational Prototyping |
| Group label | CASE STUDIES |
| Case name | PRD Collaboration Agent |
| Case name | Reference-to-Style |
| Closing statement | Design the right boundary between AI capability and human judgment. |

## 中文

| 元素 | 可见文案 |
|---|---|
| 品牌 | AI Collaboration Workspace |
| 分组标签 | 协作模式 |
| 模式名称 | Conversational Prototyping |
| 分组标签 | 案例研究 |
| 案例名称 | PRD Collaboration Agent |
| 案例名称 | Reference-to-Style |
| 收束文案 | 设计 AI 能力与人类判断之间合适的边界。 |

Footer does not display versions, Evidence, Regression, or Case status details.
