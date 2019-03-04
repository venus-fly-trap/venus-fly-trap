import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store, {fetchAllProducts, fetchAllUsers} from '../store'
import axios from 'axios'
class AdminPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchUsers()
    // const {data} = await axios.get('/api/users')
    // console.log(data, "TEST")
    // store.dispatch(fetchAllUsers(data))
  }

  render() {
    const products = this.props.products
    const users = this.props.user
    console.log(users)
    return (
      <div>
        <h3> All Products </h3>
        {products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </div>
        ))}
        <h3> All Users </h3>
        {/* {users.map(user => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </div>
        ))}  */}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.product.allProducts,
    users: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchAllProducts())
    },
    fetchUsers: () => {
      dispatch(fetchAllUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
