import React, {Component} from 'react'
import Track from "./Track.js"

class DetailedPlayliest extends Component {

  async componentDidMount(){
    this.props.compMount()
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-2">
            <button  type = "button" className="btn btn-primary">Select Version</button>
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
