import React, {Component} from 'react'
import {Link} from "react-router-dom"

class AvailablePlaylists extends Component {
  async componentDidMount(){
    //we make an api call to populate the database
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    console.log(tokenObj)
    let userData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    let playlistData = await fetch(`https://api.spotify.com/v1/users/${tokenObj.userId}/playlists`,{
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${tokenObj.accessToken}`}
    }).then(data=>data.json())
    console.log(userData)
    console.log(playlistData);
  }
  render(){
    return(
    <div>
      <div className = "page-header">
        <div>
           <h4 className="text-center">
              Spotify Rewind
              <Link to ="/" className="btn btn-primary">Logout</Link>
              <p className="text-left">Hello "yourName"</p>
           </h4>
         </div>
           <div className="col-md-4 center-block">
              <button type="button" class="btn btn-primary">Add a new playlist</button>
           </div>

           <div>
            <ul className="list-group">

              </div>
            </ul>
           </div>

        </div>
    </div>
    )
  }
}

export default AvailablePlaylists
