import React, { Component } from 'react';
import {Switch,Route,BrowserRouter as Router} from "react-router-dom"
import LoginPage from './components/LoginPage'
import AvailablePlaylists from './components/AvailablePlaylists'
import DetailedPlaylist from './components/DetailedPlaylist'
import HandleLogin from './components/HandleLogin'
import Playlist from './components/Playlist'

class App extends Component {

  state = {
    playlistsData: {},
    playlists:[],
    userData: {},
    selected: {}
  }

  selectPlaylist(selectedObj){
    this.setState({...this.state,selected:selectedObj})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className ="container-fluid">
            <Switch>
              <Route exact path = "/" render={()=><LoginPage/>}/>
              <Route exact path = "/availableplaylists" render={()=><AvailablePlaylists selectPlaylist = {this.selectPlaylist.bind(this)}state={this.state}/>}/>
              <Route path = "/detailedplaylist" render={()=><DetailedPlaylist/>}/>
              <Route path = "/handlelogin" render={()=><HandleLogin/>}/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
