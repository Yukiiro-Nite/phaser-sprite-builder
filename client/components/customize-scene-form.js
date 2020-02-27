class CustomizeSceneForm extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <details>
        <summary><h2>Customize Scene</h2></summary>
        <material-form title="Room Walls" name="wall"></material-form>
        <material-form title="Room Floors" name="floor"></material-form>
        <material-form title="Avatar" name="avatar"></material-form>
        <light-form></light-form>
      </details>
    `
  }
  attributeChangeCallback() { }
  disconnectedCallback() { }
}

customElements.define('customize-scene-form', CustomizeSceneForm);