import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import { IP_backEnd, IP_NODE_PORT } from '../config/config';

class OwnerSignUp extends Component {
    constructor(props) {
        super(props);
        console.log("Inside SignUp");

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state);
        const data = this.state;

        axios.defaults.withCredentials = true;
        axios.post(IP_backEnd + IP_NODE_PORT + '/ownerSignUp', data)
            .then(response => {
                if (response.status === 200) {
                    alert("sign up successfull !");
                    console.log("sign up successful, data inserted");
                    this.props.history.push('/OwnerLogin');
                }
            })
            .catch((error) => {
                alert("Email already exists");
                console.log("Response status : ", error.response.status, "Response : ", error.response.data);
            })
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
                <div class="container">
                    <center>
                        <div class="loginHeader">
                            <h2>Sign up for HomeAway Owner Account</h2>
                            <p>Already have an account?<a href="#"><Link to="/OwnerLogin"><span> Log in</span></Link></a></p>
                        </div>
                        <div class="formContainer col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
                            <div class="form-group">
                                <form>
                                    <div>
                                        <input class="form-control  form_element" name="firstName" type="text" onChange={this.handleChange.bind(this)} placeholder="First Name"></input>
                                        <input class="form-control  form_element" name="lastName" type="text" onChange={this.handleChange.bind(this)} placeholder="Last Name"></input>
                                    </div>
                                    <input class="form-control form_element" type="text" name="email" onChange={this.handleChange.bind(this)} placeholder="Email address"></input>
                                    <input class="form-control form_element" type="password" name="password" onChange={this.handleChange.bind(this)} placeholder="password"></input>

                                    <button class="form_element btn_login btn btn-lg btn-block" onClick={this.handleClick.bind(this)} type="submit">Sign Me Up</button>
                                    <div class="or">

                                    </div>
                                    <div class="social_login">
                                        <button class="form_element btn_fb btn btn-lg btn-block" >Log in with Facebook</button>
                                        <button class="form_element btn_google btn btn-lg btn-block">Log in with Google</button>
                                    </div>
                                    <div class="">
                                        <label class="form_footer">We don't post anything without your permission.</label>
                                    </div>
                                    <div class="">
                                        <label class="form_footer">By creating an account you are accepting our Terms and Conditions and Privacy Policy.
                                        </label>
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

export default OwnerSignUp;

