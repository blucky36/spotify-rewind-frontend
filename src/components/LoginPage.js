import React, {Component, Fragment} from 'react'
import {Link} from "react-router-dom"

class LoginPage extends Component {

  login () {

  }

  render(){
    return(
      <Fragment>
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="loginTitle"> SPOTIFY REWIND </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <a href = {`${process.env.REACT_APP_BACKEND_API}/auth/spotify`} className="btn btn-primary loginButton">Login</a>
          </div>
          <div className="col-4"></div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <p>
              You have reached the login page, I swear I will put something here eventually
            </p>
          </div>
        </div>
      </Fragment>

    )
  }
}

export default LoginPage
