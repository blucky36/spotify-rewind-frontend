import React, { Component } from 'react';
const diff = require('diff')

class ComparePlaylist extends Component {

  state = {
    playlist1: [

    ],
    playlist2: [

    ],
    playlist1Diff: [],
    playlist2Diff: []
  }

  componentDidMount = async () => {

    // this section is grabbing random stuff from api, and making a couple
    // random playlists to compare.. not needed for production

    const playlistReq = await fetch('http://localhost:3005/api/users/1249465062/playlists/19qKzDBqnI0GKkGzU8Owcw/versions/1')
    const playlistActual = await playlistReq.json()

    const pl1 = [...playlistActual]
    const pl2 = []
    pl1.forEach(plItem => {
      if (Math.random() > 0.3) {
        pl2.push(playlistActual.splice(Math.floor(Math.random() * playlistActual.length), 1)[0])
      }
    })

    pl1.splice(Math.floor(Math.random() * pl1.length),1)

    // now begins actual code that generates a diff...

    const sortBySpotId = (a,b) => {
      return a['spotify_id'].localeCompare(b['spotify_id'])
    }

    const pl1sorted = pl1.sort(sortBySpotId)
    const pl2sorted = pl2.sort(sortBySpotId)

    const diffArr = diff.diffArrays(pl1sorted, pl2sorted)

    let oldPl = []
    let newPl = []

    diffArr.forEach(diffObj => {
      diffObj.value.forEach(val => {
        if (diffObj.added) {
            newPl.push({ ...val, added: true })
            oldPl.push({})
        } else if (diffObj.removed) {
          newPl.push({})
          oldPl.push({ ...val, removed: true })
        } else {
          newPl.push(val)
          oldPl.push(val)
        }
      })
    })

    this.setState(prevState => {
      return ({
        playlist1: pl1,
        playlist2: pl2,
        playlist1Diff: oldPl,
        playlist2Diff: newPl
      })
    })

  }

  renderPlaylistDiff = (playlist) => {

    return playlist.map(item => {
        if (item.added) {
          item.color = 'green'
        } else if (item.removed) {
          item.color = 'red'
        } else {
          item.color = 'black'
        }
        return ( < li > { item === null ? '' : <span style={{color:item.color}}>{item['spotify_id']}</span>} < /li>)
        })
    }

    render() {
      return ( <
        div className = 'container' >
        <
        div className = 'row' >
        <
        div className = 'col-sm' >
        <
        ul > { this.renderPlaylistDiff(this.state.playlist1Diff) } <
        /ul> < /
        div >

        <
        div className = 'col-sm' >
        <
        ul > { this.renderPlaylistDiff(this.state.playlist2Diff) } <
        /ul>

        <
        /div> < /
        div > <
        /div>


      );
    }

  }

  export default ComparePlaylist;
