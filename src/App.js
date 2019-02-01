import React, { Component } from 'react';
import {Switch,Route,BrowserRouter as Router} from "react-router-dom"
import LoginPage from './components/LoginPage'
import AvailablePlaylists from './components/AvailablePlaylists'
import DetailedPlaylist from './components/DetailedPlaylist'
import HandleLogin from './components/HandleLogin'

const url = "gonna put ur url here"

class App extends Component {

state = {
  playlist: []
}

// async handleLogin(){
//   await fetch(`${process.env.REACT_APP_BACKEND_API}/login`).then(data=>data.json())
//   console.log(token);
//   console.log(typeof token.token);

// }
 /*
  async componentDidMount(){
  const response = await fetch(url)
  const json = await response.json()
  this.setState({playlist:json})
  console.log(this.state.allMessages)
  }
    */

    render() {
      return (
        <div className="App">
          <Router>
            <div classsName ="container-fluid">
              <Switch>
                <Route exact path = "/" render={()=><LoginPage/>}/>
                <Route exact path = "/availableplaylists" render={()=><AvailablePlaylists/>}/>
                <Route path = "/detailedplaylist" render={()=><DetailedPlaylist/>}/>
                <Route path = "/handlelogin" render={()=><HandleLogin/>}/>
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }

export default App;
