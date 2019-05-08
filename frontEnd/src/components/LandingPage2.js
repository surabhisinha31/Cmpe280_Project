import React, { Component } from 'react';
import { Redirect, Route, Link } from 'react-router-dom'
import CarouselHA from './CarouselHA';
import Footer2 from './Footer2';
import Carousel2 from './Carousel2';
import Carousel3 from './Carousel3';
import axios from 'axios';
import { history } from '../actions/messageActions';

//REDUX
import { connect } from 'react-redux';
import { travelerSignout } from '../actions/loginActions';
import { ownerSignout } from '../actions/ownerLoginActions';
import { inboxHandler } from '../actions/messageActions';
import { travelerinboxHandler } from '../actions/messageActions';

class LandingPage2 extends Component {
    constructor(props) {
        super(props);
        console.log("inside landingPage2");
        this.state = {
            searchCity: "",
            searchStartdate: "",
            searchEnddate: "",
            searchAccomodates: "",
            redirectVar: false,
            currentUser: ''
        }
    }

    componentDidMount() {

        //Passport.js
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        //alert(localStorage.getItem('jwtToken'))
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    redirectToDisplayProperty = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.setState({
            redirectVar: true
        })
    }
    // inboxclickHandler() {
    //     if(this.props.Ownercookie) {
    //       this.state.currentUser = this.props.Ownercookie;
    //       this.props.inboxHandler(this.state);
    //       setTimeout(function(){}, 3000);
    //       // this.props.history.push('/Inbox');
    //     }
    //     else {
    //       this.props.travelerinboxHandler(this.props.Travelercookie);
    //       this.props.history.push('/TravelerInbox');
    //     }
    //
    // }
    // componentWillReceiveProps(nextProps) {
    //     console.log("update props");
    //     if (this.props.loginState.redirectVar !== nextProps.loginState.redirectVar) {
    //         console.log("update props");
    //         this.setState({
    //             redirectVar: nextProps.loginState.redirectVar,
    //         });
    //     }
    // }

    handleSignOut = (e) => {
        //e.preventDefault();
        if (this.props.Ownercookie) {
            sessionStorage.removeItem('ownername');
            //cookie.remove('OwnerCookie', { path: '/' });
            //not required but pushed as  signout screen is getting updated.
            this.props.history.push('/');
            this.props.ownerSignout();
        } else if (this.props.Travelercookie) {
            sessionStorage.removeItem('username');
            //cookie.remove('TravelerCookie', { path: '/' });
            //not required but pushed as  signout screen is getting updated.
            this.props.history.push('/');
            this.props.travelerSignout();
        }
    }

