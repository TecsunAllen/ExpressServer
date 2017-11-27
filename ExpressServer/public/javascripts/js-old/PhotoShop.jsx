//依赖bootstrap框架
import React, { Component } from 'react';
class PhotoShop extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {      
        this.drawImage()
    }
    componentDidUpdate() {
        this.drawImage();
    }
    drawImage(){
        const { GET_SRCIMAGE_URL, selectedFilePath } = this.props;
        var container = this.refs.PhotoShopContainer;
        var canvas = this.refs.mainCanvas;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        var ctx = canvas.getContext('2d');
        var image = new Image();
        image.src = GET_SRCIMAGE_URL +selectedFilePath;
        image.onload = ()=>{
            var needHeightWhenWidthFull = canvas.width*image.height/image.width;
            var drawWidth,drawHeight,drawOffsetX,drawOffsetY;
            drawHeight = needHeightWhenWidthFull > canvas.height ? canvas.height:needHeightWhenWidthFull;
            drawWidth = drawHeight * image.width/image.height;
            drawOffsetX = (canvas.width - drawWidth)/2;
            drawOffsetY = (canvas.height - drawHeight)/2;
            ctx.drawImage(image,0,0,image.width,image.height,drawOffsetX,drawOffsetY,drawWidth,drawHeight);
        } 
    }
    render() {
        const { GET_SRCIMAGE_URL, selectedFilePath } = this.props;
        return (
            <div ref="PhotoShopContainer" className="PhotoShopContainer">
                <canvas title={selectedFilePath} ref="mainCanvas" />
            </div>            
        )
    }
};
export default PhotoShop;