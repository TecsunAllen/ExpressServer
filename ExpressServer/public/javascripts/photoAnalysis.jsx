import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import AddressTool from '../components/AddressTool.jsx';
import "../stylesheets/photoAnalysis.css"; // 载入 style.css
import ThumbList from '../components/ThumbList.jsx';
import FloatTools from '../components/FloatTools.jsx';
import Slider from '../components/Slider.jsx';
import SearchBar from '../components/SearchBar.jsx';
import PhotoShop from './PhotoShop.jsx';
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
    componentWillMount(){//首次渲染之前

    }
    componentDidMount() {//首次渲染之后
        //this.props.onMainComponentLoad();
    }
    componentWillReceiveProps(){

    }

    shouldComponentUpdate(data){    
        const {currentFolder,history} = data;
        if(currentFolder.selectedFileName){
            history.push("/ps");
            return false;
        }
        return true;
    }

    componentDidUpdate() {

    }

    render() {
        const {currentFolder,GET_THUMB_URL,GET_SRCIMAGE_URL,onFolderSelect,onFileSelect,history} = this.props;
        return (
            <div className="container-fluid" style={{height:"100%"}}>
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <AddressTool history={history} childfolders={currentFolder.folderList} 
                        currfolder={currentFolder.path} 
                         className="row" ref="addressTool"/>
                    </div>
                </div>
                <div className="row" style={{height:"95%"}}>
                    <div className="ThumbList col-md-12 col-lg-12 col-sm-12" style={{height:"100%"}}>
                        <ThumbList history={history} 
                        onFileSelect={onFileSelect} 
                        onFolderSelect={onFolderSelect} 
                        ref="thumbList" 
                        currentFolder={currentFolder} 
                        GET_THUMB_URL={GET_THUMB_URL}/>
                    </div>
                </div>
                <SearchBar  />
            </div>
        )
    }
};
MainContainer.propTypes = {
    currentFolder: PropTypes.object.isRequired,
    onFolderSelect:PropTypes.func.isRequired,
    GET_THUMB_URL: PropTypes.string.isRequired
}
export default MainContainer;
