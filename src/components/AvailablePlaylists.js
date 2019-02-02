import React, {Component} from 'react'
import {Link} from "react-router-dom"
import Playlist from './Playlist'
import Navbar from "./Navbar.js"

export default class AvailablePlaylists extends Component {

  async componentDidMount(){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let userData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let playlistsData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    console.log(userData)
    console.log(playlistsData);
    this.props.setMain(playlistsData,userData)
  }

  render(){
    return(
      <div>
      <Navbar navState = {{avatar:this.props.state.avatar,name:this.props.state.userData.display_name}}/>
        <div>
        </div>
        <div className="col-md-4 center-block">
          <button type="button" className="btn btn-primary">Add a new playlist</button>
        </div>
        <ul className="list-group">
          {this.props.state.playlists.map((playlist,i)=><Playlist key={i} playlist = {playlist} select={this.props.selectPlaylist}/>)}
        </ul>
      </div>
    )
  }
}
