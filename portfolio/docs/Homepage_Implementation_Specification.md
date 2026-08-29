# Homepage Implementation Specification

## 文档状态

- 用途：约束 AI Collaboration Workspace 首页的 HTML、CSS 与轻量 JavaScript 实现。
- 页面定位：AI Collaboration Decision Framework，不是 Case Gallery，也不是传统长篇 Case Detail 页面。
- 技术约束：纯 HTML、CSS、JavaScript；中文与英文内容由同构 JSON 文件提供。
- 视觉依据：`Homepage_Visual_Direction.md`。
- 内容依据：冻结后的 `Homepage_Content_Specification.md`。该文件必须存在后才能进入最终实现。

---

# 1. 页面结构

`index.html` 必须按以下顺序组织首页：

1. Header
2. Hero
3. Collaboration Modes
4. Exploration Mode expansion
5. Structured Case: PRD Collaboration Agent
6. Creative Case: Reference-to-Style
7. Shared Principle
8. Footer

首页使用单页展开结构，不跳转独立 Case Detail 页面。Prototype-to-PRD 作为 PRD Collaboration Agent 内部的生成 Skill 展示。

## 1.1 Header

职责：

- 展示 `AI Collaboration Workspace` 品牌名称。
- 提供 `Modes`、可选的 `About` 和语言切换入口。
- 不把 Prototype-to-PRD、Reference-to-Style 作为 Header 主导航。

内容边界：

- 左侧仅放品牌名。
- 右侧最多三个功能：Modes、About、中文 / EN。
- Header 不展示版本、Case 状态、社交链接或工具列表。

## 1.2 Hero

职责：

- 展示项目名称。
- 展示核心价值：不同任务需要不同 AI 协作方式。
- 使用 Hero Workflow 解释 `Task Nature → Collaboration Mode`。
- 使用 Human Gate Boundary 表达跨模式的人类决策边界。

内容边界：

- 一个标题。
- 一句核心价值。
- 一句辅助说明。
- 一个三路径 Workflow。
- 不展示 Case 图片、Case 结果或项目履历。

## 1.3 Collaboration Modes

职责：

- 通过三条 Workspace Lane 展示任务性质、协作方式和实践或案例证据。
- 明确 Exploration 是 Collaboration Mode，而不是第三个 Case Study。
- Structured 和 Creative 的 Case Name 本身可点击并锚点滚动到对应的单页 Case Evidence。

Lane 顺序：

1. Exploration Mode → Conversational Prototyping
2. Structured Mode → PRD Collaboration Agent
3. Creative Mode → Reference-to-Style

每条 Lane 只展示：

- Task Nature
- Collaboration Mode
- Name
- 一句话 Problem
- 最多五个 Workflow Node
- 一行 Result

不显示独立的 `View Case →`、Entry Button 或其他 Case CTA。

首页 Lane 不展示：

- 历史项目细节
- Regression 过程
- Evidence 详情
- Known Limitation 详情
- Case 截图

## 1.4 Shared Principle

职责：

- 使用 `What Is AI Allowed to Infer?` 收束三种协作模式。
- 通过左右分区说明 AI 与 Human 的职责边界。
- 使用 Human Gate 黄色边界线表示证据不再支持唯一答案的位置。

结构：

- AI Space：Ask、Extract、Structure、Validate。
- Human Space：Direct、Define、Resolve、Accept。
- Human Gate Boundary：位于两个空间之间。
- Closing Principle：横跨整个 Section 的最终判断。

## 1.5 Footer

职责：

- 重复品牌名。
- 区分 Collaboration Mode 与 Case Studies。
- 提供 Conversational Prototyping、PRD Collaboration Agent、Reference-to-Style 的次级入口。
- 展示最终 Closing Statement。

Footer 不重复 Header 导航结构，不展示版本或 Evidence。

---

# 2. Layout

## 2.1 Container

页面使用流式 Container：

- 宽度随 viewport 变化，不设置固定页面宽度。
- 内容宽度由 viewport width 减去两侧流式 gutter 得到。
- 最大内容宽度为 1200–1280px。
- 超过最大宽度后增加页面两侧留白，不继续拉伸 Lane 和正文。
- 小屏幕下保留最小安全 gutter，避免文字和 Workflow 贴边。

推荐 gutter：

