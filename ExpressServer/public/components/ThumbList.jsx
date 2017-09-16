//依赖bootstrap框架
import React, { Component, PropTypes } from 'react';
class ThumbList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*const {currentFolder,GET_THUMB_URL,onFolderSelect,onFileSelect} = this.props;
        var images = $(this.refs.thumbContainer).find("img");


        for (var i = 0; i < currentFolder.fileList.length; i++) {
            var isPhoto = /(JPG)|(PNG)/.test(currentFolder.fileList[i]);
            var thumbSrc = isPhoto? GET_THUMB_URL + currentFolder.path + '/' + currentFolder.fileList[i]:"";
            images.src=thumbSrc;
        }*/
    }

    loadImage(images, files, index) {
        images.src = src;
        image.onload = () => {
            this.loadImage
        }
    }

    componentDidUpdate() {

    }

    gotoPS() {
        /*const {history} = this.props;
        history.push("/ps",{
            
        });*/
    }

    render() {
        const { currentFolder, GET_THUMB_URL, onFolderSelect, onFileSelect } = this.props;
        var folderItems = [];
        for (var i = 0; i < currentFolder.folderList.length; i++) {
            if (currentFolder.folderList[i] == "thumb") continue;
            folderItems.push(
                <div key={i} className="img-thumbnail" title={currentFolder.folderList[i]} 
                    onDoubleClick={(ev) => onFolderSelect(currentFolder.path + '/' + ev.currentTarget.title)}>
                    <img src='/images/folder.png'
                    />
                    <label>{currentFolder.folderList[i]}</label>
                </div>
            );
        }

        var fileItems = [];
        for (var i = 0; i < currentFolder.fileList.length; i++) {
            var isPhoto = /(JPG)|(PNG)/.test(currentFolder.fileList[i].toUpperCase());
            var isMusic = /(MP3)|(WAV)/.test(currentFolder.fileList[i].toUpperCase());
            var isVideo = /MP4/.test(currentFolder.fileList[i].toUpperCase());
            var thumbSrc = isPhoto ? GET_THUMB_URL + currentFolder.path + '/' + currentFolder.fileList[i] : "";
            if (isPhoto) {
                thumbSrc = GET_THUMB_URL + currentFolder.path + '/' + currentFolder.fileList[i];
            }
            else if (isMusic) {
                thumbSrc = '/images/music.png';
            }
            else if (isVideo) {
                thumbSrc = '/images/video.png';
            }
            fileItems.push(
                <div key={i} title={currentFolder.fileList[i]} className="img-thumbnail" onDoubleClick={(ev) => onFileSelect(ev.currentTarget.title)}>
                    <img src={thumbSrc} />
                    <label>{currentFolder.fileList[i]}</label>
                </div>
            );
        }

        return (
            <div ref="thumbContainer" style={{ height: "100%", overflow: "auto" }}>{folderItems}{fileItems}</div>
        )
    }
}

ThumbList.propTypes = {
    currentFolder: PropTypes.object.isRequired,
    GET_THUMB_URL: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
}

export default ThumbList;