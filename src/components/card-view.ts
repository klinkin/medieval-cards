import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { Card } from '../data.js'

@customElement('card-view')
export class CardView extends LitElement {
  @property({ type: Object }) data!: Card

  override createRenderRoot() {
    return this
  }

  private _renderBadge(text: string) {
    return html`<span class="ui-badge mr-1">${text}</span>`
  }

  override render(): unknown {
    if (!this.data) return html``

    return html`
      <div class="space-y-5 md:space-y-6 max-w-2xl md:max-w-3xl mx-auto px-1">
        <card-section title="📖 Сюжет-история">
          <p class="text-base md:text-lg leading-7 md:leading-8 text-slate-800 whitespace-pre-wrap">${this.data.story}</p>
        </card-section>

        <card-section title="🔑 Ключевые моменты">
          <ul class="list-disc pl-5 text-base md:text-lg space-y-1.5">
            ${this.data.bullets.map(bullet => html`<li>${bullet}</li>`)}
          </ul>
        </card-section>

        <card-section title="📘 Термины">
          <div class="overflow-x-auto">
            <table class="w-full text-base md:text-lg">
              <thead>
                <tr class="text-left border-b border-slate-200 text-slate-600">
                  <th class="py-3 pr-2">Термин</th>
                  <th class="py-3">Понятно ребёнку</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                ${this.data.terms.map(term => html`
                  <tr class="align-top">
                    <td class="py-3 pr-2 font-medium">${term.term}</td>
                    <td class="py-3">${term.def}</td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </card-section>

        <card-section title="🔗 Связки: дата — место — действующие лица — событие">
          <div class="grid md:grid-cols-2 gap-3 md:gap-4">
            ${this.data.links.map(link => html`
              <div class="rounded-xl border border-slate-200/70 p-3 md:p-4 bg-white/60 hover:shadow-sm transition-shadow">
                <div class="text-sm mb-1">
                  ${this._renderBadge(link.date)} ${this._renderBadge(link.place)}
                </div>
                <div class="text-base md:text-lg text-slate-700">
                  <span class="font-medium">${link.who}</span> — ${link.what}
                </div>
              </div>
            `)}
          </div>
        </card-section>

        <card-section title="✅ Проверь себя">
          <ol class="list-decimal pl-5 text-base md:text-lg space-y-1.5">
            ${this.data.questions.map(question => html`<li>${question}</li>`)}
          </ol>
        </card-section>
      </div>
    `
  }
}