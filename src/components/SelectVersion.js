import React from "react"
import moment from "moment"

const SelectVersion = (props) => {
  const handleClick = async (event) => {
    event.persist()
    let tokenObjChange = JSON.parse(localStorage.getItem("token"))
    let currentPlaylistIdChange = window.location.href.split('/').slice(-1)[0]
    let versionTracksChange = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObjChange.userId}/playlists/${currentPlaylistIdChange}/versions/${event.target.value}`).then(data=>data.json())
    props.grabTracks(versionTracksChange,true)
    props.setCurrentPlaylistTimeStamp(event.target.dataset.timestamp)
    props.enableRestoreButton()
    props.changeVersionId(event.target.value)
  }
  return (
    <li onClick = {(e)=>{handleClick(e)}} value={`${props.version.id}`} style={{paddingLeft:10}} data-timestamp={props.version.created_at} {...props.currentVersionId===props.version.id ? {className:"playlist playlist-current"} : {className:"playlist"}}>
      <i className="fa fa-cloud-download"></i> {moment(props.version.created_at).format("MMM Do YY h:mm a")}
    </li>
  )
}

export default SelectVersion
