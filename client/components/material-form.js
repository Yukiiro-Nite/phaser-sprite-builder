function getMaterialFormData(event) {
  const nameEl = event.target.elements.name
  const textureEl = event.target.elements.texture
  const normalEl = event.target.elements.normal

  return {
    name: nameEl.value,
    textureFile: Array.from(textureEl.files)[0],
    normalFile: Array.from(normalEl.files)[0]
  }
}

class MaterialForm extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const title = this.getAttribute("title")
    const name = this.getAttribute("name")

    this.innerHTML = `
      <details>
        <summary><h3>${title}</h3></summary>
        <form class="add-material-form">
          <label>
            ${name} name <input name="name" type="text" title="defaults to texture file name"/>
          </label>
          <label>
            ${name} texture <input name="texture" type="file" />
          </label>
          <label>
            ${name} normal <input name="normal" type="file" />
          </label>
          <button>Add new ${name} material</button>
        </form>
        <material-list name="${name}"></material-list>
      </details>
    `

    this.form = this.querySelector('form')
    this.materialList = this.querySelector('material-list')

    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      event.stopPropagation()
      const materialData = getMaterialFormData(event)
      const addItemEvent = new CustomEvent('additem', { detail: materialData })

      event.target.reset()
      this.materialList.dispatchEvent(addItemEvent)
    })
  }
  attributeChangeCallback() { }
  disconnectedCallback() { }
}

customElements.define('material-form', MaterialForm);