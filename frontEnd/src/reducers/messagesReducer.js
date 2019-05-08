//states of individual comoponents go here.
import { SUBMIT_MESSAGE, DISPLAY_TRAVELER_MAIL, DISPLAY_OWNER_MAIL,REPLY_MAIL  } from '../actions/types';

const initialState = {
    messageDetails: {},
    inboxDetails: {},
    replyDetails: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SUBMIT_MESSAGE:
            if (action.payload === 200) {
                console.log("Message Reducer : message sent successfully");
                return {
                    ...state,
                    messageDetails: action.response,
                    responseCode: action.payload
                }
            } else {
                console.log("Message Reducer : message failed to send!");
                return {
                    ...state,
                    responseCode: action.payload
                }
            }
        case DISPLAY_TRAVELER_MAIL:
                if (action.payload === 200) {
                    console.log("Message Reducer : message fetched successfully");
                    return {
                        ...state,
                        inboxDetails: action.response,
                        responseCode: action.payload
                    }
                } else {
                    console.log("Message Reducer : message failed to send!");
                    return {
                        ...state,
                        responseCode: action.payload
                    }
                }
        case DISPLAY_OWNER_MAIL:
              if (action.payload === 200) {
                  console.log("Message Reducer : message fetched successfully");
                  return {
                          ...state,
                          inboxDetails: action.response,
                          responseCode: action.payload
                        }
                    } else {
                        console.log("Message Reducer : message failed to send!");
                    return {
                        ...state,
                        responseCode: action.payload
                      }
                  }
        case REPLY_MAIL:
          if (action.payload === 200) {
            console.log("Reply Reducer : reply sent successfully");
            return {
                    ...state,
                    replyDetails: action.response,
                    responseCode: action.payload
                  }
              } else {
                  console.log("Reply Reducer : reply failed to send!");
              return {
                  ...state,
                  responseCode: action.payload
                }
            }
        default:
            return state;
    }
}
