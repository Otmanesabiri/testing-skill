---
name: testing-skill
description: >
  Use this skill whenever writing, reviewing, or structuring tests for a frontend
  or full-stack application. Triggers include: "write unit tests", "how to test this
  composable", "mock this dependency", "test this Vue component", "integration test",
  "test is flaky", "what should I test", "test doubles", "TDD", "test coverage",
  "testing strategy", or any question about Vitest, Vue Test Utils, or MSW.
  Based on The Art of Unit Testing 3E (Osherove), Unit Testing Principles Practices
  and Patterns (Khorikov), Growing Object-Oriented Software Guided by Tests (Freeman
  & Pryce), and Pragmatic Unit Testing in Java 8 with JUnit (Langr).
  Stack cible : Vitest · Vue Test Utils · MSW · Playwright
---

# Testing Skill — Index

Sources :
- **The Art of Unit Testing 3E** — Roy Osherove (JS/TS edition)
- **Unit Testing Principles, Practices and Patterns** — Vladimir Khorikov
- **Growing Object-Oriented Software Guided by Tests** — Freeman & Pryce
- **Pragmatic Unit Testing in Java 8 with JUnit** — Jeff Langr

---

## Architecture des fichiers

| Fichier | Quand le lire |
|---------|--------------|
| `01-foundations/philosophy.md` | Pyramide des tests, quoi tester, métriques |
| `01-foundations/tdd-lifecycle.md` | Cycle Red-Green-Refactor |
| `02-core-concepts/anatomy.md` | Structure AAA, nommage, assertions |
| `02-core-concepts/test-doubles.md` | Stubs, mocks, spies, fakes — quand utiliser quoi |
| `03-implementation-vue/vitest-config.md` | Setup Vitest & config recommandée |
| `03-implementation-vue/components.md` | Tester composants, emissions, DOM |
| `03-implementation-vue/integration-msw.md` | MSW, tests d'intégration et handlers |
| `02-core-concepts/antipatterns.md` | Tests fragiles, over-specification, flaky tests |
| `04-resources/checklists.md` | Checklists PR / Unitaire / Intégration / Composant |

---

## Règles non-négociables (Osherove + Khorikov)

1. **Un test = un comportement** — pas une méthode, pas une ligne de code
2. **AAA systématique** — Arrange / Act / Assert, toujours dans cet ordre
3. **Tests lisibles sans contexte** — un dev qui voit le test doit comprendre sans ouvrir le code source
4. **Jamais de logique dans les tests** — pas de if, for, switch dans un test
5. **Isolation totale** — un test ne dépend jamais du résultat ou de l'ordre d'un autre
6. **Tester le comportement observable, pas l'implémentation**
7. **Un seul mock par test maximum** — plusieurs mocks = test de la mauvaise chose
8. **Les stubs ne s'assertent pas** — seuls les mocks s'assertent

---

## Routing rapide

**"Qu'est-ce que je dois tester ?"** → `01-philosophy`
**"Comment structurer mon test ?"** → `02-anatomy-unit-test`
**"Mock ou stub ?"** → `03-test-doubles`
**"Tester un composant Vue / composable / store"** → `04-vitest-vue`
**"Tester un flux avec une API"** → `05-integration-tests`
**"TDD — par où commencer ?"** → `06-tdd`
**"Mon test est fragile / flaky"** → `07-antipatterns`
**"Checklist avant PR"** → `08-testing-checklist`
