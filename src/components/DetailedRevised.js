import React,{Component,Fragment} from "react"
import Track from "./Track.js"
import PlaylistSidebar from "./PlaylistSidebar.js"
import SelectVersion from "./SelectVersion.js"
import { Link } from "react-router-dom"

export default class DetailedPlaylist extends Component {

  async componentDidMount(){
    console.log(this.props)
    let versions = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${this.props.state.userData.id}/playlists/${this.props.state.selected.id}/versions`).then(data=>data.json())
    this.props.setVersions(versions)
  }

  async handleSendToSpotify(){
    //post an array of uri's to spotify api
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let postPlaylist = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists`,
      {
        method:"post",
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`},
        body:JSON.stringify(
          {"name":`Backup of ${tokenObj.name} : ${tokenObj.name}`,"public":"false"}
        )
      }
    ).then(data=>data.json())
    console.log(postPlaylist)
  }


  render(){
    return(
      <div>
        <div className="row">
          <div className="col-2">
            {<button onClick={()=>{this.handleSendToSpotify()}}>Restore Version To Spotify</button>}
            <PlaylistSidebar id={this.props.state.userData.id} currentPlaylistId={this.props.state.currentPlaylistId} changeState={this.props.changePLID} playlists={this.props.state.backedPlaylists}/>
          </div>
          <div className="col-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Cover</th>
                  <th scope="col">Song</th>
                  <th scope="col">Artist</th>
                  <th scope="col">Preview</th>
                </tr>
              </thead>
              <tbody>
                {this.props.tracks.map((track,i)=><Track key = {i} index = {i} track = {track} bool={this.props.state.areVersion}/>)}
              </tbody>
            </table>
          </div>
          <div className = "col-2">
            <h4>Available Versions</h4>
            <ul>
              {this.props.state.playlistVersionArray.map((version,idx)=><SelectVersion grabTracks = {this.props.grabTracks} key = {idx} version={version}/>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
