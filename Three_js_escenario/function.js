import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//------------------------------------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera
  (
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//----------------------------------------------------------
//Generalidades 

scene.background = new THREE.Color(0x050510);

//const grid = new THREE.GridHelper (50,50);
//scene.add (grid);

//const axesHelper = new THREE.AxesHelper(5); 
//scene.add(axesHelper);

//rojo x   verde y   azul z

//-----------------------------------------------------------

//Geometrias


//-------------------------------------------------------------

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 16),
  new THREE.MeshStandardMaterial({ color: 0x3B3226 }));
sphere.position.set(0, 8, -10);
scene.add(sphere);



const c_3 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 0.8, 2.6),
  new THREE.MeshStandardMaterial({ color: 0x3B3226 }));

c_3.position.set(0, 1.3, -10);
scene.add(c_3);

const c_4 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.4, 0.4, 1),
  new THREE.MeshStandardMaterial({ color: 0x3B3226 }));

c_4.position.set(0, 3.1, -10);
scene.add(c_4);

//-----------------------------------------------
//Arbustos


function creararbusto() {

  const geometry_r = new THREE.IcosahedronGeometry(4, 6); // base triangular, más subdivisiones = más suave
  const material_r = new THREE.MeshStandardMaterial({
    color: 0x555555,
    roughness: 1,
    metalness: 0,
  });

  const pos = geometry_r.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const distance = Math.sqrt(x * x + y * y + z * z);
    const noise = (Math.random() - 0.5) * (0.5 + distance * 0.3); // protuberancias naturales
    pos.setXYZ(i, x, y, z + noise);
  }

  geometry_r.computeVertexNormals();

  return new THREE.Mesh(geometry_r, material_r);
}


const arb1 = creararbusto();
arb1.position.set(12, 2, 0);
scene.add(arb1);

const arb2 = creararbusto();
arb2.scale.set(1.5, 1.5, 1.5);
arb2.position.set(12, 2, -5);
scene.add(arb2);

const arb3 = creararbusto();
arb3.scale.set(1.5, 1, 1);
arb3.position.set(-12, 2, 5);
scene.add(arb3);

const arb4 = creararbusto();
arb4.scale.set(0.8, 0.8, 0.8);
arb4.position.set(-12, 2, 10);
scene.add(arb4);
//--------------------------------------------------



class OrganicFlatCurve extends THREE.Curve {
  constructor() {
    super();
  }
  getPoint(t) {
    // Curva con movimientos en X e Y, pero sin movimiento en Z (plano XY)
    const x = 5 * Math.sin(t * Math.PI * 3 * 0.4);  // ondulación horizontal
    const y = 10 * t  // subida con ondulación vertical
    const z = 0; // plano sin profundidad
    return new THREE.Vector3(x, y, z);
  }
}


const segments = 64;
const path = new OrganicFlatCurve();
const geometry = new THREE.TubeGeometry(path, segments, 0.4, 16, false);
const material = new THREE.MeshStandardMaterial({ color: 0x3B3226 });
const tube = new THREE.Mesh(geometry, material);
scene.add(tube);
tube.position.set(0, 3.5, -10);

const position = geometry.attributes.position;
for (let i = 0; i < position.count; i++) {
  const segmentIndex = Math.floor(i / 16); // 16 vértices por segmento
  const t = segmentIndex / segments;

  // Función de radio tipo “campana”: mínimo al inicio y al final, máximo en medio
  const scale = 0.4 + 0.4 * Math.sin(Math.PI * t); // varía de 0.1 a 0.5

  const x = position.getX(i);
  const y = position.getY(i);
  const z = position.getZ(i);

  // Escalamos radialmente (x, z) pero no en y
  position.setXYZ(i, x * scale, y, z * scale);
}


//-----------------------------------------------------------------------
//farol

const b_3_farol = new THREE.Mesh(
  new THREE.CylinderGeometry(0.4, 0.4, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x2A3342 }));

b_3_farol.position.set(-10, 7, -10);
scene.add(b_3_farol);

const b_2_farol = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x2A3342 }));

b_2_farol.position.set(-10, 0.5, -10);
scene.add(b_2_farol);

const b_1_farol = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 0.8, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x2A3342 }));

b_1_farol.position.set(-10, 0.3, -10);
scene.add(b_1_farol);

const farol = new THREE.Mesh(
  new THREE.CylinderGeometry(0.1, 0.1, 15),
  new THREE.MeshStandardMaterial({ color: 0x2A3342 }));

farol.position.set(-10, 7, -10);
scene.add(farol);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x2A3342 }));

cube.position.set(-10, 7, 15);


const material_luz = new THREE.MeshStandardMaterial({
  color: 0x222222,
  emissive: 0xFFEFA6,
  emissiveIntensity: 2

});

