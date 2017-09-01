//依赖bootstrap框架
import React, { Component} from 'react';
class OecModules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modules:[
                {
                    name:'',
                    iconUrl:'/images/folder.png'
                },
                {
                    name:'',
                    iconUrl:'/images/folder.png'
                }
            ]
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    imageClickHander(ev){
        this.props.history.push("/meeting");
    }

    render() {
        
        var items = [];
        var modules = this.state.modules;
        for(var i=0;i<modules.length;i++){
            items.push(<img onClick={()=>this.imageClickHander()} className="thumbnail" key={i} title={modules[i].name} src={modules[i].iconUrl} />)
        }
        return (
            <div>
                {items}
            </div>
        )
    }
}

export default  OecModules;