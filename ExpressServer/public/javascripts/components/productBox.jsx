var React = require('react');
var ProductBox = React.createClass({
    getInitialState: function () {
        return { };
    },
    handleClick: function (event) {

    },
    componentDidMount: function () {
        var canvas = this.refs._3Dcanvas;
    },
    componentDidUpdate:function(){

    },
    renderCanvas: function () {
       
    },
    render: function () {
        return (
                <div>
                    <canvas ref='_3Dcanvas' onClick={this.handleClick}></canvas>
                </div>
        )
    }
});
module.exports = ProductBox;