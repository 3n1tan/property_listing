"use client";
import React from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";

const Hero = () => {
  return (
    <div className="max-w-[90rem] mx-auto px-9 lg:pt-[7rem] pt-[1rem]">
      <div className="lg:max-w-[50rem] mx-auto max-w-fit">
        <h1 className="lg:text-[3rem] text-3xl font-extrabold text-center tracking-widest lg:pb-3 pb-5">
          Discover The Ideal Rentals
        </h1>
        <p className="text-center tracking-widest lg:text-[16px] text-sm pb-9">
          Explore the ideal property tailored to your needs.
        </p>
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <Input
            type="text"
            label=""
            placeholder="Enter Location (City, State, Zip, etc)"
            className="lg:max-w-fit"
            size="lg"
          />
          <Select label="All" className="max-w-sm" size="sm">
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Button color="primary" className="h-12 bg-blue-500 w-full lg:w-fit">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
