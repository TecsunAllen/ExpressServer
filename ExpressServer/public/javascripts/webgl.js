
define(['wavLoader'], function (wavLoader) {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 10000 );
    var renderer = new THREE.WebGLRenderer();
    var meshes = [];
    var Soundtrack = [];
    var lastWave = {
        time: 0,
        value:0
    };
    initScene();
    createMeshes();
    setOrbitControls();
    render();


    wavLoader.load("test.wav");
    wavLoader.play();

    function initScene() {
        var soundtrackCanvasHeight = window.innerHeight / 3;
        camera.position.z = window.innerHeight / 2;
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("threeContainer").appendChild(renderer.domElement);
        $("#Soundtrack").attr("width", window.innerWidth).attr("height", soundtrackCanvasHeight);
    }

    function createMeshes() {
        var geometry = new THREE.SphereGeometry(5, 5, 10);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var mesh = new THREE.Mesh(geometry, material);
        for (i = 0; i < 5000; i++) {
            var vertex = new THREE.Vector3();
            var newMesh = mesh.clone();
            newMesh.position.x = Math.random() * 2000 - 1000;
            newMesh.position.y = Math.random() * 2000 - 1000;
            newMesh.position.z = 0;
            scene.add(newMesh);
            meshes.push(newMesh);
        }
    }

    function refreshMeshes() {
        var wave = getWave().value;
        var color = 0xffff00 * Math.random();
        if (Math.abs(wave % 2) != 1) wave -= 1;
        Soundtrack.push([wavLoader.currentTime * 5, wave]);
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].position.z = Math.pow(wave * 0.25, 2);
        }
    }

    function getWave() {
        var curTime = (new Date()).getTime();
        var realWave = parseInt(wavLoader.getCurWave());
        var modeWave = lastWave.value + (lastWave.time - curTime) * 0.01;
        if (modeWave < realWave) modeWave = realWave;
        lastWave.value = modeWave;
        lastWave.time = curTime;
        return lastWave;
    }

    function drawSoundtrack() {
        var SoundtrackElement = document.getElementById("Soundtrack");
        var ctx = SoundtrackElement.getContext("2d");
        var halfSoundtrackCanvasHeight = SoundtrackElement.height / 2;
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red"; // 红色路径
        ctx.moveTo(0, halfSoundtrackCanvasHeight);
        for (var i = 0; i < Soundtrack.length; i++) {
            ctx.lineTo(Soundtrack[i][0], halfSoundtrackCanvasHeight - Soundtrack[i][1]);
        }
        ctx.stroke(); // 进行绘制
    }

    function createSphereWall(widthLen,heightLen,radius){
        if(widthLen%2 != 1 || heightLen%2 != 1)return;
        var geometry = new THREE.BoxGeometry( radius, radius, radius);
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        var sphere = new THREE.Mesh( geometry, material );
        var spheres=[];

        for(var i = 0;i<widthLen;i++) {
            for (var j = 0; j < heightLen; j++) {
                var temSphere = sphere.clone();
                temSphere.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                temSphere.position.x = (i-(widthLen-1)/2)*radius*1.8 ;
                temSphere.position.y = (j-(heightLen-1)/2)*radius*1.8;
                spheres.push(temSphere);
            }
        }
        return spheres;
    }

    function setOrbitControls() {
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 100;
        controls.maxDistance = 7500;

        var stats = new Stats();
        document.body.appendChild(stats.dom);
    }

    function render() {
        try {
            console.time("渲染");
            refreshMeshes();
            renderer.render(scene, camera);
            drawSoundtrack();
            console.timeEnd("渲染");
            //requestAnimationFrame(render);
        }
        catch (e) {
            console.log(e);
            //requestAnimationFrame(render);
        }
    }


    window.onresize =  function() {
        camera.aspect = $("#threeContainer").width() / $("#threeContainer").height();
        camera.updateProjectionMatrix();
        renderer.setSize($("#threeContainer").width(), $("#threeContainer").height());
        document.body.style.height = innerHeight+"px";
        soundtrackCanvasHeight = window.innerHeight/3;
        $("#Soundtrack").attr("width",window.innerWidth).attr("height",soundtrackCanvasHeight);
        halfSoundtrackCanvasHeight = soundtrackCanvasHeight/2;
    }
})