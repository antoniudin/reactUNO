import React, { Component, } from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import PlayerContext from '../context/PlayerContext';
import NavBar from './NavBar';

class HomePage extends Component {
    
    componentDidMount() {
        console.log(PlayerContext.players);
    }
    
    render() { 
        return (
            <div>Home Page</div>
            
        );
    }
}

HomePage.contextType=PlayerContext;
export default HomePage;