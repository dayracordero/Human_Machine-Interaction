import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//-----------------------------------------------------------

function createScene(containerId, imageURL) {

  const contenedor = document.getElementById(containerId);
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


  camera.position.set(0, 0, 4);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);

  contenedor.appendChild(renderer.domElement);

  // luz
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  // textura
  const texture = new THREE.TextureLoader().load(imageURL);
  texture.colorSpace = THREE.SRGBColorSpace;

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 3),
    new THREE.MeshStandardMaterial({ map: texture })
  );

  scene.add(plane);
  //----------------------------------------------------
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.minDistance = 1;
  controls.maxDistance = 3.8;

  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 2;

  controls.minAzimuthAngle = -Math.PI / 3;
  controls.maxAzimuthAngle = Math.PI / 3;


  //----------------------------------------------------

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

createScene("card_1", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/330px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg");
createScene("card_2", "https://cdn.pixabay.com/photo/2015/12/15/05/43/starry-night-1093721_960_720.jpg");
createScene("card_3", "https://cdn.pixabay.com/photo/2016/12/20/19/12/the-last-supper-1921290_1280.jpg");
createScene("card_4", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAISyBvGnSlIeh2NRLVDHOVRGrRIKuLTQxfQ&s");