(function () {
    var imageHtml = "<img src='/images/rose.png' />";

    function createRosesByNumber(number){
        for (var i = 0; i < number; i++) {
            $("body").append($(imageHtml));
        }
    }

    createRosesByNumber(100);

})();