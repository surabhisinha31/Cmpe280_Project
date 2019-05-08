// All Login actions should be done, variables must be imported from types.js
import { SUBMIT_MESSAGE, DISPLAY_TRAVELER_MAIL, DISPLAY_OWNER_MAIL,REPLY_MAIL } from './types';
import axios from "axios";
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
const server_url = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';
//const ROOT_URL = "http://localhost:3001";
const headers = {
    'Accept': 'application/json'
};

export const submitMessage = (message) => dispatch => {
    //code here
    console.log("Actions : sending Message...");
    axios.defaults.withCredentials = true;
    console.log(message);

    /******************** MESSAGES **************************/
    axios.post(IP_backEnd + IP_NODE_PORT + '/travelermail', message)
        .then(response => {
            console.log("respose received Message Actions:", response)
            dispatch({
                type: SUBMIT_MESSAGE,
                response: response.data,
                payload: response.status
            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response.status);
            dispatch({
                //ERROR 400 status
                type: SUBMIT_MESSAGE,
                payload: error.response.status
            })
        })

}

// export const inboxHandler = (data) => dispatch => {
//     //code here
//     console.log("Actions : reading Message...");
//     axios.defaults.withCredentials = true;
//     console.log(data);
//
//     /******************** MESSAGES **************************/
//     axios.post(IP_backEnd + IP_NODE_PORT + '/fetchmail', data)
//         .then(response => {
//             console.log("respose received Message Actions:", response)
//             dispatch({
//                 type: DISPLAY_OWNER_MAIL,
//                 response: response.data,
//                 payload: response.status
//             })
//
//             // history.push('/Inbox');
//         })
//         .catch((error) => {
//             console.log("Action Catch : ", error.response.status);
//             dispatch({
//                 //ERROR 400 status
//                 type: DISPLAY_OWNER_MAIL,
//                 payload: error.response.status
//             })
//         })
//
// }
export const inboxHandler = function(data) {
  console.log("logged in user details:",data)
  return (dispatch) => {
  fetch(`${server_url}/fetchmail`, {
          method: 'POST',
          credentials:'include',
          mode: 'cors',
          headers: { ...headers,'Content-Type' : 'application/json'},
          body: JSON.stringify(data)
      }).then(res => {
          if(res.status === 200){
            console.log("Sending message response:",res.status);
            return res.json();
          }
     }).then(result=>{
         console.log("result",result)
         dispatch({
             type: DISPLAY_OWNER_MAIL,
             response: result.data,
             payload: result.status
         })
         // history.push('/inbox');
  }).catch(err => {
          alert(err);
          console.log("Error while uploading property images");
          return err;
        });
  }
};

export const travelerinboxHandler = (data) => dispatch => {
    //code here
    console.log("Actions : reading Message...");
    axios.defaults.withCredentials = true;
    console.log(data);

    /******************** MESSAGES **************************/
    axios.post(IP_backEnd + IP_NODE_PORT + '/fetchTravelermail', data)
        .then(response => {
            console.log("respose received Message Actions:", response)
            dispatch({
                type: DISPLAY_TRAVELER_MAIL,
                response: response.data,
                payload: response.status
            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response.status);
            dispatch({
                //ERROR 400 status
                type: DISPLAY_TRAVELER_MAIL,
                payload: error.response.status
            })
        })

}


export const ownerReplyHandler = (message) => dispatch => {
    //code here
    console.log("Actions : reading Message...");
    axios.defaults.withCredentials = true;
    console.log(message);

    /******************** MESSAGES **************************/
    axios.post(IP_backEnd + IP_NODE_PORT + '/ownermail', message)
        .then(response => {
            console.log("respose received Message Actions:", response)

            dispatch({
                type: REPLY_MAIL,
                response: response.data,
                payload: response.status
            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response.status);
            dispatch({
                //ERROR 400 status
                type: REPLY_MAIL,
                payload: error.response.status
            })
        })

}


// export const sendMessage = function(messageInfo) {
//   return (dispatch) => {
//    // dispatch(pricingUpdateAction(propertyPricingInfo));
//   fetch(`${server_url}/travelerOwnerEmail/travelermail`, {
//           method: 'POST',
//           credentials:'include',
//           mode: 'cors',
//           headers: { ...headers,'Content-Type' : 'application/json'},
//           body: JSON.stringify(messageInfo)
//       }).then(res => {
//           if(res.status === 200){
//             console.log("Sending message response:",res.status);
//             return res.json();
//           }
//      }).then(result=>{
//          console.log("result",result)
//          dispatch(sendMessageAction(messageInfo));
//          alert("Message Sent successfully.!!!!");
//          history.push('/propertyDetailedList');
//   }).catch(err => {
//           alert(err);
//           console.log("Error while uploading property images");
//           return err;
//         });
//   }
// };

// export const inboxHandler = function(currentUser) {
//   console.log("logged in user details:",currentUser)
//   return (dispatch) => {
//   fetch(`${server_url}/travelerOwnerEmail/fetchmail`, {
//           method: 'POST',
//           credentials:'include',
//           mode: 'cors',
//           headers: { ...headers,'Content-Type' : 'application/json'},
//           body: JSON.stringify(currentUser)
//       }).then(res => {
//           if(res.status === 200){
//             console.log("Sending message response:",res.status);
//             return res.json();
//           }
//      }).then(result=>{
//          console.log("result",result)
//          dispatch(inboxDisplayAction(result.result));
//          history.push('/inbox');
//   }).catch(err => {
//           alert(err);
//           console.log("Error while uploading property images");
//           return err;
//         });
//   }
// };
// export const travelerinboxHandler = function(currentUser) {
//   console.log("logged in user details:",currentUser)
//   return (dispatch) => {
//   fetch(`${server_url}/travelerOwnerEmail/fetchTravelermail`, {
//           method: 'POST',
//           credentials:'include',
//           mode: 'cors',
//           headers: { ...headers,'Content-Type' : 'application/json'},
//           body: JSON.stringify(currentUser)
//       }).then(res => {
//           if(res.status === 200){
//             console.log("Sending message response:",res.status);
//             return res.json();
//           }
//      }).then(result=>{
//          console.log("result",result)
//          dispatch(travelerinboxDisplayAction(result.result));
//          history.push('/travelerinbox');
//   }).catch(err => {
//           alert(err);
//           console.log("Error while uploading property images");
//           return err;
//         });
//   }
// };
//
// export const ownerReplyHandler = function(sentMessage) {
//   console.log("loggen in user details:",sentMessage)
//   return (dispatch) => {
//   fetch(`${server_url}/travelerOwnerEmail/ownermail`, {
//           method: 'POST',
//           credentials:'include',
//           mode: 'cors',
//           headers: { ...headers,'Content-Type' : 'application/json'},
//           body: JSON.stringify(sentMessage)
//       }).then(res => {
//           if(res.status === 200){
//             console.log("Sending message response:",res.status);
//             return res.json();
//           }
//      }).then(result=>{
//          console.log("result",result)
//          dispatch(ownerReplyAction(sentMessage));
//          alert("Successful Reply.....!!!!");
//          history.push('/userhome');
//   }).catch(err => {
//           alert(err);
//           console.log("Error while uploading property images");
//           return err;
//         });
//   }
// };
