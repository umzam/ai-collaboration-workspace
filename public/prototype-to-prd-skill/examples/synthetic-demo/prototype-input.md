# SproutCircle — Input Prototype

> Fictional prototype evidence for demonstration only.

## Product Context

Members of one fictional household can view the same plant cards. The prototype is for the “Today” page.

## Screen: Today

```text
Today

┌────────────────────────────────────┐
│ Moon Fern                         │
│ Watering status: Due today        │
│ Last watered: Yesterday, 08:10    │
│                                    │
│ [ Mark watered ]                   │
└────────────────────────────────────┘
```

## Demonstrated Interaction

1. A signed-in household member selects **Mark watered**.
2. The button becomes disabled and displays **Saving…**.
3. On success, the card displays:

```text
Watering status: Watered today
Last watered: Today, 07:42
Watered by: Rowan
```

4. The **Mark watered** button is no longer visible.

## Supplied Fictional UI Rule

`DEMO-UI-01`: When a user-triggered update fails because the service is unavailable, keep the current page and previously displayed data, show an inline failure message beside the action, and provide **Retry**.

## Not Expressed by the Prototype

- Whether “watered today” is one shared plant state or a personal acknowledgment.
- Whether an accidental action can be undone.
- What another member sees if they have the page open at the same time.
- API shape, record identifier, concurrency control, or storage design.
