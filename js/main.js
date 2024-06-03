import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js'
import {EffectComposer} from "three/addons/postprocessing/EffectComposer.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
camera.position.y = 1;
camera.aspect = 2;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(2);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);

renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -1)
scene.add(cube);

const sf = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({color: 0xff00f0}));
sf.position.set(0, 0, -10)
scene.add(sf);
let listOfBool = [];

console.log(listOfBool);
//postprocessing
const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
const unrealBloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.6,
  1,
  0.01
);
composer.addPass(unrealBloom);
//shape loader
const loader = new GLTFLoader();


let angle = 0;
let radius = 1;
let speed = 0.1;
let sfm = 0.2;
function animate() {
  if (sf.position.z<=-10.2) {
    sfm = -sfm;
  }
  if (sf.position.z>=2.3){
    sfm = -sfm;
  }
  sf.position.z += sfm;
  sf.position.x = -2 + (radius * Math.sin(angle));
  sf.position.y = -2 + (radius * Math.cos(angle));
  angle += speed

  requestAnimationFrame(animate);
  composer.render();
}

animate();

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})
