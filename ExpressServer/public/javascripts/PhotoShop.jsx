//依赖bootstrap框架
import React, { Component } from 'react';
class PhotoShop extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
        const { GET_SRCIMAGE_URL, selectedFilePath } = this.props;
        var container = this.refs.PhotoShopContainer;
        var canvas = this.refs.mainCanvas;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        var ctx = canvas.getContext('2d');
        var image = new Image();
        image.src = GET_SRCIMAGE_URL +selectedFilePath;
        image.onload = ()=>{
            ctx.drawImage(image,0,0,image.width,image.height,0,0,canvas.width,canvas.width*image.height/image.width);
        }
    }
    componentDidUpdate() {

    }
    render() {
        const { GET_SRCIMAGE_URL, selectedFilePath } = this.props;
        return (
            <div ref="PhotoShopContainer" className="PhotoShopContainer">
                <span>{selectedFilePath}</span>
                <canvas ref="mainCanvas" />
            </div>
            
        )
    }
};
export default PhotoShop;