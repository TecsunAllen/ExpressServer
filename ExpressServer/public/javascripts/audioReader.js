
function WavReader(byteArray) {
    this.buffer = byteArray;
    this.offset = 0;
    this.read_string = function (len) {
        var s = "";
        var end = this.offset + len;
        for (var i = this.offset; i < end; ++i) {
            s += String.fromCharCode(this.buffer[i]);
        }
        this.offset += len;
        return s;
    };
    
    this.read_number = function (length) {
        var it = this.offset + length - 1;
        var n = 0;
        for (; it >= this.offset; --it) {
            n = n * 256 + this.buffer[it];
        }
        this.offset += length;
        return n;
    };
    
    this.read_array = function (len) {
        return this.buffer.slice(this.offset, this.offset + len);
        this.offset += len;
    }


}

var xhr = new XMLHttpRequest();
xhr.open('GET', "test.wav", true);
xhr.responseType = 'arraybuffer';
xhr.send();
xhr.onprogress = function (ev) {
}
xhr.onload = function (ev) {
    var data = xhr.response;
    var byteArray = new Uint8Array(data);
    var wavReader = new WavReader(byteArray);
    
    window.meteData = {};
    
    meteData.ChunkID = wavReader.read_string(4); //4byte,资源交换文件标志:RIFF     
    meteData.ChunkSize = wavReader.read_number(4);//4byte,从下个地址到文件结尾的总字节数   
    meteData.Format = wavReader.read_string(4);//4byte,wav文件标志:WAVE     
    
    meteData.formatType = wavReader.read_string(4);//4byte,波形文件标志:FMT(最后一位空格符) 
    meteData.formatSize = wavReader.read_number(4);//4byte,音频属性
    meteData.compressionCode = wavReader.read_number(2);//2byte,格式种类(1-线性pcm-WAVE_FORMAT_PCM,WAVEFORMAT_ADPCM)  
    
    meteData.NumChannels = wavReader.read_number(2);//2byte,通道数  
    meteData.SampleRate = wavReader.read_number(4); //4byte,采样率  
    meteData.bytesPerSecond = wavReader.read_number(4);//4byte,传输速率  
    
    meteData.BlockAlign = wavReader.read_number(2); //2byte,数据块的对齐，即DATA数据块长度 
    meteData.BitsPerSample = wavReader.read_number(2);//2byte,采样精度-PCM位宽  
    
    meteData.Subchunk2ID = wavReader.read_string(4);//4byte,数据标志:data  
    meteData.Subchunk2Size = wavReader.read_number(4); //4byte,从下个地址到文件结尾的总字节数，即除了wav header以外的pcm data length  
    meteData.info = wavReader.read_string(meteData.Subchunk2Size);
    
    
    meteData.waveDataTitle = wavReader.read_string(4);
    meteData.waveDataLength = wavReader.read_number(4);
    meteData.waveData = wavReader.read_array(meteData.waveDataLength);
    //var subdscnum = wavReader.read_number(4);
    //var sss = wavReader.read_string(subdscnum);
    meteData.formatSize == 16 ? meteData.waveData = new Int16Array(meteData.waveData.buffer) : meteData.waveData = new Int8Array(meteData.waveData.buffer);
    meteData.time = Math.floor(meteData.waveData.length * 2 / meteData.bytesPerSecond);
    $("body").append($("<video src='test.wav' autoplay controls>"));
    window.clock = new THREE.Clock();
    clock.start();
}


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
var meshes = [];

for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 4; j++) {
        var curMesh = mesh.clone();
        curMesh.position.x = Math.sqrt(2) * Math.cos(Math.PI / 4 + Math.PI * j / 2) * (5 + 10 * (i + 1));
        curMesh.position.y = Math.sqrt(2) * Math.sin(Math.PI / 4 + Math.PI * j / 2) * (5 + 10 * (i + 1));
        scene.add(curMesh);
    }
}

var light = new THREE.AmbientLight(0xff0000, 1);
scene.add(mesh);
scene.add(light);

$("body").append(renderer.domElement)

function getCurWave() {
    if (typeof clock == "undefined") return;
    var index = Math.floor((clock.getElapsedTime() * meteData.bytesPerSecond) / 2);
    if (index % 2 != 0) index = index + 1;
    return meteData.waveData[index];
}

function render() {
    //mesh.scale.x = getCurWave() / 50000;
    
    renderer.render(scene, camera);
    requestAnimationFrame(arguments.callee)
}

requestAnimationFrame(render);