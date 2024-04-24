import React from "react";
import SearchList from "@/components/Forms/SearchList/SearchList";
import { cabin } from "@/public/assets";
import InfoUI from "@/components/UI/InfoUI/infoui";
const Hero = () => {
  return (
    <div
      className="backdrop-brightness-50 max-w-screen xl:h-[55rem]  bg-cover bg-no-repeat lg:bg-right bg-bottom mx-auto px-9 lg:pt-[7rem] pt-[1rem]"
      style={{ backgroundImage: `url(${cabin.src})` }}
    >
      <div className="lg:max-w-[50rem] mx-auto max-w-fit lg:mt-9">
        <h1 className="lg:text-[3rem] text-3xl font-extrabold text-center tracking-widest lg:pb-12 pb-5 text-white">
          Discover The Ideal Rentals
        </h1>
        <p className="text-center tracking-widest lg:text-[16px] text-sm pb-9 text-white font-semibold">
          Explore the ideal property tailored to your needs.
        </p>
        <SearchList />
      </div>

      <InfoUI />
    </div>
  );
};

export default Hero;
