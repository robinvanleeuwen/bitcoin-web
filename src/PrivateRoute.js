import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import useAuth from './context/auth'

function mapStateToProps(storeState) {
  return {store: storeState}
}

const PrivateRoute = ({ component: Component, store, ...rest }) => {
  
  console.log('store: ', store);
  var banaan = false;
  if (store.token !== "") {
    banaan = true;
  }
  return (
    <Route
      {...rest}
      render={props => (
        banaan
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  );

}
export default connect(mapStateToProps, null)(PrivateRoute)