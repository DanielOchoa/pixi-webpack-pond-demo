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
const fishArray = addFish({viewWidth, viewHeight, stage});
addWaves({viewWidth, viewHeight, stage});

// finally animate;
animate();

function animate() {
  requestAnimationFrame(animate);

  fishArray.forEach(fish => {
    //fish.rotation += 0.1;
  });

  renderer.render(stage);
}

