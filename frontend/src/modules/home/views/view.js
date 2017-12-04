import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts, setLogin } from '../actions';
import { Link, withRouter } from 'react-router-dom';
import { RouteWithSubroutes } from '../../../components/loginWapper';
import { Grid, Menu, Image, Dropdown, Input } from 'semantic-ui-react';
import Dashboard from "./dashboard"

const Logo = require("../../../assets/imgs/Logo.png")
const User = require("../../../assets/imgs/man.png")


class Home extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { location, logout } = this.props
    const path = location.pathname
    return (
      <div className="ui two grid full-grid">
        <div className="column dark-col">
          <div className="dashboard-menu-logo">
            <img alt="logo" src={Logo} />
          </div>
          <Menu fluid vertical inverted pointing secondary className="fashion-menu">
            <Menu.Item name='dashboard' active={path === '/dashboard'} as={Link} to="/dashboard">
              Dashboard
            </Menu.Item>

            <Menu.Item name='articles' active={path === '/dashboard/articles'} as={Link} to="/dashboard/articles">
              Articles
            </Menu.Item>

            <Menu.Item name='subscription' active={path === '/dashboard/subscription'} as={Link} to="/dashboard/subscription">
              Subscription
            </Menu.Item>

            <Menu.Item name='statistics' active={path === '/dashboard/statistics'} as={Link} to="/dashboard/statistics">
              Statistics
            </Menu.Item>

          </Menu>
        </div>

        <div width={16} className="column right-board">
          <Grid columns="one">
            <Grid.Row >
              <Grid.Column className="dashboard-header">
                <Input icon="search" iconPosition="left" placeholder='Search...' className="dashboard-search"/>
                <div className="acount">
                  <Image circular size="mini" src={User} />
                  <Dropdown text='Adam' pointing labeled className='link item'>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={logout}>Leog out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Grid.Column>

              <Grid.Column className="dashboard-body">
                <div>
                  {
                    path === '/dashboard' ?
                    <Dashboard {...this.props} /> :
                    ''
                  }


                  {
                    this.props.routes.map((route, i) => (
                      <RouteWithSubroutes {...route} key={i} />
                    ))
                  }
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    products: store.home.products,
    islogin: store.home.isLogin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => {
      dispatch(getProducts());
    },
    logout: (e) => {
      dispatch(setLogin(false))
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
