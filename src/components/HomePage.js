import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './NavBar';

class HomePage extends Component {
    render() { 
        return (
            <div className="homePage">

            <div className="wrapper card green">3
                <div className="card u_d">3</div>
                <div className="oval"></div>
                <div className="mdl">3</div>
            </div>    


    
            

            {/* <NavBar/> */}
            <img className="logo" src={require('./start.png')} />
            </div>
        );
    }
}
 
export default HomePage;