var React = require('react');
var threeWorld =require('../ThreeWorld.js');
var ProductBox = React.createClass({
    getInitialState: () => {
        return {};
    },
    handleClick: () => {

    },
    componentDidMount: function(){
        var self = this;
        var canvas = this.refs._3Dcanvas;
        canvas.width = $(canvas).parent().width();
        canvas.height = $(canvas).parent().height();

    },
    componentDidUpdate: () => {

    },
    renderCanvas: () => {

    },
    render: () => {
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