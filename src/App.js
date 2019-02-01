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
          <Router>
            <div>
              <Switch>
                <Route exact path = "/" render={()=><LoginPage/>}/>
                <Route exact path = "/availableplaylists" render={()=><AvailablePlaylists/>}/>
                <Route exact path = "/detailedplaylist" render={()=><DetailedPlaylist/>}/>
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }

export default App;
