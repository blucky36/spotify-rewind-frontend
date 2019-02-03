import React, {Component} from 'react'
import Playlist from './Playlist'

export default class AvailablePlaylists extends Component {

  async componentDidMount(){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let userData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let playlistsData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists?limit=50`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let playlistData2 = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists?offset=50&limit=50`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    console.log(userData)
    console.log(playlistsData);
    console.log(playlistData2);
    this.props.setMain(playlistsData,userData,playlistData2)
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 center-block">
            <button type="button" className="btn btn-primary">Add a new playlist</button>
          </div>
          <div className="col-2"></div>
        </div>
        {this.props.state.playlists.map((playlist,i)=><Playlist key={i} playlist = {playlist} select={this.props.selectPlaylist}/>)}
      </div>
    )
  }
}
