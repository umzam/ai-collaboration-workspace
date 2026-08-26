# Prototype-to-PRD Skill

将已有产品原型转化为完整、可评审、可开发 PRD 的 Codex Skill。

## 为什么

原型通常能够表达主要页面和交互，却难以完整表达状态、异常、权限、业务规则、数据语义和开发约束。AI 如果直接把原型扩写成 PRD，又容易为了“补完整”而自行增加产品决策。

本 Skill 把规格补全与产品决策分开：先识别缺口，优先使用已确认的证据和规则；只有无法唯一确定的产品语义才进入 Human Gate。

## 做什么

本 Skill 用于已经基本确定的产品原型，不负责从零构思产品或整体重做设计。它会：

- 阅读原型并建立可观察行为清单；
- 找出 PRD 和开发必须明确的规格缺口；
- 区分产品、平台、数据、技术和安全责任；
- 在必要时向产品经理提出最小、根问题优先的确认项；
- 按组织已批准的格式生成 PRD；
- 检查原型一致性、异常闭环和开发可实现性；
- 对无需新增产品决策的问题直接修复；需要改变产品行为时，先进入 Human Gate，确认后再同步更新 Prototype 和 PRD。

## 工作流

```text
Prototype
→ 规格缺口分析
→ Human Gate
→ PRD 生成
→ Prototype ↔ PRD 一致性检查
→ 异常/闭环检查
→ 开发可实现性检查
→ 修复
→ 最终验证
```

## Human Gate 原则

AI 可以直接处理已有证据或已确认规则能够唯一确定的内容，包括原型已明确表达但 PRD 漏写的行为、术语和格式问题，以及适用范围明确的平台规则。

新增业务规则、状态行为、异常恢复策略、权限、不可逆操作的产品后果，或存在多个合理产品方案且已有证据无法唯一确定时，必须由产品经理确认。产品语义确认后，主键、接口、锁、存储、调度和数据结构等实现机制再进入数据或技术评审。

## 验证

Skill 使用两个复杂产品项目作为历史回归案例，比较关键漏项、擅自决策、过度提问和有效额外发现。经过多轮修改后冻结为 v1.0。

这些案例都包含多页面原型、状态、异常、异步任务和较复杂业务规则。该验证支持当前版本的稳定使用，但不代表已经证明适用于所有产品类型。

## 已知局限

当一个产品对象存在多个阶段资格时，例如可创建、可查看、可处理、可修复、校验通过、可发布或可作为正式结果，Skill 仍可能把这些边界理解得过于接近。遇到这类多阶段资格边界时，可能需要产品经理人工确认。该问题尚未被证明为跨场景通用缺陷，因此 v1.0 只记录风险，不将单一案例答案固化为通用规则。详见 [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md)。

## 仓库结构

```text
.
├── README.md                         # 公开说明和使用方式
├── SKILL.md                          # 核心流程和 Human Gate 规则
├── CHANGELOG.md                      # 公开版本记录
├── KNOWN_LIMITATIONS.md              # 验证边界和已知局限
├── references/
│   ├── company-prd-standard.example.md # 组织 PRD 规范模板
│   ├── platform-rules.example.md       # 已确认平台规则模板
│   └── review-checklist.md             # 三个评审视角
└── examples/
    └── synthetic-demo/                 # 完全虚构的端到端示例
```

`.example.md` 文件只包含记录框架和提示。正式使用前，应替换或补充为已批准的本地规范和已确认的平台规则。

## 使用方式

1. 将本仓库放到 Codex 当前可识别的 Skill 目录中。具体位置和加载方式建议参考 Codex 官方文档。
2. 将两个 `.example.md` 模板替换或补充为已批准、无冲突的组织参考资料。
3. 提供原型、相关标注、已批准的 PRD 模板，以及已确认的平台规则。
4. 用类似下面的方式调用 Skill：

```text
Use $prototype-to-prd to analyze this confirmed prototype, identify specification gaps,
ask only the necessary product questions, write the PRD, and complete the final reviews.
```

完整虚构示例见 [examples/synthetic-demo](examples/synthetic-demo/)。
