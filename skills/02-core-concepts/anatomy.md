# 02 — Anatomie d'un Test Unitaire

Sources : The Art of Unit Testing 3E — Osherove · Pragmatic Unit Testing — Langr · Khorikov

---

## Structure AAA — Arrange / Act / Assert

Tout test unitaire suit exactement 3 phases dans cet ordre. Sans exception.

```javascript
import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formate un montant en MAD avec 2 décimales', () => {
    // ARRANGE — préparer les données et le contexte
    const amount = 1500
    const currency = 'MAD'

    // ACT — exécuter l'unité de travail
    const result = formatCurrency(amount, currency)

    // ASSERT — vérifier le résultat observable
    expect(result).toBe('1 500,00 MAD')
  })
})
```

... (contenu copié depuis l'ancien 02-anatomy-unit-test.md)
