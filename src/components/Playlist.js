import React, {Component} from 'react'
import {Link} from "react-router-dom"

class Playlist extends Component {
  render(){
    return(
      <div>
        <ul>

        <li className="list-group-item"><Link to = "/detailedplaylist" className="btn btn-primary loginButton" onClick={()=>{this.props.select(this.props.playlist)}}>{this.props.playlist.name}</Link> </li>
        </ul>
      </div>
    )
  }
}

export default Playlist
