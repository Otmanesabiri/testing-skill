# Vitest — Configuration recommandée

Extrait et recommandations de configuration pour un projet Vue 3 + Vitest.

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules/', 'tests/', '**/*.config.*']
    }
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') }
  }
})
```

Notes:
- `setupFiles` permet d'initialiser Pinia, MSW, etc.
- `coverage.provider: 'v8'` est rapide et fiable pour JS/TS modernes
