import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getProducts } from './actions';

function ProductList ({products}) {
  console.log(products);
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
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.props.getProducts();
  }
  render() {
    return (
      <div>
        <div> Hello, this is home! </div>
        <ProductList products={this.props.products} />
      </div>
    );
  }
} 

function mapStateToProps(store) {
  return {
    products: store.home.products
  }
}


function mapDispatchToProps(dispatch) {
  console.log("init")
  return {
    getProducts: () => {
      dispatch(getProducts())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);