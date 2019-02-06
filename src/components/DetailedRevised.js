import React,{Component,Fragment} from "react"
import Track from "./Track.js"
import PlaylistSidebar from "./PlaylistSidebar.js"
import { Link } from "react-router-dom"

export default class DetailedPlaylist extends Component {

  async componentDidMount(){
    console.log(this.props)
  }

  async handleSendToSpotify(){
    //post an array of uri's to spotify api
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-2">
            {<button onClick={()=>{console.log("ass")}}>Restore Version To Spotify</button>}
            <PlaylistSidebar id={this.props.state.userData.id} currentPlaylistId={this.props.state.currentPlaylistId} changeState={this.props.changePLID} playlists={this.props.state.backedPlaylists}/>
          </div>
          <div className="col-8">
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
          <div className = "col-2"></div>
        </div>
      </div>
    )
  }
}
