var GuitarCanvas = React.createClass({
    getInitialState: function() {
        return {
			menuItem:[],
			width:window.innerWidth,
			height:window.innerHeight
		};
    },
    handleClick: function(event) {
        $(this.getDOMNode()).find("div").removeClass("btn-primary");
        if($(event.target).hasClass("btn-primary"))$(event.target).removeClass("btn-primary");
        else $(event.target).addClass("btn-primary");
    },
    render: function() {
        console.log("GuitarCanvas组件开始渲染！数据：");
        return (
            <div className="GuitarCanvasContainer">
				<canvas width={this.state.width} height={this.state.height}></canvas>
            </div>
        )
    }
});
window.geometryMenu = ReactDOM.render(<GuitarCanvas />,document.body);



