"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UpdateCard from "./UpdateCard";

export default function SectionSlider({ section, data, color }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );
  const [sliderKey, setSliderKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setSliderKey((prev) => prev + 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth <= 768) return 1;
    if (windowWidth <= 1024) return 2;
    return Math.min(data.length, 4);
  };

  const sliderSettings = {
    dots: true,
    infinite: data.length > 1,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: windowWidth > 768,
  };

  if (data.length === 0) return null;

  return (
    <div className="section-slider">
      <Slider key={sliderKey} {...sliderSettings}>
        {data.map((item) => (
          <div key={item.id} className="slider-item">
            <UpdateCard item={item} type={section} color={color} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
