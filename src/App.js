import React, { Component } from 'react'
import {Route, Routes} from 'react-router-dom';
import PlayerContext from './context/PlayerContext'
import CardDesk from './components/CardDesk'
import HomePage from './components/HomePage'
import GameOver from './components/GameOver'
import About from './components/About';


class App extends Component {
  state = {
    players: [
        {id: 1, name: "Player 1", turn: true, score: 0, cards:[],desk:false},
        {id: 2, name: "Player 2", turn: false, score: 0, cards:[],desk:false},
        {id: 3, name: "Player 3", turn: false, score: 0, cards:[],desk:false},
  ]
}
  handleUpdateScore = (updatedPlayers) => {
    this.setState({players: updatedPlayers})
  }

  render() {
    return (
      <PlayerContext.Provider value={{players: this.state.players, 
        onUpdate: this.handleUpdateScore,}}
        >
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/game" exact element={<CardDesk/>}/>
            <Route path="/gameover" element={<GameOver/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
      </PlayerContext.Provider>
    )
  }
}

export default App;