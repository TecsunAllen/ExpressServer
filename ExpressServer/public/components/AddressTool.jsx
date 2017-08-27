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
        const {currfolder ,childfolders} = this.props;
        return (
            <div className="form-inline">
                <div className="form-group">
                    <div className="glyphicon glyphicon-arrow-left"
                         onClick={(ev)=>{this.props.eventHander(this,"goback",ev)}}></div>
                </div>
                <div className="form-group">
                    <div className="glyphicon glyphicon-arrow-right"
                         onClick={(ev)=>{this.props.eventHander(this,"forwrad",ev)}}></div>
                </div>
                <div className="form-group"><input readOnly="true" className="form-control" ref="address"
                                                   value={currfolder} id="address" type="text"/></div>
            </div>
        )
    }
}
AddressTool.propTypes = {
    currfolder: PropTypes.string.isRequired,
    childfolders: PropTypes.array.isRequired
}
export default  AddressTool;