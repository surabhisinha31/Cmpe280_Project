// All Login actions should be done, variables must be imported from types.js
import { OWNER_SUBMIT_LOGIN, OWNER_SIGNOUT } from './types';
import axios from "axios";
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'

//const ROOT_URL = "http://localhost:3001";

export const ownerSubmitLogin = (email, password) => dispatch => {
    //code here
    console.log("Actions : verfying OWNER login...");
    axios.defaults.withCredentials = true;
    const data = {
        email: email,
        password: password
    }
    console.log(data);

    /********************TRAVELER LOGIN **************************/
    axios.post(IP_backEnd + IP_NODE_PORT + '/ownerlogin', data)
        .then(response => {
            console.log("response received after successful login :", response.data);
            dispatch({
                type: OWNER_SUBMIT_LOGIN,
                payload: response.status,
                Ownercookie : response.data.cookie
            })
        })
        .catch((error) => {
          if(error.response){
            console.log("Action Catch : ", error.response.status);
            dispatch({
                //ERROR 400 status
                type: OWNER_SUBMIT_LOGIN,
                payload: error.response.status,
                Ownercookie:""
            })
          }else{
            alert("something went wrong !")
          }

        })

}

export const ownerSignout = () => dispatch => {
    console.log("Actions : signing out owner...");
    dispatch({
        type: OWNER_SIGNOUT,
        payload: false,
        Ownercookie:""
    })
}
