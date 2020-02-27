class LightForm extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerHTML = `
      <details>
        <summary><h3>Light</h3></summary>
        <form>
          <label>
            <input name="light-color" type="color" />
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