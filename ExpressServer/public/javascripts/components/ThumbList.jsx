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
        const { currentFolder, GET_THUMB_URL, eventHander } = this.props;
        var folderItems = [];
        for (var i = 0; i < currentFolder.folderList.length; i++) {
            if (currentFolder.folderList[i] == "thumb") continue;
            folderItems.push(
                <li key={i}><a className="img-thumbnail" title={currentFolder.folderList[i]}
                    onDoubleClick={(ev) => eventHander("intoFolder", currentFolder.path + '/' + ev.currentTarget.title)}>
                    <img src='/images/folder.png'
                    />
                    <label>{currentFolder.folderList[i]}</label>
                </a></li>
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
            else {
                thumbSrc = '/images/fileIcon.png';
            }
            fileItems.push(
                <li key={i}><a title={currentFolder.fileList[i]} className="img-thumbnail" onDoubleClick={(ev) => eventHander("openFile", ev.currentTarget.title)}>
                    <img src={thumbSrc} />
                    <label>{currentFolder.fileList[i]}</label>
                </a></li>
            );
        }

        return (
            <div style={{ height: "100%", overflow: "auto",display:"flex" }}>
                <div style={{flex:1}}>
                    <ul>
                        <li><a onClick={(ev) => eventHander("intoFolder", "C:")}>C:</a></li>
                        <li><a onClick={(ev) => eventHander("intoFolder", "D:")}>D:</a></li>
                        <li><a onClick={(ev) => eventHander("intoFolder", "E:")}>E:</a></li>
                    </ul>
                </div>
                <div style={{flex:9}}>
                    <ul>{folderItems}</ul>                  
                    <ul>{fileItems}</ul>
                </div>
            </div>
        )
    }
}

ThumbList.propTypes = {
    currentFolder: PropTypes.object.isRequired,
    GET_THUMB_URL: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
}

export default ThumbList;