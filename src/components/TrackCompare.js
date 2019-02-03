import React from "react"

const TrackCompare = (props) => (
  <tr>
    <td style={{color:props.track.track.color }} scope="row">{props.track.track.spotify_id || '-'}</td>
  </tr>
)

export default TrackCompare
