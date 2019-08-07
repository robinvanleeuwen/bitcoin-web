import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { storeToken } from '../redux-store/actions'
import {Card, Form, Button, FormGroup, FormControl} from 'react-bootstrap'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'

const buttonStyle = {
    margin: 2,
};

const formGroupStyle = {
  display: "relative", 
  align: "center",   
  marginBottom: 5,
};

const divStyle = {
  display: "relative",
  textAlign: "center",
  alignItems: 'center',
  marginTop: 10,
  marginLeft: 10,
};
const cardStyle = {
  backgroundColor: 'rgba(25,25,25,0.1)',
  paddingLeft: 5,
  paddingRight: 5,
  paddingTop: 5,
  width: 300,
};

class LoginForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      "loggedIn": false
    }
    
  }
  handleFormSubmit(e) {

    var payload = {
      username: this.state.email,
      password: this.state.password
    }
    var self = this;
    axios.post("http://localhost:5000/account/login", payload)
    .then((response) => {
      if (response.data.hasOwnProperty("error")) {
        console.log("Could not login")
        self.state.password = "";
      }
      else if (response.data.hasOwnProperty("token")) {
        this.setState({"email": ""})
        console.log(response.data.token)
        self.props.storeToken(response.data.token)
        this.setState({loggedIn: true})
      }
    });
  }

  render() {

    if (this.state.loggedIn) {
      return (<Redirect to="/"></Redirect>)
    }
    
    return (
    <div>
      <div style={divStyle} align="center"> 
        <Card style={cardStyle}>
          <Form id="loginForm">
            <FormGroup controlId="formEmail" style={formGroupStyle}>
              <FormControl type="email" placeholder="Email Address" 
              onChange={(e) => { this.setState({email: e.target.value}) }}
              /> 
            </FormGroup>
            <FormGroup controlId="formPassword" style={formGroupStyle}>
              <FormControl type="password" placeholder="Password" 
              onChange={(e) => { this.setState({password: e.target.value}) }}
              />
            </FormGroup>
            <FormGroup controlId="formSubmit" style={formGroupStyle}>
              <Button style={buttonStyle} onClick={(e) => this.handleFormSubmit(e)}>Login</Button>
              <Button style={buttonStyle} onClick={(e) => this.checkToken(e)}>Check</Button>
            </FormGroup>
          </Form>
        </Card>
      </div>
    </div>  
    )  
  }

}

function mapStoreToProps(storeState) {
  return {
    store: storeState
  }
}

function mapDispatchToProps(dispatch)  {
  return {
    storeToken: (token) => dispatch(storeToken(token)),
  }
};

export default connect(mapStoreToProps, mapDispatchToProps)(LoginForm);
