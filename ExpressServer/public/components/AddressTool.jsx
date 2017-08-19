//依赖bootstrap框架
import React, { Component } from 'react';
class AddressTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currfolder: "",
            childfolders: [],
            files: []
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    inputChangeHander() {

    }

    render() {
        var folderItems = [];
        for (var i = 0; i < this.state.childfolders.length; i++) {
            folderItems.push(<li key={i} onClick={(ev)=>{this.props.eventHander(this,"gotoFolder",ev)}}><a href="#">{this.state.childfolders[i]}</a></li>);
        }
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
                                                   value={this.state.currfolder} id="address" type="text"/></div>
                <div className="form-group">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            文件夹
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            {folderItems}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default  AddressTool;