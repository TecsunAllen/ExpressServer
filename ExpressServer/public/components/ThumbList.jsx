//依赖bootstrap框架
var React = require('react');
var ThumbList = React.createClass({
    getInitialState: function () {
        return {
            thumbUrlList: []
        };
    },
    componentDidMount: function () {
    },
    componentDidUpdate: function () {

    },
    render: function () {
        var fileItems = [];
        for (var i = 0; i < this.state.thumbUrlList.length; i++) fileItems.push((
            <li style={{top:50*i+"px"}} key={i}><img onClick={(ev)=>{this.props.eventHander(this,"thumbClick",ev)}}
                                                     className="img-thumbnail"
                                                     src={this.state.thumbUrlList[i]}/></li>
        ));
        return (
            <div style={{height:"100%", overflow: "auto"}}>{fileItems}</div>
        )
    }
});
module.exports = ThumbList;