var React = require('react');
var ReactDom = require('react-dom');
var ThumbList = require('../components/ThumbList.jsx');
var ToolBox = require('../components/ToolBox.jsx');
var AddressTool = require('../components/AddressTool.jsx');
var init = require('./init.js');
require("../stylesheets/photoAnalysis.css"); // 载入 style.css
var MainContainer = React.createClass({
    getInitialState: function () {
        return {
            currentImage: null,
            isLoading: false
        }
    },
    updateCanvas: function () {
        var srcImageCanvas = this.refs.srcImageCanvas;
        srcImageCanvas.width = srcImageCanvas.parentElement.clientWidth;
        srcImageCanvas.height = srcImageCanvas.parentElement.clientHeight;
    },
    componentDidMount: function () {
        this.updateCanvas();
    },
    componentDidUpdate: function () {
        if (this.state.isLoading) $(this.refs.loadingAnimation).show();
        else  $(this.refs.loadingAnimation).hide();
        this.updateCanvas();
    },
    eventHander: function (a, b, c) {
        init.eventHander(a, b, c);
    },
    render: function () {
        return (
            <div className="container-fluid" style={{height:"100%"}}>
                <div className="row" style={{height:"5%"}}>
                    <div className="col-md-3 col-lg-3 col-sm-3"><AddressTool eventHander={this.eventHander}
                                                                             className="row" ref="addressTool"/></div>
                    <div className="col-md-9 col-lg-9 col-sm-9"><ToolBox eventHander={this.eventHander} ref="toolBox"/>
                    </div>
                </div>
                <div className="row" style={{height:"95%"}}>
                    <div className="col-md-2 col-lg-2 col-sm-2" style={{height:"100%"}}>
                        <ThumbList eventHander={this.eventHander} ref="thumbList" thumbUrlList={[]}/>
                    </div>
                    <div className="col-md-10 col-lg-10 col-sm-10" style={{height:"100%"}}>
                        <div style={{height:"100%","backgroundColor": "antiquewhite"}}>
                            <div ref="loadingAnimation" id="loading-center-absolute">
                                <div id="object"></div>
                            </div>
                            <canvas ref="srcImageCanvas"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
init.initLoad(ReactDom.render(<MainContainer />, document.querySelector("#folderBrowser")));
