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
import axios from "axios";
import { useRouter } from "next/navigation";

const NewListForm = () => {
  const { register, control, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    const formData = { ...data };

    console.log(formData);
    // axios.post("http://localhost:3000/api/listing", formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    // .then(res => {
    //   alert("New Listing successfully submitted");
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  };
  return (
    <div>
      <h1 className="text-center lg:text-4xl text-2xl font-semibold">
        Create New Listing
      </h1>
      <div>
        <form
          action=""
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
            <Input
              label="Images (Select up to 4)"
              labelPlacement="outside"
              defaultValue=""
              classNames={{mainWrapper: "h-[9rem] py-3 max-w-fit", innerWrapper: "max-w-fit mt-[5rem]"}}
              type="file"
              {...register("images")}
              multiple
              accept="image/*"
            />
          </div>

          {/* <Controller
            control={control}
            name="images"
            rules={{ required: "Listing picture is required" }}
            render={({ field: { value, onChange, ...field } }) => {
              const handleFileChange = (
                event: React.ChangeEvent<HTMLInputElement>
              ) => {
                const files = event.target.files;
                if (files && files.length > 0) {
                  const fileList = Array.from(files).slice(0, 4);
                  // Display an error message or handle the case when more than 4 files are selected
                  onChange(fileList);
                  //   console.error("You can only upload a maximum of 4 files.");
                  //   return;
                }
                // Update the field value with the selected file(s)
              };

              return (
                <Input
                  {...field}
                  onChange={handleFileChange}
                  type="file"
                  multiple
                  id="images"
                />
              );
            }}
          /> */}

          {/* <Controller
            control={control}
            name={"images"}
            rules={{ required: "Listing picture is required" }}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <Input
                  {...field}
                  value={value?.fileName}
                  onChange={(event) => {
                    onChange(event.target.files?.[0]);
                  }}
                  type="file"
                  id="picture"
                />
              );
            }}
          /> */}

          <Button type="submit">Submit Listing</Button>
        </form>
      </div>
    </div>
  );
};

export default NewListForm;
