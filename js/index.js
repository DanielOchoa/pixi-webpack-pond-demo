// import styles
import '../styles/index.css';

import Pixi from 'pixi.js';
import addFish from './steps/add-fish';
import addWaves from './steps/add-waves';

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
const { fishArray, fishBounds } = addFish({viewWidth, viewHeight, stage, renderer});
// add waves
const {waves, filter} = addWaves({viewWidth, viewHeight, stage});

// finally animate;
animate();


function animate() {
  requestAnimationFrame(animate);

  // animate waves
  waves.tilePosition.x += -1;
  waves.tilePosition.y += -1;

  // make fish move
  fishArray.forEach(fish => {
    fish.direction += fish.turningSpeed * 0.01;
    fish.position.x += Math.sin(fish.direction) * fish.speed;
    fish.position.y += Math.cos(fish.direction) * fish.speed;
    fish.rotation = -fish.direction - Math.PI / 2;

    // test their bounds
    if (fish.position.x < fishBounds.x) {
      fish.position.x += fishBounds.width;
    } else if (fish.position.x > fishBounds.x + fishBounds.width) {
      fish.position.x -= fishBounds.width;
    }

    if (fish.position.y < fishBounds.y) {
      fish.position.y += fishBounds.height;
    } else if (fish.position.y > fishBounds.y + fishBounds.height) {
      fish.position.y -= fishBounds.height;
    }
  });

  renderer.render(stage);
}
