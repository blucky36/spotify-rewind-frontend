import React, { Component } from 'react';
import TrackCompare from './TrackCompare'
import PlaylistSidebar from './PlaylistSidebar'
import Navbar from './Navbar'
const diff = require('diff')

class ComparePlaylist extends Component {

  state = {
    playlist1: [],
    playlist2: [],
    playlist1Diff: [],
    playlist2Diff: [],
    currentPlaylistId: window.location.href.split('/').slice(-1)[0]
  }

  componentDidMount = async () => {
    // const versions = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${this.props.id}/playlists/${this.state.currentPlaylistId}/versions`)
    // const versionsJSON = await versions.json()
    //
    // console.log(versionsJSON)
    //
    //
    //
    // const pl1 = [...versionsJSON[0]]
    // const versionToUse = [...versions[0]]
    // const pl2 = []
    // pl1.forEach(plItem => {
    //   if (Math.random() > 0.3) {
    //     pl2.push(versionToUse.splice(Math.floor(Math.random() * versionToUse.length), 1)[0])
    //   }
    // })
    //
    // pl1.splice(Math.floor(Math.random() * pl1.length),1)

    let backendData = this.props.fullBackend
    let allPlaylists = this.props.fullBackend.pArr
    let allVersions = this.props.fullBackend.verArr
    let allSongs = this.props.fullBackend.tracks
    let allRelatedPlaylists = allPlaylists.filter(p=>p.spotify_playlist_id===this.state.currentPlaylistId)
    let latestPlaylist = allRelatedPlaylists[allRelatedPlaylists.length-1]
    let prevPlaylistId = allRelatedPlaylists[allRelatedPlaylists.length-2]
    console.log(backendData,this.state.currentPlaylistId);
    let pl1 = [],pl2=[]
    const diffArr = diff.diffArrays(pl1, pl2)

    let oldPl = []
    let newPl = []

    diffArr.forEach(diffObj => {
      diffObj.value.forEach(val => {
        if (diffObj.added) {
          if (pl1.includes(val)) {
            newPl.push({ ...val, moved: true })
            oldPl.push({})
          } else {
            newPl.push({ ...val, added: true })
            oldPl.push({})
          }
        } else if (diffObj.removed) {
          newPl.push({})
          oldPl.push({ ...val, removed: true })
        } else {
          newPl.push(val)
          oldPl.push(val)
        }
      })
    })

    newPl.forEach(item => {
      if (item.moved) {
        oldPl = oldPl.map(oldItem => {
          if (oldItem['spotify_id'] === item['spotify_id']) return { ...oldItem, moved: true }
          return oldItem
        })
      }
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
        if (item.moved) {
          item.color = 'yellow'
        } else if (item.added) {
          item.color = 'green'
        } else if (item.removed) {
          item.color = 'red'
        } else {
          item.color = 'white'
        }
        return (<TrackCompare track={{track: item}}/>)
        })
    }

    render() {
      return (
        <>
        <div className='container'>
          <div className='row'>
          <div className='col-3'>
            <PlaylistSidebar id={this.props.id}/>
          </div>
          <div className='col-9'>
            <div className='row'>
        <div className='col'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Song</th>
              <th scope="col">Artist</th>
            </tr>
          </thead>
          <tbody>
            { this.renderPlaylistDiff(this.state.playlist1Diff) }
          </tbody>
        </table>
    </div>
        <div className='col'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Song</th>
              <th scope="col">Artist</th>
            </tr>
          </thead>
          <tbody>
            { this.renderPlaylistDiff(this.state.playlist2Diff) }
          </tbody>
        </table>
    < / div>
  </div>
  </div>
  </div>
  </div>
  </>

      );
    }

  }

  export default ComparePlaylist;
