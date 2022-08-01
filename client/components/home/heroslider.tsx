import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default class NextJsCarousel extends Component {
  render() {
    return (
      <div className="mt-[20px] w-[90vw] mx-auto ">
        <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
          <div>
            <img src="/slide1.png" />
          </div>
          <div>
            <img src="/slide2.png" />
          </div>
        </Carousel>
      </div>
    );
  }
}
