import React, { Component } from 'react';
import {Link} from "react-router-dom"

class PlaylistSidebar extends Component {

  state = {
    playlists: [],
    currentPlaylistId:''
  }
    componentDidMount = async () => {
      const userId = JSON.parse(localStorage.getItem("token"))
      const playlists = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${userId.userId}/playlists`).then(data=>data.json())
      this.setState({playlists, currentPlaylistId:this.props.currentPlaylistId})
    }

  render() {
    return (
      <ul style={{listStyleType:'none'}}>
      {this.state.playlists.map((playlist,i) => {
        return (
          <li key = {i}>
            <Link key = {i} onClick = {()=>{this.props.changeState(playlist.spotify_playlist_id)}} to={`/compare/${playlist["spotify_playlist_id"]}`} {...this.props.currentPlaylistId===playlist['spotify_playlist_id']? {style:{paddingLeft:10},className:'playlist playlist-current'}: {className:'playlist',style:{paddingLeft:13}} } >
              {playlist.name}
            </Link>
          </li>
        )
      })}

      </ul>
    );
  }

}

export default PlaylistSidebar;
