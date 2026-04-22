import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//------------------------------------------------------

const contenedor= document.getElementById('info');
const w = contenedor.clientWidth;
const h = contenedor.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera
(
  60,
  w/h,
  0.1,
  100
);


const renderer = new THREE.WebGLRenderer ({antialias: true});
renderer.setSize(w, h);

contenedor.appendChild(renderer.domElement);

//--------------------------------------------------------
const particulas_g = new THREE.BufferGeometry();
const cant_particulas = 2000;

const posiciones = [];

for (let i = 0; i < cant_particulas; i++) {
  posiciones.push(
    (Math.random() - 0.5) * 20,
    Math.random() * 20,
    (Math.random() - 0.5) * 20
  );
}


particulas_g.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(posiciones, 3)
);

const  m_particulas= new THREE.PointsMaterial({
  color: 0xC73B20,
  size: 0.05,
  fog:true,
});

const particulas = new THREE.Points(particulas_g, m_particulas);
scene.add(particulas);

const positions = particulas_g.attributes.position;



scene.background = new THREE.Color(0xffffff);




//---------------------------------------------------

const Ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(Ambientlight);
camera.position.set(0,0,5);

const dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);
dl.position.set(2,3,5)

//----------------------------------------------------

function animate() {

   requestAnimationFrame(animate); 
   renderer.render(scene, camera);
   const time = performance.now() * 0.001;

   for (let i = 0; i < positions.count; i++) {
    const i3 = i * 3;

    positions.array[i3 + 1] += Math.sin(time + i) * 0.002;
   } 
   
   positions.needsUpdate = true;
   
}

animate();