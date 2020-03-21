class MaterialListItem extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const index = this.getAttribute('item-index')
    const name = this.getAttribute('name')
    const texture = this.getAttribute('texture')
    const normal = this.getAttribute('normal')

    this.innerHTML = `
      <li>
        <input class="visibility mt-16 mr-16" type="checkbox" title="visible" />
        <details>
          <summary><div class="summary-content">
            <img class="texture-img" id="${name}-texture" src="${texture}"></img>
            <img class="normal-img" id="${name}-normal" src="${normal}" hidden></img>
            <h4>${name}</h4>
            <span class="up-down-container">
              <button class="up-button" title="Move up"></button>
              <button class="down-button" title="Move down"></button>
            </span>
          </div></summary>
          <label class="mb-16">
            <input class="tint" id="${name}-tint" type="color" />
            Tint
          </label>
          <button class="remove-button" class="mb-16">remove</button>
        </details>
      </li>
    `;

    ['up', 'down', 'remove'].forEach((type) => {
      const button = this.querySelector(`.${type}-button`)
      button.addEventListener('click', () => {
        const event = new CustomEvent(type, { detail: index, bubbles: true })
        this.dispatchEvent(event)
      })
    })
  }
  attributeChangeCallback() { }
  disconnectedCallback() { }
}

customElements.define('material-list-item', MaterialListItem);