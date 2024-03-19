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
  const { register, control, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    const formData = { ...data };
    console.log(formData);
  };
  return (
    <div>
      <h1 className="text-center lg:text-4xl text-2xl font-semibold">Create New Listing</h1>
      <div>
        <form action="" className="lg:px-9 px-3 space-y-5 border mx-auto rounded-md max-w-[70rem]" onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:mt-9 lg:mb-[3rem]">
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

          <div className="lg:mt-[3rem]">
            <Input 
                type="text"
                label= "Listing Name"
                labelPlacement="outside"
                placeholder="Enter Listing Name"
                className=""
                size="lg"
                {...register("name")}
            />
          </div>

          <div>
            <Textarea 
                label="Description"
                placeholder="Add an optional description of property"
                className="lg:mt-[1rem] "
                classNames={{ base: "max-w-full", label: "text-lg"}}
                labelPlacement="outside"
                size="lg"
            />
          </div>

          <div>
            <h2 className="mb-5">Location</h2>
            <div className="grid gap-5">
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
          </div>

          <div className="lg:flex grid gap-4  ">
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

<Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewListForm;
