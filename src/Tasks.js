import React, { Component } from 'react';
import Counter from './hooks/counter';
import Users from './hooks/users';
import fetch from 'cross-fetch';


class Tasks extends React.Component {
    state = {
        isLoaded: false,
        error: null,
        items: [],
        number: 0
    }

    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result,
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    
    render() { 
        const {items, error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return <div>
                {items.map(item => 
                    <p key={item.id}>{item.name}</p>
                    )}
            <Counter count={this.state.number}/>
            <Users/>
            </div>
        }
    }
}
 
export default Tasks;