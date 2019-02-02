import React, {Component,Fragment} from 'react'
import {Link} from "react-router-dom"
import Navbar from "./Navbar.js"
import Track from "./Track.js"

class DetailedPlayliest extends Component {

  async componentDidMount(){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let urlSplit = window.location.href.split("/")
    let playlistId = urlSplit[urlSplit.length-1]
    let trackData = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=0&limit=100`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    console.log(trackData,"playlistData");
    this.props.grabTracks(trackData.items)
  }

  render(){
    return(
      <div>
        <Navbar navState = {this.props.navState}/>
        <div className="row">
          <div className="col-2">
            <button  type = "button" className="btn btn-primary">Backup Now</button>
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
            {this.props.tracks.map((track,i)=><Track key = {i} track = {track}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DetailedPlayliest
