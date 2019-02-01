import React, {Component} from 'react'

class Playlist extends Component {
  render(){
    return(
      <div>
        <ul>
        <li className="list-group-item">{this.props.playlist.name} </li>
        </ul>
      </div>
    )
  }
}

export default Playlist
