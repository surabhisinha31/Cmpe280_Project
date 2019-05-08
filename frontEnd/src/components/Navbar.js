import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import styles from '../App.css'
import Link from 'react-router-dom/Link';
import {IP_backEnd,IP_NODE_PORT} from '../config/config';

class Navbar extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Navbar !!!!!!!");
    }

    render() {
        return (
            <div class="navbarContainer">
                <nav class="navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <Link to="/"><a class="navbar-brand" href={IP_backEnd+IP_NODE_PORT}><img class="logo" alt="logo here" src={require('../images/renticon.png')}></img></a></Link>
                        </div>
                        {/* <ul class="nav navbar-nav navbar-right homeLogo">
                            <li><a href="#"><img class="homeLogo" alt="logo here" src={require('../images/home.jpg')}></img></a></li>
                        </ul> */}
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;