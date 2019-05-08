import React,{Component} from 'react';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { submitSecurity } from '../../actions/listPropertyActions';
import { stat } from 'fs';
import cookie from 'react-cookies';
/* REDUX IMPORTS END */

class Security extends Component{
constructor(props){
    super(props);
    console.log("Inside ListProperty/Security");
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

export default connect(mapStateToProps, { submitSecurity })(Security);