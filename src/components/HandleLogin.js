import React, {Component} from 'react'

class HandleLogin extends Component {
  parseQueryString () {
    const query = window.location.href.split('?')[1].split("&").reduce((acc, elem)=> {
      let kv = elem.split('=')
      acc[kv[0]] = kv[1]
      return acc
    },{})
    localStorage.setItem("token", JSON.stringify(query))
    window.location.href = "/availableplaylists"
  }
  render () {
    {this.parseQueryString()}
    return <div className="fidget"></div>
  }
}

export default HandleLogin
