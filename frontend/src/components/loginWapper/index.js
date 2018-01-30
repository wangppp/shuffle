import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// 将这几个组件通过 login required 进行包装
// 跳转的时候将当前URL带进state

function mapStateToProps (state) {
  return {
    islogin: state.home.isLogin
  }
}

// withRouter 用来取location，connect 从store里取登录状态
export const loginRequiredWrapper = (Component) => {
  return withRouter(connect(mapStateToProps, null)(({islogin, location, ...rest}) => (
    islogin ? 
    <Component {...rest} /> :
    // to 传递 location 对象
    <Redirect to={{
      pathname: '/login',
      state: { from:  location}
    }}  />
  )))
};

export const RouteWithSubroutes = (route) => (
    <Route path={route.path} component={ props => (
      <route.component {...props} routes={route.routes} />
    )} />
)
