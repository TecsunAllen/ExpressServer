//依赖bootstrap框架
import React, { Component } from 'react';
class LoginForm extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }

    render() {
        const { eventHander } = this.props;
        return (
            <form ref='loginForm' role="form">
                <div className="form-group">
                    <label htmlFor="username">用户名</label>
                    <input type="text" className="form-control" id="username" placeholder="请输入用户名" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">密码</label>
                    <input type="text" className="form-control" id="password" placeholder="请输入密码" />
                </div>
                <button data-action='submit' type="button" onClick={(ev)=>eventHander(ev,this)} className="btn btn-default">登陆</button>
            </form>
        );
    }
}
export default LoginForm;