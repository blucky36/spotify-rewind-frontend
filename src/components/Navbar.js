import React from "react"
import {Link} from "react-router-dom"

const Navbar = (props) => (
  <nav id="black"className="navbar">
    <Link className="navbar-brand" to="/availableplaylists">
      <img src="./images/spotify_rewind_transparent.svg" width="50" height="50" alt=""/>
    </Link>
    <img src = {`${props.navState.avatar}`} height={50}alt = ""/>
    <h5 className="text-left">Hello {props.navState.name}</h5>
    <Link to ="/" className="btn btn-primary">Logout</Link>
  </nav>
)

export default Navbar
