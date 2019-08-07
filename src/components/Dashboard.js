import React, { Component } from 'react'
import {connect} from 'react-redux'
import Ticker from './Ticker'
import OpenBalance from './OpenBalance'
import RTRGraph from './RTRGraph'
import Order from './Order'

function mapStoreToProps(storeState) {
  return {
    store: storeState
  }
}

const orderStyle = {
  width: "300px",
  float: "left"
}
const openBalanceStyle = {
  width: "300px",
  float: "left"
}

class Dashboard extends Component {

  render() {

    return (
      <div>
        <Ticker key="ticker" pair="XBT/EUR"></Ticker>
        <RTRGraph key="linegraph" pair="XBT/EUR" interval="1"></RTRGraph>
        <div>
          <OpenBalance style={openBalanceStyle} key="openbalance" />
          <Order style={orderStyle} />
        </div>
      </div>
    )
  }
}

export default connect(mapStoreToProps, null)(Dashboard);