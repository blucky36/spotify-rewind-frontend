import React, {Component} from 'react'
import {Link} from "react-router-dom"
import Playlist from './Playlist'
import Navbar from "./Navbar.js"

export default class AvailablePlaylists extends Component {
  state = {...this.props.state}
  async componentDidMount(){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    console.log(tokenObj)
    let userData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let playlistsData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    console.log(userData)
    console.log(playlistsData);
    this.setState({...this.state,playlistsData,userData,playlists:playlistsData.items})
  }

  selectPlaylist(selectedObj){
    this.setState({...this.state,selected:selectedObj})
  }

  render(){
    return(
    <div>
      <Navbar/>
      <div>
        <p className="text-left">Hello {this.state.userData.display_name}</p>
      </div>
      <div className="col-md-4 center-block">
        <button type="button" className="btn btn-primary">Add a new playlist</button>
      </div>
      <ul className="list-group">
        {this.state.playlists.map((playlist,i)=><Playlist key={i} playlist = {playlist} select={this.selectPlaylist.bind(this)}/>)}
      </ul>
    </div>
    )
  }
}
