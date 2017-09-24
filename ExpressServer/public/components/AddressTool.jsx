//依赖bootstrap框架
import React, { Component , PropTypes} from 'react';
class AddressTool extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    inputChangeHander() {

    }

    render() {
        const {currfolder ,childfolders,eventHander} = this.props;
        var addressList = [];
        var addressTexts = currfolder.split("/");
        var currentPath ="";
        for(var i=0;i<addressTexts.length;i++){
            currentPath +=addressTexts[i]+"/";
            addressList.push(<a  onClick={(ev) => eventHander("intoFolder",ev.target.dataset.path)} key={i} data-path={currentPath.substring(0,currentPath.length-1)} className="btn-default">{addressTexts[i]+"/"}</a>);
        }
        return (
            <div className="form-inline">
                <div className="form-group">
                    <div className="glyphicon glyphicon-arrow-left"
                         onClick={(ev)=>{eventHander(this,"goback",ev)}}></div>
                </div>
                <div className="form-group">
                    <div className="glyphicon glyphicon-arrow-right"
                         onClick={(ev)=>{eventHander(this,"forwrad",ev)}}></div>
                </div>
                <div className="form-group">
                    {addressList}
                </div>
            </div>
        )
    }
}
AddressTool.propTypes = {
    currfolder: PropTypes.string.isRequired,
    childfolders: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
}
export default  AddressTool;