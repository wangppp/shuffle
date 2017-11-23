import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import http from "axios";
import { setLogin, loginAsync } from "../home/actions";

const AuthBar = ({ loginAsync}) => {
  return (
    <form className="login-form" onSubmit={(e) => {
      e.preventDefault();
      loginAsync();
    }}>
      <input placeholder="请输入邮箱" type="email"/> 
      <input placeholder="请输入密码" type="password"/>
      <button>Login To Continue...</button>
    </form>
  )
}

class Login extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    // 用于跳转回登录前的页, state 对象里包含跳转前的页
    const { from } = this.props.location.state || { from: { pathname: '/' }};
    return (
      this.props.islogin ? <Redirect to={from}></Redirect> :
      <AuthBar { ...this.props } />
    );
  }
}

function mapStateToProps(store) {
  return {
    islogin: store.home.isLogin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginAfterRequest: () => {
      dispatch(setLogin(true));
    },
    logoutManual: () => {
      dispatch(setLogin(false));
    },
    loginAsync: () => {
      http('http://localhost:4000/product', {
        headers: {
          'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTExNTEyNDc3LCJuYW1lIjoiQWRhbSBXYW5nIn0.9MngiL3iORUMafdHqb7reJsZi_zRHfY6ApvmR9xWiN8`
        }
      }).then(response => {
        console.log(response);
      }).catch(err => {});
      dispatch(loginAsync());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
