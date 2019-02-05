import React, { Component } from 'react';
import {Link} from "react-router-dom"
import TrackCompare from './TrackCompare'
import PlaylistSidebar from './PlaylistSidebar'
import Navbar from './Navbar'
import SelectVersion from "./SelectVersion.js"
const diff = require('diff')

class ComparePlaylist extends Component {

  state = {
    playlist1: [],
    playlist2: [],
    playlist1Diff: [],
    playlist2Diff: [],
    currentPlaylistId: "",
    singleVersion: false,
    versions: []
  }

  async handleChange(event){
    let tokenObjChange = JSON.parse(localStorage.getItem("token"))
    let currentPlaylistIdChange = window.location.href.split('/').slice(-1)[0]
    let versionTracksChange = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObjChange.userId}/playlists/${currentPlaylistIdChange}/versions/${event.target.value}`).then(data=>data.json())
    let pl1=this.state.playlist1
    let pl2= versionTracksChange
    let compare1 = pl1.map(t=>t.spotify_id)
    let compare2 = pl2.map(t=>t.spotify_id)
    const difArr = diff.diffArrays(compare1, compare2)
    let oldPl = [],newPl = []
    if(difArr.length === 1){
      for(let i = 0; i<difArr[0].value.length; i++){
        let idx = pl1.findIndex(t=>t.spotify_id === difArr[0].value[i])
        oldPl.push({...pl1[idx]})
        newPl.push({...pl2[idx]})
      }
    }
    else if(difArr.length > 1){
      difArr.forEach(diffObj => {
        for(let i = 0; i< diffObj.value.length; i++){
          if(diffObj.added){
            if(compare1.includes(diffObj.value[i])){
              let idx = pl1.findIndex(t=>t.spotify_id === diffObj.value[i])
              newPl.push({...pl1[idx],moved:true})
              oldPl.push({})
            }else{
              let idx = pl1.findIndex(t=>t.spotify_id === diffObj.value[i])
              newPl.push({...pl1[idx],added:true})
              oldPl.push({})
            }
          }
          else if(diffObj.removed){
            let idx = pl2.findIndex(t=>t.spotify_id === diffObj.value[i])
            newPl.push({})
            oldPl.push({...pl2[idx],removed:true})
          }else{
            let idx = pl1.findIndex(t=>t.spotify_id === diffObj.value[i])
            newPl.push({...pl1[idx]})
            oldPl.push({...pl2[idx]})
          }
        }
      })

      newPl.forEach(item => {
        if (item && item.moved) {
          oldPl = oldPl.map(oldItem => {
            if (oldItem['spotify_id'] === item['spotify_id']) return { ...oldItem, moved: true }
            return oldItem
          })
        }
      })
    }

    this.setState({
      ...this.state,
      playlist1: pl1,
      playlist2: pl2,
      playlist1Diff: oldPl,
      playlist2Diff: newPl,
      currentPlaylistIdChange,
      singleVersion: false
    })

  }

  async reload(){
    let tokenObj = JSON.parse(localStorage.getItem("token"))
    let currentPlaylistId = window.location.href.split('/').slice(-1)[0]
    let pl1=[],pl2=[]
    let versions = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/playlists/${currentPlaylistId}/versions`).then(data=>data.json())
    let versionTracks = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/playlists/${currentPlaylistId}/versions/${versions[0].id}`).then(data=>data.json())
    if (versions.length <= 1){
      pl1 = versionTracks
      pl2 = []
      this.setState({...this.state,singleVersion:true})
    }
    else {
      let versionsTracksLatest = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${tokenObj.userId}/playlists/${currentPlaylistId}/versions/${versions[versions.length-1].id}`).then(data=>data.json())
      pl1 = versionTracks
      pl2 = versionsTracksLatest
    }
    let compare1 = pl1.map(t=>t.spotify_id)
    let compare2 = pl2.map(t=>t.spotify_id)
    console.log(compare1,compare2);
    const difArr = diff.diffArrays(compare1, compare2)

    let oldPl = []
    let newPl = []

    if(difArr.length === 1){
      for(let i = 0; i<difArr[0].value.length; i++){
        let idx = pl1.findIndex(t=>t.spotify_id === difArr[0].value[i])
        oldPl.push({...pl1[idx]})
        newPl.push({...pl2[idx]})
      }
    }
    else if(difArr.length === 2){
      difArr.forEach(diffObj => {
        for(let i = 0; i< diffObj.value.length; i++){
          if(diffObj.added){
            if(compare1.includes(diffObj.value[i])){
              let idx = pl1.findIndex(t=>t.spotify_id === diffObj.value[i])
              newPl.push({...pl1[idx],moved:true})
              oldPl.push({})
            }else{
              let idx = pl1.findIndex(t=>t.spotify_id === diffObj.value[i])
              newPl.push({...pl1[idx],added:true})
              oldPl.push({})
            }
          }
          else if(diffObj.removed){
            let idx = pl2.findIndex(t=>t.spotify_id === diffObj.value[i])
            newPl.push({})
            oldPl.push({...pl2[idx], removed: true})
          }else{
            let idx = pl1.findIndex(t=>t.spotify_id === diffObj.value[i])
            newPl.push({...pl1[idx]})
            oldPl.push({...pl2[idx]})
          }
        }
      })

      newPl.forEach(item => {
        if (item && item.moved) {
          oldPl = oldPl.map(oldItem => {
            if (oldItem['spotify_id'] === item['spotify_id']) return { ...oldItem, moved: true }
            return oldItem
          })
        }
      })
    }


    this.setState(prevState => {
      return ({
        playlist1: pl1,
        playlist2: pl2,
        playlist1Diff: oldPl,
        playlist2Diff: newPl,
        currentPlaylistId,
        versions
      })
    })
  }

  componentDidMount = async () => {
    await this.reload()
  }

  renderPlaylistDiff = (playlist) => {
    return playlist.map((item,i) => {
      if (item.moved) {
        item.color = 'yellow'
      } else if (item.added) {
        item.color = 'green'
      } else if (item.removed) {
        item.color = 'red'
      } else {
        item.color = 'white'
      }
      return (<TrackCompare key = {i} track={{track: item}}/>)
    })
  }

    async changeCurrentPlaylistId(currentPlaylistId){
      this.setState({...this.state,currentPlaylistId}, this.reload)
    }

    render() {
      return (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col-3'>
                <Link to ="/availableplaylists" className="btn btn-primary">Back up another playlist</Link>
                <h5>Backed up playlists</h5>
                <PlaylistSidebar id={this.props.id} currentPlaylistId={this.state.currentPlaylistId} changeState={this.changeCurrentPlaylistId.bind(this)}/>
              </div>
              <div className='col-8'>
                <div className='row'>
                  <div className='col-6'>
                    <h5>Current Playlist Version</h5>
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
                    {this.state.singleVersion && <h3>Your playlist is up to date!</h3>}
                  </div>
                  <div className='col-6'>
                    <h5>Previous Playlist Version</h5>
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
                  </div>
                </div>
              </div>
              <div className="col-1">
                <label>select version</label>
                <select onChange={(e)=>{this.handleChange(e)}}>
                  {this.state.versions.map((version,idx)=><SelectVersion key = {idx} version={version}/>)}
                </select>
              </div>
            </div>
          </div>
        </>

      );
    }

  }

  export default ComparePlaylist;
