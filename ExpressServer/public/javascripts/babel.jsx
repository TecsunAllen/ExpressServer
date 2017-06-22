var ToolMenu = React.createClass({
    getInitialState: function() {
        return {menuItem:[]};
    },
    handleClick: function(event) {
        $(this.getDOMNode()).find("div").removeClass("btn-primary");
        if($(event.target).hasClass("btn-primary"))$(event.target).removeClass("btn-primary");
        else $(event.target).addClass("btn-primary");
    },
    render: function() {
        console.log("ToolMenu组件开始渲染！数据：");
        console.log(this.state.menuItem);
        var items = [];
        for (var i = 0; i < this.state.menuItem.length; i++) {
            items.push(<div onClick={this.handleClick} className="menuItem btn btn-default" type={this.state.menuItem[i]}>{this.state.menuItem[i]}</div>);
        }
        return (
            <div className="toolMenu">
                {items}
            </div>
        )
    }
});