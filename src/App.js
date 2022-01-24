import React, { Component } from 'react'
import GameLog from './components/GameLog'
import UserContext from './context/UserContext'
import CartContext from './context/CartContext'
import UserPage from './context/UserPage'
import UserPanel from './context/UserPanel'
import CardDesk from './components/CardDesk'
import HomePage from './components/HomePage'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GameBoard from './components/GameBoard'

class App extends Component {
  state = {
    game:true,
    round:true,
}

  render() {
    return (
      <CartContext.Provider value={this.state.currentCart}>
      <UserContext.Provider value={{currentUser: this.state.currentUser, onLoggedIn: this.handleLogin}}>
          <Routes>
            <Route path="/game" element={<GameBoard/>}/>
            {this.state.game && <Route path="/desk" element={<CardDesk/>}/>}
            <Route path="/" element={<HomePage/>}/>
          </Routes>
      </UserContext.Provider>
      </CartContext.Provider>
    )
  }
}

export default App;