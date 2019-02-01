import React, {Component} from 'react'
import {Link} from "react-router-dom"

class Playlist extends Component {
  render(){
    return(
      <div>
        <ul>

        <li className="list-group-item"><Link to = "/detailedplaylist" className="btn btn-primary loginButton" onClick={this.setState({...this.state.selectedPlaylist, this.props.playlist.name}),console.log("HEY THIS ONE IS",this.state.selectedPlaylist)}>{this.props.playlist.name}</Link> </li>
        </ul>
      </div>
    )
  }
}

export default Playlist
