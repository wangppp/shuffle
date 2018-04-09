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

const Login = asyncComponent(() => import('./modules/login/view'));
const Home = loginRequiredWrapper(asyncComponent(() => import('./modules/home/views')));
const ArticlePage = loginRequiredWrapper(asyncComponent(() => import('./modules/articles/views')));
const PostArticlePage = loginRequiredWrapper(asyncComponent(() => import('./modules/home/views/post')));
const ArticleView = loginRequiredWrapper(asyncComponent(() => import('./modules/articles/views/article_view')));
const UpdateArticle = loginRequiredWrapper(asyncComponent(() => import('./modules/articles/views/article_update')));
const MediaManage = loginRequiredWrapper(asyncComponent(() => import('./modules/media/views')));


const Subscription = loginRequiredWrapper(() => (
  <p>New subscribers here.</p>
));

const Statistics = loginRequiredWrapper(() => (
  <p>Subscribers statistics...</p>
));

// login required wrapper 是否应该做成一个redux 的middleware
const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Home,
    routes: [
      // 发布文章
      {
        path: '/dashboard/post',
        component: PostArticlePage
      },
      {
        path: '/dashboard/articles',
        component: ArticlePage,
      },
      // 文章媒体图片管理
      {
        path: '/dashboard/media',
        component: MediaManage
      },
      {
        path: '/dashboard/article/:id/update',
        component: UpdateArticle,
      },
      {
        path: '/dashboard/article/:id',
        component: ArticleView,
      },
      {
        path: '/dashboard/subscription',
        component: Subscription
      },
      {
        path: '/dashboard/statistics',
        component: Statistics
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
          <Route>
            <Redirect to="/" />
          </Route>
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
