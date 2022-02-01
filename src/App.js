import React, { Component } from 'react'
import PlayerContext from './context/PlayerContext'
import CardDesk from './components/CardDesk'
import HomePage from './components/HomePage'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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

  test = () => {
    console.log("first");
  }
  
  render() {
    return (
      <PlayerContext.Provider value={{players: this.state.players, onUpdate: this.handleUpdateScore, test: this.test}}
        >
          <Routes>
            <Route path="/game" exact element={<CardDesk/>}/>
            <Route path="/gameover" element={<GameOver/>}/>
            <Route path="/" element={<HomePage/>}/>
          </Routes>
      </PlayerContext.Provider>
    )
  }
}

export default App;