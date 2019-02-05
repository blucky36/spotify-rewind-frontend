import React from 'react'
import {Link} from "react-router-dom"

const Playlist = (props) => (
  <div className = "row">
      <Link to = {`/detailedplaylist/${props.playlist.id}`} className="playlist playlist-available" onClick={()=>{props.select(props.playlist)}}>{props.playlist.name}</Link>
  </div>
)

export default Playlist
