// 
// Kitchen model
// 

const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);
const OBJLoader = require('three-obj-loader')(THREE);
const MTLLoader = require('three-mtl-loader');

const [ W, H ] = [ window.innerWidth, window.innerHeight ];

// Scene
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize( W, H );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );
const scene = new THREE.Scene();

// Cameras
const camera = new THREE.PerspectiveCamera( 45, W/H, 1, 1000 );
camera.position.set( -100, 80, -45 );
camera.zoom = 25;
camera.updateProjectionMatrix();
scene.add(camera);

// orbit controls
const controls = new OrbitControls( camera );

// Lighting
const light1 = new THREE.AmbientLight( 0x404040 );
const light2 = new THREE.DirectionalLight( 0xffffff, 0.8 );
light2.position.set( 6, 5, 2 );
scene.add(light1);
scene.add(light2);

// load model and material
const model = require('../model/kitchen.obj');
const materials = require('../model/materials.mtl');
const mtlLoader = new MTLLoader();
mtlLoader.load( materials, ( materials ) => {
  materials.preload();
  const objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.load( model, ( object ) => {
    // object.position.y = - 95;
    scene.add( object );
  });
});

// Init
const init = () => {
  requestAnimationFrame(init);
  renderer.render( scene, camera );
  controls.update();
}
init();

// Resize
const resize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  console.log('resized');
}

window.addEventListener( 'resize', resize );