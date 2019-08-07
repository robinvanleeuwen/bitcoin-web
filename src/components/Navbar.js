import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginLink from './LoginLink'

const navbar = {
  display: "flex",
  background: "#123456",
}
const navItem = {
  flex: 1,
  textAlign: "center",
}

class Navbar extends Component {

  render() {
  
    return (
      <div id='navbar' style={navbar}> 
        <div style={navItem}><Link to="/">Home</Link></div>
        <div style={navItem}><Link to="/test">Test</Link></div>
        <div style={navItem}><Link to="/dashboard">Dashboard</Link></div>
        <div style={navItem}><LoginLink /></div>
      </div>
    )
  }

}

export default Navbar
