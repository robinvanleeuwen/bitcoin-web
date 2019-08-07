import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { storePrice } from '../redux-store/actions'

var classNames = require('classnames');

function mapStateToProps(storeState) {
  return {
    store: storeState
  }
}

class Ticker extends Component {

  state = {
    price: {},
  }

  static contextTypes = {
    store: PropTypes.object
  }
  
  constructor(props) {
    super(props);
    this.initialize_websocket();
  }

  initialize_websocket() {

    var socket = new WebSocket('wss://ws.kraken.com');
    var self = this

    socket.onopen = function() {
      
      const payload = {
        event: "subscribe",
        pair: [self.props.pair],
        subscription: {
          name: "ticker"
        }
      }
      socket.send(JSON.stringify(payload));
    }

    socket.onmessage = (msg) => {
      
      var data = JSON.parse(msg.data);
      
      if(Array.isArray(data) && data[2] === "ticker" && data[3] === this.props.pair) {
        
        this.props.storePrice(data[1].c[0])
      }
    }
  }

  render = () => {

    var clsName = classNames({
      'dashboard-item': true,
      'background-lightblue': this.props.store.price.movement === "",
      'background-green': this.props.store.price.movement === "up",
      'background-red': this.props.store.price.movement === "down",
    })

    return (
      <div className={clsName}>
        <span id="priceBtcEur"><h1>{parseFloat(this.props.store.price.value).toFixed(2)}</h1></span>
      </div>
    )
  }
}

const mapDispatchToProps = {
  storePrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticker);
