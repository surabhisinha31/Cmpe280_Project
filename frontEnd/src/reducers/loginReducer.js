//states of individual comoponents go here.
import { SUBMIT_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, TRAVELER_SIGNOUT } from '../actions/types';

const initialState = {
  redirectVar: false,
  response: "",
  cookie: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOGIN:
      if (action.payload === 200) {
        console.log("Reducer : Traveler login successful !");
        return {
          ...state,
          redirectVar: true,
          response: action.payload,
          Travelercookie: action.Travelercookie
        }
      } else {
        console.log("Reducer : Traveler login Failed !");
        return {
          ...state,
          redirectVar: false,
          response: action.payload,
          Travelercookie: action.Travelercookie
        }
      }

    case TRAVELER_SIGNOUT:
      console.log("Reducer : Traveler Signout successful !");
      return {
        ...state,
        response: "",
        redirectVar: action.payload,
        Travelercookie: action.Travelercookie
      }
    default:
      return state;
  }
}
