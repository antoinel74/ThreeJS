import "../style.css";
import * as THREE from "three";

window.canvas = document.getElementById("canvas");
window.canvas.width = innerWidth;
window.canvas.height = innerHeight;
window.iw = innerWidth;
window.ih = innerHeight;

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(90, window.iw / window.ih);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const texture = new THREE.TextureLoader().load("assets/earth.jpg");
const material = new THREE.MeshPhongMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);

const light = new THREE.PointLight(0xeeeeee);

scene.add(mesh);
scene.add(light);

camera.position.set(0, 0, 2);
light.position.set(0, 0, 2);

const renderer = new THREE.WebGLRenderer({ canvas });
updateSize();
window.addEventListener("resize", updateSize);

function updateSize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  window.canvas.width = newWidth;
  window.canvas.height = newHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
}

function move() {
  requestAnimationFrame(move);
  mesh.rotation.y += 0.001;
  mesh.rotation.x += 0.001;
  renderer.render(scene, camera);
}

move();
