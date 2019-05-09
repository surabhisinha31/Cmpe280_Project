import React, { Component } from 'react';
import cookie from 'react-cookies';
import '../css/Messages.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { inboxHandler } from '../actions/messageActions';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { ownerReplyHandler } from '../actions/messageActions';
import { stat } from 'fs';


class Inbox extends Component {
  constructor(props){
    super(props);
    this.state= {
      redirect : false,
      inboxDetails: {},
      mailDetails: []
    }
    this.message={
      message:'',
      readStatus:'UNREAD',
      replyStatus:'REPLIED',
      currentMessage:{}
    }
  }
  componentWillMount() {
    // this.props.inboxHandler(this.props.Ownercookie);
    const headers = {
        'Accept': 'application/json'
    };
    fetch(`http://54.202.239.145:3001/fetchmail`, {
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
           this.props.history.push('/inbox');
    }).catch(err => {
            alert(err);
            console.log("Error while uploading property images");
            return err;
          });

    console.log("receive the props: ", this.props.inboxDetails);
  }
replyHandler=(data)=> {
  data.currentMessage.sent_message=this.message.message;
  data.currentMessage.mail_id=this.message.mail_id;
  console.log("Data value: ",data);
  alert("Reply Sent Successfully");
  this.props.ownerReplyHandler(data.currentMessage);
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
                                    <th >From</th>
                                    <th >Message</th>
                                    <th>Status</th>
                                    <th>Response</th>
                                    </tr>
                                  </thead>
                                  {console.log("Inbox details: ", this.state.inboxDetails)}
                                  {

                                    this.state.inboxDetails != undefined ?
                                        this.state.mailDetails.map((inbox) => {
                                          {this.message.currentMessage=inbox}
                                         return(
                                                <tbody>
                                                   <tr>
                                                      <td className="inbox-from">{inbox.user_email}</td>
                                                      <td className="inbox-from1">{inbox.received_message}</td>
                                                      <td className="inbox-from">{inbox.mail_status=='Replied'?inbox.mail_status:this.message.readStatus}</td>
                                                      <td className="inbox-from">{inbox.mail_status=='Replied'?inbox.sent_message:
                                                      <div>
                                                      <textarea className="inbox-cls"rows="3" placeholder="Reply here.!!!"
                                                      onChange={(event) => { this.message.message = event.target.value,this.message.mail_id = inbox.mail_id}}/>
                                                      <button type="button" className="btn btn-primary" onClick={ () => {this.replyHandler(this.message)} }>Reply</button>
                                                      </div>
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
                      </div>)
            }
    return (
                <div>
                  {renderListProp}
                </div>
            );
          }
      }

      //subscribe to Redux store updates.
      const mapStateToProps = (state) => ({
          // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
          message: state.messagesState.message,
          Travelercookie: state.loginState.Travelercookie,
          Ownercookie: state.ownerLoginState.Ownercookie,
          inboxDetails : state.messagesState.inboxDetails
      })

      export default connect(mapStateToProps, { ownerReplyHandler , inboxHandler})(Inbox);
