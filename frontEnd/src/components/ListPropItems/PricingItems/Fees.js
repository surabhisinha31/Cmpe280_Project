import React, { Component } from 'react';

class Fees extends Component {
    constructor(props) {
        super(props);
        console.log("Inside ListProperty/Pricing/Fees");
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="feeHeader">
                    <h3>Fees</h3>
                </div>
                <div class="feeHeader">
                    <p>You can add fees to your listing or skip this step. Additional fees can be added later.</p>
                </div>
                <div class="feeHeader">
                    <div>
                        <label >Cleaning fee</label>
                        <input type="text"></input>
                        <input type="checkbox" checked></input>
                        <label>Taxable</label>
                    </div>
                    <div>
                        <input class="form-check-input" type="radio" name="optradio" checked></input>
                        <input class="" type="radio" name="optradio"></input>
                    </div>
                </div>
                <div>
                    <button class=" col-lg-offset-2 col-lg-2 btn btn-danger">Cancel</button>
                    <button class="col-lg-2  col-lg-offset-4 btn btn-primary">Next</button>
                </div>
            </div>
        );
    }
}

export default Fees;