import React,{Component,Fragment} from "react"
import Track from "./Track.js"
import PlaylistSidebar from "./PlaylistSidebar.js"
import SelectVersion from "./SelectVersion.js"
import { Link } from "react-router-dom"
import moment from "moment"

export default class DetailedPlaylist extends Component {

  async componentDidMount(){
    console.log(this.props.state.selectedPlaylistTracks);
    console.log(this.props)
    let versions = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${this.props.state.userData.id}/playlists/${this.props.state.selected.id}/versions`).then(data=>data.json())
    this.props.setVersions(versions)
  }

  async handleSendToSpotify(){
    let time = moment().format("ll h:mm a")
    let playlistName = this.props.state.arePlaylist?this.props.state.currentPlaylistName:this.props.state.selected.name
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let postPlaylist = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists`,
      {
        method:"post",
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`},
        body:JSON.stringify(
          {"name":`Backup of ${playlistName} : ${time}`,"public":"false"}
        )
      }
    ).then(data=>data.json())
    console.log(postPlaylist)
    let uriString = this.props.state.selectedPlaylistTracks.reduce((a,e,i)=>{
      let uri = this.props.state.areVersion ? e.spotify_uri.split(":").join("%3A")+"," : e.track.uri.split(":").join("%3A")+","
      a+=uri
      return a
    },"").slice(0,-1)
    console.log(uriString);
    await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists/${postPlaylist.id}/tracks?uris=${uriString}`,{method:"post",headers:{"Authorization":`Bearer ${tokenObj.accessToken}`,"Accept":"application/json"}})
    console.log("success?")
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
                  {!this.props.state.areVersion&&<th scope="col">Cover</th>}
                  <th scope="col">Song</th>
                  <th scope="col">Artist</th>
                  {!this.props.state.areVersion&&<th scope="col">Preview</th>}
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
