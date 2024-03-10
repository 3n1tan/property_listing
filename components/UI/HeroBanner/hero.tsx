import React from "react";
import { Input } from "@nextui-org/react";

const Hero = () => {
  return (
    <div className="max-w-[90rem] mx-auto px-9 pt-[7rem]">
      <div className="">
        <h1 className="text-[3rem] font-extrabold text-center tracking-widest pb-3">Discover The Ideal Rental</h1>
        <p className="text-center tracking-widest text-[16px] pb-9">Explore the ideal property tailored to your needs</p>
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <Input type="email" label="Email" />
          <Input type="email" label="Email" placeholder="Enter your email" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
