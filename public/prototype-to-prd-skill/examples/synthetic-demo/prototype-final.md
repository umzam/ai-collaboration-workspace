# SproutCircle — Final Prototype Contract

> Fictional prototype after the Human Gate decisions.

## State A — Due Today

```text
Moon Fern
Watering status: Due today
Last watered: Yesterday, 08:10
[ Mark watered ]
```

Selecting **Mark watered** disables the button and changes its label to **Saving…**.

## State B — Save Failed

```text
Moon Fern
Watering status: Due today
Could not save watering. [ Retry ]
```

Existing card data remains unchanged. **Retry** attempts the same action again.

## State C — Watered, Undo Available

```text
Moon Fern
Watering status: Watered today
Last watered: Today, 07:42
Watered by: Rowan
[ Undo ]  Available for 04:59
```

Only the acting member sees **Undo**. Other household members see the shared watered state without the action.

## State D — Watered, Final for the Day

```text
Moon Fern
Watering status: Watered today
Last watered: Today, 07:42
Watered by: Rowan
```

The undo action is absent after five minutes. Open Today pages reflect the shared state within ten seconds.
