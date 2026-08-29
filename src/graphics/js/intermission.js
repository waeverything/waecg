import Two from "two.js"

const blockSvg = new URL("../assets/bar-6-units-default.svg", import.meta.url);

const density = 20;
const speed = 0.5;
const sizeMin = 1;
const sizeMax = 3;
const minOpacity = 0.25;

// The width of the block svg
const blockWidth = 142;

const params = {
  width: "100vw",
  height: "100vh",
};
const two = new Two(params).appendTo(document.body);

populate();
two.bind("update", update);
two.play();

function spawnBlock(x) {
  const scale = Math.random() * (sizeMax - 1) + sizeMin;
  const sprite = two.makeSprite(
    blockSvg.href,
    x + (blockWidth / 2) * scale,
    Math.random() * window.innerHeight
  );
  sprite.scale = scale;
  sprite.opacity = Math.random() + minOpacity;
}

function populate() {
  const windowWidth = window.innerWidth;
  for (let i = 0; i < density; i++) {
    spawnBlock(Math.random() * windowWidth);
  }
}

function update(_frameCount) {
  const children = two.scene.children;

  if (children.length < density) {
    spawnBlock(window.innerWidth);
  }

  two.scene.children.forEach((child) => {
    child.position.x -= child.scale * speed;
    if (child.position.x <= (-child.width / 2) * child.scale) {
      child.remove();
    }
  });
}
