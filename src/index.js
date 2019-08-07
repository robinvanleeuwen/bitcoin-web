import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {Route, BrowserRouter} from 'react-router-dom'

import store from './redux-store' 
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Test from './components/Test'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Logout from './components/Logout'
import PrivateRoute from './PrivateRoute'

const container = {
  display: "absolute",
  lign: "center"
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter> 
      <Navbar />
      <div style={container}>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
