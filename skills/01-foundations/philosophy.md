# 01 — Philosophie & Stratégie de Tests

Sources : Unit Testing Principles, Practices and Patterns — Khorikov · The Art of Unit Testing 3E — Osherove

---

## Pourquoi tester ? L'objectif réel (Khorikov)

> "The goal of unit testing is to enable sustainable growth of the software project."

Le problème n'est pas l'absence de tests. C'est d'avoir des tests qui **coûtent plus cher qu'ils n'apportent**.

Un test a de la valeur si et seulement si :
- Il est intégré dans le cycle de développement (pas lancé une fois par mois)
- Il cible les parties les plus importantes du code
- Il fournit une valeur maximale pour un coût de maintenance minimal

### Les 4 attributs d'un bon test (Khorikov)

```
1. Protection contre les régressions
   → Le test détecte les bugs introduits par une modification

2. Résistance au refactoring
   → Le test ne casse pas quand on refactorise sans changer le comportement

3. Feedback rapide
   → Le test s'exécute en millisecondes

4. Maintenabilité
   → Le test est facile à lire et à modifier
```

... (contenu copié depuis l'ancien fichier 01-philosophy.md)
