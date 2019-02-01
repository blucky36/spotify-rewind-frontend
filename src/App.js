import React, { Component } from 'react';
import {Switch,Route,BrowserRouter as Router} from "react-router-dom"
import LoginPage from './components/LoginPage'
import AvailablePlaylists from './components/AvailablePlaylists'
import DetailedPlaylist from './components/DetailedPlaylist'

const url = "gonna put ur url here"

class App extends Component {

  state = {
    page: 1
  }
 /*
  async componentDidMount(){
  const response = await fetch(url)
  const json = await response.json()
  this.setState({allMessages:json})
  console.log(this.state.allMessages)
  }
    */

  render() {

    return (
      <div className="App">
      <DetailedPlaylist />
      </div>
    );
  }
}

export default App;
