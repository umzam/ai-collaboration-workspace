# AI Collaboration Workspace — Portfolio Plan

## 1. Portfolio Positioning

项目名称：

**AI Collaboration Workspace**

这是一个单页 AI Product Case Study。

目标不是展示“我会使用很多 AI 工具”，而是展示：

> 我如何根据任务的不确定性、重复性、主观性和决策风险，设计不同的人机协作方式。

核心关键词：

- Conversation
- Skill
- Human Gate
- Evaluation

最终希望面试官理解：

- 为什么不同任务需要不同 AI 协作方式
- 哪些任务适合 Skill 化
- 哪些任务应该保持开放探索
- 哪些决策必须由 Human Gate 保留
- 如何通过测试和迭代验证 AI Workflow 是否有效

---

# 2. Core Narrative

## Different tasks require different AI collaboration methods

同一个 AI 模型，不应该被用于所有任务。

根据任务性质选择不同协作方式：

---

## 2.1 Exploratory Tasks

### Conversational Prototyping

适用于：

- 高不确定需求
- 初期产品探索
- 需要不断澄清的问题

Workflow：
Idea
→ AI Questions
→ Human Decisions
→ Requirement Refinement
→ HTML Prototype
→ Experience
→ Feedback
→ Iteration

核心判断：

探索阶段不存在稳定规则。

因此不应该过早封装成 Skill。

AI 的角色：

探索伙伴。

Human 的角色：

提供上下文、判断方向、收紧需求。

---

# 2.2 Structured Tasks

## Prototype-to-PRD Skill

适用于：

- 稳定流程
- 重复任务
- 有明确质量标准的工作

Workflow：
Prototype
→ Specification Gap Analysis
→ Human Gate
→ PRD Generation
→ Prototype ↔ PRD Review
→ Exception Review
→ Engineering Readiness Review
→ Final Verification

定位：

主要 Case Study（60%）。

---

## Problem

Prototype 可以表达：

- 页面结构
- 基础交互
- 用户流程

但是通常不能完整表达：

- 状态
- 权限
- 异常
- 前置条件
- 后置结果
- 数据语义
- 开发约束

直接让 AI 生成 PRD 容易出现：

- 漏掉关键规格
- AI 自行补充产品规则
- 过度提问
- 产品问题与技术问题责任混淆

---

## Building Process

来源：
Project A
+
Project B

↓

Workflow Extraction

↓

Skill Design

↓

Regression Testing

↓

Rule Iteration

↓

Frozen v1.0
---

## Validation

测试方式：
Historical Project

↓

Blind Regression

↓

Ground Truth Comparison

↓

Error Classification

↓

Human Review

↓

Skill Revision

↓

Cross-project Regression
重点关注：

- Critical Miss
- Unauthorized Decision
- Over-questioning
- Useful Discovery

---

# 2.3 Subjective Creative Tasks

## Reference-to-Style Skill

适用于：

- 主观创造任务
- 视觉生成任务
- 审美判断任务

定位：

Supporting Case Study（40%）。

---

# 3. Reference-to-Style Case

当前版本：

Portfolio Ready

核心定位：

不是：

- 画狗 Skill
- 简单风格迁移
- 用户上传参考图生成图片

而是：

> 将高度主观的视觉生成任务，逐步工程化为内容准入、特征压缩、生成编译、预验证与 QA 的可控 AI 协作流程。

---

# 3.1 Build-time vs Runtime

## Build-time

Reference Images

↓

Style Analysis

↓

Human Gate

↓

Confirmed Style Profile


作用：

建立固定风格规则。

---

## Runtime

用户只输入自己的照片。

流程：
Source Photo
→ Content Essence
→ Scene Role Assignment
→ Inclusion Filter
→ Spatial Fact Map
→ Minimal Cue Plan
→ Loose-Line Compiler
→ Generation Spec Validator
→ Final Generation Prompt
→ Image Generation
→ QA
→ Optional Revision
---

# 3.2 Key Product Evolution

## 1. Mark Economy

从描述性风格语言：

例如：

“loose line”

升级为：

可检查约束：

- mark budget
- no fur
- no eye anatomy
- no shading

目标：

控制模型不要过度补全。

---

