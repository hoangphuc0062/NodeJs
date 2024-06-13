import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./swiper.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img
          src="https://ananas.vn/wp-content/uploads/Web1920-1.jpeg"
          alt="banner_1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://ananas.vn/wp-content/uploads/Hi-im-Mule_1920x1050-Desktop.jpg"
          alt="banner_2"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
