import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import { connect } from "react-redux";
import { loginRequiredWrapper, RouteWithSubroutes } from './components/loginWapper';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// code splitting, 动态加载组件
import asyncComponent from './utils/load';

const Home = asyncComponent(() => import('./modules/home/views'));
const Login = asyncComponent(() => import('./modules/login/view'));
const ArticlePage = asyncComponent(() => import('./modules/articles/views'));
const ArticleView = asyncComponent(() => import('./modules/articles/views/article_view'));
const UpdateArticle = asyncComponent(() => import('./modules/articles/views/article_update'));


const Subscription = () => (
  <p>New subscribers here.</p>
);

const Statistics = () => (
  <p>Subscribers statistics...</p>
);

// login required wrapper 是否应该做成一个redux 的middleware
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
        component: loginRequiredWrapper(ArticlePage),
      },
      {
        path: '/dashboard/article/:id/update',
        component: loginRequiredWrapper(UpdateArticle),
      },
      {
        path: '/dashboard/article/:id',
        component: loginRequiredWrapper(ArticleView),
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
          <Switch>
            {
              routes.map((route, i) => (
                <RouteWithSubroutes {...route} key={i}/>
              ))
            }
          </Switch>
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
