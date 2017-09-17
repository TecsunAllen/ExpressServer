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
        const { fileList } = this.props;
        var liItems = [];
        if (fileList) {
            fileList.forEach(function (file) {
                liItems.push(<li>{file}</li>);
            }, this);
        }
        return (
            <div className="searchBar">
                <div><input type="text" /></div>
                <ul>
                    {liItems}
                </ul>
            </div>
        )
    }
};
export default SearchBar;