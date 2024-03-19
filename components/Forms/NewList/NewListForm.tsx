"use client";
import {
  Button,
  SelectItem,
  Select,
  Checkbox,
  CheckboxGroup,
  Input,
  Textarea,
  cn,
} from "@nextui-org/react";
import React from "react";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { amenities, apartments } from "@/components/UI/HeroBanner/data";

const NewListForm = () => {
  const { register, control } = useForm();
  return (
    <div>
      <h1>Create New Listing</h1>
      <div>
        <form action="" className="lg:px-9 border mx-auto rounded-md max-w-[70rem]">
          <div>
            <Select
              label="Property-Type"
              className=""
              labelPlacement="outside"
              size="lg"
              {...register("type")}
            >
              {apartments.map((apartment) => (
                <SelectItem key={apartment.value} value={apartment.value}>
                  {apartment.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Input 
                type="text"
                label= "Listing Name"
                labelPlacement="outside"
                placeholder="Enter Listing Name"
                size="lg"
                {...register("name")}
            />
          </div>

          <div>
            <Textarea 
                label="Description"
                placeholder="Add an optional description of property"
                className="max-w-full"
                labelPlacement="outside"
                size="lg"
            />
          </div>

          <div>
            <h2>Location</h2>
            <Input
                type="text"
                placeholder="Enter Street Name"
                className="" 
                size="lg"
                {...register("location.street")}
            />
            <Input
                type="text"
                placeholder="Enter City"
                className="" 
                size="lg"
                {...register("location.city")}
            />
            <Input
                type="text"
                placeholder="Enter State/Region"
                className="" 
                size="lg"
                {...register("location.state")}
            />
            <Input
                type="text"
                placeholder="Enter Zip-Code"
                className="" 
                size="lg"
                {...register("location.zipcode")}
            />
          </div>

          <div className="flex ">
            <Input
                label="Beds"
                labelPlacement="outside"
                type="text"
                size="lg" 
                placeholder="Enter number of beds"
                className=""
                {...register("beds")}
            />
            <Input
                label="Baths"
                labelPlacement="outside"
                type="text"
                size="lg" 
                placeholder="Enter number of baths"
                className=""
                {...register("baths")}
            />
            <Input
                label="Square Metre"
                labelPlacement="outside"
                type="text"
                size="lg" 
                placeholder="Enter area of total floor space"
                className=""
                {...register("square_feet")}
            />    
          </div>

          <div>
          <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <CheckboxGroup label="Select Amenities" {...field} orientation="horizontal"  classNames={{ base: "w-full", wrapper: "grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-2 space-y-1 "}}>
                  {amenities.map((amenity, index) => (
                        <Checkbox key={index} value={amenity.value} className="font-semibold">{amenity.label}</Checkbox>

                  ))}
                </CheckboxGroup>
              )}
            />
          </div>

          <div>
            <h2>Host's Details</h2>
            <Input
              type="text"
              label=""
              placeholder="Enter Host's Name)"
              className="lg:max-w-xl"
              size="lg"
              radius="sm"
              {...register("seller_info.name")}
            />
            <Input
              type="email"
              label=""
              placeholder="Enter Host's Email)"
              className="lg:max-w-xl"
              size="lg"
              radius="sm"
              {...register("seller_info.email")}
            />
            <Input
              type="text"
              label=""
              placeholder="Enter Host's Tel)"
              className="lg:max-w-xl"
              size="lg"
              radius="sm"
              {...register("seller_info.phone")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewListForm;
