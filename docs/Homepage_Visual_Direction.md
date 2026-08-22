# Visual Direction Specification

## 核心视觉定位

AI Collaboration Workspace 应被理解为：

> 一个用于展示任务判断、协作路径与人机边界的安静工作空间。

它不是：

- AI 产品 Dashboard
- 工具集合页
- 三张 Portfolio 项目卡片
- AI 自动化能力宣传页

视觉应处于以下两者之间：

```text
Linear / Vercel 的克制排版
+
少量 Workflow、Lane、节点和状态标记
```

页面的主要视觉素材不是图片、图标或容器，而是：

- Typography
- Whitespace
- Alignment
- Workflow Lines
- Collaboration Lanes
- Human Gate Boundary

---

# 1. Typography System

## 字体选择

### 英文与数字

优先：

- Inter
- Geist
- system sans-serif

不同时混用多套英文字体。

### 中文

优先使用系统无衬线字体：

- PingFang SC
- Microsoft YaHei
- Noto Sans CJK SC
- system sans-serif

### 等宽字体

只用于：

- `01 / 02 / 03`
- `TASK NATURE`
- `MODE`
- `CASE EVIDENCE`
- 版本状态
- Workflow 微标签

建议：

- Geist Mono
- SFMono-Regular
- ui-monospace

等宽字体不能用于正文或大标题。

---

## Hero Typography

### 项目标题

> AI Collaboration Workspace

Desktop：

- 64–80px
- 字重 600–680
- 行高 0.98–1.06
- 字间距 `-0.035em` 至 `-0.05em`

Tablet：

- 50–64px

Mobile：

- 38–46px
- 最多三行

### 核心价值句

> Different tasks require different AI collaboration methods.

Desktop：

- 24–30px
- 字重 450–550
- 行高 1.25–1.35
- 字间距轻微收紧

它是判断句，不做成营销式超大副标题。

### 中文辅助说明

- 15–17px
- 字重 400
- 行高 1.65–1.75
- 最大宽度约 520–580px
- 使用较低对比度深蓝

---

## Section Title

适用于：

- How I Collaborate with AI
- What Is AI Allowed to Infer?

Desktop：

- 36–44px
- 字重 580–650
- 行高 1.1–1.2
- 字间距 `-0.025em` 至 `-0.035em`

Tablet：

- 30–38px

Mobile：

- 26–32px

Section Title 不应大到每个 Section 都像一个新 Landing Page。

---

## Lane Title

例如：

- Conversational Prototyping
- Prototype-to-PRD
- Reference-to-Style

Desktop：

- 25–32px
- 字重 580–650
- 行高 1.15–1.25

视觉层级：

- Structured 和 Creative 的 Case 名称可以使用 28–32px。
- Exploration 的实践名称使用 24–28px。
- 通过字号差异表达 Exploration 不是第三个 Case。

---

## Body

### 主要正文

- 15–17px
- 字重 400–450
- 行高 1.6–1.75
- 正文颜色使用 `#11273f` 的 78–88% 对比度

### 每段长度

- 最多 2–3 行
- 单个 Lane 不出现长段落
- 中文单段建议不超过 45–60 字

### 辅助说明

- 13–14px
- 行高 1.55–1.65
- 使用深蓝的 60–70% 对比度

---

## Label

适用于：

- EXPLORATION MODE
- STRUCTURED MODE
- CREATIVE MODE
- PRACTICE
- CASE EVIDENCE
- HUMAN GATE
- FROZEN v1.0

规格：

- 10–12px
- 字重 650–750
- 字间距 `0.08em` 至 `0.14em`
- 英文可使用全大写
- 中文标签不强制增加大字间距

Label 的作用是建立 Workspace 层级，不是制造大量 Badge。

建议直接放在内容基线上，不为每个 Label 添加胶囊背景。

---

## 字重控制

整个首页最多使用四个主要字重：

