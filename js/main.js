import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

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

//shape loader
const loader = new GLTFLoader();


// brick
let brickSetting = false;
let brickGo = false;
let brickGoBack = false;
let brickList = [];
let brickPositionStart = [[-5,-1], [-5,-1], [-5,-1], [-5,-1], [-5,-1], [-5.4,-1], [-5.4,-1], [-5.4,-1], [-5.4,-1]]
let brickPositionEnd = [[0,0], [0,0], [0,0], [0,0], [0,0], [0.4,0], [0.4,0], [0.4,0], [0.4,0]]
let brickPositionTrue = [false, false, false, false, false, false, false, false, false]
let brickJava;
let brickPython;
let brickHTML;
let brickCSS;
let brickSQL;
let brickAL;
let brickGIT;
let brickJS;
let brickPS;

export function bricksAnima() {
  console.log("AAA")
  brickGo = true
}
export function bricksAnimaBack() {
  trueCount = 0;
  console.log("BBB")
  brickGoBack = true
}
export function brickChosen(list){
  console.log(list);
}
export function brickSetupPosition() {
  trueCount = 0;
  for (let i = 0; i < brickPositionEnd.length; i++) {
  brickList[i].position.y = brickPositionStart[i][0];
  brickPositionTrue[i] = false;
  }
}
let trueCount = 0;
function brickAnimationPlayReverse() {
  for (let i = 0; i < brickPositionEnd.length; i++) {
    if (brickPositionTrue[i]) {
      console.log(brickList[i]);
      brickList[i].position.y += (brickList[i].position.y > brickPositionStart[i][0]) ? -0.05 : 0.05;
      if (brickList[i].position.y > brickPositionStart[i][0] - 0.2 && brickList[i].position.y < brickPositionStart[i][0] + 0.2) {
        trueCount++;
        brickPositionTrue[i] = false;
      }
    }

  }
  if (trueCount===9){
    console.log("false")
    brickGoBack = false;
  }

}

function brickAnimationPlay() {
  for (let i = 0; i < brickPositionEnd.length; i++) {
    if (!brickPositionTrue[i]) {
      console.log(brickList[i]);
      brickList[i].position.y += (brickList[i].position.y > brickPositionEnd[i][0]) ? -0.05 : 0.05;
      if (brickList[i].position.y > brickPositionEnd[i][0] - 0.2 && brickList[i].position.y < brickPositionEnd[i][0] + 0.2) {
        console.log("trueCount")
        trueCount++;
        brickPositionTrue[i] = true;
      }
    }
  }
  if (trueCount===9){
    console.log("false")
    brickGo = false;
  }
}

function setupBrick() {
  //ps
  loader.load('models/bricks/brick_ps.gltf',
    function (gltf) {
      brickPS = gltf.scene;
      brickList[8] = brickPS;
      scene.add(brickList[8]);
      brickPS.position.y = brickPositionStart[0];
      brickPS.position.x = 0;
    }, undefined,
    function (e) {
      console.log(e)
    });
  //js
  loader.load('models/bricks/brick_js.gltf',
    function (gltf) {
      brickJS = gltf.scene;
      brickList[7] = brickJS;
      scene.add(brickList[7]);
      brickJS.position.y = brickPositionStart[1];
      brickJS.position.x = -3;
    }, undefined,
    function (e) {
      console.log(e)
    });
  //git
  loader.load('models/bricks/brick_git.gltf',
    function (gltf) {
      brickGIT = gltf.scene;
      brickList[6] = brickGIT;
      scene.add(brickList[6]);
      brickGIT.position.y = brickPositionStart[2];
      brickGIT.position.x = -2;
    }, undefined,
    function (e) {
      console.log(e)
    });
  //algorithms
  loader.load('models/bricks/brick_algorithms.gltf',
    function (gltf) {
      brickAL = gltf.scene
      brickList[5] = brickAL;
      scene.add(brickList[5]);
      brickAL.position.x = -1;
      brickAL.position.y = brickPositionStart[3];
    }, undefined,
    function (e) {
      console.log(e)
    });
  //sql
  loader.load('models/bricks/brick_sql.gltf',
    function (gltf) {
      brickSQL = gltf.scene;
      brickList[4] = brickSQL;
      scene.add(brickList[4]);
      brickSQL.position.x = -1;
      brickSQL.position.y = brickPositionStart[4];

    }, undefined,
    function (e) {
      console.log(e)
    });
  //html
  loader.load('models/bricks/brick_html.gltf',
    function (gltf) {
      brickHTML = gltf.scene;
      brickList[3] = brickHTML;
      scene.add(brickList[3]);
      brickHTML.position.x = 0;
      brickHTML.position.y = brickPositionStart[5];
    },
    undefined,
    function (e) {
      console.log(e)
    });
  //css
  loader.load('models//bricks/brick_css.gltf',
    function (gltf) {
      brickCSS = gltf.scene;
      brickList[2] = brickCSS;
      scene.add(brickList[2]);
      brickCSS.position.x = -2;
      brickCSS.position.y = brickPositionStart[6];
    },
    undefined,
    function (e) {
      console.log(e)
    });
  //python
  loader.load('models/bricks/brick_python.gltf',
    function (gltf) {
      brickPython = gltf.scene;
      brickList[1] = brickPython;
      scene.add(brickList[1]);
      brickPython.position.x = 2;
      brickPython.position.y = brickPositionStart[7];

    },
    undefined,
    function (e) {
      console.log(e)
    });
  //java
  loader.load('models/bricks/brick_java.gltf',
    function (gltf) {
      brickJava = gltf.scene;
      brickList[0] = brickJava;
      scene.add(brickList[0]);
      brickJava.position.x = 1;
      brickJava.position.y = brickPositionStart[8];
    },
    undefined,
    function (e) {
      console.log(e)
    });
  brickSetting = true;

}

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
  if (!brickSetting) {
    setupBrick();
  }
  if (brickGo) {
    brickAnimationPlay();
  }
  if (brickGoBack) {
    brickAnimationPlayReverse();
  }
  if (rocketObject) {
    if (!rocketSetting) {
      rocketSetSetting();
    }
    if (rocketToGo) {
      rocketGo();
    }

  }
  requestAnimationFrame(animate);
  renderer.render(scene,camera)
}
animate();

window.addEventListener('resize', function (){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})
