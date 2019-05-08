import React, { Component } from 'react';
//import { Alert } from 'react-bootstrap';
import BookingDetails from './BookingDetails';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { submitDetails } from '../../actions/listPropertyActions';
import { stat } from 'fs';
/* REDUX IMPORTS END */

class Details extends Component {
    constructor(props) {
        super(props);
        console.log("Inside ListProperty/Details");

        this.state = {
            comp: <BookingDetails callbackFromParent={this.myCallback} />,
            headline: "",
            description: "",
            type: "",
            bedrooms: "",
            accomodates: "",
            bathrooms: "",
        }

        this.sendDatatoParent = this.sendDatatoParent.bind(this);
        this.getData = this.getData.bind(this);
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
        // REDUX STORE
        this.props.submitDetails(this.state);
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="locationHeader">
                    <h4>Describe your property</h4>
                </div>
                <div class="listPropBody">
                    <form class="form-group">
                        <p class="form_element">Start out with a descriptive headline and a detailed summary of your property.</p>
                        <input class="form-control form_element" onChange={this.getData} name="headline" type="text" placeholder="HeadLine"></input>
                        <textarea class="form-control form_element" onChange={this.getData} name="description" type="text" placeholder="Property Description"></textarea>
                        <select name="type" onChange={this.getData} class="form-control">
                            <option>Select Property Type</option>
                            <option>House</option>
                            <option>Hotel</option>
                            <option>FarmHouse</option>
                            <option>Villa</option>
                            <option>Castle</option>
                            <option>Resort</option>
                            <option>Tower</option>
                        </select>
                        <input class="form-control form_element" onChange={this.getData} name="bedrooms" type="Number" min="1" placeholder="Bedrooms"></input>
                        <input class="form-control form_element" onChange={this.getData} name="accomodates" type="Number" min="1" placeholder="Accomodates"></input>
                        <input class="form-control form_element" onChange={this.getData} name="bathrooms" type="Number" min="1" placeholder="Bathrooms"></input>
                        <div>
                            <button class="col-lg-offset-2 col-lg-2 btn btn-danger">Cancel</button>
                            <button onClick={this.sendDatatoParent} class="col-lg-2  col-lg-offset-4 btn btn-primary">Next</button>
                        </div>
                    </form>
                </div>
            </div>);
    }

}


//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    ...state.listPropertyState.propertyData,
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    propertyData: state.listPropertyState.propertyData,
})

export default connect(mapStateToProps, { submitDetails })(Details);