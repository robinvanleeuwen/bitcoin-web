import React, { Component } from 'react'
import { connect } from 'react-redux'

class Order extends Component {

  render() {
  
    return (
      <div id='order' style={this.props.style}> 
          This is where the orders are done
      </div>
    )
  }

}

export default Order
