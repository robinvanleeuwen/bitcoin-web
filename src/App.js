import React, {Component} from 'react'
import {connect} from 'react-redux'
import './App.css';
import { Link } from 'react-router-dom'
import { storeToken } from './redux-store/actions'

function mapDispatchToProps(dispatch) {
  return {
    storeToken: (token) => {dispatch(storeToken(token))}
  }
};

function mapStoreToProps(storeState, jaja, nene) {
  console.log("StoreState: ", storeState);
  console.log("Jaja: ", jaja);
  console.log("Nene: ", nene);
  return {
    store: storeState
  }
}
class App extends Component {

  render() {
    console.log("App.render()")
    console.log("App.props: ", this)
    return (
      <div id='homepage'>
        <h2>Welcome to Bitcoin Dashboard</h2>
        <ul>
          <li><Link to='/login/'>Login</Link></li>
          <li><Link to='/dashboard/'>Dashboard</Link></li>
          <li><Link to='/test'>Test Page</Link></li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);