- Desktop：56–80px，并随 viewport 平滑变化。
- Tablet：32–48px。
- Mobile：18–24px。

## 2.2 Grid

Desktop：

- 使用 12 栏网格。
- Hero：5 栏文字、1 栏空隙、6 栏 Workflow。
- Collaboration Modes：每条 Lane 占 4 栏。
- Shared Principle：5 栏 AI Space、2 栏 Human Gate、5 栏 Human Space。

Tablet：

- 使用 8 栏网格。
- Hero 改为上下布局。
- Collaboration Modes 改为三个全宽横向 Lane。
- Shared Principle 可保持左右布局；空间不足时转为上下结构。

Mobile：

- 使用 4 栏网格。
- 所有主区块单列排列。
- Collaboration Modes 使用纵向 Workspace Rail，不转换成卡片列表。
- Human Gate 从垂直边界改为水平边界。

## 2.3 Responsive Breakpoints

建议按内容行为设置三档：

- Desktop：1200px 及以上。
- Tablet：768–1199px。
- Mobile：小于 768px。

断点不是为了缩小桌面组件，而是改变信息排列方式：

- Hero 从左右改为上下。
- Mode Lane 从三列改为全宽行，再改为纵向轨道。
- Shared Principle 从左右分区改为上下分区。
- Workflow Node 允许换行，但不允许缩小到难以阅读。

## 2.4 Section Spacing

Desktop：

- Hero 上下留白：72–100px。
- 主 Section 间距：96–140px。
- Section 标题与主体内容：28–44px。
- Lane 内信息组：24–36px。

Tablet：

- 主 Section 间距：72–96px。
- Lane 间距主要由分隔线和 32–48px 上下留白形成。

Mobile：

- 主 Section 间距：56–72px。
- Lane 间距：36–48px。
- 不通过大 Container padding 制造留白。

页面高度不得通过固定像素值锁定。Hero 和 Shared Principle 可以设置合理的最小高度，但必须允许内容自然增长。

---

# 3. Visual Rules

所有视觉实现继承 `Homepage_Visual_Direction.md`。

## 3.1 Required Visual Language

- 使用 Typography、Whitespace 和 Alignment 建立主要层级。
- 使用 Workflow Line 表达步骤、分支和循环。
- 使用 Lane 表达三种协作模式。
- 使用 `#cae4f0` 表达 AI Workflow。
- 使用 `#fff6c2` 仅表达 Human Gate 或人工判断。
- 使用 `#11273f` 作为主文字、连接线和 Shared Principle 深色背景。
- 使用 `#f0f7ff` 作为主要 Workspace 背景。
- 首页图片不是主要视觉元素，默认不使用 Case 图片。

## 3.2 Borders and Radius

- 边框只用于 Header / Footer 分隔、Lane 分隔、Workflow 连接与少量 Node 轮廓。
- 分隔线使用低透明度深蓝，不使用纯黑。
- Workflow Node 圆角限制在 0–6px。
- Section 和 Lane 不使用大圆角外框。
- 不使用阴影表达层级。

## 3.3 Interaction

允许：

- Hover / Focus 时提高当前 Lane 的文字和连接线对比度。
- 其他 Lane 轻微降低透明度。
- 可点击的 Case Name 提高文字或下划线对比度。
- 当前 Workflow 路径出现极淡的蓝色轨迹。

禁止：

- Lane 上浮、缩放或弹出。
- 大面积背景变色。
- 动态流光、粒子或循环播放动画。
- 仅依赖 Hover 才能读取核心内容。

所有可交互元素必须有键盘 Focus 状态；Focus 不能只依赖颜色变化。

## 3.4 Explicit Avoid List

不要实现：

- AI Dashboard
- Sidebar 或控制台式顶部栏
- KPI、图表、Activity Feed
- 三张传统 Portfolio Case Card
- 卡片墙或卡片嵌套
- 大量圆角容器
- Badge 堆叠
- SaaS 功能入口风格
- AI 插画、机器人图标或工具 Logo 墙
- Glassmorphism
- 蓝紫霓虹渐变
- 大面积黄色区域
- 背景代码、装饰网格和发光线

---

# 4. Component Rules

## 4.1 Global Header

用途：品牌识别、Modes / About 导航和语言切换。

视觉形式：

