# Testing Skill — Table des matières et routage

Ce fichier présente la structure du skill et la manière d'y naviguer.

Sections principales

- 01-foundations — Fondations et stratégie
- 02-core-concepts — Concepts centraux (Anatomie, test doubles, anti-patterns)
- 03-implementation-vue — Exemples pratiques pour Vitest / Vue / MSW
- 04-resources — Checklists et outils de validation

Routing rapide (liens internes depuis `SKILL.md`)

- `01-foundations/philosophy.md`  — Quoi tester, pyramide, métriques
- `01-foundations/tdd-lifecycle.md` — Cycle Red-Green-Refactor, Outside-In
- `02-core-concepts/anatomy.md` — AAA, nommage, assertions
- `02-core-concepts/test-doubles.md` — Stubs, Mocks, Spies, Fakes
- `02-core-concepts/antipatterns.md` — Flaky tests, over-spec, mauvaises pratiques
- `03-implementation-vue/vitest-config.md` — Configuration Vitest recommandée
- `03-implementation-vue/components.md` — Patterns pour tester les composants
- `03-implementation-vue/integration-msw.md` — Tests d'intégration avec MSW
- `04-resources/checklists.md` — Checklists PR / Unitaire / Intégration / Composant

Principes d'optimisation (courte checklist)

- Co-localiser les tests unitaires avec le code source
- Garder les tests rapides (<50ms) et isolés
- Utiliser MSW pour remplacer les APIs en intégration
- Ne pas mettre de logique métier dans les tests
- Protéger la CI avec `test:run` et `test:coverage`
