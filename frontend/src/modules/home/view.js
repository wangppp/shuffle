import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getProducts } from './actions';
import { Link, Route, withRouter } from 'react-router-dom';
import { loginRequiredWrapper, RouteWithSubroutes } from '../../components/loginWapper';

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
    return (
      <div>
        <Link style={{margin: "10px"}} className="dashboard-link" to="/">Index</Link>
        <Link style={{margin: "10px"}} className="dashboard-link" to="/home/articles">Articles</Link>
        <Link style={{margin: "10px"}} className="dashboard-link" to="/home/subscription">Subscription</Link>
        <Link style={{margin: "10px"}} className="dashboard-link" to="/home/statistics">Statistics</Link>
        <div> Hello, this is home! </div>

        {
          this.props.routes.map((route, i) => (
            <RouteWithSubroutes {...route} key={i} />
          ))
        }
        
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
