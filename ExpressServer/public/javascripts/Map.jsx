//依赖bootstrap框架
import React, { Component, PropTypes } from 'react';
class Map extends Component {
    constructor(props) {
        super(props);
    }


    getLocation(){

    }

    componentDidMount() {
        this.map =  new AMap.Map('allmap',{
            resizeEnable: true,
            zoom: 15,
            center: [116.480983, 40.0958]
        });
    }

    componentDidUpdate(data) {

    }

    render() {
        const { currfolder, eventHander } = this.props;
        return (
            <div>
                <div style={{height:"80%"}}  id="allmap"></div>
            </div>
        )
    }
}
export default Map;