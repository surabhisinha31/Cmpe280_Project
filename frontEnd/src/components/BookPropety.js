import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Footer2 from './Footer2';
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'
import { connect } from 'react-redux';
import Dialog from './Dialog';
import {Modal,Button} from 'react-bootstrap';

class BookProperty extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Book property", this.props.location.state);
        this.state = {
            _id: this.props.location.state._id,
            isOpen: false,
            propertyData: this.props.location.state.propertyData[this.props.location.state._id - ((this.props.location.state.pageNo - 1) * 5) - 1][0]
        }
        console.log("Property data of current clicked property : ", this.state.propertyData);
        this.notifyMe = this.notifyMe.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    returnImage(index) {
        if (Array.isArray(this.state.propertyData.photos[this.state._id - 1]));
        return this.state.propertyData.photos[this.state._id - 1][index];
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow=async(e)=> {
        this.setState({ show: true });
        e.preventDefault();
        let ID = this.props.Travelercookie;
        await axios.get(IP_backEnd + IP_NODE_PORT + '/request-proof/' + ID)
            .then(response => {
                console.log(response);
               // alert("User Identity Verified");
                this.setState({ isOpen: true });
            });
    }

    returnPropertyData() {
        //directly not working, checking array and returing is only working.
        if (Array.isArray(this.state.propertyData));
        return this.state.propertyData;
    }

    sendMessage = (e) => {
        e.preventDefault();
        this.props.history.push('/Messages', this.state.propertyData.ownername)
    }


    getOwner() {

    }
    bookHomeBtn = async (e) => {
        e.preventDefault();
        const data = await {
            //only key not key-1
            _id: this.state._id,
            bookedUser: this.props.Travelercookie
        }
        console.log(data, "traveler cookie", this.props.Travelercookie);

        await axios.post(IP_backEnd + IP_NODE_PORT + '/bookProperty', data)
            .then(response => {
                console.log(response);
            });
          this.notifyMe();
        // if(!this.state.isOpen) {
        //   console.log("this.state.isOpen", this.state.isOpen);
        //   this.props.history.push('/BookingHistory');
        // }


    }
notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Your Booking has been confirmed");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Your Booking has been confirmed");
      }
    });
  }
  this.props.history.push('/BookingHistory');
}
    render() {
        //var photos = []
        //console.log(this.state.photosData[this.state.key].length);
        console.log(this.state.propertyData.photos)
        var carouselImages = this.state.propertyData.photos.map((image, index) => {
            if (index == 0) {
                return (
                    <div class="item active ">
                        <img class="container-img" style={{ width: '100%', height: '576px' }} alt="No Image !" src={'data:image/jpeg;base64,' + image}></img>
                    </div>
                )
            } else {
                return (<div class="item  container-img">
                    <img class="" style={{ width: '100%', height: '576px' }} alt="No Image !" src={'data:image/jpeg;base64,' + image}></img>
                </div>)
            }
        })

        //console.log(photos);

        return (
            <div>
                <div class="bookPropertyContainer container-fluid">
                    <div class="container col-lg-8">
                        <div id="myCarousel" class="carousel slide " data-ride="carousel">
                            <div class="carousel-inner">
                                {carouselImages}
                            </div>
                            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="right carousel-control" href="#myCarousel" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                        <div class="shadowBg">
                            <h2>{this.state.propertyData.headline}</h2>
                            <div class="paddingAll">
                                <div class="col-lg-12">
                                    <span class="col-lg-3"><i class="fa fa-home fa-3x"></i></span>
                                    <span class="col-lg-3"><i class="fa fa-bed fa-3x"></i></span>
                                    <span class="col-lg-3"><i class="fa fa-users fa-3x"></i></span>
                                    <span class="col-lg-3"><i class="fa fa-bath fa-3x"></i></span>
                                </div>
                                <div class="col-lg-12">
                                    <span class="col-lg-3">{this.state.propertyData.type}</span>
                                    <span class="col-lg-3">{this.state.propertyData.bedrooms}</span>
                                    <span class="col-lg-3">{this.state.propertyData.accomodates}</span>
                                    <span class="col-lg-3">{this.state.propertyData.bathrooms}</span>
                                </div>
                            </div>
                            <div class="borderDesc">
                                <span>{this.state.propertyData.description}</span>
                            </div>
                        </div>
                    </div>
                    <div class="bookPropertyForm col-lg-4">
                        <div class="paddingAll"><i class="fa fa-usd fa-3x">{this.state.propertyData.rent}</i>&nbsp;avg/night</div>
                        <div class="paddingAll">4.6/5 Excellent.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Good for families</div>
                        <div class="paddingAll col-lg-12">
                            <div class="col-lg-6 ">
                                <input type="date" onChange={this.handleChange} name="checkInDate" class="form-control  form_element" placeholder="Check In"></input>
                            </div>
                            <div class="col-lg-6 ">
                                <input type="date" onChange={this.handleChange} name="checkOutDate" class="form-control form_element" placeholder="Check Out"></input>
                            </div>
                        </div>
                        <div class="paddingAll ">
                            <input type="text" class="form-control form_element" placeholder="Guests" ></input>
                        </div>
                        <div class="paddingAll">
                            <button class="btn btn-lg btn-primary blueButton" onClick={this.handleShow} type="submit">Request Identity</button>
                            {this.state.isOpen == true ? <button class="btn btn-lg btn-primary blueButton" onClick={this.bookHomeBtn.bind(this)} type="submit">Request to Book</button> : null}
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Alert</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>User Identity Verified!</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close</Button>
                                <Button variant="primary" onClick={this.handleClose}>
                                    Save Changes</Button>
                            </Modal.Footer>
                        </Modal>
                        <div class="paddingAll">
                            <Link to='/Messages'><button class="btn btn-lg btn-primary blueButton" onClick={this.sendMessage.bind(this)} type="submit">Ask Owner Question</button></Link>
                        </div>
                    </div>
                </div>

                <div>
                    <Footer2 />
                </div>
            </div>
        )
    }
}

//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    Travelercookie: state.loginState.Travelercookie,
    Ownercookie: state.ownerLoginState.Ownercookie
})

export default connect(mapStateToProps, {})(BookProperty);
