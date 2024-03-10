"use client";
import React from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";

const Hero = () => {
  return (
    <div className="max-w-[90rem] mx-auto px-9 pt-[7rem]">
      <div className="max-w-[50rem] mx-auto">
        <h1 className="text-[3rem] font-extrabold text-center tracking-widest pb-3">
          Discover The Ideal Rentals
        </h1>
        <p className="text-center tracking-widest text-[16px] pb-9">
          Explore the ideal property tailored to your needs.
        </p>
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <Input
            type="text"
            label=""
            placeholder="Enter Location (City, State, Zip, etc)"
            className="max-w-["
            size="lg"
          />
          <Select label="All" className="max-w-xs" size="sm">
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Button color="primary" className="h-12 bg-blue-500">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
