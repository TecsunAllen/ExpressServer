//依赖bootstrap框架
import React, { Component } from 'react';
class ToolBox extends Component{
    getInitialState () {
        return {
            toolList: []
        };
    }
    componentDidMount () {
    }
    componentDidUpdate () {

    }
    render () {
        var toolItems = [];
        for (var i = 0; i < this.state.toolList.length; i++) toolItems.push((
            <li onClick={(ev)=>{this.props.eventHander(this,"toolClick",ev)}} title={this.state.toolList[i].name}
                key={i}>
                <img style={{height:"-webkit-fill-available"}} alt={this.state.toolList[i].name}
                     src={this.state.toolList[i].iconUrl}/>
            </li>
        ));
        return (
            <ul className="ToolBox" style={{height:"100%", overflow: "auto"}}>{toolItems}</ul>
        )
    }
};
export default ToolBox;