- 单行文字导航。
- 底部一条低透明度分隔线。
- 品牌名左对齐，功能入口右对齐。
- 小屏幕可收紧间距，但不引入 Dashboard 式菜单栏。

禁止形式：

- Case 状态 Badge。
- 大型 Logo。
- PRD Collaboration Agent 和 Reference-to-Style 主导航入口。
- CTA Button。

## 4.2 Hero Workflow

用途：把 Task Nature 映射到 Collaboration Mode。

视觉形式：

- 一个起点节点 `TASK NATURE`。
- 三条分支分别连接 High Uncertainty、Multi-stage & Independently Reviewable、Subjective Output。
- 每条分支连接对应的 Conversation、Skill orchestration + Human Gate、Skill + Human Evaluation。
- 使用细线、小节点和微标签。

禁止形式：

- 三张模式卡片。
- 流程图软件式复杂框图。
- 图标替代文字。
- 大型彩色背景节点。

## 4.3 Collaboration Lane

用途：在同一视觉系统中比较三种 Task Nature 与 Collaboration Mode。

视觉形式：

- Desktop 为三列等宽 Lane。
- Lane 之间使用两条贯穿内容区的细分隔线。
- 每条 Lane 使用统一的内容基线与 Workflow Node 规格。
- Exploration 使用 `PRACTICE`；Structured 和 Creative 使用 `CASE EVIDENCE`。
- Structured 与 Creative 的 Case Name 本身链接到单页内对应 Case Evidence；Exploration Name 链接到 Mode 说明。
- 不显示 `View Case →`、独立 Entry Button 或箭头式 CTA。

禁止形式：

- 独立卡片背景。
- 阴影和大圆角。
- 将三个 Lane 编号为三个 Case Study。
- 在首页展开完整 Evidence 或 Regression 细节。

### 1.3.1 PRD Review lenses

Structured Case may include an optional `validation.deliveryReadiness` content field. The existing Case renderer displays it inside the current validation area; it does not create a new top-level section or navigation entry.

The field contains only:

- `stageLabel`, `label`, `headline`, and one short comparison introduction;
- `logicReview` and its three lightweight checks: Completeness, Consistency, and Definition;
- `readinessReview`, which distinguishes delivery readiness from product-logic completeness;
- the existing Evolution renderer carries the Review Skill provenance: public source → distilled checks → specification-writing lens;
- the three dimensions: Implementation Readiness, Testability, and Acceptance Readiness;
- no regression or version fields are rendered on the homepage.

The Agent E2E validation workflow (`4 Findings → 4 Closed → 0 Remaining → Ready`) is not displayed on the homepage; its detailed evidence remains in the repository. The renderer must not copy the full Finding tables into the homepage. Delivery Readiness regression evidence remains under `skills/prd-review/evaluation/readiness-v0.2/`.

Within the Structured Case, render in this order:

`Agent Flow → Generation Stage / PRD Generation Skill → Review Stage / PRD Review → Result`

The Generation Stage contains the Human Gate boundary and its product principle inside the PRD Generation Skill mechanism. Do not render a separate Generation-stage Human Gate evidence band between Generation and Review.

`Agent Flow` is a visible hierarchy heading. `PRD Review` explains the two internal review lenses of the Review node; it must not read as a separate Agent stage, Case, or final result.

Render Review Stage as one shallow workspace band rather than disconnected text or multiple cards. Match the Generation Stage with the same restrained pale-blue surface, compact rows, and divider treatment. Group its stage header, the two review lenses, and the three readiness dimensions inside that band. Do not render regression summaries, design decisions, or version labels. A final horizontal divider separates the complete Review Stage band from the following Result block.

## 4.4 Workflow Node

用途：表达流程步骤、状态或决策点。

视觉形式：

- 高度约 26–34px。
- 小型文字节点，使用 11–13px 字号。
- Neutral Node 使用透明背景或细边框。
- AI Node 使用 `#cae4f0`。
- Human Node 使用 `#fff6c2`。
- 连接线使用 1–1.5px 低透明度深蓝。

禁止形式：

- Button 外观。
- 所有节点使用胶囊形状。
- 阴影、发光或动态流光。
- 黄色用于普通步骤。

## 4.5 Human Gate Boundary

用途：表示证据无法继续支持唯一决定的边界。

