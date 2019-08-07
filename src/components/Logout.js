import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {storeToken} from '../redux-store/actions'
import {connect} from 'react-redux'

function mapStateToProps(storeState) {
  return {
    store: storeState
  }
}
function mapDispatchToProps(dispatch)  {
  return {
    storeToken: (token) => dispatch(storeToken(token)),
  }
};

class Logout extends Component {

  render() {
    if(this.props.store.token !== "") {
      this.props.storeToken("")
    }
    return (<Redirect to="/"></Redirect>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)