import React, { Component } from 'react';

class PlaylistSidebar extends Component {

  state = {
    playlists: []
  }
    componentDidMount = async () => {
      const userId = this.props.id
      const playlistsResponse = await fetch(`http://localhost:3005/api/users/${userId}/playlists`)
      const playlists = await playlistsResponse.json()

      this.setState({playlists})
    }

  render() {
    return (
      <p>
      {this.state.playlists.map(playlist => {
        return playlist.name
      })}

      </p>
    );
  }

}

export default PlaylistSidebar;
