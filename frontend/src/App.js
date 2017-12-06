import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  // Link,
  Route
} from 'react-router-dom';
import { connect } from "react-redux";
import { view as Home } from "./modules/home";
import { view as Login } from "./modules/login";
import { loginRequiredWrapper, RouteWithSubroutes } from './components/loginWapper';
import { view as ArticlePage } from './modules/articles'

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
    path: '/dashboard',
    component: loginRequiredWrapper(Home),
    routes: [
      {
        path: '/dashboard/articles',
        component: loginRequiredWrapper(ArticlePage)
      },
      {
        path: '/dashboard/subscription',
        component: loginRequiredWrapper(Subscription)
      },
      {
        path: '/dashboard/statistics',
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
            <Redirect to="/dashboard" />
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
