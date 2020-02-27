function readFileInput(file) {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener("error", function () {
      console.log('Error reading file: ', file)
      resolve()
    })
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      resolve()
    }
  })
}

function removeFromArray(array, index, count=1) {
  const left = array.slice(0, index)
  const right = array.slice(index+count)
  return [].concat(left, right)
}

function swapArrayElements(array, index1, index2) {
  const clone = array.slice()
  const temp = clone[index1]

  clone[index1] = clone[index2]
  clone[index2] = temp

  return clone
}

class MaterialList extends HTMLElement {
  constructor() {
    super();
    this.items = []
  }
  connectedCallback() {
    this.addEventListener('additem', ({detail: materialData}) => {
      this.addItem(materialData)
    })
  }
  attributeChangeCallback() { }
  disconnectedCallback() { }

  addItem(materialData) {
    Promise.all([
      readFileInput(materialData.textureFile),
      readFileInput(materialData.normalFile),
    ]).then(([texture, normal]) => {
      const resolvedMaterialData = {
        name: materialData.name,
        texture,
        normal
      }
      this.items.push(resolvedMaterialData)
      this.render()
    })
  }

  upHandler = ({detail: index}) => {
    index = parseInt(index)

    if(index-1 > -1) {
      this.items = swapArrayElements(this.items, index, index-1)
      this.render()
    }
  }

  downHandler = ({detail: index}) => {
    index = parseInt(index)

    if(index+1 < this.items.length) {
      this.items = swapArrayElements(this.items, index, index+1)
      this.render()
    }
  }

  removeHandler = ({detail: index}) => {
    index = parseInt(index)

    this.items = removeFromArray(this.items, index)
    this.render()
  }

  handleApply = (event) => {
    event.preventDefault()
    console.log(event.target.elements)
  }

  render() {
    console.log(this.items)
    this.innerHTML = `
      <form>
        <ul class="material-list">
          ${
            this.items.map((item, index) => `
              <material-list-item
                item-index="${index}"
                name="${item.name}"
                texture="${item.texture}"
                normal="${item.normal}"
              ></material-list-item>
            `).join('\n')
          }
          <button class="apply-button mt-16">Apply to scene</button>  
        </ul>
      </form>
    `

    const listEl = this.querySelector('.material-list')
    const applyButton = this.querySelector('form')

    listEl.addEventListener('up', this.upHandler)
    listEl.addEventListener('down', this.downHandler)
    listEl.addEventListener('remove', this.removeHandler)
    applyButton.addEventListener('submit', this.handleApply)
  }
}

customElements.define('material-list', MaterialList);