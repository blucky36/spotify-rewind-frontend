import React, {Component} from 'react'
import {Link} from "react-router-dom"

class LoginPage extends Component {
  render(){
    return(
      <div>
      <h1 className="loginTitle"> SPOTIFY REWIND </h1>
        <a href = "http://localhost:3005/auth/spotify" className="btn btn-primary">Login</a>
        <div>
        <p>
          You have reached the login page, I swear I will put something here eventually
         </p>
         </div>
      </div>
    )
  }
}

export default LoginPage
