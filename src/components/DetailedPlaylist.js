import React, {Component} from 'react'
import Track from "./Track.js"

class DetailedPlayliest extends Component {

  async componentDidMount(){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let urlSplit = window.location.href.split("/")
    let playlistId = urlSplit[urlSplit.length-1]

    //// i think this could be cleaned up to use a for loop based on the apiResponse.total (total number of songs in a playlist)...
    //// divide that number by 100, if there is a modulo do it that many times + 1, no modulo do it that many times....
    //// concat/push each response onto the original repeatedly...
    let trackData = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=0&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackData2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=100&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackData3 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=200&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackData4 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=300&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackData5 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=400&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackData6 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=500&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackData7 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=600&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackData8 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=700&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackData9 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=800&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackData10 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=900&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let trackArray = trackData.items.concat(trackData2.items).concat(trackData3.items).concat(trackData4.items).concat(trackData5.items).concat(trackData6.items).concat(trackData7.items).concat(trackData8.items).concat(trackData9.items).concat(trackData10.items)
    console.log(trackArray,"playlistData")
    console.log(this.props.state)
    let backendUserData = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}`).then(data=>data.json())
    await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${backendUserData.id}/playlists`,
      {
        method:"post",
        headers: {"Content-Type": "application/json","Accept": "application/json"},
        body:JSON.stringify({
          spotify_playlist_id:this.props.state.selected.id,
          name:this.props.state.selected.name,
          notes:"oibruv",
          trackArray:trackArray
        })
      }
    )
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
