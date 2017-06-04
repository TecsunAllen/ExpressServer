define(['test'], function () {
    var imageEvents = (function () {
        var count = 0;
        var callback = {};
        var currentImage = null;
        return {
            onload: function (ev) {
                $(currentImage).parent().show();
                $(currentImage).parent().css("animation", "flyIn .5s 1 alternate");
                count++;
                setTimeout(callback, 500);
            },
            onerror: function (ev) {

            },
            getCount: function () { return count; },
            setCurrImage: function (img) { currentImage = img; },
            setCallback:function(cb){ callback = cb;}
        }
    })();
    var config = {data:null,target:null};
    function setConfig(data) {
        config.data = data.data;
        config.target = data.target;
    }

    function run() {
        generatePhotoDivs(config.data, config.target);
    }

    function generatePhotoDivs(photoArr, target) {
        var photoNum = photoArr.length;
        for (var i = 0; i < photoNum; i++) {
            //getSinglePhotoInfo(response.result[i][0]);
            generateSinglePhotoDiv(photoArr[i], $(target), i);
        }
        startShowPhotos(target);
    }

    function generateSinglePhotoDiv(photoPaths, target, index) {
        var domString = "<div style='display:none;'>";
        domString += "<img thumbnailsrc ='" + photoPaths[2] + "' realSrc='" + photoPaths[1] + "'></img>";
        domString += "</div>";
        $(target).append(domString);
    }

    function startShowPhotos(target) {
        if (!target) target = config.target;
        var images = $(target).parent().find("img");
        var count = imageEvents.getCount();
        imageEvents.setCallback(arguments.callee);
        if (count <= images.length) {
            imageEvents.setCurrImage(images[count]);
            images[count].src = images[count].attributes.thumbnailsrc.value;
            images[count].onload = imageEvents.onload;
            images[count].onerror = imageEvents.onerror;        
        }
    }

    
    function getSinglePhotoInfo(filePath) {
        $.ajax({
            url: "/Home/getSinglePhotoInfo?filePath=" + filePath,
            success: function (response) {
                if (response.success) {

                }
            },
            error: function () {

            }
        });
    }

    function generateTable(data, id) {
        var htmlStr = "<div>";
        for (var attribut in data) {
            if (!data[attribut].DisplayValue) continue;
            htmlStr += "<div><div class='attributTitle'>" + (data[attribut].Name || attribut) + "</div>";
            htmlStr += "<div class='attributValue'>" + data[attribut].DisplayValue + "</div><div style='clear:both;'></div></div>";
        }
        htmlStr += "</div>";
        $("#" + id).append(htmlStr);
    }

    return { setConfig: setConfig, run: run };
});