import Pixi from 'pixi.js';

export default function addFish(options) {

  let {stage, viewWidth, viewHeight, renderer} = options;

  let total = 20;
  let fishArray = [];

  for (let i = 0; i < total; i++) {
    let fishId = i % 4;
    fishId += 1;

    let imagePath = `assets/fish${fishId}.png`;

    let fishTexture = new Pixi.Texture.fromImage(imagePath);
    let fishSprite = new Pixi.Sprite(fishTexture);

    // center anchor on sprite on x, y (set puts both for arg)
    fishSprite.anchor.set(0.5);

    // random scale for x, y.
    fishSprite.scale.set(0.5 + Math.random() * 0.3);

    // random position!
    fishSprite.position.x = Math.random() * viewWidth;
    fishSprite.position.y = Math.random() * viewHeight;

    //create random dir in radians
    // number between 0 and pi*2 which is eq = 0 - 360degrees
    fishSprite.rotation = Math.random() * Math.PI * 2;

    // CUSTOM PROP
    // no. to modify the fish direction over time
    fishSprite.turningSpeed = Math.random() - 0.8;

    // CUSTOM PROP
    // keep track of direction like this
    fishSprite.direction = Math.random() * Math.PI * 2;

    // create a random speed for the fish between 0 - 2
    fishSprite.speed = 2 + Math.random() * 2;
    // finally we push the fish into the fish array (return fish)

    stage.addChild(fishSprite);
    fishArray.push(fishSprite);
  };

  // create a bounding box for the fix
  const fishBoundsPadding = 100;
  const fishBounds = new Pixi.Rectangle(
    -fishBoundsPadding,
    -fishBoundsPadding,
    renderer.width + fishBoundsPadding * 2,
    renderer.height + fishBoundsPadding * 2
  );

  return { fishArray, fishBounds };
}


