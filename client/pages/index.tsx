import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import Navbar from '../components/navbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NextJsCarousel from '../components/heroslider';
export default function Hero() {
  return (
    <>
      <Navbar />
      <NextJsCarousel />
    </>
  );
}
