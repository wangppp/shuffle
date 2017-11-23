import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  withRouter,
  Link,
  Route
} from 'react-router-dom';
import { connect } from "react-redux";
import { view as Home } from "./modules/home";
import { view as Login } from "./modules/login";
import './App.css';

const Articles = () => (
  <ul>
    <li>1</li>
    <li>1</li>
    <li>1</li>
  </ul>
);

const Subscription = () => (
  <p>New subscribers here.</p>
);

const Statistics = () => (
  <p>Subscribers statistics...</p>
);

// 从store里取出登录状态
const mapStateToProps = (state) => ({
  islogin: state.home.isLogin
});

// 将这几个组件通过 login required 进行包装
// 跳转的时候将当前URL带进state
const loginRequiredWrapper = (Component) => {
  return withRouter(connect(mapStateToProps, null)(({islogin, location}) => (
    islogin ? 
    <Component /> :
    // to 传递 location 对象
    <Redirect to={{
      pathname: '/login',
      state: { from:  location}
    }}  />
  )))
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
            <Link className="dashboard-link" to="/">Index</Link>
            <Link className="dashboard-link" to="/articles">Articles</Link>
            <Link className="dashboard-link" to="/subscription">Subscription</Link>
            <Link className="dashboard-link" to="/statistics">Statistics</Link>
            {/* 经过Route包装过的组件，获得了location, history, state 属性 */}
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={loginRequiredWrapper(Home)} />
            <Route path="/articles" exact component={loginRequiredWrapper(Articles)} />
            <Route path="/subscription" exact component={loginRequiredWrapper(Subscription)} />
            <Route path="/statistics" exact component={loginRequiredWrapper(Statistics)} />
        </div>
      </Router>
    );
  }
}

export default App;
