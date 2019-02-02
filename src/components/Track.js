import React from "react"

const Track = (props) => (
  <tr>
    <th scope="row">{props.track.track.id}</th>
    <td><img src = {`${props.track.track.album.images[2].url}`} className = "track"/></td>
    <td>{props.track.track.name}</td>
    <td>{props.track.track.artists[0].name}</td>
    <td>
      <audio controls>
        <source src={`${props.track.track.preview_url}`} type="audio/mp3"/>
      </audio>
    </td>
  </tr>
)

export default Track
