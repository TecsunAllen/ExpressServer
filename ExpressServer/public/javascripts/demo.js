/**
 * Created by admin on 2016/9/18.
 */
var container, stats;
var camera, scene, renderer;
var spotLight;
var mesh;
var clock = new THREE.Clock();
init();
animate();
clock.start();
function init() {


    container = document.getElementById('container');
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild(renderer.domElement);


    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 100;

    scene = new THREE.Scene();
    //scene.add(new THREE.AmbientLight(0xff0000));
    var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000), new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide }));
    scene.add(plane);

    var light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(10, 1000, 1000);
    light1.castShadow = true;
    //scene.add(light1);


    spotLight = new THREE.SpotLight(0xffffff, 1, 1000, Math.PI / 4, 0.5, 100);
    spotLight.position.set(0, 0, 5);


    scene.add(spotLight.target)

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    spotLight.power = Math.PI;

    scene.add(spotLight);


    //scene.add(new THREE.HemisphereLight(0x0000ff, 0xff0000, 1));


    //创建几何体对象
    //var geometry = new THREE.BufferGeometry();
    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3(-1, -1, 0),
        new THREE.Vector3(1, -1, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(-1, 1, 0)
    );

    //geometry.faces.push(new THREE.Face3(0, 1, 2, new THREE.Vector3(0, 0, 1), new THREE.Color(0xffaa00),0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.computeFaceNormals();
    geometry.computeBoundingSphere();


    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff, specular: 0xffffff, shininess: 250,
        side: THREE.DoubleSide, vertexColors: THREE.VertexColors
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);





    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {

    var time = Date.now() * 0.001;

    spotLight.target.position.x = 10 * Math.sin(time);
    //spotLight.distance += 100;
    //spotLight.position.x = 10 * Math.sin(time);
    renderer.render(scene, camera);

}