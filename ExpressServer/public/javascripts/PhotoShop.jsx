//依赖bootstrap框架
import React, { Component } from 'react';
class PhotoShop extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "测试",
            max: 100,
            min: 0,
            value: 0,
            oneStep: 5
        };
    }
    componentDidMount () {
        $(this.refs.sliderCube).mousedown((ev) => {
            this.changeValue(ev);
        }).mousemove((ev) => {
            this.changeValue(ev);
        });
        $(document).mousemove((ev) => {
            this.changeValue(ev);
        }).mouseup((ev) => {
            this.changeValue(ev);
        });
        this.setState({value: 0});
    }
    componentDidUpdate () {

    }
    changeValue (ev) {
        ev.originalEvent.preventDefault();
        if (ev.type == "mousedown") {
            this.lastClientX = ev.clientX;
            this.start = true;
        }
        else if (ev.type == "mousemove" && this.start) {
            var offsetX = ev.clientX - this.lastClientX;
            var sliderBarWidth = this.refs.sliderBar.offsetWidth - this.refs.sliderCube.offsetWidth;
            var left = Number(this.refs.sliderCube.style.left.replace("px", "")) + offsetX;
            var _value = this.state.min + left * (this.state.max - this.state.min) / sliderBarWidth;
            var value = _value - _value % this.state.oneStep;
            var value = _value;
            this.lastClientX = ev.clientX;
            if (left >= 0 && left <= sliderBarWidth) {
                this.setState({value: value});
            }
        }
        else if (ev.type == "mouseup") {
            this.start = false;
        }
    }
    render () {
        var cubeStyle = {left: 0};
        if (this.refs.sliderCube) {
            var value = (this.state.value - this.state.min) / (this.state.max - this.state.min);
            var sliderBarWidth = this.refs.sliderBar.offsetWidth - this.refs.sliderCube.offsetWidth;
            var left = value * sliderBarWidth + "px";
            cubeStyle = {left: left};
        }
        return (
            <div className="L_Slider" ref="mainContainer" style={{display:""}}>
                <div>
                    <span className="L_SliderTitle">{this.state.title}</span>
                    <span className="L_SliderValue">{parseInt(this.state.value)}</span>
                </div>
                <div className="L_SliderBC">
                    <div ref="sliderBar" className="L_SliderBar"></div>
                    <div style={cubeStyle} ref="sliderCube" className="L_SliderCube"></div>
                </div>
            </div>
        )
    }
};
export default PhotoShop;