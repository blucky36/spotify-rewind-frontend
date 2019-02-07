import React, { Component } from 'react';
import {Link} from "react-router-dom"

class PlaylistSidebar extends Component {

  state = {
    playlists: [],
    currentPlaylistId:''
  }

  onClick = async (playlistId,name,bool) => {
    await this.props.changeState(playlistId,name,bool)
    await this.props.setCurrentPlaylistId()
  }
    componentDidMount = () => {
      const userId = this.props.id
      const playlists = this.props.playlists

      this.setState({playlists, currentPlaylistId:this.props.currentPlaylistId})
    }

  render() {
    return (
      <ul style={{listStyleType:'none'}}>
      {this.props.playlists.map((playlist,i) => {
        return (
          <li key = {i}>
            <Link key = {i} onClick = {()=>{this.onClick(playlist.spotify_playlist_id,playlist.name,true)}} to={`/detailedplaylist/${playlist["spotify_playlist_id"]}`} {...this.props.currentPlaylistId===playlist['spotify_playlist_id']? {style:{paddingLeft:10},className:'playlist playlist-current'}: {className:'playlist',style:{paddingLeft:13}} } >
              <i className="fa fa-music"></i> {playlist.name}
            </Link>
          </li>
        )
      })}

      </ul>
    );
  }

}

export default PlaylistSidebar;