- 400：正文
- 500：辅助强调
- 600：标题
- 700：微标签与关键状态

避免：

- 同一行出现多种字重
- 大量粗体正文
- 所有 Workflow 节点都使用粗体
- 用字重代替真正的信息层级

---

# 2. Color Usage

## 主色比例

建议页面可见面积比例：

| 颜色 | 使用比例 | 主要用途 |
|---|---:|---|
| `#f0f7ff` | 55–65% | 页面主背景、留白空间 |
| 白色或近白 | 20–28% | 局部内容层、Workflow 空间 |
| `#11273f` | 10–15% | 主文字、连接线、深色 Section |
| `#cae4f0` | 4–7% | AI 节点、路径高亮 |
| `#fff6c2` | 1–3% | Human Gate 与人工决策 |

颜色不是平均分配。黄色尤其不能成为常规装饰色。

---

## `#f0f7ff` — Workspace Background

作为首页主要背景。

使用位置：

- Hero
- Collaboration Modes
- Decision Logic
- Footer 的浅色版本

视觉作用：

- 比纯白更像连续工作空间
- 提供柔和技术感
- 支撑大留白而不显空洞

避免：

- 在其上再叠加大量浅蓝卡片
- 给每个 Lane 添加不同浅色底
- 加入明显网格背景

---

## 白色 / 近白

白色只能作为辅助中性色。

适用：

- Workflow 节点内部
- 图片或内容需要暂时脱离背景时
- 深色 Section 内的反向文字
- 极少量信息层

不适用：

- 三张白色圆角 Case Card
- 卡片嵌套卡片
- 每段文字都有白色容器

---

## `#11273f` — Primary Ink

主要用途：

- 标题
- 正文
- Workflow 连接线
- Lane 分隔线
- Shared Principle 深色 Section

### 深色 Section 使用位置

首页只建议出现一个完整深色 Section：

> What Is AI Allowed to Infer?

可以使用 `#11273f` 作为全宽背景，使它成为首页的判断结论。

不建议：

- Hero 使用深色背景
- 三个 Collaboration Mode 分别使用深色卡片
- Footer 再使用一个同等重量的深色区块

Footer 可以继续浅色，避免连续两个深色 Section。

---

## `#cae4f0` — AI Workflow

只表示：

- AI 执行节点
- AI 路径
- 当前被高亮的 Collaboration Mode
- Evidence-supported transformation
- AI Space 的轻微区域差异

推荐形式：

- 细线
- 小节点
- 低面积填充
- Hover / Focus 高亮
- 淡色背景条

避免：

- 整列铺满浅蓝
- 大型浅蓝卡片
- 所有文本标签都放在浅蓝胶囊里
- 把浅蓝变成普通装饰色

---

## `#fff6c2` — Human Gate

黄色有唯一语义：

> 需要人类判断，且现有证据不能支持唯一答案。

允许使用：

- Human Gate 分界线
- 路径交叉点
- Human Decision 节点
- `HUMAN GATE` 微标签
- 一个需要人工决定的 Workflow 步骤

不允许使用：

- 普通 CTA
- Hover 状态
- 装饰性高亮
- Case 状态
- Exploration Mode
- Footer 链接
- 大面积背景

### 面积控制

黄色占页面可见面积不超过约 3%。

### 黄色线

- 2–3px
- 可以是实线或短虚线
- 搭配小圆点表示触发点
- 不添加发光效果
- 不与蓝色混合成渐变

---

# 3. Layout Language

## Whitespace

留白是页面的主要结构工具。

### Desktop

- 页面左右边距：56–80px
- 最大内容宽度：1200–1280px
- Hero 上下留白：72–100px
- Section 间距：96–140px
- Lane 内不同信息组之间：24–36px
- 标题与正文之间：18–28px

### 原则

留白用于表达：

- Task Nature 与 Mode 的层级
- Mode 与 Case Evidence 的关系
- Exploration 与两个 Case 的不同权重
- Workflow 开始、分支和结束

