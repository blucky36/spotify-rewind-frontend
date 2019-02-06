import React from "react"

const Track = (props) => (

  <tr>
    <th scope="row">{props.track.track.id}</th>
    <td><img src = {props.track.track.album.images.length > 0 ? `${props.track.track.album.images[0].url}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" className = "track"/></td>
    <td>{props.track.track.name}</td>
    <td>{props.track.track.artists[0].name}</td>
    <td>
    </td>
  </tr>
)

export default Track
