 imagePs = (function () {
    var mainContainer = $("#container");
    var containerWidth = mainContainer.width();
    var containerHeight = mainContainer.height();
    var mainCanvas = $("#mainCanvas");
    var img;
    var cxt;
    var historyStep = [];
    mainCanvas = $("<canvas id='mainCanvas' width=" + containerWidth + " height=" + containerHeight + ">");
    overlayCanvas = $("<canvas id='overlayCanvas' style='position: absolute;left: 0;top: 0;' width=" + containerWidth + " height=" + containerHeight + ">");
    cxt = mainCanvas.get(0).getContext("2d");
    mainContainer.append(mainCanvas);
    mainContainer.append(overlayCanvas);
    overlayCanvas.bind("dblclick", function () {
        $("#file").click();
    });
    $("#file").bind("change", function (ev) {
        var file = this.files[0];
        var reader = new FileReader(file);
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            img = new Image()
            img.src = this.result;
            cxt.drawImage(img, 0, 0);
        }
    });
    
    function applyAction(option){
        switch (option.type) {
            case "invert":
                invert();
        }
		historyStep.push(option);
    }

    function invert(){
        var imageData = cxt.getImageData(0,0,cxt.canvas.width,cxt.canvas.height);
		console.time("invert");
		var data = imageData.data;
		for(var i=0;i<data.length;i++){
			if(i%4 != 0) continue;
            var val = (data[i] + data[i+1]+data[i+2])/3;
            data[i] = val;
            data[i+1] = val;
            data[i+2] = val;
		}
		console.timeEnd("invert");
        cxt.putImageData(imageData,0,0);

    }

    $("#invertColor").bind("click", function (ev) {
        var option ={type:"invert"};
        applyAction(option);
    });
    
    
    overlayCanvas.bind("mousedown mousemove mouseup dblclick", function (ev) {
        cutTool.run(ev);
    })
    function AdaptiveUI() {
        var containerWidth = mainContainer.width();
        var containerHeight = mainContainer.height();
        var scale = containerWidth < img.width? containerWidth / img.width:1;
        mainCanvas.attr("width", containerWidth).attr("height", containerHeight);
        cxt.scale(scale, scale);
        cxt.drawImage(img, 0, 0);
    }
    return {
        AdaptiveUI: AdaptiveUI
    }
})();
window.onresize = imagePs.AdaptiveUI;





var cutTool = (function () {
    var canvas;
    var startPos;
    var endPos;
    function mousedown(ev) {
        canvas = ev.target;
        startPos = { x: ev.offsetX, y: ev.offsetY };
    }
    function mousemove(ev) {
        if(!startPos)return;
        if(ev.offsetX>startPos.x&&ev.offsetY>startPos.y){
            endPos = { x: ev.offsetX, y: ev.offsetY };
            drawRect();
        }
    }
    
    function mouseup(ev) {
        startPos=null;
        endPos = null;
    }


    function drawRect(){
        if(!startPos || !endPos)return;
        var cxt=canvas.getContext("2d"); 
        cxt.clearRect(0,0,canvas.width,canvas.height);
        cxt.fillStyle="rgba(0,0,0,0.5)";
        cxt.strokeRect(startPos.x, startPos.y, endPos.x - startPos.x, endPos.y - startPos.y);
    }

    var event = {
        mousedown : mousedown,
        mousemove : mousemove,
        mouseup : mouseup
    }
    return {
        run : function (ev) {
            event[ev.type]?event[ev.type].call(this, ev):null;
        }
    }
})();
