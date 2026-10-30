# 0005 — Module conventions

- **Date:** 2026-10-27
- **Status:** Accepted

## Decision
- All product code lives in `modules/<module>/`. Each module is self-contained.
- File names follow `<module>-<what it does>.<type>.ts(x)` with a suffix per type: `.components`, `.hooks`, `.actions`, `.services`, `.config`, `.data`, `.types`, `.utils`.
- Dependencies flow one way: **component → hook → action → service**.
- Always descriptive names (`sendDriverTenMinutesAwayNotice`, never `fn1`).

## Vocabulary note
In the test, *service* means "a ride / pickup". To avoid clashing with the `.services.ts` suffix, the entity is called **`Trip`** in code. The UI still says *Service*.

Full details in [architecture/module-conventions.md](../architecture/module-conventions.md).
