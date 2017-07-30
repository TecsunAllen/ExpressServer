﻿var React = require('react');
require("./css/PhotoExplorer.css"); // 载入 style.css
var PhotoExplorer = React.createClass({
    getInitialState: function () {
        return {
            curreentFolder: "",
            folders: [],
            files: []
        };
    },
    handleClick: function () {

    },
    loadFolderInfo: function (path) {
        $.ajax({
            url: "/scanFolder?folderPath=" + path,
            type: "GET",
            success: (data) => {
                data.folders = data.folders.filter(function (item) {
                    return !/thumb/.test(item);
                })
                this.setState({
                    curreentFolder: data.baseFolder,
                    folders: data.folders,
                    files: data.files
                });
            },
            error: (data) => {
            }
        });
    },
    componentDidMount: function () {
        this.loadFolderInfo(this.props.folder);
    },
    gotoFolder: function (ev) {
        var folderPath = this.state.baseFolder + "/" + ev.target.innerHTML;
        this.loadFolderInfo(folderPath);
    },
    gotoTopFolder: function (ev) {
        var currentFolder = this.state.baseFolder;
        var parentFolder = currentFolder.replace(/[\\\/]*([^\\\/]*[\\\/]*$)/g, "");
        this.loadFolderInfo(parentFolder);
    },
    showBigPhoto: function (ev) {
        /*this.refs.bigCanvas.src = "/getFile?path=" + (new URL(ev.target.src)).searchParams.get("path");
         $(this.refs.bigCanvas.parentElement).show();
         var xhr = new XMLHttpRequest();
         xhr.responseType="arraybuffer";*/
        this.refs.bigCanvas.width = 0;
        this.refs.bigCanvas.height = 0;

    },
    closeBigPhoto: function (ev) {
        //$(this.refs.bigThumb.parentElement).hide();
    },
    componentDidUpdate: function () {

    },
    renderCanvas: function () {

    },
    render: function () {
        var fileItems = [];
        var folerItems = [];
        for (var i = 0; i < this.state.folders.length; i++) folerItems.push((
            <li className="btn btn-info" onClick={this.gotoFolder} key={i}>
            {this.state.folders[i]}
        </li>));
        for (var i = 0; i < this.state.files.length; i++) fileItems.push((
            <img className="img-thumbnail" onClick={this.showBigPhoto} key={i}
                 src={"/getThumbImage?path="+this.state.curreentFolder+"/"+this.state.files[i]}/>
        ));
        return (
            <div className="PhotoExplorer container-fluid">
                <div className="row">
                    <div id="leftToolbar" className="col-md-3 col-lg-3 col-sm-3">
                        <div className="form-inline">
                            <div className="form-group">
                                <div className="glyphicon glyphicon-arrow-left" onClick={this.gotoTopFolder}></div>
                            </div>
                            <div className="form-group">
                                <div className="glyphicon glyphicon-arrow-right"></div>
                            </div>
                            <div className="form-group"><input className="form-control" ref="address"
                                                               value={this.state.curreentFolder} id="address"
                                                               type="text"/></div>
                        </div>
                        <ul>{folerItems}</ul>
                        <div>{fileItems}</div>
                    </div>
                    <div id="bigThumb" onClick={this.closeBigPhoto} className="col-md-9 col-lg-9 col-sm-9">
                        <canvas ref="bigCanvas" src=""/>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = PhotoExplorer;