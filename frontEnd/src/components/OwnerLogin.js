import React, { Component } from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { ownerSubmitLogin } from '../actions/ownerLoginActions';
import { stat } from 'fs';
/* REDUX IMPORTS END */


class OwnerLogin extends Component {
    constructor(props) {
        super(props);
        console.log("Inside OwnerLogin");
        this.state = {
            email: "",
            password: "",
            redirectVar: false
        }
    }

    renderRedirect = () => {
        if (this.props.redirectVar) {
            sessionStorage.setItem('ownername', this.state.email);
            return <Redirect to='/' />
        }
    }


    handleLogin = async (e) => {
        e.preventDefault();
        let { email, password } = this.state;
        const data = {
            email: email,
            password: password
        }
        this.props.ownerSubmitLogin(email, password);
        setTimeout(() => {
            if (this.props.response === 400) alert('Invalid username/password');
        }, 100);
        await this.renderRedirect();

        // console.log("Owner Login Request Submitted");
        // axios.defaults.withCredentials = true;
        // axios.post('http://localhost:3001/ownerlogin', this.state)
        //     .then(response => {
        //         if (response.status === 200) {
        //             sessionStorage.setItem('ownername', this.state.email);
        //             console.log("Login successful");
        //             this.setState({
        //                 redirectVar: true
        //             })

        //         } else {
        //             console.log("Invalid Login Credentials");
        //             this.setState({

        //             })

        //         }
        //     })
        //     .catch(error => {
        //         console.log("Invalid credentials");
        //         alert("invalid credentials");
        //     })
        // e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({
            //square brackets must
            [e.target.name]: e.target.value
        })
    }


    render() {
        return (
            <div class="loginPage_bg">
                {this.renderRedirect()}
                <div class="container">
                    <center>
                        <div class="col-lg-offset-2 col-lg-4">
                            <img class="ownerlogo" alt="logo here" src={require('../images/ownerLogin.PNG')}></img>
                        </div>
                        <div class="formContainer col-lg-offset-1 col-lg-4">
                            <div class="formHeading">
                                <h3>Owner Login</h3>
                                <p>Need an account? <a href="#"><Link to="/OwnerSignUp"><span>Sign Up</span></Link></a></p>
                            </div>
                            <div class="form-group">
                                <form>
                                    <input onChange={this.handleChange.bind(this)} class="form-control form_element" name="email" type="text" placeholder="Email address"></input>
                                    <input onChange={this.handleChange.bind(this)} class="form-control form_element" name="password" type="password" placeholder="password"></input>
                                    <a class="float_left" href="#">Forgot Password?</a>
                                    <br></br>
                                    <button onClick={this.handleLogin.bind(this)} class="form_element btn_login btn btn-lg btn-block" type="submit">Log In</button>
                                    <div class="float_left">
                                        <input class="form-check-input" type="checkbox"></input>
                                        <label class="form-check-label">Keep me signed in</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </center>
                </div>
                <Footer />
            </div>

        );
    }

}

//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    redirectVar: state.ownerLoginState.redirectVar,
    response: state.ownerLoginState.response
})

export default connect(mapStateToProps, { ownerSubmitLogin })(OwnerLogin);
//export default OwnerLogin;

