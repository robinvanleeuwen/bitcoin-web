import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { storeBalance } from '../redux-store/actions'
import axios from 'axios'

function mapStateToProps(storeState) {
  return {
    store: storeState
  }
}

function mapDispatchToProps() {
  return {
    storeBalance: storeBalance
  }
}

function getBalance(context, username, token) {
  const url = 'http://127.0.0.1:5000/account/balance'
  const payload = {
    username: username, 
    token: token
  }
  axios.post(url, payload).then(
    (response) => {
      context.setState({isLoading: false})

      if (response.data.error !== "") {
        context.setState({isError: true})
        context.setState({errorMessage: response.data.error})
      }
      context.setState({balance: response.data.balance})
    }
  )
}

class OpenBalance extends Component {

  state = {
    balance: {
      total: {
        "EUR": 0.00,
        "XBT": 0.00
      },
      available: {
        "EUR": 0.00,
        "XBT": 0.00
      }
    }
  }

  constructor(props) {
    super(props);
    this.state.isLoading = true;
    getBalance(this, 'banana', this.props.store.token)
  }

  render() {

    if (this.state.isLoading) {
      return (<img width='50px' alt='Loading...' src={require('../static/ajax-loading.gif')} />)
    }

    if (this.state.isError) {
      return (<div><img width='30px' alt='Error' src={require('../static/error.jpg')} />{this.state.errorMessage}</div>)
    }

    var clsName = classNames({
      'dashboard-item': true,
    })

    const logo = {
      EUR: require('../static/logo_euro-150x150.png'),
      XBT: require('../static/logo_bitcoin-180x180.png')
    }

    return (
      <div style={this.props.style}>
          <table align='center'>
            <tbody>
            <tr>
              <td><b>Total</b></td>
              { 
                Object.keys(this.state.balance.total).map((o,i) => {
                    return (<td key={'total-'+o}><img src={logo[o]} alt='Currency' width='15px' /> {parseFloat(this.state.balance.total[o]).toFixed(6)}</td>)
                  }
                )
              }
            </tr>
            <tr>
              <td><b>Available</b></td>
              { 
                Object.keys(this.state.balance.available).map((o,i) => 
                  (<td key={'avail-'+o}><img src={logo[o]} alt='Currency' width='15px' /> {parseFloat(this.state.balance.available[o]).toFixed(6)}</td>)
                )
              }
            </tr>
          </tbody>
        </table>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenBalance);