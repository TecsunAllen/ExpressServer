//依赖bootstrap框架
import React, { Component } from 'react';
class SearchBar extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    componentDidUpdate() {

    }

    render() {
        const { fileList, eventHander } = this.props;
        var liItems = [];
        if (fileList) {
            for(var i=0;i<fileList.length;i++){
                liItems.push(<li onDoubleClick={(ev)=>eventHander("openFile",ev.target.title)} title={fileList[i].path} key={i}>{fileList[i].name + "  " + fileList[i].path}</li>);
            }
        }
        return (
            <div className="searchBar">
                <div><input onChange={(ev) => {
                    if (ev.target.value.length >= 3)
                        eventHander('searchFiles', ev.target.value);
                }
                } type="text" /></div>
                <ul>
                    {liItems}
                </ul>
            </div>
        )
    }
};
export default SearchBar;