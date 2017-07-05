var React = require('react');
var threeWorld =require('../ThreeWorld.js');
var ProductBox = React.createClass({
    getInitialState: () => {
        return {};
    },
    handleClick: () => {

    },
    componentDidMount: () => {
        var self = this;
        var canvas = this.refs._3Dcanvas;
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
                <div>
                    {items}
                    <canvas ref='_3Dcanvas'></canvas>
                </div>
        )
    }
});
module.exports = ProductBox;