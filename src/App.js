import React, { Component } from 'react'
import GameLog from './components/GameLog'
import PlayerContext from './context/PlayerContext'
import CardDesk from './components/CardDesk'
import HomePage from './components/HomePage'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RoundOver from './components/RoundOver'
import GameOver from './components/GameOver'

class App extends Component {
  state = {
    players: [
      {id: 1, name: "Player 1", score: 0},
      {id: 2, name: "Player 2", score: 0},
      {id: 3, name: "Player 3", score: 0},
  ]
}
  handleUpdateScore = (updatedPlayers) => {
    this.setState({players: updatedPlayers})
  }
  
  render() {
    return (
      <PlayerContext.Provider value={{
        players: this.state.players, 
        onUpdate: this.handleUpdateScore}}
        >
          <Routes>
            <Route path="/desk" exact element={<CardDesk/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/gameover" element={<GameOver/>}/>
            <Route path="/roundover" element={<RoundOver/>}/>
          </Routes>
      </PlayerContext.Provider>
    )
  }
}

export default App;