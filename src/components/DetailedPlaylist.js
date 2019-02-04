import React, {Component} from 'react'
import Track from "./Track.js"

class DetailedPlayliest extends Component {

  async componentDidMount(){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let urlSplit = window.location.href.split("/")
    let playlistId = urlSplit[urlSplit.length-1]
    let trackData = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=0&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackArray = trackData.items
    if(trackData.total > 100){
      let str = trackData.total.toString(),len
      if(trackData.total >= 100){
        len = str.split("")[0]
      }
      if(trackData.total >= 1000){
        len = str.split("")[0]+str.split("")[1]
      }
      if(trackData.total >= 10000){
        len = str.split("")[0]+str.split("")[1]+str.split("")[2]
      }
      for(let i = 1; i <= Number(len); i++){
        trackData = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${i}00&limit=100`,{
          headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
        }).then(data=>data.json())
        trackArray = trackArray.concat(trackData.items)
      }
    }
    console.log(trackArray,"playlistData")
    let backendUserData = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}`).then(data=>data.json())
    // await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${backendUserData.id}/playlists`,
    //   {
    //     method:"post",
    //     headers: {"Content-Type": "application/json","Accept": "application/json"},
    //     body:JSON.stringify({
    //       spotify_playlist_id:playlistId,
    //       name:this.props.state.selected.name,
    //       notes:"oibruv",
    //       trackArray:trackArray
    //     })
    //   }
    // )
    this.props.grabTracks(trackArray)
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-2">
            <button  type = "button" className="btn btn-primary">Select Version</button>
          </div>
          <div className="col-8"></div>
          <div className = "col-2"></div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cover</th>
              <th scope="col">Song</th>
              <th scope="col">Artist</th>
              <th scope="col">Preview</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tracks.map((track,i)=><Track key = {i} index = {i} track = {track}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DetailedPlayliest
