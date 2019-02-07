import React, { Component } from 'react';
import {Switch,Route,BrowserRouter as Router} from "react-router-dom"
import LoginPage from './components/LoginPage'
import AvailablePlaylists from './components/AvailablePlaylists'
import DetailedPlaylist from './components/DetailedPlaylist.js'
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
    avatar:"",
    fullBackend:{},
    awaitingAvailable:false,
    currentVersionId:1,
    playlistVersionArray:[],
    currentPlaylistId:"",
    currentPlaylistName:"",
    backedPlaylists:[],
    areVersion:false,
    arePlaylist:false
  }

  async changeDetailPlaylist(playlists){
    this.setState({...this.state,playlists})
  }

  async setVersions(playlistVersionArray){
    await this.setState({...this.state,playlistVersionArray})
  }

  async changeDetailVersion(){

  }

  changeCurrentPlaylistId(currentPlaylistId,currentPlaylistName,arePlaylist = false){
    this.setState({...this.state,currentPlaylistId,currentPlaylistName,arePlaylist})
  }


  setMain(playlistsData,userData,playlists){
    this.setState({...this.state,playlistsData,userData,playlists,avatar:userData.images[0].url, awaitingAvailable:false})
  }

  async selectPlaylist(selectedObj){
    await this.setState({...this.state,selected:selectedObj})
  }

  grabTracks(array,bool=false){
    this.setState({...this.state,selectedPlaylistTracks:array,areVersion:bool})
  }

  async postPlaylist(trackArray){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/playlists`,
      {
        method:"post",
        headers: {"Content-Type": "application/json","Accept": "application/json"},
        body:JSON.stringify({
          spotify_playlist_id:this.state.selected.id,
          name:this.state.selected.name,
          notes:"oibruv",
          snapshot_id:this.state.selected.snapshot_id,
          trackArray:trackArray
        })
      }
    )
  }

  async postVersion(trackArray){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/playlists/${this.state.selected.id}/versions`,
      {
        method:"post",
        headers:{"Content-Type": "application/json","Accept": "application/json"},
        body:JSON.stringify({
          snapshot_id:this.state.selected.snapshot_id,
          notes:"oibruvOIOIOIOIOI",
          trackArray
        })
      }
    ).then(data => data.json())
    let backVersions = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/playlists/${this.state.selected.id}/versions`).then(data=>data.json())
    return backVersions
  }

  async compMountAvailable(){
    await this.setState({awaitingAvailable:true})
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let userData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())

    let playlistData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists?limit=50`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let playlists = playlistData.items
    let remaining = playlistData.total - playlistData.offset
    let off = 50
    while(remaining > 0){
      playlistData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists?offset=${off}&limit=50`,{
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
      }).then(data=>data.json())
      off += 50
      remaining = playlistData.total - playlistData.offset
      playlists = playlists.concat(playlistData.items)
    }
    this.setMain(playlistData,userData,playlists)
  }

  async compMountDetailed(pid){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let playlistId = window.location.href.split('/').slice(-1)[0]
    console.log('starting spotify loop')
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
        console.log('looping spotify requests',i)
        trackData = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${i}00&limit=100`,{
          headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
        }).then(data=>data.json())
        trackArray = trackArray.concat(trackData.items)
      }
    }
    await this.postPlaylist(trackArray)
    await this.grabTracks(trackArray)
    let backVersions = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/playlists/${playlistId}/versions`).then(data=>data.json())
    let snapshotIdArr = backVersions.map(ver=>ver.snapshot_id)
    if(!snapshotIdArr.includes(this.state.selected.snapshot_id)){
      backVersions = await this.postVersion(trackArray)
      console.log("success");
    }
    let backedPlaylists = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/playlists`).then(data=>data.json())
    this.setState({backedPlaylists:{...backedPlaylists, loadingPlaylists:false}},()=>{console.log(this.state.backedPlaylists)})
    return {backedPlaylists, backVersions }
  }

  async compMountBack(){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let everything = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/all`).then(data=>data.json())
    this.setState({...this.state,fullBackend:everything})
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setstate(() => ({
      playlistsData: {},
      playlists:[],
      userData: {},
      selected: {},
      selectedPlaylistTracks:[],
      avatar:"",
      fullBackend:{},
      awaitingAvailable:false,
      currentVersionId:1,
      playlistVersionArray:[],
      currentPlaylistId:"",
      currentPlaylistName:"",
      backedPlaylists:[],
      areVersion:false,
      arePlaylist:false
    }))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className ="container-fluid">
            <Navbar logout={this.logout} navState = {{avatar:this.state.avatar,name:this.state.userData.display_name}} />
            <Switch>
              <Route exact path = "/" render={()=><LoginPage/>}/>
              <Route exact path = "/availableplaylists" render={()=><AvailablePlaylists compMount = {this.compMountAvailable.bind(this)} selectPlaylist = {this.selectPlaylist.bind(this)} state={this.state} compMountBack={this.compMountBack.bind(this)} compMountDetailed = {this.compMountDetailed.bind(this)}/>}/>
              <Route path = "/detailedplaylist/:id" render={()=><DetailedPlaylist compMountDetailed={() => this.compMountDetailed()} changePLID = {this.changeCurrentPlaylistId.bind(this)} state = {this.state} grabTracks = {this.grabTracks.bind(this)} tracks = {this.state.selectedPlaylistTracks} backedPlaylists={this.state.backedPlaylists} setVersions={this.setVersions.bind(this)} />}/>
              <Route path = "/handlelogin" render={()=><HandleLogin/>}/>
              <Route path= '/compare' render={()=> <ComparePlaylist id={this.state.userData.id} selectedTracks = {this.state.selectedPlaylistTracks} fullBackend = {this.state.fullBackend} getFull={this.compMountBack.bind(this)}/>} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
