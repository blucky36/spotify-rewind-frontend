import React from 'react'
import {Link} from "react-router-dom"

const Playlist = (props) => (
  <div className = "row">
    <div className = "col-2"></div>
    <div className = "col-8">
      <Link to = {`/detailedplaylist/${props.playlist.id}`} className="playlist playlist-available" onClick={()=>{props.select(props.playlist)}}>{props.playlist.name}</Link>
    </div>
    <div className = "col-2"></div>
  </div>
)

export default Playlist
