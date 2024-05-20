import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js'
import {EffectComposer} from "three/addons/postprocessing/EffectComposer.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(2);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const  pointLight = new THREE.PointLight( 0xffffff, 1, 100 );

renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -1)
scene.add(cube);

camera.position.z = 4;
camera.position.y = 1;
camera.aspect = 2;

//postprocessing
const renderScene = new RenderPass(scene,camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
const unrealBloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth,window.innerHeight),
  1.6,
  1,
  0.01
);
composer.addPass(unrealBloom);

//shape loader
const loader = new GLTFLoader();

//rocket
let rocketSetting = false;
let rocketToGo = false;

export function GoRocket() {
  rocketToGo = true
}

let rocketObject = new THREE.Object3D();
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
    rocketObject.position.x += (rocketObject.position.x > 6) ? -0.1 : 0.1;
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
rocketObject.layers.disableAll();
camera.layers.enableAll();

// rocket end

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  if (rocketObject) {
    if (!rocketSetting) {
      rocketSetSetting();
    }
    if (rocketToGo) {
      rocketGo();
    }

  }
  requestAnimationFrame(animate);
  // renderer.render(scene,camera)
  composer.render();
}
animate();

window.addEventListener('resize', function (){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})
