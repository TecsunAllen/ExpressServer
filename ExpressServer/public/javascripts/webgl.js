
define(['wavLoader'],function(wavLoader){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.z = window.innerHeight/2;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("threeContainer").appendChild( renderer.domElement );



    var geometry = new THREE.SphereGeometry(5,5,10);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    var mesh = new THREE.Mesh(geometry,material)
    var meshes = [];
    for ( i = 0; i < 5000; i ++ ) {
        var vertex = new THREE.Vector3();
        var  newMesh = mesh.clone();
        newMesh.position.x = Math.random() * 2000 - 1000;
        newMesh.position.y = Math.random() * 2000 - 1000;
        newMesh.position.z = 0;
        scene.add(newMesh);
        meshes.push(newMesh);
    }

    var Soundtrack = [];
    function render() {
        try {
            console.time("渲染");

            var wave = parseInt(wavLoader.getCurWave());
            var color = 0xffff00 * Math.random();
            if (Math.abs(wave % 2) != 1)wave -= 1;
            Soundtrack.push([wavLoader.currentTime * 5,wave]);

            for(var i =0;i<meshes.length;i++){
                meshes[i].position.z = Math.pow( wave*0.25,2);
            }

            /*var startRow = (sphereWallHeight - 1) / 2 - wave;
            var endRow = (sphereWallHeight - 1) / 2 + wave;
            var startColumn = (sphereWallWidth - 1) / 2 - wave;
            var endColumn = (sphereWallWidth - 1) / 2 + wave;

            for (var i = startRow; i < endRow; i++) {
                for (var j = startColumn; j < endColumn; j++) {

                }
            }*/

            renderer.render(scene, camera);
            drawSoundtrack();
            console.timeEnd("渲染");
            requestAnimationFrame(render);
        }
        catch (e){
            console.log(e);
            requestAnimationFrame(render);
        }
    }
    render();
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
    var soundtrackCanvasHeight = window.innerHeight/3;
    $("#Soundtrack").attr("width",window.innerWidth).attr("height",soundtrackCanvasHeight);
    var halfSoundtrackCanvasHeight = soundtrackCanvasHeight/2;
    var ctx=$("#Soundtrack")[0].getContext("2d");
    function drawSoundtrack(){
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="red"; // 红色路径
        ctx.moveTo(0,halfSoundtrackCanvasHeight);
        for(var i =0;i<Soundtrack.length;i++){
            ctx.lineTo(Soundtrack[i][0],halfSoundtrackCanvasHeight - Soundtrack[i][1]);
        }
        ctx.stroke(); // 进行绘制
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


    wavLoader.load("test.wav");
    wavLoader.play();

    (function(renderer) {
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 100;
        controls.maxDistance = 7500;

        var stats = new Stats();
        document.body.appendChild( stats.dom );
    }(renderer));

    function getCurWave() {
        if (typeof clock == "undefined") return;
        var index = Math.floor((clock.getElapsedTime() * meteData.bytesPerSecond) / 2);
        if (index % 2 != 0) index = index + 1;
        return meteData.waveData[index];
    }



})