# SproutCircle — Watering Confirmation PRD

> Fully fictional example PRD.

## 1. Scope

Enable a signed-in household member to mark a plant as watered for the current calendar day. Watering is a single shared state per plant and day in the household's configured timezone.

Out of scope: notification scheduling, plant-care recommendations, support corrections after the undo window, and the technical choice of API, storage, locking, or update-delivery mechanism.

## 2. Functional Description

On the Today page, a plant due for watering exposes **Mark watered**. A successful action changes the shared plant-day state to **Watered today** for all household members and records the acting member and effective time.

## 3. Elements and Interactions

| Element | Visibility/state | Interaction and result |
| --- | --- | --- |
| `Mark watered` | Visible to signed-in household members when the shared plant-day state is `Due today` | On selection, disable immediately and show `Saving…` |
| Status | Always visible | Show `Due today` or `Watered today` from the authoritative shared state |
| Last watered | Always visible when a prior success exists | Show the effective success time in the household timezone |
| Watered by | Visible in `Watered today` | Show the acting member's display name |
| `Retry` | Visible after a service-unavailable failure | Retry the same watering action; retain the current card data until success |
| `Undo` | Visible only to the acting member for five minutes after success | On success, restore `Due today` for all members and remove the watering actor/time for the current day |

## 4. Business Rules

1. The authoritative product object is one shared watering state for each plant and household-local calendar day.
2. The first successful watering action changes that state from `Due today` to `Watered today`.
3. After success, **Mark watered** is unavailable to every household member for that plant-day.
4. Only the member who performed the successful action may undo it, and only during the five-minute window measured from authoritative success time.
5. After a successful undo, the plant returns to `Due today` and may be marked again.
6. Open Today pages must reflect a confirmed shared-state change within ten seconds. Engineering determines the delivery mechanism.

## 5. States and Transitions

| Current state | Trigger | Guard | Resulting state | User feedback |
| --- | --- | --- | --- | --- |
| `Due today` | Select `Mark watered` | Signed in; shared state still due | `Saving` | Disabled `Saving…` button |
| `Saving` | Save succeeds | Authoritative write accepted | `Watered / undo available` | Status, time, actor, and Undo shown |
| `Saving` | Service unavailable | No authoritative change | `Due today / retry available` | Inline failure and Retry |
| `Watered / undo available` | Acting member selects Undo within five minutes | Shared state still refers to that success | `Due today` | Restored due state |
| `Watered / undo available` | Five minutes elapse | No undo in progress | `Watered / final for day` | Undo disappears |

If another member completes the action first, a later attempt must not create a second watering state. The user sees the authoritative `Watered today` result. Exact concurrency control is a technical decision.

## 6. Exception and Recovery

- Service-unavailable failure: retain previously displayed data, remain on Today, show an inline error and **Retry**, and do not show success.
- Repeated selection while saving: the disabled action prevents another local submission. Server-side duplicate handling is a technical requirement consistent with the single shared-state rule.
- Undo failure: keep `Watered today`, keep Undo available if the five-minute product window has not expired, and show an inline retryable error.
- Stale open page: reconcile to the authoritative shared state within ten seconds.

## 7. Data Semantics

| Item | Product definition | Specialist follow-up |
| --- | --- | --- |
| Plant-day state | One shared state per plant per household-local day | Data team defines authoritative keys and schema |
| Acting member | Member whose successful action created the current watered state | Data team defines reference representation |
| Success time | Authoritative time at which the shared update succeeds | Technical team defines clock/source implementation |
| Update propagation | Visible on open Today pages within ten seconds | Technical team selects delivery mechanism |

## 8. Acceptance Criteria

1. A due plant can be marked once, and all household members see the same watered state.
2. Loading disables the action and does not show success before the authoritative update succeeds.
3. A service-unavailable failure preserves prior data and offers Retry.
4. Only the acting member can see and use Undo during the five-minute window.
5. Successful undo restores the due state for all members.
6. Open Today pages reflect confirmed shared-state changes within ten seconds.
7. The final prototype and this PRD expose the same user-visible states and actions.