不要用多个边框容器替代留白。

---

## Grid

### Desktop

使用 12 栏网格。

建议：

- Hero：5 栏文字 + 1 栏空隙 + 6 栏 Workflow
- Collaboration Modes：每个 Lane 4 栏
- Shared Principle：5 栏 AI + 2 栏 Gate + 5 栏 Human

### Tablet

- 8 栏网格
- Hero 改为上下结构
- Collaboration Modes 改为全宽横向 Lane

### Mobile

- 4 栏网格
- 以一条纵向 Workflow Rail 组织内容

---

## Divider

分隔线只服务于信息关系。

规格：

- 1px
- 使用 `#11273f` 的 10–18% 透明度
- 不使用纯黑
- 不添加阴影

适用：

- Header 底部
- 三个 Workspace Lane 之间
- Footer 顶部
- 少量 Workflow 分支

不适用：

- 每段文字外框
- 每个节点外框
- Section 外围大边框
- 三个 Mode 的独立边框

---

## Lane

Lane 是首页最核心的布局语言。

### 结构

```text
Task Nature
↓
Collaboration Mode
↓
Practice / Case Evidence
↓
Result
```

### Desktop

- 三列等宽
- 两条贯穿内容区的细分隔线
- Lane 本身无背景、无阴影、无大圆角
- 三列共享同一水平基线

### Lane 的差异

**Exploration**

- 线条较轻
- 使用循环箭头
- 不显示版本和冻结状态
- `PRACTICE` 标签

**Structured**

- 使用线性 Workflow
- Human Gate 节点为黄色
- `CASE EVIDENCE` 标签
- 显示 v1.0

**Creative**

- 使用 Failure-driven Workflow
- Human Evaluation 节点为黄色
- `CASE EVIDENCE` 标签
- 显示 `Frozen v0.3.3`
- Mixed Regression Evidence 只属于 Reference-to-Style Case Detail，不在 Homepage 展示

### Hover / Focus

允许：

- 当前 Lane 的文字与连接线对比度提升
- 其他 Lane 降低少量透明度
- 当前 Lane 出现极淡的蓝色纵向轨迹
- 可点击的 Case Name 提高文字或下划线对比度

不允许：

- Lane 整体上浮
- 放大
- 阴影
- 大面积背景变色
- 卡片弹出感

---

## Workflow Node

节点应像 Workspace 中的状态标记，而不是 UI Button。

### 默认形式

- 高度 26–34px
- 水平内边距 8–12px
- 圆角 2–6px，或无圆角
- 字号 11–13px
- 使用细连接线

### 节点类型

**Neutral node**

- 透明背景
- 深蓝文字
- 可有 1px 边线

**AI node**

- `#cae4f0`
- 深蓝文字
- 不加阴影

**Human node**

- `#fff6c2`
- 只用于真正需要人工判断的位置

**Status node**

- 尽量只使用文字
- 如 `FROZEN v1.0`
- 不必使用胶囊背景

### 连接线

- 1–1.5px
- 深蓝 20–35% 透明度
- 当前路径可提高到 60–75%
- 箭头保持小而明确
- 不使用动态流光

---

# 4. Gradient Usage

## 默认原则

首页可以完全不使用渐变。

Flat color + whitespace + typography 应该能够完成主要视觉表达。

## 允许的渐变

只允许极弱的环境渐变。

### Hero 背景

允许从：

```text
#f0f7ff → rgba(255,255,255,0.4)
```

形式：

- 大范围线性渐变
- 垂直或轻微斜向
- 明度差不超过约 6–8%
- 不形成可见色块

### Workflow 路径

允许：

```text
rgba(202,228,240,0) → #cae4f0
```

用于：

- 当前路径末端的轻微聚焦
- Hover / Focus 时的低强度轨迹

必须保持低透明度。

