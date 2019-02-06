
import React,{Component,Fragment} from "react"
import Track from "./Track.js"
import PlaylistSidebar from "./PlaylistSidebar.js"
import SelectVersion from "./SelectVersion.js"
import { Link } from "react-router-dom"

export default class DetailedPlaylist extends Component {

  state = {
    songs:[],
    playlistName:"",
    backedPlaylists: [],
    backVersions: [],
    currentPlaylistId:'',
  }

  setCurrentPlaylistId = async () => {
    const { backedPlaylists, backVersions } = await this.props.compMountDetailed()
    let currentPlaylistId = window.location.href.split('/').slice(-1)[0]
    await this.setState({backedPlaylists, backVersions, currentPlaylistId})
  }

  async componentDidMount(){
    const {backedPlaylists, backVersions } = await this.props.compMountDetailed()
    let currentPlaylistId = window.location.href.split('/').slice(-1)[0]
    await this.setState({backedPlaylists, backVersions, currentPlaylistId})
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
    console.log(postPlaylist);
  }


  render(){
    return(
      <div>
        <div className="row">
          <div className="col-2">
            {<button onClick={()=>{this.handleSendToSpotify()}}>Restore Version To Spotify</button>}
            {this.state.backedPlaylists.length > 0 ? <PlaylistSidebar id={this.props.state.userData.id} currentPlaylistId={this.props.state.currentPlaylistId} changeState={this.props.changePLID}
            playlists={this.state.backedPlaylists}
            setCurrentPlaylistId ={this.setCurrentPlaylistId}/> : null}
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
                {this.props.tracks.map((track,i)=><Track key = {i} index = {i} track = {track}/>)}
              </tbody>
            </table>
          </div>
          <div className = "col-2">
            <h4>Available Versions</h4>
            <ul>
              {this.state.backVersions.map((version,idx)=><SelectVersion key = {idx} version={version}/>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
