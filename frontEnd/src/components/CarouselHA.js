import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import RBCarousel from "react-bootstrap-carousel";

const styles = { height: 400, width: "100%" };

class CarouselHA extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoplay: true
    };
  }

  render() {
    let { leftIcon, rightIcon } = this.state;
    return (
      <div className="carouselHA">
        <Row>
          <Col span={12} style={{ marginTop: 0 }}>
            <RBCarousel
              animation={true}
              autoplay={this.state.autoplay}
              slideshowSpeed={2000}
              defaultActiveIndex={0}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              onSelect={this.onSelect}
              ref={r => (this.slider = r)}
            >
              <div style={{ height: 300 }}>
                <img
                  class="paddingAll"
                  style={{ width: "25%", height: "70%" }}
                  src="https://odis.homeaway.com/odis/destination/df62f169-3da4-4143-b4fa-1241c284755c.carousel-m.jpg"
                />
                <img
                  class="paddingAll"

                  style={{ width: "25%", height: "70%" }}
                  src="https://odis.homeaway.com/odis/destination/df62f169-3da4-4143-b4fa-1241c284755c.carousel-m.jpg"
                />
                <img
                  class="paddingAll"

                  style={{ width: "25%", height: "70%" }}
                  src="https://odis.homeaway.com/odis/destination/df62f169-3da4-4143-b4fa-1241c284755c.carousel-m.jpg"
                />
                <img
                  class="paddingAll"

                  style={{ width: "25%", height: "70%" }}
                  src="https://odis.homeaway.com/odis/destination/df62f169-3da4-4143-b4fa-1241c284755c.carousel-m.jpg"
                />
                
                <div className="carousel-caption">Image</div>
              </div>
              <div style={{ height: 400 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.w3schools.com/bootstrap/ny.jpg"
                />
                <div className="carousel-caption">Image</div>
              </div>
              <div style={{ height: 400 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.w3schools.com/bootstrap/ny.jpg"
                />
                <div className="carousel-caption">Image</div>
              </div>
              <div style={{ height: 400 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.w3schools.com/bootstrap/ny.jpg"
                />
                <div className="carousel-caption">Image</div>
              </div>
              <div style={{ height: 400 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.w3schools.com/bootstrap/ny.jpg"
                />
                <div className="carousel-caption">Image</div>
              </div>
            </RBCarousel>
          </Col>

        </Row>
      </div>
    );
  }
}

/**
 *  Boostrap Component
 */
const Row = props => <div className="row">{props.children}</div>;
const Col = props => (
  <div className={`col-xs-${props.span}`} style={props.style}>
    {props.children}
  </div>
);
const Button = props => {
  const { style, bsStyle, onClick } = props;
  const className = bsStyle ? `btn btn-${bsStyle}` : "btn";
  return (
    <button style={style} className={className} onClick={onClick}>
      {props.children}
    </button>
  );
};

export default CarouselHA;
