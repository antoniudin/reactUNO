import React, { Component } from 'react'
import UserContext from './context/UserContext'
import CartContext from './context/CartContext'
import UserPage from './context/UserPage'
import UserPanel from './context/UserPanel'
import CradDesk from './components/CardDesk'
class App extends Component {
  state = {
    cards: [
    {"id":1,"color": "red","value": "0"},
    {"id":2,"color": "red","value": "1"},
    {"id":3,"color": "red","value": "2"},
    {"id":4,"color": "red","value": "3"},
    {"id":5,"color": "red","value": "4"},
    {"id":6,"color": "red","value": "5"},
    {"id":7,"color": "red","value": "6"},
    {"id":8,"color": "red","value": "7"},
    {"id":9,"color": "red","value": "8"},
    {"id":10,"color": "red","value": "9"}
    ],
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