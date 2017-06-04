
var renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(300);
var scene = new THREE.Scene();
var geometry = new THREE.CubeGeometry(10, 10, 10);
var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    Color: 0xffffff
}))
scene.add(mesh);


var light = new THREE.AmbientLight(0xff0000, 1);
scene.add(mesh);
scene.add(light);

$("body").append(renderer.domElement)

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(arguments.callee)
}

requestAnimationFrame(render);