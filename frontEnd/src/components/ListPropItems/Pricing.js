import React,{Component} from 'react';

class Pricing extends Component{
constructor(props){
    super(props);
    console.log("Inside ListProperty/Pricing");
}

render(){
    return(
        <div class="container-fluid">
            <div class="locationHeader pricingHeader">
                <h3>Availability</h3>
                <p>Already know when you would like your property to be available?</p>
                <p>You can also make changes after publishing your listing.</p>
            </div>
            <div>
                <h4>Select a starting point for setting up your availability</h4>
                <div class="priceCalender">
                    <div class="form_element col-lg-6">
                        <label>Start date</label>
                        <input class="form-control" type="date"></input>
                    </div>
                    <div class="form_element col-lg-6">
                        <label>End date</label>
                        <input class="form-control" type="date"></input>
                    </div>
                </div>
            </div>
            <div class="">
                <button class=" col-lg-offset-2 col-lg-2 btn btn-danger">Cancel</button>
                <button class="col-lg-2  col-lg-offset-4 btn btn-primary">Next</button>
            </div>              

        </div>
    );
}
}

export default Pricing;