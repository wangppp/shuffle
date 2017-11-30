import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getProducts } from './actions';
import { Link, Route, withRouter } from 'react-router-dom';
import { loginRequiredWrapper, RouteWithSubroutes } from '../../components/loginWapper';
import { Grid, Menu, Segment, Icon, Divider } from 'semantic-ui-react';

function ProductList ({products}) {
  const P = products.map(p => (
    <li key={p.ID}>{ p.Slug }</li>
  ));
  return (
    <ul>
      {P}
    </ul>
  )
}

class Home extends Component {
  componentDidMount () {
    this.props.getProducts();
  }
  render() {
    const { location } = this.props
    const path = location.pathname
    return (
      <Grid className="full-grid">
        <Grid.Column width={4} className="dark-col">
          <Icon name="rocket" size="huge" color="teal" />
          <Menu fluid vertical inverted pointing secondary className="fashion-menu">
            <Menu.Item name='home' active={path === '/home'} as={Link} to="/home">
               Home
            </Menu.Item>

            <Menu.Item name='articles' active={path === '/home/articles'} as={Link} to="/home/articles">
              Articles
            </Menu.Item>

            <Menu.Item name='subscription' active={path === '/home/subscription'} as={Link} to="/home/subscription">
              Subscription
            </Menu.Item>
            
            <Menu.Item name='statistics' active={path === '/home/statistics'} as={Link} to="/home/statistics">
              Statistics
            </Menu.Item>

          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          
            {
              this.props.routes.map((route, i) => (
                <RouteWithSubroutes {...route} key={i} />
              ))
            }
          
          
        </Grid.Column>
      </Grid>
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
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
