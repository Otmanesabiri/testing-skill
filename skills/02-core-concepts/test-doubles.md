# 03 — Test Doubles : Stubs, Mocks, Spies, Fakes

Sources : The Art of Unit Testing 3E — Osherove · Khorikov · GOOS — Freeman & Pryce

---

## Taxonomie des test doubles (Osherove)

```
Test Double (terme générique pour tout remplacement de dépendance)
├── Stub     → contrôle les ENTRÉES (remplace une dépendance qui retourne des données)
├── Mock     → vérifie les SORTIES (vérifie qu'une interaction a eu lieu)
├── Spy      → stub qui enregistre les appels (vérifié après coup)
├── Fake     → implémentation fonctionnelle simplifiée (ex: DB en mémoire)
└── Dummy    → valeur de remplissage, jamais utilisée dans le test
```

... (contenu copié depuis l'ancien 03-test-doubles.md)
