import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import homeVideo from "../../Assests/videos/home-video.mp4"; // Corrected file path
import adventureVideo from "../../Assests/videos/adventure-video.mp4"; // Corrected file path
import "./Home.css";

const VideoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    fade: true,
  };

  const slides = [
    {
      videoSrc: homeVideo,
      title: "Explore the World",
      text: "Discover breathtaking destinations with us.",
    },
    {
      videoSrc: adventureVideo,
      title: "Adventure Awaits",
      text: "Embark on unforgettable journeys.",
    },
    {
      videoSrc: homeVideo,
      title: "Luxury Travel",
      text: "Experience comfort like never before.",
    },
  ];

  return (
    <div className="video-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <video
              src={slide.videoSrc}
              autoPlay
              muted
              loop
              className="slider-video"
            ></video>
            <div className="overlay">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoSlider;
