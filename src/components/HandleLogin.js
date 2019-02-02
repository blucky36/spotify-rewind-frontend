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
  // gnome(){
  //   let gnomeVid = document.createElement("iframe")
  //   gnomeVid.setAttribute("width","50")
  //   gnomeVid.setAttribute("height","50")
  //   gnomeVid.setAttribute("src","https://www.youtube.com/embed/z-zxaKQfW6s?controls=0&amp;start=0;autoplay=0")
  //   gnomeVid.setAttribute("frameborder","0")
  //   gnomeVid.setAttribute("allow","autoplay")
  //   document.getElementById("ooh").appendChild(gnomeVid)
  // }
  render () {
    {this.parseQueryString()}
    return <div id = "ooh" className="fidget"><img src="https://i.ytimg.com/vi/F04Uwk-191g/hqdefault.jpg"/></div>
  }
}

export default HandleLogin
