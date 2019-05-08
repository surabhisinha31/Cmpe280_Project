import { SUBMIT_LOCATION, SUBMIT_DETAILS, SUBMIT_BOOKINGOPTIONS, SUBMIT_PHOTOS, SUBMIT_SECURITY, SUBMIT_PAYMENT, SUBMIT_AVAILABILITY, SUBMIT_RENTAL } from '../actions/types';
import { SUBMIT_ALL_LIST_PROPERTIES } from '../actions/types';

const initialState = {
    propertyData: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SUBMIT_LOCATION:
            console.log("REDUCER : updating LOCATION details in store...");
            return {
                ...state,
                propertyData: Object.assign({}, state.propertyData, action.payload)
            }
        case SUBMIT_DETAILS:
            console.log("REDUCER : updating DETAILS in store...");
            return {
                ...state,
                propertyData: Object.assign({}, state.propertyData, action.payload)
            }
        case SUBMIT_BOOKINGOPTIONS:
            console.log("REDUCER : updating BOOKINGOPTIONS details in store...");
            return {
                ...state,
                propertyData: Object.assign({}, state.propertyData, action.payload)
            }
        case SUBMIT_PHOTOS:
            console.log("REDUCER : updating PHOTOS details in store...");
            return {
                ...state,
                propertyData: Object.assign({}, state.propertyData, action.payload)
            }
        case SUBMIT_SECURITY:
            console.log("REDUCER : updating SECURITY details in store...");
            return {
                ...state,
                propertyData: Object.assign({}, state.propertyData, action.payload)
            }
        case SUBMIT_PAYMENT:
            console.log("REDUCER : updating PAYMENT details in store...");
            return {
                ...state,
                propertyData: Object.assign({}, state.propertyData, action.payload)
            }
        case SUBMIT_AVAILABILITY:
            console.log("REDUCER : updating AVAILABILITY details in store...");
            return {
                ...state,
                propertyData: Object.assign({}, state.propertyData, action.payload)
            }
        case SUBMIT_RENTAL:
            console.log("REDUCER : updating RENTAL details in store...");
            return {
                ...state,
                //responseCode: action.responseCode,
                propertyData: Object.assign({}, state.propertyData, action.payload)
            }
        case SUBMIT_ALL_LIST_PROPERTIES:
            console.log("REDUCER : updating response code after submitting list properties...");
            return {
                ...state,
                LPresponseCode: action.payload,
            }
        default:
            return state;
    }
}