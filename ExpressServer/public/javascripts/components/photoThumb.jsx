var React = require('react');
var PhotoThumb = React.createClass({
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
            url: "http://" + this.props.serverIP + "/scanFolder?folderPath=" + path,
            type: "GET",
            success: (data) => {
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
        image.src = ev.target.src;
        image.onload = ()=> {
            this.refs.bigThumb.src = image.src;
            this.refs.bigThumb.style.width = image.width + "px";
            $(this.refs.bigThumb).css("padding", "6%").css("display", "block").css("margin", "auto");
            $(this.refs.bigThumb.parentElement).show();
        }
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
        for (var i = 0; i < this.state.folders.length; i++) folerItems.push((<li onClick={this.gotoFolder} key={i}>
            {this.state.folders[i]}
        </li>));
        for (var i = 0; i < this.state.files.length; i++) fileItems.push((
            <img onClick={this.showBigPhoto} key={i}
                 src={"/getThumbImage?path="+this.state.baseFolder+"/"+this.state.files[i]}/>
        ));
        return (
            <div style={{ height: "100%" }}>
                <div onClick={this.closeBigPhoto}
                     style={{position:"fixed",top: "0px", bottom: "0px",background: "rgba(80, 99, 59,0.5)",left: "0px",right: "0px",display:"none"}}>
                    <img ref="bigThumb" src=""/></div>
                <div onClick={this.gotoTopFolder}>返回</div>
                <div id="folderName"> {this.state.baseFolder}</div>
                <ul>{folerItems}</ul>
                <ul>{fileItems}</ul>
            </div>
        )
    }
});
module.exports = PhotoThumb;