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

const applyLight = (lightInfo) => {
  light.setColor(chroma(lightInfo.tint).num())
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
let player, cursors, layer, light;

function preload() {
  this.load.image('tiles', [ 'assets/tilesets/default_texture.png','assets/tilesets/default_texture_u.png' ]);

  this.load.tilemapTiledJSON({
    key: 'map',
    url: 'assets/tilemaps/map.json'
  });

  this.load.spritesheet('player', 'assets/sprites/spaceman.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
  const map = this.make.tilemap({ key: 'map' });
  const tiles = map.addTilesetImage('default', 'tiles');
  const layer = map.createDynamicLayer(0, tiles, 0, 0);
  light  = this.lights.addLight(192, 192, 128);
  light.setIntensity(2);
  light.setColor(0xf2e2c1)
  this.lights.enable().setAmbientColor(0x222222);

  layer.setPipeline('Light2D');
  
  map.setCollision(1)

  player = this.physics.add.sprite(192, 192, 'player', 0);

  this.physics.add.collider(player, layer);

  this.cameras.main.startFollow(player);
  
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown)
  {
      player.body.setVelocityX(-100);
  }
  else if (cursors.right.isDown)
  {
      player.body.setVelocityX(100);
  }

  // Vertical movement
  if (cursors.up.isDown)
  {
      player.body.setVelocityY(-100);
  }
  else if (cursors.down.isDown)
  {
      player.body.setVelocityY(100);
  }

  light.x = player.x;
  light.y = player.y;
}