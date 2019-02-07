import React from 'react'
import {Link} from "react-router-dom"

const Playlist = (props) => {
  const handleClick = async (e) => {
    await props.select(props.playlist)
  }
  return(
    <div className = "row">
        <Link to = {`/detailedplaylist/${props.playlist.id}`} className="playlist playlist-available" onClick={()=>{handleClick()}}><i className="fa fa-music"></i> {props.playlist.name}</Link>
    </div>
  )
}

export default Playlist
