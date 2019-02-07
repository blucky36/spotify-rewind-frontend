import React, {Component, Fragment} from 'react'

class LoginPage extends Component {
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
            <a href = {`${process.env.REACT_APP_BACKEND_API}/auth/spotify`} className="btn btn-primary loginButton">Log in to Spotify</a>
          </div>
          <div className="col-4"></div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <div className = "row">
              <div className = "col-5"></div>
              <div className = "col-2 top" ><img src="./images/spotify_rewind_transparent.svg" width="50" height="50" alt=""/></div>
              <div className = "col-5"></div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default LoginPage
