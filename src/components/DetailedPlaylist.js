import React,{Component,Fragment} from "react"
import Track from "./Track.js"
import PlaylistSidebar from "./PlaylistSidebar.js"
import SelectVersion from "./SelectVersion.js"
import { Link } from "react-router-dom"
import moment from "moment"

export default class DetailedPlaylist extends Component {
  state = {
    songs:[],
    playlistName:"",
    backedPlaylists: [],
    backVersions: [],
    currentPlaylistId:'',
    currentPlaylistTimestamp:'',
    restoreButtonDisabled:false
  }

  setCurrentPlaylistTimeStamp = (time) => {
    this.setState({currentPlaylistTimestamp: moment(time).format("MMM Do YY h:mm a")})
  }

  setCurrentPlaylistId = async () => {
    const { backedPlaylists } = await this.props.compMountDetailed()
    let currentPlaylistId = window.location.href.split('/').slice(-1)[0]
    const backVersions = await this.getVersions(currentPlaylistId)
    await this.setState({backedPlaylists, backVersions, currentPlaylistId})
  }

  getVersions = async (playlistId) => {
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let backVersions = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/playlists/${playlistId}/versions`).then(data=>data.json())
    return backVersions
  }

  async componentDidMount(){
    const {backedPlaylists, backVersions } = await this.props.compMountDetailed()
    let currentPlaylistId = window.location.href.split('/').slice(-1)[0]
    await this.setState({restoreButtonDisabled:false, backedPlaylists, backVersions, currentPlaylistId,currentPlaylistTimestamp:moment(backVersions[backVersions.length-1].created_at).format("MMM Do YY h:mm a")})
  }

  async handleSendToSpotify(){
    this.disableRestoreButton()
      let time = this.state.currentPlaylistTimestamp
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
      let remaining = this.props.state.selectedPlaylistTracks.length
      let arrayToSend = [...this.props.state.selectedPlaylistTracks]
      let playlistConfirm
      if(remaining <= 50){
        let uriString = arrayToSend.reduce((a,e,i)=>{
          let uri = this.props.state.areVersion ? e.spotify_uri.split(":").join("%3A")+"," : e.track.uri.split(":").join("%3A")+","
          a+=uri
          return a
        },"").slice(0,-1)
        playlistConfirm = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists/${postPlaylist.id}/tracks?uris=${uriString}`,{method:"post",headers:{"Authorization":`Bearer ${tokenObj.accessToken}`,"Accept":"application/json"}}).then(data=>data.json())
      }else{
        while(remaining > 0){
          console.log(remaining);
          let oneHundo = arrayToSend.splice(0,50)
          remaining -= 50
          let uriString = oneHundo.reduce((a,e,i)=>{
            let uri = this.props.state.areVersion ? e.spotify_uri.split(":").join("%3A")+"," : e.track.uri.split(":").join("%3A")+","
            a+=uri
            return a
          },"").slice(0,-1)
          playlistConfirm = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists/${postPlaylist.id}/tracks?uris=${uriString}`,{method:"post",headers:{"Authorization":`Bearer ${tokenObj.accessToken}`,"Accept":"application/json"}}).then(data=>data.json())
          console.log(remaining);
        }
      }
    }

    disableRestoreButton = () => {
      this.setState({restoreButtonDisabled:true})
    }

    enableRestoreButton = () => {
      this.setState({restoreButtonDisabled:false})
    }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-2">

            {<button className='btn btn-primary' disabled={this.state.restoreButtonDisabled} onClick={()=>{this.handleSendToSpotify()}}>{this.state.restoreButtonDisabled ? "Your playlist has been saved" : "Restore Version to spotify"}</button>}
            {this.state.backedPlaylists.length > 0 ? <PlaylistSidebar enableRestoreButton={this.enableRestoreButton} id={this.props.state.userData.id} currentPlaylistId={this.state.currentPlaylistId} changeState={this.props.changePLID}
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
                {this.props.tracks.map((track,i)=><Track key = {i} index = {i} track = {track} bool={this.props.state.areVersion}/>)}
              </tbody>
            </table>
          </div>
          <div className = "col-2">
            <h4>Available Versions</h4>
            <ul>
              {this.state.backVersions.map((version,idx)=><SelectVersion enableRestoreButton={this.enableRestoreButton} setCurrentPlaylistTimeStamp={this.setCurrentPlaylistTimeStamp} grabTracks = {this.props.grabTracks} key = {idx} version={version}/>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
