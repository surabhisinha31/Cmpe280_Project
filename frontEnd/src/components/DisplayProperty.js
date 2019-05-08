import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer2 from './Footer2';
import pagination from '../css/pagination.css';
import { IP_backEnd, IP_NODE_PORT } from '../config/config';

var propertiesss = [];
var incVal = 5;
class DisplayProperty extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Display Properties");
        //retrieving data from pushed history.
        console.log("search properties from landingPage", this.props.location.state);
        this.state = {
            pageNo: 1,
            start: 1,
            end: incVal,
            id: 1,
            propertyData: [],
            _id: ""
        }
    }

    downloadOneProperty = async (i) => {
        console.log("Downloading  property and photos id: " + this.state.id);
        const data = {
            id: i,
            city: this.props.location.state.searchCity,
            searchdate: this.props.location.state.searchStartdate,
            enddate: this.props.location.state.searchEnddate,
            accomodates: this.props.location.state.searchAccomodates,
        }
        console.log("filters to query SQL", data);
        //removed await for the below
        await axios.post(IP_backEnd + IP_NODE_PORT + '/displayProperty/', data)
            .then((response) => {
                propertiesss.push(response.data);
                this.setState({
                    propertyData: propertiesss
                })
            })
            .catch((error) => {
                if (error.response) {
                    console.log("Error caught", error.response.status);
                } else {
                    alert("something went wrong")
                }
            })
    }

    componentDidMount() {
        this.downloadTenProperties();
        this.getTotalPropertyCount();
    }

    async getTotalPropertyCount() {

    }

    async downloadTenProperties() {
        for (var i = this.state.start; i <= this.state.end; i++) {
            console.log("iterating through images", i)
            //removed await for the below statement as its fetching slowly
            await this.downloadOneProperty(i);
        }
        console.log("after downloading all properties...", this.state.propertyData)
    }

    returnItem = (index) => {
        if (Array.isArray(this.state.propertyData[index])) {
            return this.state.propertyData[index][0];
        }
        else {
            return this.state.propertyData[index];
        }
    }

    getFloorSize(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    handleNext = async (e) => {
        //if(this.state.end>=1){
        //await for this.setState as it is not updating state immediately and it is downloading properties all i.e from 1 to end.
        await this.setState({
            start: this.state.start + incVal,
            end: this.state.end + incVal,
            pageNo: this.state.pageNo + 1
        })
        propertiesss = [];
        //}
        this.downloadTenProperties();
    }
    handlePrev = async (e) => {
        console.log("next clicked");
        if (this.state.start >= 1) {
            await this.setState({
                start: this.state.start - incVal,
                end: this.state.end - incVal,
                pageNo: this.state.pageNo - 1
            })
            propertiesss = [];
        }
        this.downloadTenProperties();
    }

    async redirectToBookProperty(i, e) {
        //e.preventDefault();
        await this.setState({
            _id: i
        });
        console.log("clicked key", this.state._id);
        this.props.history.push('/BookProperty', this.state)
    }

    render() {
        const Pagination =
            (<div class="pagination">
                <span><i class="fa fa-3x">{this.state.pageNo}</i></span>
            </div>)
        var PropItems = "";
        console.log("propertyData, this data will be rendered now...", this.state.propertyData);
        if (!!this.state.propertyData) {
            PropItems = this.state.propertyData.map((item, index) => {
                //return only one item after checking array // issue learned
                item = this.returnItem(index);
                console.log("item", item);
                return (
                    <div class="col-lg-12 displayItem marginAll marginRight">
                        <div class="col-lg-4">
                            {/* <img class="displayPropertyImage" alt="No Image !" src={'data:image/jpeg;base64,' + this.returnImage(index)}></img> */}
                            <img class="displayPropertyImage" alt="No Image !" src={'data:image/jpeg;base64,' + item.photos[0]}></img>
                        </div>
                        <div class="col-lg-8">
                            <div><a onClick={this.redirectToBookProperty.bind(this, (((this.state.pageNo - 1) * 5 + index + 1)))} class="itemDescription">{item.headline}</a></div>
                            <div class="col-lg-12 alignLeft">
                                <div class="col-lg-2">
                                    <i class="fa fa-home">&nbsp;{item.type}</i>
                                </div>
                                <div class="col-lg-2"><i class="fa fa-bed">&nbsp;{item.bedrooms}&nbsp;BR</i></div>
                                <div class="col-lg-2"><i class="fa fa-bath">&nbsp;{item.bathrooms}&nbsp;BA</i></div>
                                <div class="col-lg-2"><i class="fa fa-users">&nbsp;Sleeps:&nbsp;{item.accomodates}</i></div>
                                <div class="col-lg-4"><i class="fa fa-window-maximize">&nbsp;{this.getFloorSize(400, 1000)}&nbsp;Sq.ft.</i></div>
                            </div>
                            <div><div class="">&nbsp;</div></div>
                            <div><div class="">{this.getFloorSize(20, 100) / 10} miles to {this.props.location.state.searchCity}</div></div>
                            <div><div class="">{item.rent} {'$avg/night'}</div></div>
                        </div>
                    </div>
                );
            })
        } else {
            PropItems = "NO DATA";
        }


        //check state after getting all comp structures
        console.log("final state after images download", this.state);

        return (
            <div>
                <div class="displayProperty">
                    <div class="container-fluid">
                        <div class="col-lg-12 col-md-12">
                            <div class="col-lg-7">
                                {PropItems}
                            </div>
                            <div class="col-lg-5 col-md-5">
                            </div>
                        </div>
                        <div class="container marginTopAndBottom">
                            <div class="row marginTopAndBottom justify-content-center" >
                                <div class="col-sm-1 inlineItem">
                                    <span><i onClick={this.handlePrev} class="fa fa-3x fa-chevron-circle-left"></i></span>
                                </div>
                                <div class="col-sm-1 inlineItem">
                                    {Pagination}
                                </div>
                                <div class="col-sm-1 inlineItem">
                                    <span><i onClick={this.handleNext} class="fa fa-3x fa-chevron-circle-right"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Footer2 />
                </div>
            </div >
        )
    }
}
export default DisplayProperty;

