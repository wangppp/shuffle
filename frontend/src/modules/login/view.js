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
   setUserName,
   setPassword,
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
              onChange={setUserName}
              value={username}
              fluid
              icon='user'
              iconPosition='left'
              placeholder='User Name'
            />
            <Form.Input
              onChange={setPassword}
              value={password}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            {/*<Form.Group>*/}
              {/*<Form.Input*/}
                {/*fluid*/}
                {/*icon='lock'*/}
                {/*iconPosition='left'*/}
                {/*placeholder='短信验证码'*/}
                {/*width={10}*/}
                {/*type='text' />*/}
              {/*<Form.Button*/}
                {/*fluid*/}
                {/*disabled={is_sms_sent}*/}
                {/*content={is_sms_sent ? "验证码已发送" : "请求验证码"}*/}
                {/*onClick={() => {*/}
                  {/*requestSmsToken({username, password})*/}
                {/*}}*/}
                {/*size="large"*/}
                {/*width={6} />*/}
            {/*</Form.Group>*/}
            <Form.Button color='teal' fluid size='large' onClick={() => {
              loginAsync({username, password})
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

export const getLoginFormData = ({username, password}) => {
  let formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  return formData;
};

function mapStateToProps(store) {
  return {
    username: store.login.username,
    password: store.login.password,
    islogin: store.home.isLogin,
    is_sms_sent: store.login.is_sms_sent,
    loading: store.login.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestSmsToken: async ({username, password}) => {
      dispatch(loginActions.requestSmsToken({username, password}));
    },
    loginAsync: async ({username, password}) => {
      const form = getLoginFormData({username, password});

      const { data } = await http.post('/public/login', form);
      setToken(data.data.token);
      dispatch(homeActions.setLogin(true));
    },
    setUserName: (e, {value}) => {
      dispatch(loginActions.setUserName(value));
    },
    setPassword: (e, {value}) => {
      dispatch(loginActions.setPassword(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
