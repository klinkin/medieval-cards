import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { cards, type Card } from './data.js'
import './components/card-section.js'
import './components/navigation.js'
import './components/card-view.js'

@customElement('medieval-cards-app')
export class MedievalCardsApp extends LitElement {
  @property()
  activeId: Card['id'] = 'p1'

  override createRenderRoot() {
    return this
  }

  get activeCard(): Card {
    return cards.find(c => c.id === this.activeId)!
  }

  private _handleCardSelect(event: CustomEvent) {
    this.activeId = event.detail.cardId
  }

  override render(): unknown {
    return html`
      <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div class="max-w-6xl mx-auto safe-px py-6">
          <header class="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl md:text-3xl font-bold flex items-center gap-2">
                📖 Глава 1 — Становление средневековой Европы
              </h1>
              <p class="text-sm text-slate-600 dark:text-slate-400">Карточки-истории для подготовки к контрольной (6 класс)</p>
            </div>
            <button class="rounded-2xl border px-3 py-1 text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
              @click=${() => window.dispatchEvent(new Event('toggle-theme'))}>
              🌓 Тема
            </button>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
            <aside class="md:sticky md:top-4 self-start">
              <card-navigation
                .cards=${cards}
                .activeId=${this.activeId}
                @card-select=${this._handleCardSelect}
              ></card-navigation>
            </aside>
            <main>
              <card-view .data=${this.activeCard}></card-view>
            </main>
          </div>

          <footer class="mt-10 text-xs text-slate-500 dark:text-slate-400">
            © Подготовка по Агибаловой/Донскому. Связки дата — место — действующие лица — событие» и словарь — для быстрого запоминания.
          </footer>
        </div>
      </div>
    `
  }
}