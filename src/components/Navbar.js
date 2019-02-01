import React from "react"
import {Link} from "react-router-dom"

const Navbar = (props) => (
  <nav className="navbar navbar-secondary bg-secondary">
    <Link className="navbar-brand" to="/availableplaylists">
      <img src="../images/spotify_rewind_transparent.svg" width="50" height="50" alt=""/>
      <p>image borked</p>
    </Link>
    <Link to ="/" className="btn btn-primary">Logout</Link>
  </nav>
)

export default Navbar
