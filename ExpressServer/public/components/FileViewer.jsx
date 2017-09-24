//依赖bootstrap框架
import React, { Component } from 'react';
class FileViewer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    componentDidUpdate() {

    }

    render() {
        const { filePath} = this.props;
        return (
            <div className="fileViewer" style={{zIndex:filePath?1:-1}}>
                <video controls src={"/getFile?path="+ filePath} />
            </div>
        )
    }
};
export default FileViewer;