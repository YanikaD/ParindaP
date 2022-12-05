import './style.css';
import * as THREE from 'https://unpkg.com/three@0.146.0/build/three.module.js'; 
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight-10);
camera.position.setZ(30);
camera.position.setX(-3); 

renderer.render(scene, camera);

// function onWindowResize() {
//   if (window.innerWidth>1240){
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize( window.innerWidth, window.innerHeight-10 );
//   }
// }
// window.addEventListener('resize',onWindowResize);
// Torus
// const heartShape = new THREE.Shape();

// const x = -2.5;
// const y = -5;
// heartShape.moveTo((x + 2.5)/2, (y + 2.5)/2);
// heartShape.bezierCurveTo((x + 2.5)/2, (y + 2.5)/2, (x + 2)/2, (y)/2, (x)/2, (y)/2);
// heartShape.bezierCurveTo((x - 3)/2, (y)/2, (x - 3)/2, (y + 3.5)/2, (x - 3)/2, (y + 3.5)/2);
// heartShape.bezierCurveTo((x - 3)/2, (y + 5.5)/2, (x - 1.5)/2, (y + 7.7)/2, (x + 2.5)/2, (y + 9.5)/2);
// heartShape.bezierCurveTo((x + 6)/2, (y + 7.7)/2, (x + 8)/2, (y + 4.5)/2, (x + 8)/2, (y + 3.5)/2);
// heartShape.bezierCurveTo((x + 8)/2, (y + 3.5)/2, (x + 8)/2, (y)/2, (x + 5)/2, (y)/2);
// heartShape.bezierCurveTo((x + 3.5)/2, (y)/2, (x + 2.5)/2, (y + 2.5)/2, (x + 2.5)/2, (y + 2.5)/2);
// const extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.5, bevelThickness: 0.5 };

// const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
// const geometry = new THREE.ShapeGeometry(shape, curveSegments);
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 5, 5);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(270));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(600).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('201698ccba4abed5efc67329231d9d64.jpg');
scene.background = spaceTexture;

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}

let sat_pos;
// Instantiate a loader
const jeff = new GLTFLoader().load(
    // resource URL
    '../Satellite/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      const model = gltf.scene;
      scene.add( model);
      let sat = model.getObjectByName('GLTF_SceneRootNode');
      sat.position.y = -6;
      sat.position.x = 2.5;
      sat.position.z = 1;
      sat.rotation.z = 2.3;
      sat.rotation.y = -0.4;
      sat.rotation.x = 1.5;
      // var sat_pos = sat;
    },
    // called while loading is progressing
    function ( xhr ) {

      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened' );

    }
);
console.log(jeff);
// var sat;
//   {
//     const gltfLoader = new GLTFLoader();
//     gltfLoader.load('scene.gltf', (gltf) => {
//       const root = gltf.scene;
//       scene.add(root);
//       sat = root.getObjectByName('GLTF_SceneRootNode');
//       // console.log(sat);
//     });
//   }
// console.log(sat);
// Satellite{
//     const jeff = new GLTFLoader().load('scene.gltf',function ( gltf ) {
//     // gltf.animations; // Array<THREE.AnimationClip>
//     // gltf.scene; // THREE.Group
//     // gltf.scene.scale.set(0.1, 0.1, 0.1); 
//     // gltf.scenes; // Array<THREE.Group>
//     // gltf.cameras; // Array<THREE.Camera>
//     // gltf.asset; // Object
//       const root = gltf.scene;
//       scene.add(root);
//       let sat = root.getObjectByName('GLTF_SceneRootNode');
//     // console.log(dumpObject(gltf.scene).join('\n'));
//     // sat.position.y = -5;
//     // sat.position.x = 4;
//     // sat.position.z = 0;
//     // sat.rotation.z = 6;
//     }); 


// Earth

const earthTexture = new THREE.TextureLoader().load('earth.jpg');
// const normalTexture = new THREE.TextureLoader().load('Earth.png');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 30, 30),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    // normalMap: normalTexture,
  })
);

scene.add(earth);


// sat.position.y = -5;
// sat.position.x = 4;
// sat.position.z = 0;
// sat.rotation.z = 6;

earth.position.z = 10;
earth.position.setX(-window.innerWidth*0.01);


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.025;
  earth.rotation.y += 0.05;
  earth.rotation.z += 0.025;

  // sat.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.x += 0.0025;

  renderer.render(scene, camera);
}

animate();

/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  if(toggle && nav){
      toggle.addEventListener('click', ()=>{
          nav.classList.toggle('show')
      })
  }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
  const scrollY = window.pageYOffset

  sections.forEach(current =>{
      const sectionHeight = current.offsetHeight
      const sectionTop = current.offsetTop - 50;
      var sectionId = current.getAttribute('id')

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
          document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
      }else{
          document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
      }
  })
}
window.addEventListener('scroll', scrollActive)

