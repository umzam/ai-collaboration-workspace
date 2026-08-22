# Locale Content Contract

`zh-CN.json` and `en-US.json` use the same keys and section order.

Each section may contain:

- `priority`: `required`, `collapsible`, or `deletable`.
- `eyebrow`: short section label.
- `title`: visible section heading.
- `objective`: internal content goal; not necessarily rendered.
- `summary`: short primary copy.
- `visual`: metadata for the planned diagram or evidence group.
- `interaction`: `none`, `anchor`, `tabs`, `comparison`, or `disclosure`.

Case studies additionally contain:

- `openingQuestion`
- `coreInsight`
- `workflow`
- `evidence`
- `conclusion`

The locale files contain copy and presentation metadata only. Skill source, private project evidence,
and implementation code remain outside `content/`.