### 深色 Section

允许在 `#11273f` 上叠加极弱的同色系明度变化：

```text
#11273f → slightly lighter navy
```

只为避免大面积纯色过于沉重。

---

## 禁止的渐变

- 蓝紫 AI 渐变
- 黄色到蓝色的 Human / AI 渐变
- Mesh Gradient
- 彩色 Radial Blob
- 多层模糊光斑
- 霓虹渐变
- Conic Gradient
- 每张 Lane 使用不同渐变
- 按钮渐变
- 文字渐变
- 发光 Workflow 线
- Glassmorphism 背景渐变
- 动态流动渐变

渐变不能成为“AI 感”的主要来源。

---

# 5. Avoid List

## 不要 AI 卡片感

避免：

- 每个 Mode 一个大圆角容器
- 每个节点一个胶囊
- 浅蓝、浅紫、浅黄卡片混排
- 卡片嵌套卡片
- 大量 Badge
- Hover 上浮和阴影
- AI 功能入口式设计

三个 Mode 应该是三条信息 Lane，不是三个 Feature Card。

---

## 不要 Dashboard

避免：

- 左侧 Sidebar
- 顶部控制台导航
- KPI 数字
- 图表
- Activity Feed
- 模型状态
- 任务运行日志
- 假的输入框
- “Run Workflow”按钮
- 大量状态绿点
- 模拟 SaaS 产品界面

Workspace 元素只用于表达思考结构，不应该让首页看起来像一个可操作后台。

---

## 不要传统 Portfolio 卡片墙

避免：

- 项目封面图
- 三张 Project Thumbnail
- “View Project”悬浮卡片
- 图片上叠加标题
- 项目年份、角色和工具标签堆叠
- Masonry Grid
- 多项目筛选器

首页展示的是 Collaboration Framework，其中包含两个 Case Evidence。

---

## 不要大量圆角

允许：

- 小型 Workflow Node：2–6px
- 极少量状态标签：最大 999px 胶囊，但数量严格控制
- 图片或内容需要裁切时：6–8px

不建议：

- Section 容器圆角
- Lane 圆角
- 深色 Shared Principle 圆角
- 20–32px 大圆角
- 所有组件使用同一圆角

---

## 不要大量边框

边框只用于：

- Lane 分隔
- Workflow 连接
- Header / Footer 边界
- 少量节点轮廓

避免：

- 每段正文有边框
- 每个 Section 有外框
- 双重边框
- 虚线装饰框
- 大量表格线

---

## 不要视觉噪音

避免：

- 重复标签
- 每个元素都有编号
- 大量图标
- 装饰性网格
- 背景代码字符
- 浮动圆点
- 光晕
- 动画粒子
- 过多英文全大写
- 同屏超过两种强调色
- 每个 Workflow 都使用不同视觉语言

---

# 6. 首页视觉情绪描述

首页应该像一个安静、精确的 AI 决策工作台。

进入页面时，用户首先感受到的不是“这里有三个项目”，而是一个清晰的任务分流系统：不同任务性质沿着细线进入不同协作模式。大面积浅蓝留白提供理性、开放的空间；深蓝文字和连接线建立可信度；浅蓝节点表示 AI 正在执行证据支持的工作；黄色只在需要人类判断的边界上出现。

三个 Collaboration Lane 更像同一张工作地图中的三条路径，而不是三张产品卡片。Exploration 保持开放和循环，Structured 走向稳定的 Skill，Creative 走向结构化生成与人工评价。页面下方的深色 Shared Principle 像一次判断收束，让用户理解所有路径背后的共同问题：

> What is AI allowed to infer?

整体情绪应是：

- Calm
- Precise
- Editorial
- Evidence-driven
- Technical without looking like a dashboard
- Experimental without looking speculative

最终观感应更接近“一篇可交互的 AI 产品判断框架”，而不是 AI SaaS 首页或传统作品集项目墙。
