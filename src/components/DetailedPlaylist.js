import React, {Component} from 'react'
import {Link} from "react-router-dom"

class DetailedPlayliest extends Component {
  render(){
    return(
      <div className="row">
        <div className="col-2">
          <button  type = "button" className="btn btn-primary">Backup Now </button>
          <ul>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          <li className="list-group-item">Playlist </li>
          </ul>
        </div>
        <div className="col-8">
          <h1>Selected Playlist</h1>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
          <li className="list-group-item">song </li>
        </div>
      </div>
    )
  }
}

export default DetailedPlayliest
