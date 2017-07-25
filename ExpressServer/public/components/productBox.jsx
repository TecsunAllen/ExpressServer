var React = require('react');
var threeWorld =require('../ThreeWorld.js');
var ProductBox = React.createClass({
    getInitialState: function () {
        return {};
    },
    handleClick: function () {

    },
    componentDidMount: function(){
        var self = this;
        var canvas = this.refs._3Dcanvas;
        canvas.width = $(canvas).parent().width();
        canvas.height = $(canvas).parent().height();
        $.ajax({
            url: "http://localhost:3000/getFolders?folderPath=" + this.props.folder,
            type: "GET",
            success: function (data) {


            },
            error: function (data) {
            }
        });

    },
    componentDidUpdate: function () {

    },
    renderCanvas: function () {

    },
    render: function () {
        var items = [];
        for (var i = 0; i < 10; i++) {
            items.push((<div key={i}>
                <img />
            </div>));
        }
        return (
                <div style={{ height: "100%" }}>
                    <canvas ref='_3Dcanvas'></canvas>
                </div>
        )
    }
});
module.exports = ProductBox;