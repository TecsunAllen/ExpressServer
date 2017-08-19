import React, { Component ,PropTypes } from 'react';
import ReactDom from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    HashRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { createHashHistory } from 'history';

import MainContainer from './photoAnalysis.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}

            </div>
        );
    }
}
//限制组件的props安全
/*App.propTypes = {
    //increment必须为fucntion,且必须存在
    increment: PropTypes.func.isRequired,
    //counter必须为数字，且必须存在
    counter: PropTypes.number.isRequired
  };*/

const About = () => (
    <div>
        <h3>About</h3>
    </div>
)

const Home = () => (
    <div>
        <h3>Home</h3>
    </div>
)

const Message = ({ match }) => (
    <div>
        <h3>new messages</h3>
        <h3>{match.params.id}</h3>
    </div>
)

const Inbox = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <Route path={`${match.url}/messages/:id`} component={Message} />
    </div>
)

ReactDom.render((
    <HashRouter>
        <App>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/inbox" component={Inbox} />
        </App>
    </HashRouter>
), document.getElementById('AppContainer'));
