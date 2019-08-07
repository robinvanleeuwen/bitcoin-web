import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

function mapStateToProps(storeState) {
  return {
    token: storeState.token
  }
}
class Home extends Component {

  render() {

    console.log("Home.js, context:", this.context)

    return (

    )
  }
}

export default connect(mapStateToProps, null)(Home);