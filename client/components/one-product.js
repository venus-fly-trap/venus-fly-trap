import React from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store'

class OneProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProduct()
  }

  render() {
    const product = this.props.product

    return <div>{product.name}</div>
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.selectedProduct
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProduct: () => {
      const productId = ownProps.match.params.productId
      dispatch(fetchOneProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneProduct)
