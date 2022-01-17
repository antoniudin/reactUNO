import React, { Component } from 'react'
import UserContext from './UserContext'

class UserList extends Component {

    render() {
        console.log(UserContext)
        return (
            <UserContext.Consumer>
            { UserContext => <div>User List {UserContext.currentUser ? UserContext.currentUser.name : "123"}</div>}
            </UserContext.Consumer>
        )
    }
}

UserList.contextType = UserContext;

export default UserList;