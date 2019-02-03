import React from "react"

const TrackCompare = (props) => (
  <tr>
    <td style={{color:props.track.track.color }} scope="row">{props.track.track.name || '-'}</td>
    <td style={{color:props.track.track.color }} scope="row">{props.track.track.artist || '-'}</td>
  </tr>
)

export default TrackCompare
