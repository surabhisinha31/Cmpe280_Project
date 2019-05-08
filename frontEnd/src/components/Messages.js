import React, { Component } from 'react';
import cookie from 'react-cookies';
import '../css/Messages.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { submitMessage } from '../actions/messageActions';
import { stat } from 'fs';
/* REDUX IMPORTS END */

class Messages extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state);
        this.state = {
            message: "please login"
        }
        if (this.props.Travelercookie) {
            this.state = {
                from: this.props.Travelercookie,
                to: this.props.location.state,
            }
        } else if (this.props.Ownercookie) {
            this.state = {
                from: this.props.Travelercookie,
                to: this.props.location.state,
            }
        }
        console.log(this.state);

    }

    sendMessage = (e) => {
        e.preventDefault();
        console.log("state during sending the message : ", this.state);
        alert("Message Sent");
        this.props.submitMessage(this.state);
    }

    componentDidMount() {
        if (this.state.message) {
            this.props.submitMessage(this.state);
        }
    }

    submitChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.props.Travelercookie || this.props.Ownercookie) {
            return (
                <div class="messagePage container-fluid">
                    <div className="container messageContainer">
                        <form>
                            <div className="messageHeader">
                                <center> <h2>Messages</h2></center>
                            </div>
                            <div className="messageBody">
                                <p>Ranjith.cheguri@gmail.com</p>
                                <p>Is the price negotiable ?</p>
                                <p>owner@gmail.com</p>
                                <p>How much are you willing to pay ?</p>
                            </div>
                            <div className="sendMessage">
                                <div className="col-lg-12 input-group">
                                    <div class="col-lg-9">
                                        <input type="text" class="form-control" onChange={this.submitChange} name="message" placeholder="enter message"></input>
                                    </div>
                                    <div class="col-lg-3">
                                        <button type="submit" onClick={this.sendMessage} class="btn btn-primary">Send</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Please login to continue...</p><Link to='/Login'>click here</Link>
                </div>
            )
        }
    }
}


//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    message: state.messagesState.message,
    Travelercookie: state.loginState.Travelercookie,
    Ownercookie: state.ownerLoginState.Ownercookie
})

export default connect(mapStateToProps, { submitMessage })(Messages);
