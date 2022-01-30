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
            <div className='back'>
                <NavBar/>
                Home Page
                
                <div></div>
                <div className="newCard wildcard">
                    <div className='w_blue'></div>
                    <div className='w_red'></div>
                    <div className='w_yellow'></div>
                    <div className='w_green'></div>
                </div>

                


            </div>
        );
    }
}

HomePage.contextType=PlayerContext;
export default HomePage;