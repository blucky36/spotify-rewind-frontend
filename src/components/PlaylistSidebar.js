import React, { Component } from 'react';

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
      <ul style={{listStyleType:'none'}}>
      {this.state.playlists.map(playlist => {
        return (<li {...this.props.currentPlaylistId===playlist['spotify_playlist_id']? {style:{fontWeight:900, textDecoration:'underline'}}: {style:{fontWeight:100}}} >{playlist.name}</li>)
      })}

    </ul>
    );
  }

}

export default PlaylistSidebar;
