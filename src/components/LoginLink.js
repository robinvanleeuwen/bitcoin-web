import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function mapStateToProps(storeState) {
  return {
    store: storeState
  }
}

class LoginLink extends Component {

  render() {

    var loginLink = "<div></div>"
    if (this.props.store.token === "") {
      loginLink = (<Link to='/login'>Login</Link>)
    } 
    else{ 
      loginLink = (<Link to='/logout'>Logout</Link>)
    }

    return (
      <div>{loginLink}</div>
    )
  }
}

export default connect(mapStateToProps, null)(LoginLink);