
var socket = (function () {
    var imageSrcs = [];
    var socket = io.connect("http://127.0.0.1:3000");
    socket.on('connected', function (data) {
        console.log(data.message);
    });
    socket.on('postImagesToClient', function (data) {
        data.imageSrcs.forEach(function (url) {
            imageSrcs.push(url);
        });
        if (data.hrefs.length > 0) {
            data.hrefs.forEach(function (url) {
                socket.emit('getChildrenUrls', { hostUrl: url });
            })
        }
    });
    return socket;
})()

var events = (function (socket) {
    $("#getImageButton").click(function () {
        socket.emit('getChildrenUrls', {hostUrl:"http://www.baidu.com"});
    });
})(socket);