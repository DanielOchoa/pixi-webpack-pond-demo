// import styles
import '../styles/index.css';

import Pixi from 'pixi.js';

// renderer
const [viewWidth, viewHeight] = [630, 410];
const renderer = new Pixi.WebGLRenderer(viewWidth, viewHeight);
renderer.view.className = 'rendererView';

document.body.appendChild(renderer.view);

// container
const stage = new Pixi.Container();

const pondFloorTexture = new Pixi.Texture.fromImage('assets/pondFloor.jpg');

const pondFloorSprite = new Pixi.extras.TilingSprite(
  pondFloorTexture,
  window.innerWidth,
  window.innerHeight
);
stage.addChild(pondFloorSprite);

// add fish
addFish();

// finally animate;
animate();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}

function addFish() {
  let total = 20;
  let fishArray = [];

  for (let i = 0; i < total; i++) {
    let fishId = i % 4;
    fishId += 1;

    let imagePath = `assets/fish${fishId}.png`;

    let fishTexture = new Pixi.Texture.fromImage(imagePath);
    let fishSprite = new Pixi.Sprite(fishTexture);

    fishSprite.anchor.x   = fishSprite.anchor.y = 0.5;
    fishSprite.scale.x    = fishSprite.scale.y = 0.5 + Math.random() * 0.3;
    fishSprite.position.x = Math.random() * viewWidth;
    fishSprite.position.y = Math.random() * viewHeight;
    //create random dir in radians
    // number between 0 and pi*2 which is eq = 0 - 360degrees
    fishSprite.rotation = Math.random() * Math.PI * 2;

    // no. to modify the fish direction over time
    fishSprite.turningSpeed = Math.random() - 0.8;

    // create a random speed for the fish between 0 - 2
    fishSprite.speed = 2 + Math.random() * 2;
    // finally we push the fish into the fish array (return fish)

    stage.addChild(fishSprite);
    fishArray.push(fishSprite);
  };

  const fishBoundsPadding = 100;
  const fishBounds = new PIXI.Rectangle(
    fishBoundsPadding,
    -fishBoundsPadding,
    viewWidth + fishBoundsPadding * 2,
    viewHeight + fishBoundsPadding * 2
  );

}
