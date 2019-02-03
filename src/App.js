import React, { Component } from 'react';
import {Switch,Route,BrowserRouter as Router} from "react-router-dom"
import LoginPage from './components/LoginPage'
import AvailablePlaylists from './components/AvailablePlaylists'
import DetailedPlaylist from './components/DetailedPlaylist'
import HandleLogin from './components/HandleLogin'
import Navbar from "./components/Navbar.js"
import ComparePlaylist from './components/ComparePlaylist'

class App extends Component {

  state = {
    playlistsData: {},
    playlists:[],
    userData: {},
    selected: {},
    selectedPlaylistTracks:[],
    avatar:""
  }

  setMain(playlistsData,userData,playlistData2){
    let playlists = playlistsData.items.concat(playlistData2.items)
    this.setState({...this.state,playlistsData,userData,playlists,avatar:userData.images[0].url})
  }

  selectPlaylist(selectedObj){
    this.setState({...this.state,selected:selectedObj})
  }

  grabTracks(array){
    this.setState({...this.state,selectedPlaylistTracks:array})
  }

  createPlaylist = async (playlist) => {
    await fetch(`http://localhost:3005/api/users/${this.state.userData.id}/playlists`, {
      method: 'POST',
      body: JSON.stringify(playlist)
    })
    console.log('backed up playlist')
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className ="container-fluid">
            {this.state.avatar !== "" && <Navbar navState = {{avatar:this.state.avatar,name:this.state.userData.display_name}} />}
            <Switch>
              <Route exact path = "/" render={()=><LoginPage/>}/>
              <Route exact path = "/availableplaylists" render={()=><AvailablePlaylists setMain = {this.setMain.bind(this)} selectPlaylist = {this.selectPlaylist.bind(this)}state={this.state}/>}/>
              <Route path = "/detailedplaylist/:id" render={()=><DetailedPlaylist state = {this.state} grabTracks = {this.grabTracks.bind(this)} tracks = {this.state.selectedPlaylistTracks}/>}/>
              <Route path = "/handlelogin" render={()=><HandleLogin/>}/>
              <Route path= '/compare' render={()=> <ComparePlaylist id={this.state.userData.id}/>} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
