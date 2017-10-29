//依赖bootstrap框架
import React, { Component } from 'react';
import EditPhotos from '../components/EditPhotos.jsx';
import ShowPhotos from '../components/ShowPhotos.jsx';
class MyLife extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {      

    }
    componentDidUpdate() {

    }  
    render() {
        //const {selectedFilePath } = this.props;
        return (
            <div className="MyLifeContainer">
                <button id='addPhotos'>+</button>
                <EditPhotos />
                <ShowPhotos />
            </div>            
        );
    }
}
export default MyLife;