import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';

class FundManager extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){//首次渲染之前

    }
    componentDidMount() {//首次渲染之后

    }
    componentWillReceiveProps(){

    }

    shouldComponentUpdate(data){    
        return true;
    }

    componentDidUpdate() {

    }

    render() {
        const {currentFolder} = this.props;
        return (
            <div>
                <input></input>
            </div>
        )
    }
};
export default FundManager;
