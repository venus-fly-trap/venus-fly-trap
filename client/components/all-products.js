import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products

    return (
      <div>
        <div className="products-container">
          <h1>Products</h1>
          {products.map(product => (
            <Link
              to={`/products/${product.id}`}
              className="products"
              key={product.id}
            >
              <img src={product.imageUrl} />
              <h3>{product.name}</h3>
              ${product.price / 100}
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchAllProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
