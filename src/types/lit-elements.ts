import { LitElement } from 'lit'

// Base interface for all custom elements
export interface CustomElement extends LitElement {
  connectedCallback(): void
  disconnectedCallback(): void
  adoptedCallback(): void
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void
}

// Event types for custom events
export interface CardSelectEvent extends CustomEvent {
  detail: {
    cardId: string
  }
}

// Declare custom elements for TypeScript
declare global {
  interface HTMLElementTagNameMap {
    'medieval-cards-app': import('../app.js').MedievalCardsApp
    'card-section': import('../components/card-section.js').CardSection
    'card-navigation': import('../components/navigation.js').CardNavigation
    'card-view': import('../components/card-view.js').CardView
  }
}
