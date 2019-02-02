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
    selected: {},
    selectedPlaylistTracks:[],
    avatar:""
  }

  setMain(playlistsData,userData){
    this.setState({...this.state,playlistsData,userData,playlists:playlistsData.items,avatar:userData.images[0].url})
  }

  selectPlaylist(selectedObj){
    this.setState({...this.state,selected:selectedObj})
  }

  grabTracks(array){
    this.setState({...this.state,selectedPlaylistTracks:array})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className ="container-fluid">
            <Switch>
              <Route exact path = "/" render={()=><LoginPage/>}/>
              <Route exact path = "/availableplaylists" render={()=><AvailablePlaylists setMain = {this.setMain.bind(this)} selectPlaylist = {this.selectPlaylist.bind(this)}state={this.state}/>}/>
              <Route path = "/detailedplaylist/:id" render={()=><DetailedPlaylist navState = {{avatar:this.state.avatar,name:this.state.userData.display_name}} grabTracks = {this.grabTracks.bind(this)} tracks = {this.state.selectedPlaylistTracks}/>}/>
              <Route path = "/handlelogin" render={()=><HandleLogin/>}/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
