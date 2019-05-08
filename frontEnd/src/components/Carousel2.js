import React, { Component } from 'react';

class Carousel2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div class="carousel slide multi-item-carousel theCarousel" id="theCarousel2">
                <h2>&nbsp;&nbsp;Trending destinations</h2>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explore this week’s most searched places</p>
                    <div class="carousel-inner">
                        {/* ITEMS HERE */}
                        <div class="item active">
                            <div class="col-sm-6 col-md-3">
                                <a href="#1">
                                    <img src="https://odis.homeaway.com/odis/destination/47a2821d-b39f-4e92-b17d-b3dbfb79510f.hw6.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Pigeon Forge</h3>
                                <p>Tennesse</p>

                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#2">
                                    <img src="https://odis.homeaway.com/odis/destination/aebc04da-3591-4ea4-bfe8-f5ea726a4447.hw6.jpg" class="img-responsive"></img>
                                </a>
                                <h3>New York</h3>
                                <p>New York</p>

                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#3">
                                    <img src="https://odis.homeaway.com/odis/destination/f41c17cd-a595-4e55-8c4c-212e0132f236.hw6.jpg" class="img-responsive"></img>
                                </a>
                                <h3>San Diego</h3>
                                <p>California</p>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#4">
                                    <img src="https://odis.homeaway.com/odis/destination/56d73b61-1f5a-4090-8359-24895c545e5e.hw6.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Maui</h3>
                                <p>Hawaii</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="col-sm-6 col-md-3">
                                <a href="#5">
                                    <img src="https://odis.homeaway.com/odis/destination/152e6ed0-faa8-4a48-b36a-ed0f527b68ec.hw6.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Panama City Beach</h3>
                                <p>Florida</p>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#6">
                                    <img src="https://odis.homeaway.com/odis/destination/03dc5f84-db9b-4fb1-a952-a250e9b69344.hw6.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Orlando</h3>
                                <p>Florida</p>

                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#7">
                                    <img src="https://odis.homeaway.com/odis/destination/93c6235b-8531-4459-8913-aabb47fa7bb5.hw6.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Gatlinburg</h3>
                                <p>Tennesse</p>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#8">
                                    <img src="https://odis.homeaway.com/odis/destination/d87e4c30-b5f1-4a30-bb12-7883a29cabbc.hw6.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Destin</h3>
                                <p>Florida</p>
                            </div>
                        </div>
                        {/* ITEMS HERE */}
                    </div>
                    <a class="left carousel-control" href="#theCarousel2" data-slide="prev"><i class="glyphicon glyphicon-chevron-left"></i></a>
                    <a class="right carousel-control" href="#theCarousel2" data-slide="next"><i class="glyphicon glyphicon-chevron-right"></i></a>
                </div>
            </div>

        )
    }
}

export default Carousel2;