import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {  Form, Grid, Header, Message, Icon } from 'semantic-ui-react';
import http from "../../utils/http";
import { actions as homeActions } from "../home";
import { actions as loginActions } from "../login";
import { setToken } from "../../utils/auth";

const AuthBar = ({
   loginAsync,
   username,
   password,
   sms_token,
   setFormValue,
   requestSmsToken,
   is_sms_sent,
   loading
}) => {
  return (
    <div className='login-form'>
      <Grid
        centered
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='teal' textAlign='center'>
            欢迎来到 Shuffle 后台管理中心
          </Header>
          <Form
            loading={loading}
            size='large'
            className='attached fluid segment'>
            <Form.Input
              onChange={setFormValue}
              value={username}
              name="username"
              fluid
              icon='user'
              iconPosition='left'
              placeholder='User Name'
            />
            <Form.Input
              onChange={setFormValue}
              value={password}
              name="password"
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Form.Group>
              <Form.Input
                fluid
                icon='lock'
                onChange={setFormValue}
                value={sms_token}
                name="sms_token"
                iconPosition='left'
                placeholder='短信验证码'
                width={8}
                type='text' />
              <Form.Button
                fluid
                disabled={is_sms_sent}
                content={is_sms_sent ? "验证码已发送" : "请求验证码"}
                onClick={() => {
                  requestSmsToken({username, password})
                }}
                size="large"
                width={8} /> 
            </Form.Group> 
            <Form.Button color='teal' fluid size='large' onClick={() => {
              loginAsync({username, password, sms_token})
            }}>Login</Form.Button>
          </Form>
          <Message attached="bottom" warning icon>
            <Icon name='pointing right' />
            <Message.Content>
              <Message.Header>Notice</Message.Header>
              Token is valid in 24 hours
            </Message.Content>
          </Message>
          
        </Grid.Column>
      </Grid>
    </div>
  )
}

class Login extends Component {

  render() {
    // 用于跳转回登录前的页, state 对象里包含跳转前的页
    const { from } = this.props.location.state || { from: { pathname: '/' }};
    return (
      this.props.islogin ? <Redirect to={from} /> :
      <AuthBar { ...this.props } />
    );
  }
}

export const getLoginFormData = ({username, password, sms_token}) => {
  let formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('sms_token', sms_token);
  return formData;
};

function mapStateToProps(store) {
  const loginStore = store.login;
  return {
    username: loginStore.username,
    password: loginStore.password,
    sms_token: loginStore.sms_token,
    islogin: store.home.isLogin,
    is_sms_sent: loginStore.is_sms_sent,
    loading: loginStore.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestSmsToken: async ({username, password}) => {
      dispatch(loginActions.requestSmsToken({username, password}));
    },
    loginAsync: async ({username, password, sms_token}) => {
      const form = getLoginFormData({username, password, sms_token});

      const { data } = await http.post('/public/login', form);
      setToken(data.data.token);
      dispatch(homeActions.setLogin(true));
    },
    setFormValue: (e, { name, value }) => {
      dispatch(loginActions.setFormValue({name, value}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
