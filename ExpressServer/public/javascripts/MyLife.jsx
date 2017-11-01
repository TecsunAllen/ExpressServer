//依赖bootstrap框架
import React, { Component } from 'react';
import EditPhotos from '../components/EditPhotos.jsx';
import ShowPhotos from '../components/ShowPhotos.jsx';
import Login from '../components/Login.jsx';
class MyLife extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {      

    }
    componentDidUpdate() {

    }  
    render() {
        const { appState,eventHander } = this.props;
        var loginForm = appState.isLogon ? null : (<Login eventHander = {eventHander}/>);
        return (
            <div className="MyLifeContainer">
                <button id='addPhotos'>+</button>
                <EditPhotos eventHander = {eventHander}/>
                <ShowPhotos eventHander = {eventHander}/>
                {loginForm}
            </div>            
        );
    }
}
export default MyLife;