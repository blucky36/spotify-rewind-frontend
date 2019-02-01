import React, {Component} from 'react'

class AvailablePlaylists extends Component {
  render(){
    return(
    <div>
      <div className = "page-header">
        <div>
           <h4 className="text-center">
              Spotify Rewind
              <p className="text-right">Logout</p>
              <p className="text-left">Hello "yourName"</p>
           </h4>
         </div>
           <div className="col-md-4 center-block">
              <button type="button" class="btn btn-primary">Add a new playlist</button>
           </div>

           <div>
            <ul className="list-group">
            <li class="list-group-item">this is a ul now but will eventually populate from the api</li>
            <li class="list-group-item">Playlist 1</li>
            <li class="list-group-item">Playlist 2</li>
            <li class="list-group-item">Playlist 3</li>
            <li class="list-group-item">Playlist 4</li>
            <li class="list-group-item">Playlist 7</li>
            <li class="list-group-item">Playlist 8</li>
            <li class="list-group-item">Playlist 9</li>
            <li class="list-group-item">Playlist 10</li>
            </ul>
           </div>

        </div>
    </div>
    )
  }
}

export default AvailablePlaylists