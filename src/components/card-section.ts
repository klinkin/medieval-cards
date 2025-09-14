import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('card-section')
export class CardSection extends LitElement {
  @property() override title = ''

  override createRenderRoot() {
    return this
  }

  private _initialChildren: Node[] = []

  override connectedCallback(): void {
    super.connectedCallback()
    // Сохраняем исходных детей до первого рендера (для эмуляции <slot/>)
    this._initialChildren = Array.from(this.childNodes)
  }

  override firstUpdated(): void {
    const content = this.querySelector('.cs-content')
    if (content && this._initialChildren.length) {
      this._initialChildren.forEach(node => content.appendChild(node))
      this._initialChildren = []
    }
  }

  override render(): unknown {
    return html`
      <section class="ui-card mb-4">
        <h3 class="text-xl md:text-2xl font-bold mb-2.5">${this.title}</h3>
        <div class="cs-content"></div>
      </section>
    `
  }
}