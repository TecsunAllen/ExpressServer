//依赖bootstrap框架
import React, { Component } from 'react';
class FloatTools extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }

    render() {
        const { tools } = this.props;
        var items = [];
        tools.forEach((tool) => {
            items.push(
            <div type={tool.type} title={tool.title}>
                <img src={tool.iconUrl} />
            </div>)
        })
        return (
            <div className="floatTools">

            </div>
        )
    }
};
export default FloatTools;



/*

{
    iconUrl:"",
    title:"",
    type:""
}


*/