    render() {

        // ******************** REDIRECT TO LIST PROP USING COOKIE ****************************

        let renderListProp = null;
        console.log(this.props);
        if (this.props.Ownercookie) {
            renderListProp = (<Link to="/ListProperty">
                <button class="btn btn-lg listYourProperty">List your property</button>
            </Link>)

        } else {
            renderListProp = (<Link to="/OwnerLogin">
                <button class="btn btn-lg listYourProperty">List your property</button>
            </Link>)
        }

        // ************ check cookie and handle sign in and sign out ********************
        //if Cookie is set render Logout Button

        let loggedIn = null;
        //if (cookie.load('TravelerCookie')) {
        if (this.props.Travelercookie) {
            console.log("Able to read cookie");
            loggedIn = (
                <div class="dropdown floatRight align-center loginList">
                    <button class="btn btn-default btn-lg dropdown-toggle whiteText transparentBtn" type="button" data-toggle="dropdown">{sessionStorage.getItem('username')}
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <Link to='/Profile'>Profile</Link>
                        </li>
                        <li>
                          <Link to='/TravelerInbox'>Inbox</Link>
                        </li>
                        <li>
                            <Link to='/BookingHistory'>Booking History</Link>
                        </li>
                        <li>
                            <a onClick={this.handleSignOut.bind(this)}>SignOut</a>
                        </li>
                    </ul>
                </div>
            );
        }
        //else if (cookie.load('OwnerCookie')) {
        else if (this.props.Ownercookie) {
            console.log("Owner Cookie exists");
            loggedIn = (
                <div class="dropdown floatRight align-center loginList">
                    <button class="btn btn-default btn-lg dropdown-toggle whiteText transparentBtn" type="button" data-toggle="dropdown">{sessionStorage.getItem('ownername')}
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <Link to='/Profile'>OwnerProfile</Link>
                        </li>
                        <li>
                             <Link to='/Inbox'>Inbox</Link>
                        </li>
                        <li>
                            <Link to='/OwnerDashboard'>Owner Dashboard</Link>
                        </li>
                        <li>
                            <a onClick={this.handleSignOut.bind(this)}>SignOut</a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie...!");
            loggedIn = (
                <div class="dropdown floatRight align-center loginList">
                    <button class="btn btn-default btn-lg dropdown-toggle whiteText transparentBtn" type="button" data-toggle="dropdown">Login
                            <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <Link to='/Login'>Traveler Login</Link>
                        </li>
                        <li>
                            <Link to='/OwnerLogin'>Owner Login</Link>
                        </li>
                    </ul>
                </div>
            )
        }


        let displayPropertyToggle = "";

        if (this.state.redirectVar) {
            console.log("inside if case redirectVar is true")
            //this.props.history.push('/DisplayProperty',this.state);
            // instead of just redirecting, state needs to be passed so using history.push
            displayPropertyToggle = this.props.history.push('/DisplayProperty', this.state);
        } else {
            console.log("inside else case, redirectVar is false")
            displayPropertyToggle = (
                <div>
                    <div class="bg-img">
                        <div class="landingPageNavbar">
                            <Link to={"/"}><a href="#"><img class="logo" alt="logo here" src={require('../images/renticon.png')}></img></a></Link>
                            <div class="floatRight">
                                {/* <a href="#"><img class="transparentLogo" alt="logo here" src={require('../images/logo_transparent.png')}></img></a> */}
                            </div>
                            <div class="floatRight" style={{ paddingRight: 10 + 'px' }}>
                                {renderListProp}
                            </div>
                            {loggedIn}
                        </div>
                        <div class="container-fluid landingPageBody">
                            <h1 class="whiteText">Book beach houses, cabins,</h1>
                            <h1 class="whiteText">condos and more, worldwide</h1>
                            <div class="">
                                <form class="col-lg-12 form-group form-inline">
                                    <input type="text" onChange={this.handleChange} name="searchCity" class="custom_HA form-control col-lg-5" placeholder=" where to you want to go ?"></input>
                                    <input type="date" onChange={this.handleChange} name="searchStartdate" class="custom_HA form-control col-lg-1" placeholder="Arrive"></input>
                                    <input type="date" onChange={this.handleChange} name="searchEnddate" class="custom_HA form-control col-lg-1" placeholder="Depart"></input>
                                    <input type="text" onChange={this.handleChange} name="searchAccomodates" class="custom_HA form-control col-lg-1" placeholder="Guests"></input>
                                    <Link to={'/displayProperty'}><button onClick={this.redirectToDisplayProperty} class="col-lg-1 searchButton btn btn-primary">Search</button></Link>
                                </form>
                            </div>
                        </div>
                        <div class="container">
                            <div class="whiteText col-lg-4">
                                <h3>Your whole vacation starts here</h3>
                                <h5>Choose a rental from the worlds best selection</h5>
                            </div>
                            <div class="whiteText col-lg-4">
                                <h3>Book and stay with confidence</h3>
                                <h5>Secure payments, peace of mind</h5>
                            </div>
                            <div class="whiteText col-lg-4 mb-4">
                                <h3>Your vacation your way</h3>
                                <h5>More space, more privacy, no compromises</h5>
                            </div>

                        </div>
                    </div>
                    <Carousel3 />
                    <Carousel2 />
                </div>
            )
        }
        return (
            //main return statement.
            <div class="hideNavbar">
                {displayPropertyToggle}
                <Link to='/ListProperty'><img class="dummyListProperty" src={require('../images/dummyListProperty.PNG')} /></Link>
                <Footer2 />
            </div>
        );
    }
}


//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    redirectVar: state.loginState.redirectVar,
    redirectVar: state.ownerLoginState.redirectVar,
    Travelercookie: state.loginState.Travelercookie,
    Ownercookie: state.ownerLoginState.Ownercookie
})

// const mapDispatchToProps = (dispatch) => {
//     return {
//        onSubmitLogin: (id, pass) => dispatch(login(id, pass))
//     }
//  };

export default connect(mapStateToProps, { travelerSignout, ownerSignout, inboxHandler, travelerinboxHandler })(LandingPage2);
