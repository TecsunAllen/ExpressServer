window.onerror = function (sMsg, sUrl, sLine) {
    var str = "<b>An error was thrown and caught.</b><p>";
    str += "Error: " + sMsg + "<br>";
    str += "Line: " + sLine + "<br>";
    str += "URL: " + sUrl + "<br>";
    console.log(str);
}
var video = (function () {  
    var promisifiedOldGUM = function (constraints) {     
        // 第一个拿到getUserMedia，如果存在
        var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
        
        // 有些浏览器只是不实现它-返回一个不被拒绝的承诺与一个错误保持一致的接口
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser-getUserMedia是不是在这个浏览器实现'));
        }      
        // 否则，调用包在一个旧navigator.getusermedia承诺
        return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    }  
    // 旧的浏览器可能无法实现mediadevices可言，所以我们设置一个空的对象第一
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    // 一些浏览器部分实现mediadevices。我们不能只指定一个对象
    // 随着它将覆盖现有的性能getUserMedia。.
    // 在这里，我们就要错过添加getUserMedia财产。.     
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
    }
    
    function Video() {
        this.video = null;
        this.videoConstraints = {
            audio: true,
            video: {
                width: 1280,
                height: 720
            }
        };
        this.startPlay = function () {
            navigator.mediaDevices.getUserMedia(this.videoConstraints).then(function (stream) {
                video.video = document.querySelector('video');
                video.video.src = window.URL.createObjectURL(stream);
                video.video.onloadedmetadata = function (e) {
                    video.video.play();
                };
            }).catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
        }
        
        
        this.getScreenshot = function () {
            $("canvas").remove();
            var canvas = $("<canvas width=" + this.video.clientWidth + " height=" + this.video.clientHeight + ">")[0];
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this.video, 0, 0);
            return canvas.toDataURL("image/jpeg", 0.3);
        }
        
        this.putImage = function (data) {
            var image = $("#serverPutImage")[0];
            image.src = data;
        }
    }
    
    var video = new Video();
    video.startPlay();
    return video;
})();

var socket = (function (video){
    var socket = io.connect(isHost?'http://127.0.0.1:3000':"maomin.asia");
    socket.on('connected', function (data) {
        console.log(data.message);
    }); 
    socket.on('postImageToClient', function (data) {
        video.putImage(data.imageData);
    });     
    setInterval(function () {
        if (isHost) {
            socket.emit('postImageToServer', {
                imageData: video.getScreenshot(),
            });
        }
    }, 3000);
    return socket;
})(video)

var events = (function (video, socket) {
    $("#getImageButton").click(function () {
        $("#myModal").modal("show");
        $("#serverPutImage").attr("src", "");
        socket.emit('getImageFromServer', {});
    });
})(video, socket);