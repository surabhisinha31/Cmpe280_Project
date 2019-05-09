import { SUBMIT_LOCATION, SUBMIT_DETAILS, SUBMIT_BOOKINGOPTIONS, SUBMIT_PHOTOS, SUBMIT_SECURITY, SUBMIT_PAYMENT, SUBMIT_AVAILABILITY, SUBMIT_RENTAL } from './types';
import { SUBMIT_ALL_LIST_PROPERTIES } from './types';
import axios from "axios";
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'

export const submitLocation = (data) => dispatch => {
    console.log("Actions : updating location details in store...");
    dispatch({
        type: SUBMIT_LOCATION,
        payload: data
    })
}

export const submitDetails = (data) => dispatch => {
    console.log("Actions :  updating details in store...");
    dispatch({
        type: SUBMIT_DETAILS,
        payload: data
    })
}

export const submitBookingOptions = (data) => dispatch => {
    console.log("Actions : Booking Options details...");
    dispatch({
        type: SUBMIT_BOOKINGOPTIONS,
        payload: data
    })
}

export const submitPhotos = (data) => dispatch => {
    console.log("Actions : photos details...", data);
    dispatch({
        type: SUBMIT_PHOTOS,
        payload: data
    })
}

export const submitSecurity = (data) => dispatch => {
    console.log("Actions : Security details...");
    dispatch({
        type: SUBMIT_SECURITY,
        payload: data
    })
}

export const submitPayment = (data) => dispatch => {
    console.log("Actions : Payment details...");
    dispatch({
        type: SUBMIT_PAYMENT,
        payload: data
    })
}

export const submitAvailability = (data) => dispatch => {
    console.log("Actions : Availability details...");
    dispatch({
        type: SUBMIT_AVAILABILITY,
        payload: data
    })
}

export const submitRental = (data) => dispatch => {
    console.log("Actions : in Rental, updating All details in store...");
    axios.defaults.withCredentials = true;
    dispatch({
        type: SUBMIT_RENTAL,
        payload: data
    })
}

export const submitAllDetails = (data) => dispatch => {
    console.log("Actions : Submit all details...", data);
    axios.post(IP_NODE_PORT + IP_backEnd + '/listProperty', data)
        .then(response => {
            dispatch({
                type: SUBMIT_ALL_LIST_PROPERTIES,
                payload: response.status,
            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response.status);
            dispatch({
                type: SUBMIT_ALL_LIST_PROPERTIES,
                payload: error.response.status
            })
        })
}
