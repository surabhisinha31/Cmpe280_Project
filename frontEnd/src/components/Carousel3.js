import React, { Component } from 'react';

class Carousel3 extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div class="carousel slide multi-item-carousel theCarousel" id="theCarousel3">
                    <h2>&nbsp;&nbsp;Find spaces that fit your style</h2>
                    <div class="carousel-inner">
                        {/* ITEMS HERE */}
                        <div class="item active">
                            <div class="col-sm-6 col-md-3">
                                <a href="#1">
                                    <img src="https://odis.homeaway.com/odis/destination/22cf5244-dba7-4da2-bbee-9dd294185e02.carousel-m.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Resorts</h3>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#2">
                                    <img src="https://odis.homeaway.com/odis/destination/0fb12030-785f-4028-8fe0-0c622821e0b6.carousel-m.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Lodges</h3>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#3">
                                    <img src="https://odis.homeaway.com/odis/destination/cf203701-6618-4a90-afc4-1aa78bb2fd4c.carousel-m.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Farm Houses</h3>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#4">
                                    <img src="https://odis.homeaway.com/odis/destination/22b01b68-853c-4968-b4b4-8cc3b869a385.carousel-m.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Chateaus</h3>
                            </div>
                        </div>
                        <div class="item">
                            <div class="col-sm-6 col-md-3">
                                <a href="#5">
                                    <img src="https://odis.homeaway.com/odis/destination/df62f169-3da4-4143-b4fa-1241c284755c.carousel-m.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Boats</h3>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#6">
                                    <img src="https://odis.homeaway.com/odis/destination/639c592f-a6dd-4d38-b794-e4d9b5909b48.carousel-m.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Barns</h3>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#7">
                                    <img src="https://odis.homeaway.com/odis/destination/094d2a60-3ffd-42e5-869e-0cefaf1fe4e5.carousel-m.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Villas</h3>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <a href="#8">
                                    <img src="https://odis.homeaway.com/odis/destination/a62912ad-84f3-4956-abbf-d9247bff668c.carousel-m.jpg" class="img-responsive"></img>
                                </a>
                                <h3>Condos</h3>
                            </div>
                        </div>
                        {/* ITEMS HERE */}
                    </div>
                    <a class="left carousel-control" href="#theCarousel3" data-slide="prev"><i class="glyphicon glyphicon-chevron-left"></i></a>
                    <a class="right carousel-control" href="#theCarousel3" data-slide="next"><i class="glyphicon glyphicon-chevron-right"></i></a>
                </div>
            </div>

        )
    }
}

export default Carousel3;