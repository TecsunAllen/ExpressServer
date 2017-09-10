//依赖bootstrap框架
import React, { Component } from 'react';
class MainRouter extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.autoRouter(this.props);
    }
    componentDidUpdate() {

    }
    shouldComponentUpdate(data) {
        return this.autoRouter(data);
    }
    componentWillUnmount(data){
        
    }
    autoRouter(data) {
        const { currentFolder, history } = data;      
        history.push("/app");
        return false;
    }
    render() {
        return (
            <div>

            </div>
        )
    }
};
export default MainRouter;