//依赖bootstrap框架
import React, { Component , PropTypes } from 'react';
class ThumbList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    gotoPS(){
        /*const {history} = this.props;
        history.push("/ps",{
            
        });*/
    }

    render() {
        const {currentFolder,GET_THUMB_URL,onFolderSelect,onFileSelect} = this.props;
        var folderItems = [];
        for (var i = 0; i < currentFolder.folderList.length; i++) {
            if(currentFolder.folderList[i] == "thumb")continue;
            folderItems.push(
                <div key={i} title={currentFolder.folderList[i]}
                    className="img-thumbnail thumbnail-folder"
                    onClick={(ev) => onFolderSelect(currentFolder.path + '/' +ev.target.title)} />
            );
        }

        var fileItems = [];
        for (var i = 0; i < currentFolder.fileList.length; i++) {
            var isPhoto = /(JPG)|(PNG)/.test(currentFolder.fileList[i]);
            var thumbSrc = isPhoto? GET_THUMB_URL + currentFolder.path + '/' + currentFolder.fileList[i]:"";

            fileItems.push(
                <img title={currentFolder.fileList[i]} onDoubleClick={(ev)=>onFileSelect(ev.target.title)} key={i} className="img-thumbnail"
                src={thumbSrc}/>
            );
        }
  
        return (
            <div style={{height:"100%", overflow: "auto"}}>{folderItems}{fileItems}</div>
        )
    }
}

ThumbList.propTypes = {
    currentFolder: PropTypes.object.isRequired,
    GET_THUMB_URL: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
}

export default ThumbList;