import React, { Component } from 'react';
import {Link} from "react-router-dom"

class PlaylistSidebar extends Component {

  state = {
    currentPlaylistId:''
  }
    componentDidMount = async () => {
      this.setState({currentPlaylistId:this.props.currentPlaylistId})
    }

  render() {
    return (
      <ul style={{listStyleType:'none'}}>
      {this.props.playlists.map((playlist,i) => {
        return (
          <li key = {i}>
            <Link key = {i} onClick = {()=>{this.props.changeState(playlist.spotify_playlist_id)}} to={`/detailedplaylist/${playlist["spotify_playlist_id"]}`} {...this.props.currentPlaylistId===playlist['spotify_playlist_id']? {style:{paddingLeft:10},className:'playlist playlist-current'}: {className:'playlist',style:{paddingLeft:13}} } >
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
