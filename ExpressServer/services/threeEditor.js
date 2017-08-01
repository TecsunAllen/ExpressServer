/**
 * Created by admin on 2016/9/18.
 */
window.onload = function(){
    init();
    threeScene.beforeRender();
    threeScene.renderer.render(threeScene.scene,ThreeWorld.camera);
    requestAnimationFrame(function(){
        threeScene.threeObjects.forEach(function(mesh){
            if(mesh.geometry.type=="Geometry")mesh.rotation.x+=0.01;
        });
        requestAnimationFrame(arguments.callee);
        threeScene.renderer.render(threeScene.scene,ThreeWorld.camera);
    });
}





function init(){
    var socket = io('http://localhost:3000');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
    window.addEventListener('resize', onWindowResize, false);
    document.body.style.height = innerHeight+"px";
    window.threeScene = new ThreeWorld.ThreeScene('3d');
    threeScene.init({
        sceneWidth:$("#viewArea").width(),
        sceneHeight:$("#viewArea").height(),
        target:$("#viewArea")
    });
    ThreeWorld.camera.position.z=2252;
    window.oncontextmenu=function(e){
        e.preventDefault();
    }
    window.onselect =function(e){
        e.preventDefault();
    }
    setTimeout(function(){
        var geometryMenuItems = [];
        for ( var p in ThreeWorld.geometryFactory ){
            geometryMenuItems.push(p);
        }
        geometryMenu.setState(({ menuItem: geometryMenuItems }))

        var materialMenuItems = [];
        for ( var p in ThreeWorld.materialFactory ){
            materialMenuItems.push(p);
        }
        materialMenu.setState(({ menuItem: materialMenuItems }))



        var lightMenuItems = [];
        for ( var p in ThreeWorld.lightFactory ){
            lightMenuItems.push(p);
        }
        lightMenu.setState(({ menuItem: lightMenuItems }))


    },200);
    $("#menuSwitch").click(function(){
        $("#toolContainer").attr("viewState") == "show"?$("#toolContainer").css("left",-500):$("#toolContainer").css("left",0);
        $("#toolContainer").attr("viewState") == "show"?$("#toolContainer").attr("viewState","hide"):$("#toolContainer").attr("viewState","show");
    });
    ThreeWorld.setControl(threeScene.renderer);
    initLights();
    initMeshes();
}

function initLights(){
    //点光源
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.angle = Math.PI/2;
    spotLight.position.set(0, 0,500);
    threeScene.lightObjects.push(spotLight);

    //环境光
    var AmbientLight = new THREE.AmbientLight( 0x006600 ); // soft white light
    threeScene.lightObjects.push(AmbientLight);
}
function initMeshes(){

    //平面
    var texture = new THREE.TextureLoader().load( '/images/sky.jpg' );
    texture.minFilter=THREE.NearestFilter;
    //texture.minFilter=THREE.LinearFilter;
    var textureMaterial = new THREE.MeshPhongMaterial( {
        //map:texture
    });
    var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1920, 1080), textureMaterial);
    threeScene.threeObjects.push(plane);

    //精灵
    var geometry = new THREE.Geometry();
    var spriteTexture = new THREE.TextureLoader().load( "/images/snowflake.png" );
    spriteTexture.minFilter=THREE.NearestFilter;
    var material = new THREE.PointsMaterial({
        size: 32,
        map: spriteTexture,
        opacity:1,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent : true
    });

    var ballGeometry = new THREE.SphereGeometry( 200, 32, 32 );
    var textArr = ThreeWorld.TextArr("冷冷",4);
    var shapeArr = textArr;
    var points = ThreeWorld.getPointCloud(shapeArr,material);
    points.forEach(function(point){
        threeScene.threeObjects.push(point);
    });



}

function onWindowResize() {
    ThreeWorld.camera.aspect = $("#viewArea").width() / $("#viewArea").height();
    ThreeWorld.camera.updateProjectionMatrix();
    threeScene.renderer.setSize($("#viewArea").width(), $("#viewArea").height());
    document.body.style.height = innerHeight+"px";
}