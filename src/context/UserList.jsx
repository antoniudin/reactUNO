import React, { Component } from 'react'
import PlayerContext from './PlayerContext'

class UserList extends Component {

    render() {
        console.log(PlayerContext)
        return (
            <PlayerContext.Consumer>
            { PlayerContext => <div>User List {PlayerContext.currentUser ? PlayerContext.currentUser.name : "123"}</div>}
            </PlayerContext.Consumer>
        )
    }
}

UserList.contextType = PlayerContext;

export default UserList;