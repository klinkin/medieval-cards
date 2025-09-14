import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export interface Card {
  id: string
  title: string
}

@customElement('card-navigation')
export class CardNavigation extends LitElement {
  @property({ type: Array }) cards: Card[] = []
  @property() activeId = ''

  override createRenderRoot() {
    return this
  }

  private _handleCardSelect(cardId: string) {
    this.dispatchEvent(new CustomEvent('card-select', {
      detail: { cardId },
      bubbles: true,
      composed: true
    }))
  }

  override render(): unknown {
    return html`
      <nav class="mb-6 md:mb-0">
        <div class="space-y-2">
          ${this.cards.map(card => html`
            <button
              class="w-full text-left rounded-2xl border px-4 py-3 text-lg md:text-sm transition-colors ${
                this.activeId === card.id
                  ? 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 font-semibold'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400'
              }"
              @click=${() => this._handleCardSelect(card.id)}
            >
              ${card.title}
            </button>
          `)}
        </div>
      </nav>
    `
  }
}