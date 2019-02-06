import React from "react"
import {Link} from "react-router-dom"
import moment from "moment"

const SelectVersion = (props) => {
  const handleClick = async (event) => {
    let tokenObjChange = JSON.parse(localStorage.getItem("token"))
    let currentPlaylistIdChange = window.location.href.split('/').slice(-1)[0]
    let versionTracksChange = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObjChange.userId}/playlists/${window.location.href.split("/")[window.location.href.split("/").length-1]}/versions/${event.target.value}`).then(data=>data.json())
    console.log(versionTracksChange)
    props.grabTracks(versionTracksChange,true)
  }
  return (
    <li onClick = {(e)=>{handleClick(e)}} value={`${props.version.id}`} className = "btn btn-secondary">
      {moment(props.version.created_at).format("MMM Do YY h:mm a")}
    </li>
  )
}

export default SelectVersion
