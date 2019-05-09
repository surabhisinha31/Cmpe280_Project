import React, {Component} from 'react';

class Footer extends Component{

    constructor(props){
        super(props);
        console.log("Inside Footer");
    }
    render(){
        return(
            <div class="form_footer">
                <center>
                <p>Use of this Web site constitutes acceptance of the Rentomojo.com Terms and Conditions and Privacy Policy.

</p>
                <p>©2018 Rentomojo. All rights reserved.

</p>
                </center>
            </div>
        );
    }

}

export default Footer;
