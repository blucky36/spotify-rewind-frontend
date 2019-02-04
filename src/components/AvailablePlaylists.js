import React, {Component} from 'react'
import Playlist from './Playlist'

export default class AvailablePlaylists extends Component {

  async componentDidMount(){
    this.props.compMount()
    this.props.compMountBack()
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2">
            <button type="button" className="btn btn-primary">Add a new playlist</button>
          </div>
          <div className = "col-6"><h3>Choose a playlist you want to backup</h3></div>
          <div className="col-2"></div>
        </div>
        {this.props.state.playlists.map((playlist,i)=><Playlist key={i} playlist = {playlist} select={this.props.selectPlaylist}/>)}
      </div>
    )
  }
}
