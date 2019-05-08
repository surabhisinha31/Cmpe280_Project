import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import LandingPage2 from './LandingPage2';
import ListProperty from './ListProperty';
import SignUp from './SignUp';
import OwnerLogin from './OwnerLogin';
import Profile from './Profile';
import OwnerSignUp from './OwnerSignUp';
import DisplayProperty from './DisplayProperty';
import BookingHistory from './BookingHistory';
import BookProperty from './BookPropety';
import OwnerDashboard from './OwnerDashboard';
import ViewProfile from './ViewProfile';
import TravelerInbox from './travelerinbox.js';
import Inbox from './inbox.js';
import Messages from './Messages';
import Dialog from './Dialog';
class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }


    render() {
        return (
            <div>
                {/* component with small 'c' */}
                <Route exact path="" component={LandingPage2} />
                <Route path="/" component={Navbar} />
                <Route path="/login" component={Login} />
                <Route path="/navbar2" component={Navbar2} />
                <Route path="/footer" component={Footer} />
                <Route path="/listProperty" component={ListProperty} />
                <Route path="/SignUp" component={SignUp} />
                <Route path="/OwnerLogin" component={OwnerLogin} />
                <Route path="/Profile" component={Profile} />
                <Route path="/OwnerSignUp" component={OwnerSignUp} />
                <Route path="/DisplayProperty" component={DisplayProperty} />
                <Route path="/BookProperty" component={BookProperty} />
                <Route path="/BookingHistory" component={BookingHistory} />
                <Route path="/OwnerDashboard" component={OwnerDashboard} />
                <Route path="/ViewProfile" component={ViewProfile} />
                <Route path="/Messages" component={Messages} />
                <Route path="/Inbox" component={Inbox} />
                <Route path="/travelerinbox" component={TravelerInbox} />
                <Route path="/Dialog" component={Dialog} />
            </div>
        );
    }
}
export default Menu;
