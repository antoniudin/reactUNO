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
            
            
            
            // <div className="homePage">        
            // <Link to="/desk">
            // <img className="logo" src={require('./start.png')} />
            // </Link>

            // <Link to="/game">
            // <p>ANOTHER LINK</p>
            // </Link>
            // </div>
        );
    }
}

HomePage.contextType=PlayerContext;
export default HomePage;