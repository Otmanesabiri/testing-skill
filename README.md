# testing-skill

Un ensemble de documents et d'exemples pour les bonnes pratiques de test (Vitest, Vue Test Utils, MSW, TDD).

Ce dépôt contient un "skill" de référence pour écrire, structurer et maintenir des tests front-end. Il est organisé pour aider les développeurs à trouver rapidement : stratégie, conventions d'écriture de tests, doubles de test, exemples pratiques et checklists.

## Structure

Les fichiers principaux se trouvent dans le dossier `skills/` et sont organisés ainsi :

- `01-foundations/` — philosophie, stratégie, TDD
- `02-core-concepts/` — anatomie d'un test, test doubles, anti-patterns
- `03-implementation-vue/` — configuration Vitest, composants, MSW
- `04-resources/` — checklists et aides rapides

## Générer l'index

Un script aide à construire un index JSON consommable par des agents ou outils :

```bash
# Générer skills/.index.json
node ./bin/build-index.js
```

Le script lit les fichiers Markdown de `skills/` et produit `skills/.index.json`.

## Pour les utilisateurs du skill

Si vous consommez ce projet via `npx`, vous n'avez rien à générer manuellement. La commande d'installation est :

```bash
npx skills@latest add otmanesabiri/testing-skill
```

L'index est déjà inclus dans le projet publié. La génération de `skills/.index.json` est réservée aux contributeurs qui modifient les fichiers dans `skills/`.

## Usage rapide

- Lire `SKILL.md` pour le routing rapide et les règles non-négociables.
- Modifier ou ajouter des fichiers Markdown dans `skills/` puis relancer `node ./bin/build-index.js`.

## Contribuer

1. Fork / clone le dépôt
2. Ajouter ou modifier un fichier dans `skills/` en respectant la structure
3. Regénérer l'index :

```bash
node ./bin/build-index.js
```

4. Commit & push

---

Si vous voulez que j'ajoute des scripts NPM, des checks GitHub Actions pour valider l'index, ou un modèle de frontmatter pour prioriser des fichiers, dites-le et je l'ajoute.
