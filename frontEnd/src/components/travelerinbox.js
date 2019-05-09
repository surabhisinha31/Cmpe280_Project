import React, { Component } from 'react';
import cookie from 'react-cookies';
import '../css/Messages.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { ownerReplyHandler } from '../actions/messageActions';
import { stat } from 'fs';

class TravelerInbox extends Component {
  constructor(props){
    super(props);
    this.state= {
      redirect : false,
      inboxDetails: {},
      mailDetails: []
    }
    this.message={
      message:'',
      readStatus:'NOT REPLIED BY OWNER',
      replyStatus:'REPLIED'
    }
  }
  componentWillMount() {
    // this.props.inboxHandler(this.props.Ownercookie);
    const headers = {
        'Accept': 'application/json'
    };
    fetch(`http://54.202.239.145:3001/fetchTravelermail`, {
            method: 'POST',
            credentials:'include',
            mode: 'cors',
            headers: { ...headers,'Content-Type' : 'application/json'},
            body: JSON.stringify(this.props)
        }).then(res => {
            if(res.status === 200){
              console.log("Sending message response:",res.status);
              return res.json();
            }
       }).then(result=>{
           console.log("result",result)
           this.state.redirect = true;
           this.state.inboxDetails = result;
           this.state.mailDetails = result.result;
           console.log("mail details: ", this.state.mailDetails);
           this.props.history.push('/TravelerInbox');
    }).catch(err => {
            alert(err);
            console.log("Error while uploading property images");
            return err;
          });

    console.log("receive the props: ", this.props.inboxDetails);
  }


  render() {
    let renderListProp = null;
    console.log("this.props", this.props);
    if (this.state.redirect) {
      renderListProp = (<div className="inbox-header">
             <div className="inbox-Info">
                <div className="inbox-dashboard">
                <span className="glyphicon glyphicon-envelope mailuser"></span>
                <h2 className="mail-heading"> Mailbox </h2>
                    <table className="table table-hover">
                        <thead className="active">
                          <tr>
                          <th >To</th>
                          <th >Message</th>
                          <th>Status</th>
                          <th>Response</th>
                          </tr>
                        </thead>
                        {
                          this.state.inboxDetails != undefined ?
                              this.state.mailDetails.map((inbox) => {

                               return(
                                      <tbody>
                                         <tr>
                                            <td className="inbox-from">{inbox.owner_email}</td>
                                            <td className="inbox-from">{inbox.sent_message}</td>
                                            <td className="inbox-from">{inbox.mail_status=='Replied'?inbox.mail_status:this.message.readStatus}</td>
                                            <td className="inbox-from">{inbox.mail_status=='Replied'?inbox.received_message: this.message.readStatus

                                              }
                                              </td>
                                            </tr>
                                      </tbody>);
                                        })  : ''
                                      }
                                </table>
                            </div>
                    <Link to='/' className="return-success">Go to Home Page </Link>
                    </div>
                </div>
              )
    }
    return (
                    <div>
                        {renderListProp}
                    </div>
                  );
                }
      }
      const mapStateToProps = (state) => ({
          // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
          message: state.messagesState.message,
          Travelercookie: state.loginState.Travelercookie,
          Ownercookie: state.ownerLoginState.Ownercookie,
          inboxDetails : state.messagesState.inboxDetails
      })

  export default connect(mapStateToProps, null)(TravelerInbox);
