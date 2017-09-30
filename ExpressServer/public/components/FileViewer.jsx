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
        var fileName = filePath.split(/[\\/]/).reverse()[0];
        var playElement;
        if(/.mp4/i.test(fileName)){
            playElement = (<video controls autoPlay src={"/getFile?path="+ filePath} />);
        }
        return (
            <div className="fileViewer" style={{zIndex:filePath?1:-1}}>
                {playElement}
            </div>
        )
    }
};
export default FileViewer;