视觉形式：

- Hero 中使用贯穿三条路径的黄色边界线。
- Shared Principle 中使用 AI Space 与 Human Space 之间的黄色分界线。
- 线宽约 2–3px，交叉点可使用小圆点。
- 标签固定为 `HUMAN GATE`，附一行短说明。

禁止形式：

- 将 Human Gate 表达为第四种 Collaboration Mode。
- 黄色大卡片或大面积背景。
- 黄色 CTA。
- 与蓝色混合渐变。

## 4.6 Shared Principle Split

用途：收束首页并明确 AI 与 Human 的责任边界。

视觉形式：

- 首页唯一完整深色 Section。
- Desktop 为 AI Space / Human Gate / Human Space 三段结构。
- AI Space 和 Human Space 使用动词组与一句解释。
- Closing Principle 横跨 Section 底部。
- Mobile 改为 AI Space → Human Gate → Human Space 的上下结构。

禁止形式：

- 两张职责卡片。
- 对比表格。
- 长段方法论。
- 大量案例引用。

## 4.7 Language Switch

用途：在中文与英文内容之间切换。

视觉形式：

- Header 中使用简洁文字入口：`中文 / EN`。
- 当前语言具有清晰但克制的选中状态。
- 不使用国旗图标。

禁止形式：

- 同屏双语正文。
- 下拉菜单中混入其他设置。
- 依赖 Hover 才可切换。

## 4.8 Footer Groups

用途：区分 Collaboration Mode 与 Case Studies。

视觉形式：

- 一组 Collaboration Mode 链接。
- 一组 Case Studies 链接。
- 顶部使用一条分隔线。
- Closing Statement 使用低权重文字。

禁止形式：

- 重复 Header 的完整导航。
- 版本状态、Regression 和 Evidence。
- 深色大 Footer 紧接 Shared Principle。

---

# 5. Language System

## 5.1 Content Sources

中文与英文分别使用：

- `portfolio/content/zh-CN.json`
- `portfolio/content/en-US.json`

两份文件必须保持相同 schema、相同 Section key 和相同数组顺序。页面结构不因语言切换而重新定义。

## 5.2 Locale Rules

- 页面一次只渲染一种语言。
- 用户显式选择的语言优先级最高。
- 没有已保存选择时，可根据浏览器语言选择中文或英文。
- 浏览器语言无法判断时，默认使用中文。
- 切换语言后保留当前滚动位置和当前 Focus，不重新跳回页面顶部。
- 页面根语言属性必须随 locale 更新，以支持屏幕阅读器和正确断行。

## 5.3 Copy Mapping

页面组件只能读取稳定的语义 key，不在 HTML 或 JavaScript 中维护两套分支文案。

内容映射至少覆盖：

- Header 导航
- Hero 标题、核心价值和辅助说明
- Hero Workflow labels
- Collaboration Modes 标题
- 三条 Lane 的 Task Nature、Mode、Name、Problem、Workflow 和 Result
- Shared Principle 的 AI / Human 文案
- Footer 分组与 Closing Statement

## 5.4 Preserved Terms

以下专有名词在中文与英文模式中保持不翻译：

- AI Collaboration Workspace
- Prototype-to-PRD
- Reference-to-Style
- Human Gate
- Skill

其余界面文字根据当前 locale 完整切换，不能出现中英文混排段落。

## 5.5 Failure and Loading Behavior

- 内容加载前保留稳定页面骨架，避免 Lane 和 Workflow 明显跳动。
- Locale 文件加载失败时回退到默认中文内容。
- 切换失败时保留当前语言，不显示空白 Section。
- 错误反馈保持简短，不使用 Dashboard 式通知组件。

---

# 6. Implementation Readiness Gate

进入 HTML / CSS 实现前必须满足：

- `Homepage_Information_Architecture.md` 已存在并冻结。
- `Homepage_Visual_Direction.md` 已存在并冻结。
- `Homepage_Content_Specification.md` 已存在并冻结。
- 中文和英文 JSON 已按冻结文案同步。
- Exploration、Structured、Creative 的层级已在内容与视觉规范中保持一致。
- 首页不创建独立 Case Detail 页面；Case Evidence 在单页内紧凑展开。

若任一项缺失，只能进行目录和技术准备，不应开始最终页面实现。
