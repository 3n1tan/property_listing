"use client";
import React, { ReactNode } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwiperProps {
  children: ReactNode;
}
const SwiperEffect = ({ children }: SwiperProps) => {
  return (
    <div>
      <Swiper
        className="h-auto w-auto"
        navigation
        pagination={{ type: "bullets" }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          {React.Children.map(children, (child) => (
            <SwiperSlide>{child}</SwiperSlide>
          ))}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperEffect;
