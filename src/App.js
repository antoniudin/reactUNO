import React, { Component } from 'react'
import GameLog from './components/GameLog'
import UserContext from './context/UserContext'
import CartContext from './context/CartContext'
import UserPage from './context/UserPage'
import UserPanel from './context/UserPanel'
import CradDesk from './components/CardDesk'
class App extends Component {
  state = {
    currentUser: {name: 'Tony', age:33},
    currentCart: ['chocolate','waffle']
}
  
  handleLogin = () => {
    const user = {name: 'Tony Montana'}
    this.setState({currentUser : user});
  }

  render() {
    return (
      <CartContext.Provider value={this.state.currentCart}>
      <UserContext.Provider value={{currentUser: this.state.currentUser, onLoggedIn: this.handleLogin}}>
        <div>
          <CradDesk/>
        </div>
      </UserContext.Provider>
      </CartContext.Provider>
    )
  }
}

export default App;