import React from "react";
import SearchList from "@/components/Forms/SearchList/SearchList";

const Hero = () => {
  return (
    <div className="max-w-[90rem] mx-auto px-9 lg:pt-[7rem] pt-[1rem]">
      <div className="lg:max-w-[50rem] mx-auto max-w-fit">
        <h1 className="lg:text-[3rem] text-3xl font-extrabold text-center tracking-widest lg:pb-12 pb-5">
          Discover The Ideal Rentals
        </h1>
        <p className="text-center tracking-widest lg:text-[16px] text-sm pb-9">
          Explore the ideal property tailored to your needs.
        </p>
        <SearchList />
      </div>
    </div>
  );
};

export default Hero;
