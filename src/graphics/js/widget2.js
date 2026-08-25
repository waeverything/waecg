import * as THREE from 'three';
import { gsap } from 'gsap';

const rotationSeconds = 8;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight, -1000, 1000);

const material = new THREE.MeshStandardMaterial({
  color: 0x374151
});
const cube = new THREE.Mesh(new THREE.BoxGeometry(900, 300, 300), material);
cube.position.set(0, 0, 0);
scene.add(cube);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(0, 10, 10);
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);

const ambient = new THREE.AmbientLight(0xffffff, .5);
scene.add(ambient);

const textCanvas = document.createElement('canvas');
textCanvas.width = 512;
textCanvas.height = 128;

const ctx = textCanvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.font = '48px Arial';
ctx.fillText('Hello', 20, 70);

const canvasTexture = new THREE.CanvasTexture(textCanvas);
const canvasMaterial = new THREE.MeshBasicMaterial({
  map: canvasTexture,
  transparent: true
});

const text = new THREE.Mesh(
  new THREE.PlaneGeometry(400, 100),
  canvasMaterial
);
text.position.set(0, 0, 151);

cube.add(text);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

rotateCube();


function changeText(text) {

}

function rotateCube() {
  gsap.to(cube.rotation, {
    x: cube.rotation.x + Math.PI * 2,
    duration: rotationSeconds,
    ease: "power2.inOut",
    onUpdate: () => {
      renderer.render(scene, camera);
    }
  });
}

function positionFromCorner(object, corner, x, y) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  switch (corner) {
    case 'top-left':
      object.position.set(x, y, 0);
      break;

    case 'top-right':
      object.position.set(width - x, y, 0);
      break;

    case 'bottom-left':
      object.position.set(x, height - y, 0);
      break;

    case 'bottom-right':
      object.position.set(width - x, height - y, 0);
      break;
  }
}
