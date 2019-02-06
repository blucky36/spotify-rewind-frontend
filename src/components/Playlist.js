import React from 'react'
import {Link} from "react-router-dom"

const Playlist = (props) => {
  const handleClick = (e) => {
    props.select(props.playlist)
    props.detail(props.playlist.id)
  }
  return(
    <div className = "row">
        <Link to = {`/detailedplaylist/${props.playlist.id}`} className="playlist playlist-available" onClick={()=>{handleClick()}}>{props.playlist.name}</Link>
    </div>
  )
}

export default Playlist
