import React, { Component } from 'react';
import Taxes from './Taxes';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { submitRental } from '../../../actions/listPropertyActions';
import { submitAllDetails } from '../../../actions/listPropertyActions';
import { stat } from 'fs';
/* REDUX IMPORTS END */

class Rental extends Component {
    constructor(props) {
        super(props);
        console.log("Inside ListProperty/Pricing/Rental");
        this.state = {
            currency: "",
            rent: "",
            tax: "",
            cleaningfee: ""
        }
      this.notifyMe = this.notifyMe.bind(this);
    }

    myCallback = (stateFromChild) => {
        console.log("In Details, state of child", stateFromChild);
        this.props.callbackFromParent(stateFromChild);
    }

    getData = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendDatatoParent = (e) => {
        e.preventDefault();
        console.log("Details state ", this.state);
        this.props.callbackFromParent(this.state);
        //REDUX STORE
        //all the data in store needs to pushed, so
        const data = {
            ...this.props.propertyData,
            ...this.state,
        }
        this.props.submitRental(this.state);
        this.notifyMe();
        //push all data to database.
        // setTimeout(() => {
        //     this.props.submitAllDetails(this.props.propertyData);
        // }, 500);
    }
    notifyMe() {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Your Property has been posted");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("Your Property has been posted");
          }
        });
      }
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="locationHeader">
                    <h3>How much do you want to charge?</h3>
                </div>
                <div class="listPropBody">
                    <form class="form-group">
                        <p class="form_element">We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.
</p>

                        <select name="currency" onChange={this.getData} class="form-control">
                            <option>Select Currency</option>
                            <option>USD</option>
                            <option>AUD</option>
                            <option>CAD</option>
                            <option>INR</option>
                        </select>
                        <input class="form-control form_element" onChange={this.getData} name="rent" type="text" placeholder="Enter Rent"></input>
                        <input class="form-control form_element" onChange={this.getData} name="tax" type="text" placeholder="Enter Tax"></input>
                        <input class="form-control form_element" onChange={this.getData} name="cleaningfee" type="text" placeholder="Enter Cleaning fee"></input>
                        <div>
                            <button class="col-lg-offset-2 col-lg-2 btn btn-danger">Cancel</button>
                            <button onClick={this.sendDatatoParent} class="col-lg-2  col-lg-offset-4 btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    propertyData: state.listPropertyState.propertyData,
})

export default connect(mapStateToProps, { submitRental, submitAllDetails })(Rental);
