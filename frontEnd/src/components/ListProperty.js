import React, { Component } from 'react';
import Location from './ListPropItems/Location';
import Details from './ListPropItems/Details';
import BookingDetails from './ListPropItems/BookingDetails';
import Photos from './ListPropItems/Photos';
import Security from './ListPropItems/Security';
import Payment from './ListPropItems/Payment';
import Pricing from './ListPropItems/Pricing';
import Availability from './ListPropItems/PricingItems/Availability';
import Fees from './ListPropItems/PricingItems/Fees';
import Rental from './ListPropItems/PricingItems/Rental';
import Taxes from './ListPropItems/PricingItems/Taxes';
import axios from 'axios';
import Footer from './Footer';
import { IP_backEnd, IP_NODE_PORT } from '../config/config';

class ListProperty extends Component {
    constructor(props) {
        super(props);
        console.log("Inside ListProperty");
        this.state = {
            comp: <Location callbackFromParent={this.myCallback.bind(this)} />,
            //*********** Database Varibles *******
            country: "",
            street: "",
            building: "",
            city: "",
            state: "",
            zipcode: "",
            headline: "",
            description: "",
            type: "",
            bedrooms: "",
            accomodates: "",
            bathrooms: "",
            bookingoptions: "",
            photos: "",
            startdate: "",
            enddate: "",
            currency: "",
            rent: "",
            tax: "",
            cleaningfee: ""

            //*********** Database Varibles *******
        }
    }

    myCallback1 = (newComp) => {

    }

    myCallback = async (stateFromChild) => {
        //console.log("In Parent, state of child", stateFromChild);
        await this.setState({
            ...stateFromChild
        })
        console.log("state after callback", this.state);
        if (this.state.rent) {
            this.submitDataCallback();
        }
    }

    handleClick = async (item, event) => {
        event.preventDefault();
        await this.setState({
            comp: item
        })
    }

    submitDataCallback = async () => {
        //e.preventDefault();
        console.log("State data right now : ", this.state);

        //directly sending this.state is throwing error : converting circular structure to JSON
        const data = {
            country: this.state.country,
            street: this.state.street,
            building: this.state.building,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            headline: this.state.headline,
            description: this.state.description,
            type: this.state.type,
            bedrooms: this.state.bedrooms,
            accomodates: this.state.accomodates,
            bathrooms: this.state.bathrooms,
            bookingoptions: this.state.bookingoptions,
            photos: this.state.photos,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            currency: this.state.currency,
            rent: this.state.rent,
            tax: this.state.tax,
            cleaningfee: this.state.cleaningfee,
            ownername: sessionStorage.getItem('ownername')
        }

        //sending data to server
        await axios.post(IP_backEnd+IP_NODE_PORT+"/listProperty", data)
            .then(response => {
                console.log("res :" + response);
            });

        //after data is sent to server, redirect to ownerDashboard
        this.props.history.push('/OwnerDashboard');

    }


    render() {
        return (
            <div>
                <div class="listPropDiv container-fluid">
                    <div class="col-lg-12">
                        <div class="col-lg-2"></div>
                        <div class="propItems sidebar col-lg-2">
                            <ul class="nav nav-sidebar">
                                <li>
                                    <h3>Welcome</h3>
                                </li>
                                <li>
                                    <a onClick={this.handleClick.bind(this, <Location callbackFromParent={this.myCallback.bind(this)} />)} value="<Location/>">Location</a>
                                </li>
                                <li>
                                    <a onClick={this.handleClick.bind(this, <Details callbackFromParent={this.myCallback.bind(this)} />)} value="<Details/>">Details</a>
                                </li>
                                <li>
                                    <a onClick={this.handleClick.bind(this, <BookingDetails callbackFromParent={this.myCallback.bind(this)} />)} value="<BookingDetails/>">Booking Options</a>
                                </li>
                                <li>
                                    <a onClick={this.handleClick.bind(this, <Photos callbackFromParent={this.myCallback.bind(this)} />)} value="<Photos/>">Photos</a>
                                </li>
                                <li>
                                    <a onClick={this.handleClick.bind(this, <Security callbackFromParent={this.myCallback.bind(this)} />)} value="<Security/>">Security</a>
                                </li>
                                <li>
                                    <a onClick={this.handleClick.bind(this, <Payment callbackFromParent={this.myCallback.bind(this)} />)} value="<Payment/>">Payment</a>
                                </li>

                                <li>
                                    <a onClick={this.handleClick.bind(this, <Availability callbackFromParent={this.myCallback.bind(this)} />)}>Availability</a>
                                </li>
                                <li>
                                    <a onClick={this.handleClick.bind(this, <Rental callbackFromParent={this.myCallback.bind(this)} />)}>Rental</a>
                                </li>

                            </ul>

                        </div>
                        <div class="ItemDetails col-lg-6">
                            {this.state.comp}
                        </div>
                        <div class="col-lg-2"></div>
                    </div>

                </div>
                <div class="col-lg-12 footer_listprop">
                    <Footer />
                </div>
            </div>
        );
    }


}

export default ListProperty;