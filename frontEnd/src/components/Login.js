import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { submitLogin } from '../actions/loginActions';
import { stat } from 'fs';
/* REDUX IMPORTS END */


class Login extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Login");
        this.state = {
            email: "",
            password: "",
        }
    }

    renderRedirect = () => {
        if (this.props.redirectVar) {
            console.log("redirecting... email is ",this.state.email)
            sessionStorage.setItem('username', this.state.email);
            return <Redirect to='/' />
        }
    }

    handleLogin = (e) => {
        e.preventDefault();
        let { email, password } = this.state;
        const data= {
            email:email,
            password:password
        }
        this.props.submitLogin(email, password);
        setTimeout(() => {
            if (this.props.response === 400) alert('Invalid username/password');
        }, 500);
        this.renderRedirect();
    }

    handleChange = (e) => {
        this.setState({
            //square brackets must
            [e.target.name]: e.target.value
        })
    }


    render() {

        //REDUX CODE //
        let { email, password } = this.state;
        let { isLoginPending, isLoginSuccess, loginError } = this.props;
        //REDUX CODE //

        return (
            <div class="loginPage_bg">
                {this.renderRedirect()}
                <div class="container">
                    <center>
                        <div class="loginHeader">
                            {/* <Alert bsStyle="warning"></Alert> */}
                            <h2>Log in to Rentomojo</h2>
                            <p>Need an account? <a href="#"><Link to="/SignUp"><span>Sign Up</span></Link></a></p>
                        </div>
                        <div class="formContainer col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
                            <div class="formHeading">
                                <h3>Account Login</h3>
                            </div>
                            <div className="message">
                            </div>
                            <div class="form-group">
                                <form>
                                    <input class="form-control form_element" onChange={this.handleChange.bind(this)} name="email" value={email} type="text" placeholder="Email address"></input>
                                    <input class="form-control form_element" onChange={this.handleChange.bind(this)} name="password" value={password} type="password" placeholder="password"></input>
                                    <a class="float_left" href="#">Forgot Password?</a>
                                    <br></br>
                                    <button onClick={this.handleLogin.bind(this)} class="form_element btn_login btn btn-lg btn-block" type="submit">Log In</button>
                                    <div class="float_left">
                                        <input class="form-check-input" type="checkbox"></input>
                                        <label class="form-check-label">Keep me signed in</label>
                                    </div>
                                    <div class="or">

                                    </div>
                                    <div class="social_login">
                                        <button class="form_element btn_fb btn btn-lg btn-block" >Log in with Facebook</button>
                                        <button class="form_element btn_google btn btn-lg btn-block">Log in with Google</button>
                                    </div>
                                    <div class="">
                                        <label class="form_footer">We don't post anything without your permission.</label>
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
    redirectVar: state.loginState.redirectVar,
    response: state.loginState.response
})

export default connect(mapStateToProps, { submitLogin })(Login);
//export default Login;
