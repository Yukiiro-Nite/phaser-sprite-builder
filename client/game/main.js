document.body.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = event.target.name;
  if(name === 'light') {
    applyLight(getLight(event))
  } else {
    applyMaterial(name, getMaterialList(event))
  }
})

const getLight = (event) => {
  return {
    tint: event.target.querySelector('.tint').value
  }
}

const getMaterialList = (event) => {
  return Array.from(event.target.querySelectorAll(".material-list li"))
    .map(listEl => ({
      visibility: listEl.querySelector('.visibility').checked,
      texture: listEl.querySelector('.texture-img').src,
      normal: listEl.querySelector('.normal-img').src,
      tint: listEl.querySelector('.tint').value
    }))
}

const applyLight = (light) => {
  console.log(light)
}

const applyMaterial = (name, materialList) => {
  console.log(name, materialList)
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  parent: 'game',
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 }
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};


const game = new Phaser.Game(config);

function preload() {

}

function create() {

}

function update() {

}