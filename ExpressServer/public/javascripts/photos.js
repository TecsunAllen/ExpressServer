function Sphere() {
    var radius = 0;
    var position = { x: 0, y: 0 };
    var moveDirection = { x: 0, y: 0 };
    var color = "";
    var element = null;
    this.set = function (_radius, _position, _color, _moveDirection){
        radius = _radius;
        position = _position;
        color = _color;
        moveDirection = _moveDirection;
        this.asyncElement();
    }
    this.setRadius = function (_radius) {
        radius = _radius;
        this.asyncElement();
    }
    this.setPosition = function (_position){
        position = _position;
        this.asyncElement();
    }
    this.setColor = function (_color){
        color = _color;
        this.asyncElement();
    }
    this.setMoveDirection = function (_moveDirection) {
        moveDirection = _moveDirection;
    }
    this.asyncElement = function () {
        if(!element)element = $("<div class='sphere'>");
        element.css("width", radius * 2 + "px");
        element.css("background-color", color);
        element.css("left", position.x + "px");
        element.css("top", position.y + "px");
        return element;
    }
}




var spheresWall = (function () {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var radius = 10;
    var spheres = [];
    function createSpheres(target, num) {
        console.time("createSpheres");
        var sphresArray = [];
        var containerDiv = $("<div>");
        for (var i = 0; i < num; i++) {
            var sphere = new Sphere();
            var randomColor = "#" + parseInt((0xFFFFFF * Math.random()).toFixed(0)).toString(16).toUpperCase();
            var randomLeft = screenWidth * Math.random();
            var randomTop = screenHeight * Math.random();
            sphere.set(radius, {x: randomLeft,y:randomTop}, randomColor);
            containerDiv.append(sphere.asyncElement());
            spheres.push(sphere);
        }
        $(target).append(containerDiv);
        console.timeEnd("createSpheres");
    }

    return {
        init: function (container){
            createSpheres(container, 300);
        },
        run: function (){

        }
    }
})();

spheresWall.init(document.getElementById("container"));
