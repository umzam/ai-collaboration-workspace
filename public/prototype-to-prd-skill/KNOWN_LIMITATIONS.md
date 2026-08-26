# Known Limitations — v1.0

## Complex Object Lifecycles

When a complex business object has several distinct lifecycle qualifications, the Skill may interpret these boundaries too broadly or merge them:

- may be produced;
- may be read;
- may enter manual handling;
- may enter exception repair;
- has passed validation;
- may become an official source;
- may become an official result.

In particular, permission to enter manual handling or exception repair does not necessarily mean that the object is formally usable or qualified as an official source or result.

This behavior was observed in one historical regression case and has not yet been shown to be a general cross-scenario defect. The v1.0 core therefore records the risk without embedding a case-specific answer. If the same pattern appears in a new real project, evaluate whether it should become a general rule.

## Validation Scope

v1.0 was evaluated against two real historical product projects. Both involved complex workflows with multiple prototype pages, states, exceptions, asynchronous tasks, and substantial business rules.

This supports using v1.0 as a stable current release, but it does not prove applicability to every product type or organizational process.

## Future Version Policy

Do not change v1.0 to match an isolated difference from an existing regression case. Consider v1.1 only through:

`real use → issue record → generalizability assessment → Human Gate → Skill change → historical regression verification → v1.1 release`
