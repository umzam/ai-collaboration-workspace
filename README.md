# AI Collaboration Workspace

根据任务的不确定性、规则稳定性与判断风险，探索 Conversation、Skill、Human Gate 和轻量 Agent 的不同协作方式。

## Live Portfolio

[View the live portfolio](https://ai-collaboration-workspace.vercel.app/)

## Collaboration Model

- **Exploration / Conversation**：用于方向、约束和成功标准仍在变化的高不确定任务，通过提问、原型和反馈逐步收紧问题。
- **Skill**：用于规则稳定、能够重复执行的任务，把已验证方法沉淀为可复用能力。
- **Human Gate**：当现有证据无法支持唯一判断时暂停自动执行，把产品语义、范围和接受度交还给人。
- **Lightweight Agent**：编排多个已验证 Skill，管理调用、暂停、恢复、修订和定向复审。

当前的 **PRD Collaboration Agent 是一个轻量 Skill-orchestration Agent**。它不负责复杂自主规划、多工具调用、自动任务拆解或多 Agent 协作；它的价值在于编排两个经过验证的 Skill，并明确控制 AI 与人的判断边界。

## What I Built

### Prototype-to-PRD

[Prototype-to-PRD](skills/prototype-to-prd/) 是自研 Skill。它从原型中提取可观察事实、识别状态、权限、异常和闭环缺口，将已确认内容转化为 PRD，并通过 Human Gate 控制无法由现有证据唯一确定的产品语义。

### Reference-to-Style

[Reference-to-Style](public/reference-to-style-skill/) 是自研 Skill。它将主观视觉生成拆分为内容筛选、特征压缩、生成编译和人工评估，让开放式风格目标能够转化为可检查、可复用的生成规则。

### PRD Review

[PRD Review](skills/prd-review/) 基于开源项目 [yihannangua/prd-review-skill](https://github.com/yihannangua/prd-review-skill) 进行真实项目测试和裁剪。上游 Skill 采用 MIT License；本项目保留高价值的产品逻辑、流程、状态、权限、异常和 Prototype ↔ PRD 一致性检查，同时针对日常产品评审进行了以下适配：

评审包含两个并列视角，但仍属于同一个 PRD Review Skill：Product Logic Review 更擅长发现“产品逻辑有没有缺”；Delivery Readiness 更擅长发现“即使规则已经写了，是否还能形成唯一的实现、测试与验收预期”。它不是第二轮 Review，也不是独立 Skill。详细回归证据保留在 `skills/prd-review/evaluation/readiness-v0.2/`。

Delivery Readiness 从规格撰写角度补充三项检查：

- **Implementation Readiness**：规则是否足够明确到可以形成唯一实现；
- **Testability**：规则是否足够明确到可以形成唯一测试预期；
- **Acceptance Readiness**：产品是否能够明确判断通过或不通过。

Readiness 只在发现独立的实现、测试或验收缺口时新增 Finding；如果只是强化已有 Finding 的交付影响，则合并进原 Finding，不重复输出。

- 从完整深度审计收紧为少量高价值 Findings；
- 将 Route 与 Human Gate 分离；
- 区分 Confirmed Mismatch 与 Prototype Assumption；
- 删除低价值的技术下钻、重复分析和默认完整测试矩阵；
- 增加适合 Agent 恢复执行的稳定 Finding ID、Ready 状态和定向复审输出。

具体第三方归属见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

### PRD Collaboration Agent

[PRD Collaboration Agent](agents/prd-collaboration/) 将 PRD 生成与独立评审两个 Skill 编排成受 Human Gate 控制的轻量协作流程：

```text
Prototype
→ Generate PRD
→ Review
→ Human Gate
→ Revise
→ Targeted Re-review
→ Ready
```

Agent 负责决定何时调用 Skill、何时暂停、如何根据 Human Decision 恢复，以及复审哪些受影响内容；它不会为了让流程继续而自行补齐未确认的产品规则。

## Validation

第一次完整 E2E 使用基于已观察产品工作流模式构建的 synthetic reconstruction，实际跑通了生成、独立评审、Human Gate、人工决策、修订和定向复审：

```text
4 Findings → 4 Closed → 0 Remaining → Ready
```

这组数字只描述一次真实验证的闭环结果，不是性能指标：

- Human Gate 在实际执行中触发；
- Agent 在 Human Decision 前停止补充未确认产品语义；
- Human Decision 记录后恢复执行；
- 4 个评审问题通过修订和 targeted re-review 全部关闭；
- 最终没有剩余 Finding、Blocker 或 Human Gate，状态达到 Ready。

验证入口：

- [Validation summary](cases/prd-collaboration/validation-summary.md)
- [Initial review — 4 Findings](cases/prd-collaboration/e2e-01/artifacts/02-review.md)
- [Recorded Human Decision](cases/prd-collaboration/e2e-01/artifacts/03-human-decision.md)
- [Targeted re-review — 4 Closed, 0 Remaining](cases/prd-collaboration/e2e-01/artifacts/05-targeted-re-review.md)

PRD Review 的 Delivery Readiness 另外通过 earlier / mature PRD 两组 regression case 做了行为验证：早期 PRD 能提前暴露更多交付缺口，成熟 PRD 不会因为增加 Readiness 而产生明显的重复 Finding 膨胀。这里的验证不是 benchmark、性能或准确率指标；详细 evidence 见 `skills/prd-review/evaluation/readiness-v0.2/`。

## Repository Structure

```text
ai-collaboration-workspace/
├── agents/
│   └── prd-collaboration/       # Lightweight Skill orchestration Agent
├── cases/
│   └── prd-collaboration/       # Public case narrative and E2E evidence
│       └── e2e-01/
│           ├── input/           # Frozen, sanitized validation input
│           └── artifacts/       # Generated PRD, review, decision and re-review
├── skills/
│   ├── prototype-to-prd/        # Original generation Skill
│   └── prd-review/              # Adapted open-source review Skill
├── public/
│   ├── prototype-to-prd-skill/  # Sanitized public distribution
│   └── reference-to-style-skill/ # Original creative-generation Skill
├── portfolio/                   # Static single-page portfolio
└── docs/                        # Portfolio and collaboration decisions
```

Internal source documents, private regression workspaces, historical Skill versions and reference-image research are excluded from the current public Git tree. The public E2E package is a synthetic reconstruction and does not reproduce a real project artifact.

## Designed vs Reused

### Designed by me

- Prototype-to-PRD Skill and its three-layer rule boundary;
- Reference-to-Style Skill;
- Human Gate rules across exploration, structured and creative tasks;
- PRD Collaboration Agent orchestration, pause/resume behavior and targeted re-review scope;
- E2E validation workflow and sanitized evidence package.

### Adapted from open source

- PRD Review Skill, adapted from [yihannangua/prd-review-skill](https://github.com/yihannangua/prd-review-skill).

The upstream Skill was not used unchanged. I first tested it against a real, sanitized PRD baseline, then reduced verbose business analysis, technical deep dives and duplicate findings; redesigned routing and Human Gate semantics; introduced compact output and targeted re-review; and validated the adapted version again inside the complete Agent workflow.

## Status

This is an actively evolving personal AI product portfolio and experimental project. The current repository captures validated collaboration methods and public evidence; it does not claim production-grade generality or benchmark performance. Future iterations may add new task types only when they require a meaningfully different AI/Human boundary.
