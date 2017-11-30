import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  withRouter,
  // Link,
  Route
} from 'react-router-dom';
import { connect } from "react-redux";
import { view as Home } from "./modules/home";
import { view as Login } from "./modules/login";
import { loginRequiredWrapper, RouteWithSubroutes } from './components/loginWapper';


const Articles = () => (
  <ul>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <Route path="/home/articles/subsub" render={ (props) => (
      <div>
        Sub Sub Route!
      </div>
    )} />
  </ul>
);

const Subscription = () => (
  <p>New subscribers here.</p>
);

const Statistics = () => (
  <p>Subscribers statistics...</p>
);

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: loginRequiredWrapper(Home),
    routes: [
      {
        path: '/home/articles',
        component: loginRequiredWrapper(Articles)
      },
      {
        path: '/home/subscription',
        component: loginRequiredWrapper(Subscription)
      },
      {
        path: '/home/statistics',
        component: loginRequiredWrapper(Statistics)
      },
    ]
  }
]

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={props => (
            <Redirect to="/home" />
          )} />
            {
              routes.map((route, i) => (
                <RouteWithSubroutes {...route} key={i}/>
              ))
            }
        </div>
      </Router>
    );
  }
}

// 从store里取出登录状态
const mapStateToProps = (state) => ({
  islogin: state.home.isLogin
});

export default connect(mapStateToProps, null)(App);