'use client'
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
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { amenities, apartments } from "@/components/UI/HeroBanner/data";
import axios from "axios";

type FormValues = {
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: string;
  baths: string;
  square_feet: string;
  amenities: string[];
  rates: {
    nightly: string;
    weekly: string;
    monthly: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: File[];
};
const NewListForm = () => {

  const form = useForm<FormValues>({
    defaultValues: {
      name: "Eldo Chalet",
      type: "Apartment",
      description: "Home sweet home",
      location: {
        street: "Kaustisentie 7 A 28",
        city: "Helsinki",
        state: "Uusimaa",
        zipcode: "00420",
      },
      beds: "2",
      baths: "2",
      square_feet: "70",
      amenities: [],
      rates: {
        nightly: "",
        weekly: "800",
        monthly: "3000",
      },
      seller_info: {
        name: "Eniola Tenhio-Odupitan",
        email: "eniola@gmail.com",
        phone: "0449844058",
      },
      images: [],
    },
  });
  const { register, control, handleSubmit, watch } = form;

  const onSubmit = (data: FormValues) => {
    const formData = {...data};
    axios.post("http://localhost:3000/api/listing", formData)
            .then(res => {
              alert("New Listing successfully added");
            })
            .catch(err => {
              console.log(err)
            })

    console.log("Form Submitted", data.images);
  };


  return (
    <div>
      <h1 className="text-center lg:text-4xl text-2xl font-semibold">
        Create New Listing
      </h1>
      <div className="shadow-inherit">
        <form
          // action="/api/listing"
          // method="POST"
          className="lg:px-9 px-3 space-y-5 border mx-auto rounded-md max-w-[70rem]"
          onSubmit={handleSubmit(onSubmit)}
          // encType="multipart/form-data"
        >
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
              defaultValue=""
              label="Listing Name"
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
              defaultValue=""
              className="lg:mt-[1rem] "
              classNames={{ base: "max-w-full", label: "text-lg" }}
              labelPlacement="outside"
              size="lg"
              {...register("description")}
            />
          </div>

          <div>
            <h2 className="mb-5">Location</h2>
            <div className="grid gap-5">
              <Input
                type="text"
                placeholder="Enter Street Name"
                defaultValue=""
                className=""
                size="lg"
                {...register("location.street")}
              />
              <Input
                type="text"
                placeholder="Enter City"
                className=""
                defaultValue=""
                size="lg"
                {...register("location.city")}
              />
              <Input
                type="text"
                placeholder="Enter State/Region"
                className=""
                defaultValue=""
                size="lg"
                {...register("location.state")}
              />
              <Input
                type="text"
                placeholder="Enter Zip-Code"
                className=""
                size="lg"
                defaultValue=""
                {...register("location.zipcode")}
              />
            </div>
          </div>

          <div className="lg:flex grid gap-4  ">
            <Input
              label="Beds"
              labelPlacement="outside"
              type="text"
              defaultValue=""
              size="lg"
              placeholder="Enter number of beds"
              className=""
              {...register("beds")}
            />
            <Input
              label="Baths"
              labelPlacement="outside"
              type="text"
              defaultValue=""
              size="lg"
              placeholder="Enter number of baths"
              className=""
              {...register("baths")}
            />
            <Input
              label="Square Metre"
              labelPlacement="outside"
              type="text"
              defaultValue=""
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
              render={({ field: { onChange, value } }) => (
                <CheckboxGroup
                  label="Select Amenities"
                  onChange={onChange}
                  defaultValue={value}
                  orientation="horizontal"
                  classNames={{
                    base: "w-full",
                    wrapper:
                      "grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-2 space-y-1 ",
                  }}
                >
                  {amenities.map((amenity, index) => (
                    <Checkbox
                      key={index}
                      defaultValue=""
                      // {...register(`amenities.${amenity}.value`)}
                      value={amenity.value}
                      className="font-semibold"
                    >
                      {amenity.label}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              )}
            />
          </div>

          <div>
            <h2 className="pb-9">Rates (Leave blank if not applicable )</h2>
            <div className="flex ">
              <Input
                label="Nightly"
                type="text"
                labelPlacement="outside-left"
                defaultValue=""
                size="lg"
                placeholder="Enter amount"
                {...register("rates.nightly")}
              />
              <Input
                label="Weekly"
                type="text"
                labelPlacement="outside-left"
                defaultValue=""
                size="lg"
                placeholder="Enter amount"
                {...register("rates.weekly")}
              />
              <Input
                label="Monthly"
                type="text"
                labelPlacement="outside-left"
                defaultValue=""
                size="lg"
                placeholder="Enter amount"
                {...register("rates.monthly")}
              />
            </div>
          </div>

          <div>
            <h2>Host's Details</h2>
            <Input
              type="text"
              defaultValue=""
              label=""
              placeholder="Enter Host's Name)"
              className="lg:max-w-xl"
              size="lg"
              radius="sm"
              {...register("seller_info.name")}
            />
            <Input
              type="email"
              defaultValue=""
              label=""
              placeholder="Enter Host's Email)"
              className="lg:max-w-xl"
              size="lg"
              radius="sm"
              {...register("seller_info.email")}
            />
            <Input
              type="text"
              defaultValue=""
              label=""
              placeholder="Enter Host's Tel)"
              className="lg:max-w-xl"
              size="lg"
              radius="sm"
              {...register("seller_info.phone")}
            />
          </div>

          <div>
            <input 
              type="file" 
              {...register('images')}
              multiple
              accept="image/*"
             
              
            />
          </div>

          <Button type="submit">Submit Listing</Button>
        </form>
      </div>
    </div>
  );
};

export default NewListForm;
