import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import http from "../../utils/http";
import { setLogin, loginAsync } from "../home/actions";
import { setToken } from "../../utils/auth";

const AuthBar = ({ loginAsync}) => {
  return (
    <form className="login-form" onSubmit={loginAsync} id="login-form">
      <input name="username" placeholder="请输入用户名" type="text"/> 
      <input name="password" placeholder="请输入密码" type="password"/>
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
    loginAsync: (e) => {
      e.preventDefault();
      const form = new FormData(document.querySelector("#login-form"));
      http.post('/login', form).then(
        response => {
          const res = response.data;
          console.log(res)
          if (res.msg) {
            alert(res.message);
          }
          if (res.status === true) {
            setToken(res.token)
            dispatch(setLogin(true))
          }
        },
        err => {
          // 获取对象的属性名->array
          // console.log(Object.getOwnPropertyNames(err))
          try {
            const res = err.response.data;
            if (res.msg) {
              alert(res.msg)
            }
          } catch (error) {
            alert('网络出错')
          }
        }
    ).catch(err => {
          alert('网络出错')
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
