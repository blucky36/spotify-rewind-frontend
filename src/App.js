import React, { Component } from 'react';
import {Switch,Route,BrowserRouter as Router} from "react-router-dom"
import LoginPage from './components/LoginPage'
import AvailablePlaylists from './components/AvailablePlaylists'
import DetailedPlaylist from './components/DetailedPlaylist'
import HandleLogin from './components/HandleLogin'
import Navbar from "./components/Navbar.js"

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

  async postPlaylist(trackArray){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let backendUserData = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}`).then(data=>data.json())
    console.log("here");
    await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${backendUserData.id}/playlists`,
      {
        method:"post",
        headers: {"Content-Type": "application/json","Accept": "application/json"},
        body:JSON.stringify({
          spotify_playlist_id:this.state.selected.id,
          name:this.state.selected.name,
          notes:"oibruv",
          trackArray:trackArray
        })
      }
    )
    console.log("done?");
  }

  async compMountDetailed(){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let urlSplit = window.location.href.split("/")
    let playlistId = urlSplit[urlSplit.length-1]
    let trackData = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=0&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackArray = trackData.items
    if(trackData.total > 100){
      let str = trackData.total.toString(),len
      if(trackData.total >= 100){
        len = str.split("")[0]
      }
      if(trackData.total >= 1000){
        len = str.split("")[0]+str.split("")[1]
      }
      if(trackData.total >= 10000){
        len = str.split("")[0]+str.split("")[1]+str.split("")[2]
      }
      for(let i = 1; i <= Number(len); i++){
        trackData = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${i}00&limit=100`,{
          headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
        }).then(data=>data.json())
        trackArray = trackArray.concat(trackData.items)
      }
    }
    this.postPlaylist(trackArray)
    this.grabTracks(trackArray)
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
              <Route path = "/detailedplaylist/:id" render={()=><DetailedPlaylist compMount = {this.compMountDetailed.bind(this)} state = {this.state} grabTracks = {this.grabTracks.bind(this)} tracks = {this.state.selectedPlaylistTracks}/>}/>
              <Route path = "/handlelogin" render={()=><HandleLogin/>}/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
