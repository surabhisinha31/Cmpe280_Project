import React, { Component } from 'react';
class Footer2 extends Component {

    constructor(props) {
        super(props);
        console.log("Inside Footer");
    }
    render() {
        return (
            <div>
                <img class="footerImg" src={require('../images/FooterImg.PNG')} />
                <img class="footerImg" src={require('../images/FooterImg2.PNG')} />
            </div>
        )
    }
}

export default Footer2;