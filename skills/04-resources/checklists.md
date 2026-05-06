# Checklists de Tests — Ressource centrale

Regroupe les checklists PR / Unitaire / Intégration / Composant.

## Checklist : avant de merger une PR

### 🔴 Bloquant — corriger avant merge

```
Structure des tests
[ ] Chaque test suit le pattern AAA (Arrange / Act / Assert)
[ ] Un seul comportement par test (pas de test qui en teste plusieurs)
[ ] Aucune logique dans les tests (if, for, switch)
[ ] Noms de tests descriptifs : [unité]_[condition]_[résultat attendu]

Isolation
[ ] Chaque test peut s'exécuter seul, dans n'importe quel ordre
[ ] Aucun état partagé entre tests sans reset dans beforeEach
[ ] vi.restoreAllMocks() ou vi.clearAllMocks() dans afterEach

Mocks
[ ] Pas plus d'un mock par test (les autres sont des stubs)
[ ] Les stubs ne sont pas assertés
[ ] Les modules mockés sont correctement réinitialisés entre tests

Qualité
[ ] Les tests échouent pour la bonne raison
[ ] Aucun test skippé (.skip) sans commentaire justificatif
[ ] Aucun test vide (it('...', () => {}))
```

... (autres checklists copiées depuis 08-testing-checklist.md)
