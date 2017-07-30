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
            <img className="img-thumbnail" onClick={this.eventhander} key={i} src={this.state.thumbUrlList[i]}/>
        ));
        return (
            <div>{fileItems}</div>
        )
    }
});
module.exports = ThumbList;