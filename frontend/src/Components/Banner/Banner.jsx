import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from '../../assets/1292.jpg';
import image2 from '../../assets/11084.jpg';
import image3 from '../../assets/2149575327.jpg';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [image1, image2, image3];

  return (
    <div className="relative w-full max-w-3xl h-2/5 mt-12 mx-auto lg:block hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="lg:block hidden">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-96 object-cover rounded-large" />
          </div>
        ))}
      </Slider>
      <div className="absolute top-0 left-0 bg-yellow-400 text-white text-4xl font-bold p-4 rounded-md transform rotate-12 shadow-lg">
        Sale
      </div>
    </div>
  );
};

export default Banner;
