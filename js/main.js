import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -1)
scene.add(cube);

camera.position.z = 10;

// brick
let brickSetting = false;
let brickGo = false;
export function bricksAnima(){}
let brickJava;
let brickJS;
let brickHTML;
let brickCSS;



//rocket
let rocketSetting = false;
let rocketToGo = false;
export function GoRocket() {rocketToGo = true}

let rocketObject;

const loader = new GLTFLoader();
loader.load('models/rocket.gltf', function (gltf) {
  rocketObject = gltf.scene;
  scene.add(rocketObject);
  rocketObject.traverse(function (event) {
  });
}, undefined, function (error) {
  console.error(error);
});

function rocketSetSetting() {
  try {
    rocketObject.rotation.set(0.0, 0, 0);
    rocketSetting = true;
  } catch (exception) {
    rocketSetting = false;
  }
}

function rocketGo() {
  console.log(rocketObject.position)
  if (rocketObject.position.x !== 6) {
    rocketObject.position.x += (rocketObject.position.x > 6 ) ? -0.1 : 0.1;
  }
  if (rocketObject.position.y !== 6) {
    rocketObject.position.y += (rocketObject.position.y > 6) ? -0.1 : 0.1;
  }
  if (rocketObject.position.y >= 5 &&
    rocketObject.position.y <= 7 &&
    rocketObject.position.x >= 5 &&
    rocketObject.position.x <= 7)
    rocketToGo = false;
}

// rocket end
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  if (rocketObject) {
    if (!rocketSetting) {
      rocketSetSetting();
    }
    if (rocketToGo) {
      rocketGo();
    }
    rocketObject.rotation.x += 0.01;
    rocketObject.rotation.y -= 0.0;
    rocketObject.rotation.z -= 0.01;
  }
  renderer.render(scene, camera);
}

animate();
