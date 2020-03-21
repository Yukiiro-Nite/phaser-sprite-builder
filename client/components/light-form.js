class LightForm extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerHTML = `
      <details>
        <summary><h3>Light</h3></summary>
        <form name="light">
          <label>
            <input class="tint" name="light-color" type="color" />
            Light Color 
          </label>
          <button>Apply to scene</button>
        </form>
      </details>
    `
  }
  attributeChangeCallback() { }
  disconnectedCallback() { }
}

customElements.define('light-form', LightForm);