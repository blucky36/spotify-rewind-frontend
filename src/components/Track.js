import React from "react"

const Track = (props) => (
  <tr>
    <th scope="row">{props.track.track.id}</th>
    <td><img src = {props.track.track.album.images.length > 0 ? `${props.track.track.album.images[0].url}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" className = "track"/></td>
    <td>{props.track.track.name}</td>
    <td>{props.track.track.artists[0].name}</td>
    <td>
      <audio id="player">
        <source src={`${props.track.track.preview_url}`} type="audio/mp3"/>
      </audio>
        <div>
          <button onClick={()=>{console.log("yeet");document.getElementById('player').play()}}>Play</button>
          <button onClick={()=>{document.getElementById('player').pause()}}>Pause</button>
          <button onClick={()=>{document.getElementById('player').volume += 0.1}}>Vol +</button>
          <button onClick={()=>{document.getElementById('player').volume -= 0.1}}>Vol -</button>
        </div>
    </td>
  </tr>
)

export default Track
