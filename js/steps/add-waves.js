import Pixi from 'pixi.js';

export default function addWaves({viewWidth, viewHeight, stage}) {
  let waveTexture = Pixi.Texture.fromImage('assets/waves.png');
  let wavesTilingSprite = new Pixi.extras.TilingSprite(
    waveTexture, viewWidth, viewHeight
  );
  wavesTilingSprite.alpha = 0.2;
  stage.addChild(wavesTilingSprite);

  // create wave texture
  let waveDisplacementSprite = Pixi.Sprite.fromImage('assets/displacementMap.jpg');
  let displacementFilter = new Pixi.filters.DisplacementFilter(waveDisplacementSprite);
  // configure filter
  // what if we have more filters?
  stage.filters = [displacementFilter];
}
