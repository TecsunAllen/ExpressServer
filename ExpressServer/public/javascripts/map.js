document.querySelector("#container").style.height = innerHeight + "px";
var map = new AMap.Map('container',{
    resizeEnable: true,
    zoom: 10,
    center: [116.480983, 40.0958]
});