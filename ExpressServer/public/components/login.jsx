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
        const { fileList, eventHander } = this.props;
        return (
            <form role="form">
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input type="text" class="form-control" id="username" placeholder="请输入用户名" />
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="text" class="form-control" id="password" placeholder="请输入密码" />
                </div>
                <button type="submit" class="btn btn-default">登陆</button>
            </form>
        )
    }
};
export default LoginForm;