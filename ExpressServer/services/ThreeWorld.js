/**
 * Created by admin on 2016/9/24.
 */
var ThreeWorld = {};
if ( typeof define === 'function' && define.amd ) {
    define( 'threeWorld', ThreeWorld );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {
    module.exports = ThreeWorld;

}
/*定义类构造函数*/
ThreeWorld.ThreeScene = function(mode){
    this.sceneWidth = 0;
    this.sceneHeight = 0;
    this.scene = new THREE.Scene({ antialias: false });
    this.renderer = (mode == '3d' ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer());
    this.threeObjects = [];
    this.lightObjects = [];
}
ThreeWorld.camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500);
/* 初始化函数 */
ThreeWorld.ThreeScene.prototype.init = function(config){
    if(config.sceneWidth && config.sceneHeight){
        this.sceneWidth = config.sceneWidth;
        this.sceneHeight = config.sceneHeight;
        this.renderer.setSize( this.sceneWidth, this.sceneHeight);
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        ThreeWorld.camera.aspect = this.sceneWidth/this.sceneHeight;
        ThreeWorld.camera.updateProjectionMatrix();
        $(config.target).append( this.renderer.domElement );
        this.renderer.setClearColor(0x000000);
        this.renderer.setPixelRatio(window.devicePixelRatio);

    }
}


ThreeWorld.ThreeScene.prototype.ThreeObject=function(){
    this.geometry = null;
    this.material = null;
    this.shape = null;
    this.constructShape = function(){
        this.shape = new THREE.Mesh( this.geometry, this.material );
        this.scene.add(this.shape);
        return  this.shape;
    }
}

ThreeWorld.ThreeScene.prototype.beforeRender = function(){
    for(var i=0;i<this.threeObjects.length;i++){
        this.scene.add(this.threeObjects[i]);
    }
    for(var i=0;i<this.lightObjects.length;i++){
        this.scene.add(this.lightObjects[i]);
        this.lightObjects[i].target ? this.scene.add(this.lightObjects[i].target):null;
    }
}



$(function(){
    /*window.onmousewheel=function(ev){
        var ZStep = ThreeWorld.camera.position.z/10;
        ev.deltaY>0 ? ThreeWorld.camera.position.z+=ZStep:ThreeWorld.camera.position.z-=ZStep;
    }*/
})