const luz_farol = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material_luz)
scene.add(luz_farol);
luz_farol.position.set(-10, 15, -10);


//piso 

var plano = new THREE.PlaneGeometry(30, 30, 32, 32);
var plano_material = new THREE.MeshStandardMaterial({ color: 0x080F0A });
var plane = new THREE.Mesh(plano, plano_material);
plane.receiveShadow = true;
plane.position.set(0, 0.2, 0);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);


//escenairo caja 


const geometry_c = new THREE.BoxGeometry(30, 20, 30);

const loader_text = new THREE.TextureLoader();
const texturafondo = loader_text.load('gruta musgosa.webp');

const materiales = [

  new THREE.MeshStandardMaterial({ color: 0x091A12, side: THREE.BackSide }), // derecha
  new THREE.MeshStandardMaterial({ color: 0x091A12, side: THREE.BackSide }), // izquierda
  new THREE.MeshStandardMaterial({ color: 0x091A12, side: THREE.BackSide }), // techo
  new THREE.MeshStandardMaterial({ color: 0x080F0A, side: THREE.BackSide }), // piso


  new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0,
    side: THREE.BackSide
  }),

  new THREE.MeshStandardMaterial({ map: texturafondo, side: THREE.BackSide }) // atrás
];


const room = new THREE.Mesh(geometry_c, materiales);
room.position.set(0, 10, 0);
scene.add(room);

//----------------------------------------------------------
//config camara

camera.position.z = 25;
camera.position.y = 10;
camera.position.x = 0;
camera.lookAt(0, 0, 0);


//-------------------------------------------
//Luces


var light = new THREE.DirectionalLight(0xffffff, 1, 10)
light.position.set(0, 15, 10);
light.castShadow = true;
scene.add(light);

//const helper = new THREE.DirectionalLightHelper(light);
//scene.add(helper);



//luces ambientales 

const lightBlue = new THREE.PointLight(0x00ffff, 2, 20);
lightBlue.position.set(5, 5, 5);
scene.add(lightBlue);

const lightPurple = new THREE.PointLight(0xaa00ff, 2, 20);
lightPurple.position.set(-5, 4, -3);
scene.add(lightPurple);

const lightGreen = new THREE.PointLight(0x00ff88, 2, 20);
lightGreen.position.set(0, 3, 8);
scene.add(lightGreen);

const sunLight = new THREE.DirectionalLight(0x88ff99, 5); // intensidad alta

//farol
const farolluz = new THREE.PointLight(0x00ffff, 5, 50);
farolluz.position.set(-10, 15, -10);
scene.add(farolluz);

// MUY lejos atrás
sunLight.position.set(0, 10, -10);

// hacia dónde apunta (el centro de tu escena)
sunLight.target.position.set(0, 0, 0);

scene.add(sunLight);
scene.add(sunLight.target);

const ambient = new THREE.AmbientLight(0x66ff99, 3);
scene.add(ambient);

//------------------------------------------------
scene.fog = new THREE.Fog(0x0a1a2a, 10, 60);


//------------------------------------------------------
//orbit controls 


const controls = new OrbitControls(camera, renderer.domElement);


controls.update();

//-----------------------------------------------------
//Horny



const loader = new GLTFLoader();

let hornet;

loader.load('hornet.glb', (gltf) => {
  hornet = gltf.scene;
  scene.add(hornet);

  // posición inicial
  hornet.position.set(0, 2, 0);
  hornet.scale.set(0.01, 0.01, 0.01); // ajusta si es necesario

});
//---------------------------
const particulas_g = new THREE.BufferGeometry();
const cant_particulas = 200;

const posiciones = [];

for (let i = 0; i < cant_particulas; i++) {
  posiciones.push(
    (Math.random() - 0.5) * 30,
    Math.random() * 20,
    (Math.random() - 0.5) * 30
  );
}
//organiza en subarray

particulas_g.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(posiciones, 3)
);

const m_particulas = new THREE.PointsMaterial({
  color: 0x88ffff,
  size: 0.1,
  fog: true,
});

const particulas = new THREE.Points(particulas_g, m_particulas);
scene.add(particulas);

const positions = particulas_g.attributes.position;
//--------------------------------------------------------
function animate() {

  requestAnimationFrame(animate);
  renderer.shadowMap.enabled = true;
  //particulas.geometry.attributes.position
  controls.update();

  const time = performance.now() * 0.001;

  for (let i = 0; i < positions.count; i++) {
    const i3 = i * 3;

    positions.array[i3 + 1] += Math.sin(time + i) * 0.003;
  }
  positions.needsUpdate = true;

  renderer.render(scene, camera);


}

animate();