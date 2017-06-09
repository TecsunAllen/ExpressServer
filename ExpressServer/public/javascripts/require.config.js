/**
 * Created by admin on 2017/5/30.
 */
require.config({
    baseUrl : "javascripts",
    paths:{
        "webgl": "webgl.min",
        "wavLoader": "wavLoader.min"
    }
});
require(["webgl"]);