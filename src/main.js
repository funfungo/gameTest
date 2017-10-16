var THREE = require('./three.min');

var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0,
};
var scene, camera, aspectRatio, HEIGHT, WIDTH, renderer, container;
var canvas = document.getElementById('myCanvas');
function createScene() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    camera = new THREE.PerspectiveCamera(60, aspectRatio, 1, 10000);

    camera.position.x = 10;
    camera.position.y = 10;
    camera.position.z = 100;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

//        container = document.getElementById('myCanvas');
//        container.appendChild(renderer.domElement);
}

function handleWindowResize() {
    // update height and width of the renderer and the camera
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

var Sea = function(){
    // create the geometry (shape) of the cylinder;
    // the parameters are:
    // radius top, radius bottom, height, number of segments on the radius, number of segments vertically
    var geom = new THREE.CylinderGeometry(600,600,800,40,10);

    // rotate the geometry on the x axis
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

    // create the material
    var mat = new THREE.MeshPhongMaterial({
        color:Colors.blue,
        transparent:true,
        opacity:.6,
        shading:THREE.FlatShading,
    });

    // To create an object in Three.js, we have to create a mesh
    // which is a combination of a geometry and some material
    this.mesh = new THREE.Mesh(geom, mat);

    // Allow the sea to receive shadows
    this.mesh.receiveShadow = true;
}

// Instantiate the sea and add it to the scene:

var sea;

function createSea(){
    sea = new Sea();

    // push it a little bit at the bottom of the scene
    sea.mesh.position.y = -600;

    // add the mesh of the sea to the scene
    scene.add(sea.mesh);
}

var hemisphereLight, shadowLight;
function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;
    // to activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

function createCube() {
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    var material = new THREE.MeshPhongMaterial( {color: Colors.blue} );
    var cube = new THREE.Mesh( geometry, material );
//        cube.position.y = 100;
//        cube.position.z = -100;
    scene.add( cube );
}

function loop(){
    // Rotate the propeller, the sea and the sky
//        airplane.propeller.rotation.x += 0.3;
//        sea.mesh.rotation.z += .005;
//        sky.mesh.rotation.z += .01;
    // render the scene
    renderer.render(scene, camera);
    // call the loop function again
    requestAnimationFrame(loop);
}
function init() {
    createScene();
    createLights();
    createSea();
    createCube();
    loop();
}
init();
