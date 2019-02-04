import React, {Component} from 'react'
import Track from "./Track.js"
import { Link } from "react-router-dom"

class DetailedPlayliest extends Component {

  async componentDidMount(){
    this.props.compMount()
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-2">
            <Link to={`/compare/${window.location.href.split("/")[window.location.href.split("/").length-1]}`} className="btn btn-primary">Compare With Previous</Link>
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
