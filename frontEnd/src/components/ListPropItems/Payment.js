import React,{Component} from 'react';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { submitPayment } from '../../actions/listPropertyActions';
import { stat } from 'fs';
/* REDUX IMPORTS END */

class Payment extends Component{
constructor(props){
    super(props);
    console.log("Inside ListProperty/Payment");
}

render(){
    return(
        <div>
            
        </div>
    );
}
}


//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    propertyData: state.listPropertyState.propertyData,
})

export default connect(mapStateToProps, { submitPayment })(Payment);