# Tester des composants Vue — Patterns et exemples

Extraits pratiques pour tester les composants avec `@vue/test-utils` et `vitest`.

## Rendu et assertions DOM

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PaymentForm from './PaymentForm.vue'

describe('PaymentForm', () => {
  it('affiche le titre du formulaire', () => {
    const wrapper = mount(PaymentForm, { props: { currency: 'MAD' } })
    expect(wrapper.find('h2').text()).toBe('Paiement en MAD')
  })
})
```

## mount vs shallowMount

- `mount` : rendu complet (enfants inclus) — plus réaliste
- `shallowMount` : stub des enfants — plus rapide et isolé

## Événements et data-testid

- Préférer `data-testid` pour les sélecteurs
- Vérifier `wrapper.emitted()` pour les events
