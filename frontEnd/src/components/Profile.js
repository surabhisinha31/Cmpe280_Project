import React, { Component } from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer2 from './Footer2';
import { IP_backEnd, IP_NODE_PORT } from '../config/config';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Profile");
        this.state = {
            firstName: "",
            lastName: "",
            aboutMe: "",
            city: "",
            company: "",
            school: "",
            hometown: "",
            languages: "",
            gender: "",
            phoneNumber: "",
            email: ""
        }
    }

    handleOnChange = (e) => {
        if (this.props.Travelercookie) {
            this.setState({
                email: this.props.Travelercookie
            })
        } else if (this.props.Ownercookie) {
            this.setState({
                email: this.props.Ownercookie
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    uploadData = (e) => {
        e.preventDefault();

        const data = {
            ...this.state
        }
        console.log(data);

        axios.post(IP_backEnd + IP_NODE_PORT + '/profile', data)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Profile updated successfully!");
                    this.props.history.push('/ViewProfile');
                } else {
                    console.log("Pofile not updated");
                }
            })
    }

    render() {
        return (
            <div class="loginPage_bg">
                <div class="container-fluid profileContainer">
                    <div class="profileHeader">
                        <img class="profileLogo" alt="logo here" src={require('../images/profile.PNG')}></img>
                        <h1>user name</h1>
                        <p>Member since 2018</p>
                    </div>
                    <div class="profileBody">
                        <div class="drawBorder col-lg-7">
                            <div class="col-lg-12">
                                <h2 class="col-lg-6 alignLeft">Profile information</h2>
                                <span class="fa fa-lg fa-facebook col-lg-6 alignRight">Import</span>
                            </div>
                            <form class="form-group">
                                <div class="col-lg-6">
                                    <div class="">
                                        <input class="form-control form_element" onChange={this.handleOnChange} type="text" name="firstName" placeholder="First name"></input>
                                    </div>
                                    <div class="">
                                        <input class="form-control form_element" type="text" name="lastName" onChange={this.handleOnChange} placeholder="Last name or initial"></input>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="">
                                        <textarea class="form-control form_element" type="text" name="aboutMe" onChange={this.handleOnChange} placeholder="About me"></textarea>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="">
                                        <input class="form-control form_element" type="text" name="city" onChange={this.handleOnChange} placeholder="My CIty,My Country"></input>
                                    </div>
                                    <div class="">
                                        <input class="form-control form_element" onChange={this.handleOnChange} type="text" name="company" placeholder="Company"></input>
                                    </div>
                                    <div class="">
                                        <input class="form-control form_element" type="text" name="school" onChange={this.handleOnChange} placeholder="School"></input>
                                    </div>
                                    <div class="">
                                        <input class="form-control form_element" type="text" onChange={this.handleOnChange} name="hometown" placeholder="Hometown"></input>
                                    </div>
                                    <div class="">
                                        <input class="form-control form_element" type="text" name="languages" onChange={this.handleOnChange} placeholder="Languages"></input>
                                    </div>
                                    <div class="">
                                        <select class="form-control" onChange={this.handleOnChange} name="gender">
                                            <option selected>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                {/* dummy div */}
                                <div class="col-lg-12"></div>
                                {/* <div class="col-lg-6 form-check checkbox-slider--default">
                                    <label class="">
                                        <input type="checkbox" checked></input>
                                        <span class="indicator-success">checked</span>
                                    </label>
                                </div> */}
                                {/* dummy div */}
                                <div class="col-lg-12"></div>
                                <div class="col-lg-6">
                                    <input type="text" placeholder="PhoneNumber" name="phoneNumber" onChange={this.handleOnChange} class="form-control form_element"></input>
                                </div>
                                {/* dummy div */}
                                <div class="col-lg-12"></div>
                                <div class="col-lg-2 align-self-start saveProfile">
                                    <button class="btn btn-primary" onClick={this.uploadData} type="submit">Save Changes</button>
                                </div>
                            </form>
                            {/* dummy div */}

                        </div>
                        <div class="container-fluid col-lg-offset-1 col-lg-4">
                            <div class="drawBorder">
                                <img class="emailImage" alt="logo here" src={require('../images/profile_email.PNG')}></img>
                            </div>
                            <div class="drawBorder alignCenter">
                                <Link to="/ViewProfile"><button class="btn btn-lg btn-primary-outline" type="">View Profile</button></Link>
                            </div>
                            <div class="drawBorder alignCenter">
                                <img class="profileImage" alt="logo here" src={require('../images/profile_image.PNG')}></img>
                            </div>
                        </div>
                        <div class="col-lg-12"></div>


                    </div>
                </div>
                <Footer2 />
            </div>

        );
    }

}

//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    Travelercookie: state.loginState.Travelercookie,
    Ownercookie: state.ownerLoginState.Ownercookie
})

export default connect(mapStateToProps, {})(Profile);
