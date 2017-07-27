var React = require('react');
var PhotoExplorer = React.createClass({
    getInitialState: function () {
        return {
            baseFolder: "",
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
                    baseFolder: data.baseFolder,
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
        var image = new Image();
        image.src = "/getFile?path=" + (new URL(ev.target.src)).searchParams.get("path");



    },
    closeBigPhoto: function (ev) {
        $(this.refs.bigThumb.parentElement).hide();
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
                 src={"/getThumbImage?path="+this.state.baseFolder+"/"+this.state.files[i]}/>
        ));
        return (
            <div className="PhotoExplorer container-fluid">
                <div id="bigThumb" onClick={this.closeBigPhoto}>
                    <img ref="bigThumb" src=""/>
                </div>
                <div className="form-inline">
                    <div className="form-group">
                        <div className="glyphicon glyphicon-arrow-left" onClick={this.gotoTopFolder}></div>
                    </div>
                    <div className="form-group">
                        <div className="glyphicon glyphicon-arrow-right"></div>
                    </div>
                    <div className="form-group"><input className="form-control" ref="address"
                                                       value={this.state.baseFolder} id="address" type="text"/></div>
                </div>
                <ul>{folerItems}</ul>
                <div>{fileItems}</div>
            </div>
        )
    }
});
module.exports = PhotoExplorer;