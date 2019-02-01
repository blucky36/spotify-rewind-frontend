import React, {Component} from 'react'
import {Link} from "react-router-dom"
import Playlist from './Playlist'

class AvailablePlaylists extends Component {
  state = {...this.props.state}
  async componentDidMount(){
    //we make an api call to populate the database
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
    this.setState({...this.state,playlistsData,userData,playlists:playlistsData.items},()=>{console.log(this.state.playlists);})
  }
  render(){
    return(
    <div>
      <div className = "page-header">
        <div>
           <h4 className="text-center">
              Spotify Rewind
              <Link to ="/" className="btn btn-primary">Logout</Link>
              <p className="text-left">Hello "yourName"</p>
           </h4>
         </div>
           <div className="col-md-4 center-block">
              <button type="button" class="btn btn-primary">Add a new playlist</button>
              </div>
            <ul className="list-group">
              {this.state.playlists.map(playlist=><Playlist playlist = {playlist}/>)}
            </ul>
        </div>
    </div>
    )
  }
}
