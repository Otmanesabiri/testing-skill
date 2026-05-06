# Tests d'Intégration & MSW

MSW (Mock Service Worker) permet d'intercepter les requêtes réseau pour les tests d'intégration.

## Installation rapide

```bash
npm install --save-dev msw@latest
npx msw init public/ --save
```

## Exemple de configuration

```typescript
// tests/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

## Bonnes pratiques

- Démarrer MSW dans `beforeAll` et fermer dans `afterAll`
- `server.resetHandlers()` après chaque test
- Utiliser MSW pour couvrir les chemins heureux et les erreurs HTTP

... (contenu copié depuis l'ancien 05-integration-tests.md)
