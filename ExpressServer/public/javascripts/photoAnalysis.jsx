import React, { Component } from 'react';
import ReactDom from 'react-dom';
import AddressTool from '../components/AddressTool.jsx';
import "../stylesheets/photoAnalysis.css"; // 载入 style.css
import ThumbList from '../components/ThumbList.jsx';
import ToolBox from '../components/ToolBox.jsx';
import Slider from '../components/Slider.jsx';
//import init from './init.js';
import { Router, Route, hashHistory } from 'react-router';


class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    updateCanvas() {
        var srcImageCanvas = this.refs.srcImageCanvas;
        srcImageCanvas.width = srcImageCanvas.parentElement.clientWidth;
        srcImageCanvas.height = srcImageCanvas.parentElement.clientHeight;
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
    }

    render() {
        const {isLoading ,onIncreaseClick} = this.props;
        var loadingStyle = {
            height:"100%",
            "backgroundColor": "antiquewhite"
        };
        return (
            <div className="container-fluid" style={{height:"100%"}}>
                <div onDoubleClick={onIncreaseClick}  className="row">
                    <div className="col-md-3 col-lg-3 col-sm-3">
                        <AddressTool eventHander={this.eventHander} className="row" ref="addressTool"/>
                    </div>
                    <div style={{height:"50px"}} className="col-md-9 col-lg-9 col-sm-9">
                        <ToolBox eventHander={this.eventHander} ref="toolBox"/>
                    </div>
                </div>
                <div className="row" style={{height:"95%"}}>
                    <div className="ThumbList col-md-2 col-lg-2 col-sm-2" style={{height:"100%"}}>
                        <ThumbList eventHander={this.eventHander} ref="thumbList" thumbUrlList={[]}/>
                    </div>
                    <div className="col-md-10 col-lg-10 col-sm-10" style={{height:"100%"}}>
                        <div style={loadingStyle}>
                            <div ref="loadingAnimation" id="loading-center-absolute">
                                <div id="object"></div>
                            </div>
                            <canvas onDoubleClick={(ev)=>{this.props.eventHander(this,"gotoPhotoShop",ev)}}
                                    ref="srcImageCanvas"></canvas>
                        </div>
                    </div>
                </div>
                <Slider ref="slider"></Slider>
            </div>
        )
    }
};
export default MainContainer;