## 2. Feature-first Reconstruction

不是：

“把照片简化成线稿”

而是：
Feature Selection

↓

Feature Compression

↓

Selective Reconstruction
核心原则：

> Reconstruct from salient cues, not reduce from the full photograph.

---

## 3. Scene Selection / Inclusion Filter

发现：

只控制“怎么画”是不够的。

必须先决定：

“什么有资格进入画面”。

规则：

- 动物是主体
- 非动物元素只有直接参与 interaction 或 framing 时保留

---

## 4. Semantic Cue → Visual Primitive

发现：

语义词会诱导模型补全细节。

例如：

eye

不要：

detailed eye anatomy

而是：

two solid dark dots


ear

不要：

complete anatomical ear

而是：

open form


body

不要：

full silhouette

而是：

one arc

---

# 3.3 Human Gate

AI：

负责：

- source analysis
- feature extraction
- compilation
- validation
- QA

Human：

负责：

- 审美判断
- 判断哪些 reference feature 可以迁移
- CORE / AVOID 决策
- 判断失败是否应该升级为产品规则
- 决定停止优化

---

# 3.4 Evaluation

不要展示：

“生成越来越漂亮”。

展示：
Source

↓

Early Failure

↓

Diagnosis

↓

Product Rule

↓

Regression

↓

Improved Result
失败不是缺陷。

失败是发现产品规则的证据。

---

# 4. Unified Insight

两个 Skill 看起来完全不同：

Prototype-to-PRD：

AI 风险：

> 补全不存在的产品语义。

风险：

错误产品决策。


Reference-to-Style：

AI 风险：

> 补全不存在的视觉细节。

风险：

过度重建。


共同问题：

> What is AI allowed to infer?

中文：

> AI 被允许推断到什么程度？

---

# 5. Human Gate Framework

AI 适合：

- 已有证据支持的转换
- 一致性检查
- 结构化生成
- 信息整理

Human 必须决定：

- 新产品规则
- 用户行为
- 权限
- 异常策略
- 审美偏好
- 高影响歧义选择

---

# 6. Evaluation Principle

不同任务使用不同验证方式。

## Prototype-to-PRD

Evaluation:

Regression Testing

关注：

- 漏项
- 错误决策
- 责任边界


## Reference-to-Style

Evaluation:

Visual Comparison + Human Preference

关注：

- 主体选择
- 风格一致性
- 视觉压缩
- 人工偏好

核心原则：

> Evaluation method should match the nature of the task.

---

# 7. Portfolio Structure

网页结构：
Hero

↓

Why AI Collaboration

↓

Collaboration Model

↓

Workflow 01
Conversational Prototyping

↓

Case Study 01
Prototype-to-PRD Skill

↓

Case Study 02
Reference-to-Style Skill

↓

AI vs Human Decision Framework

↓

Evaluation

↓

Future Exploration



---


# 8. Visual Direction


整体风格：


Linear / Vercel inspired AI Product Case Study


特点：


- 极简
- 专业
- 大量留白
- Workflow Diagram
- Case Study 感


避免：


- Cyberpunk
- 大面积渐变
- 过度动画
- AI 装饰元素
- Landing Page 风格


---


# 9. Color System


## Background



#f0f7ff



用途：


页面背景。


---


## Primary Text / Dark Section



#11273f



用途：


文字、深色章节。


---


## AI Workflow



#cae4f0



用途：


AI 流程、Skill 节点。


---


## Human Gate



#fff6c2



用途：


人工判断、决策节点。


---


视觉含义：


蓝色：


AI system / workflow


黄色：


Human judgment


深蓝：


professional / trust


---


# 10. Future Exploration


## Personal LLM Wiki


状态：


Future Exploration。


已完成：


- 使用场景思考
- 基本方案设计
- 验证方式设计


暂不包装为完成项目。


原因：


知识库价值需要长期真实使用验证：


- 是否减少重复搜索
- 是否提升知识复用
- 是否形成长期积累


---


# 11. Final Message


目标不是：


> Automate every task.


而是：


> Design the right boundary between AI capability and human judgment.


中文：


> 不是让 AI 自动化所有任务，而是设计 AI 能力与人类判断之间合适的边界。