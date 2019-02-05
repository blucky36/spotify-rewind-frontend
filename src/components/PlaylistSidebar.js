import React, { Component } from 'react';
import {Link} from "react-router-dom"

class PlaylistSidebar extends Component {

  state = {
    playlists: [],
    currentPlaylistId:''
  }
    componentDidMount = async () => {
      const userId = this.props.id
      const playlistsResponse = await fetch(`http://localhost:3005/api/users/${userId}/playlists`)
      const playlists = await playlistsResponse.json()

      this.setState({playlists, currentPlaylistId:this.props.currentPlaylistId})
    }

  render() {
    return (
      <ul style={{listStyleType:'none'}} className='playlist-sidebar'>
      {this.state.playlists.map(playlist => {
        return (
          <li>
            <Link {...this.props.currentPlaylistId===playlist['spotify_playlist_id']? {style:{paddingLeft:10},className:'playlist playlist-current'}: {className:'playlist',style:{paddingLeft:13}} } onClick = {()=>{this.props.changeState(playlist.spotify_playlist_id)}} to={`/compare/${playlist["spotify_playlist_id"]}`}>
              {playlist.name}
            </Link>
      </li>)
      })}

    </ul>
    );
  }

}

export default PlaylistSidebar;