ThreeWorld.geometryFactory = {
    BoxBufferGeometry:{englishName:'BoxBufferGeometry',chineseName:'立方体B'},//立方体
    BoxGeometry:{englishName:'BoxGeometry',chineseName:'立方体B'},
    CircleBufferGeometry:{englishName:'CircleBufferGeometry',chineseName:'圆平面'},//圆平面
    CircleGeometry:{englishName:'CircleGeometry',chineseName:'圆平面B'},
    ConeBufferGeometry:{englishName:'ConeBufferGeometry',chineseName:'圆锥体'},//圆锥体
    ConeGeometry:{englishName:'ConeGeometry',chineseName:'圆锥体B'},
    CylinderBufferGeometry:{englishName:'CylinderBufferGeometry',chineseName:'圆柱体'},//圆柱体
    CylinderGeometry:{englishName:'CylinderGeometry',chineseName:'圆柱体B'},
    DodecahedronGeometry:{englishName:'DodecahedronGeometry',chineseName:'十二面体'},//十二面体
    ExtrudeGeometry:{englishName:'ExtrudeGeometry',chineseName:'Extrude'},//基于几何体的变形体
    IcosahedronGeometry:{englishName:'IcosahedronGeometry',chineseName:'二十面体'},//二十面体
    LatheBufferGeometry:{englishName:'LatheBufferGeometry',chineseName:'莱斯体'},//莱斯体
    LatheGeometry:{englishName:'LatheGeometry',chineseName:'立方体B'},
    OctahedronGeometry:{englishName:'OctahedronGeometry',chineseName:'八面体'},//八面体
    ParametricGeometry:{englishName:'ParametricGeometry',chineseName:'Parametric'},//Parametric
    PlaneBufferGeometry:{englishName:'PlaneBufferGeometry',chineseName:'平面'},//平面
    PlaneGeometry:{englishName:'PlaneGeometry',chineseName:'平面B'},
    PolyhedronGeometry:{englishName:'PolyhedronGeometry',chineseName:'多面体'},//多面体
    RingBufferGeometry:{englishName:'RingBufferGeometry',chineseName:'指环B'},//指环
    RingGeometry:{englishName:'RingGeometry',chineseName:'指环'},
    ShapeGeometry:{englishName:'ShapeGeometry',chineseName:'可变几何体'},//可变几何体
    SphereBufferGeometry:{englishName:'SphereBufferGeometry',chineseName:'球体'},//球体
    SphereGeometry:{englishName:'SphereGeometry',chineseName:'球体B'},
    TetrahedronGeometry:{englishName:'TetrahedronGeometry',chineseName:'四面体'},//四面体
    TextGeometry:{englishName:'TextGeometry',chineseName:'四面体B'},//字体
    TorusBufferGeometry:{englishName:'TorusBufferGeometry',chineseName:'圆环体'},//圆环体
    TorusGeometry:{englishName:'TorusGeometry',chineseName:'圆环体B'},
    TorusKnotBufferGeometry:{englishName:'TorusKnotBufferGeometry',chineseName:'多环体'},//多环体
    TorusKnotGeometry:{englishName:'TorusKnotGeometry',chineseName:'TorusKnot'},
    TubeGeometry:{englishName:'TubeGeometry',chineseName:'Tube'}
}
ThreeWorld.materialFactory={
    LineBasicMaterial:{englishName:'LineBasicMaterial',chineseName:'立方体B'},
    LineDashedMaterial:{englishName:'LineDashedMaterial',chineseName:'立方体B'},
    MeshBasicMaterial:{englishName:'MeshBasicMaterial',chineseName:'立方体B'},
    MeshDepthMaterial:{englishName:'MeshDepthMaterial',chineseName:'立方体B'},
    MeshLambertMaterial:{englishName:'MeshLambertMaterial',chineseName:'立方体B'},
    MeshNormalMaterial:{englishName:'MeshNormalMaterial',chineseName:'立方体B'},
    MeshPhongMaterial:{englishName:'MeshPhongMaterial',chineseName:'立方体B'},
    MeshStandardMaterial:{englishName:'MeshStandardMaterial',chineseName:'立方体B'},
    Material:{englishName:'Material',chineseName:'立方体B'},
    PointsMaterial:{englishName:'PointsMaterial',chineseName:'立方体B'},
    MultiMaterial:{englishName:'MultiMaterial',chineseName:'立方体B'},
    RawShaderMaterial:{englishName:'RawShaderMaterial',chineseName:'立方体B'},
    ShaderMaterial:{englishName:'ShaderMaterial',chineseName:'立方体B'},
    SpriteMaterial:{englishName:'SpriteMaterial',chineseName:'立方体B'}
}
ThreeWorld.lightFactory={
    AmbientLight:{englishName:'AmbientLight',chineseName:'立方体B'},
    DirectionalLight:{englishName:'DirectionalLight',chineseName:'立方体B'},
    DirectionalLightShadow:{englishName:'DirectionalLightShadow',chineseName:'立方体B'},
    HemisphereLight:{englishName:'HemisphereLight',chineseName:'立方体B'},
    Light:{englishName:'Light',chineseName:'立方体B'},
    LightShadow:{englishName:'LightShadow',chineseName:'立方体B'},
    PointLight:{englishName:'PointLight',chineseName:'立方体B'},
    SpotLight:{englishName:'SpotLight',chineseName:'立方体B'},
    SpotLightShadow:{englishName:'SpotLightShadow',chineseName:'立方体B'}
}


ThreeWorld.TextArr = function(text,scale){
    scale?scale:1;
    var textArr = [];
    for(var i=0;i < text.length;i++) {
        var canvas = $("<canvas width='100' height='100''>")[0];
        var ctx = canvas.getContext("2d");
        ctx.font = "83px sans-serif";
        ctx.fillText(text[i], 0, 83);
        var textImageData = ctx.getImageData(0, 0, 100, 100);
        var imageData = textImageData.data;
        for (var j = 0; j < 10000; j++) {
            var index = j * 4;
            if (imageData[index + 3] != 0) {
                var point = {x: ((j % 100 - 50) + i*100)*scale, y: (50 - Math.floor(j / 100)) * scale,z:0};
                if(textArr.length ==0 || (Math.abs(textArr[textArr.length-1].x-point.x)>3 * scale && Math.abs(textArr[textArr.length-1].x-point.x)> 3 * scale))
                textArr.push(point);
            }
        }
    }
    return textArr;
}


ThreeWorld.getPointCloud = function(shapeArr,material){
    var GeometryArray = [];
    for(var i=0;i<shapeArr.length;i++) {
        var newGeometry =  new THREE.Geometry();
        var vertex = new THREE.Vector3();
        vertex.x = shapeArr[i].x;
        vertex.y = shapeArr[i].y;
        vertex.z =shapeArr[i].z;
        newGeometry.vertices.push( vertex );
        var newMesh = new THREE.Points(newGeometry,material);
        GeometryArray.push(newMesh);
    }
    return GeometryArray;
}


// controls
ThreeWorld.setControl=function(renderer) {
    var controls = new THREE.OrbitControls(ThreeWorld.camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 1000;
    controls.maxDistance = 7500;

    stats = new Stats();
    document.body.appendChild( stats.dom );
}





/*
ThreeWorld.prototype.geometryFactory = function(shapeType){
    this.shapeType="";
    this.shape = null;
    switch(shapeType){
        case "cube":
            this.shape = new THREE.BoxGeometry( 1, 1, 1 );
            break;
    }
    return this.shape;
}

ThreeWorld.prototype.materialFactory = function(materialType){
    this.shapeType="";
    this.material = null;
    switch(shapeType){
        case "basic":
            this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );;
            break;
    }
    return this.material;
}*/