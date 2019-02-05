import React, {Component} from 'react'
import Playlist from './Playlist'

export default class AvailablePlaylists extends Component {

  async componentDidMount(){
    this.props.compMount()
    this.props.compMountBack()
  }

  noPlaylists = () => {
    return (<div style={{width:'100%', fontStyle:'italic'}} className='d-inline-flex p-2 justify-content-center'><h4>You have no playlists to back up!</h4></div>)
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
        <div className='playlist-container col-6 offset-md-3'>
          {this.props.state.playlists.length > 0 ?this.props.state.playlists.map((playlist,i)=><Playlist key={i} playlist = {playlist} select={this.props.selectPlaylist}/>):this.noPlaylists()}
        </div>
      </div>
    )
  }
}
