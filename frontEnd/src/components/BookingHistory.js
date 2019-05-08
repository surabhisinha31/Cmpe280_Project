import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'
import { connect } from 'react-redux';

class BookingHistory extends Component {

    constructor(props) {
        super(props);
        console.log("Inside Booking History");
        this.state = {
            username: sessionStorage.getItem('username'),
            propertyData: "",
            isEmpty: true
        }
    }

    async componentDidMount() {
        const data = {
            username: this.state.username,
        }
        await axios.post(IP_backEnd + IP_NODE_PORT + '/bookingHistory/', data)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        propertyData: response.data,
                        isEmpty: false
                    })
                }
                console.log(response);
            });
    }

    render() {

        var details = "";
        var pageLayout = "";
        if (!this.state.isEmpty) {
            details = this.state.propertyData.map((property, index) => {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{property.headline}</td>
                        <td>{property.city}</td>
                        <td>{property.startdate.substring(0, 10)}</td>
                        <td>{property.enddate.substring(0, 10)}</td>
                        <td>{property.rent}</td>
                        <td><button class="btn btn btn-danger">CANCEL</button></td>
                    </tr>
                )
            })
        } else {
            return (<div>Booking data not found</div>)
        }

        console.log("check if traveler cookie is avaialble :", this.props);
        if (this.props.Travelercookie) {
            pageLayout = (
                <div class="bookPropertyContainer">
                    <div class="container-fluid shadowBg">
                        <center><h2 class="">My Booking History</h2></center>
                        <table class="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Property Name</th>
                                    <th>City</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Rent</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                    </div>
                    <div class="container-fluid ">
                        <div class="col-lg-12 marginTopAndBottom">
                            <div class="col-lg-4">
                            </div>
                            <div class="col-lg-1">
                                <span><i class="fa fa-3x fa-chevron-circle-left"></i></span>
                            </div>
                            <div class="col-lg-1">
                                <span><i class="fa fa-3x">1</i></span>
                            </div>
                            <div class="col-lg-1">
                                <span><i class="fa fa-3x fa-chevron-circle-right"></i></span>
                            </div>
                            <div class="col-lg-6">
                            </div>
                        </div>
                    </div>
                </div>)

        } else {
            this.props.history.push('/Login');
        }

        return (
            <div>{pageLayout}</div>
        )

    }
}

//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    Travelercookie: state.loginState.Travelercookie,
    Ownercookie: state.ownerLoginState.Ownercookie
})

export default connect(mapStateToProps, {})(BookingHistory);
