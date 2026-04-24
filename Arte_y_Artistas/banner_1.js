import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//-----------------------------------------------------------

const contenedor = document.getElementById('ban_1');
const w = contenedor.clientWidth;
const h = contenedor.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera
  (
    60,
    w / h,
    0.1,
    100
  );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

contenedor.appendChild(renderer.domElement);

const loader = new GLTFLoader();

let mesa;
let busto;

loader.load('mesa.glb', (gltf) => {
  mesa = gltf.scene;
  scene.add(mesa);

  // posición inicial
  mesa.position.set(0, 0, 0);
  mesa.scale.set(3, 3, 3);
  mesa.traverse((child) => {
    if (child.isMesh) {
      child.receiveShadow = true;
      child.castShadow = true;
    }
  });

});



loader.load('busto.glb', (gltf) => {
  busto = gltf.scene;
  scene.add(busto);

  // posición inicial
  busto.position.set(0, 2.9, 0);
  busto.scale.set(3, 3, 3);

  busto.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

});

const caja = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.BackSide }))

scene.add(caja);
caja.position.set(0, 3, 4)

caja.receiveShadow = true;
camera.position.set(0, 4, 3);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);
ambientLight.intensity = 0.05;

const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(0, 3, 3);
scene.add(dirLight);
dirLight.castShadow=true;


//---------------------------------------------------

scene.background = new THREE.Color(0x454444);
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.target.set(0, 3, 0);

//limites de los orbits

controls.minDistance = 2.5;
controls.maxDistance = 3.8;

controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2.1;

controls.minAzimuthAngle = -Math.PI / 3;
controls.maxAzimuthAngle = Math.PI / 3;

controls.enablePan = false;

//----------------------------------------------------------

function animate() {

  requestAnimationFrame(animate);
  controls.update();
  camera.lookAt(0, 4, 0)
  renderer.render(scene, camera);


}

animate();