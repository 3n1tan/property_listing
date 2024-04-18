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
import { useForm, Controller, FieldValue } from "react-hook-form";
import { amenities, apartments } from "@/components/Forms/SearchList/data";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

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
  amenities: [];
  rates: {
    nightly: string;
    weekly: string;
    monthly: string;
    [key: string]: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: File[];
};
const NewListForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      type: "",
      description: "",
      location: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
      },
      beds: "",
      baths: "",
      square_feet: "",
      amenities: [],
      rates: {
        nightly: "",
        weekly: "",
        monthly: "",
      },
      seller_info: {
        name: "",
        email: "",
        phone: "",
      },
      images: [],
    },
  });
  const { register, control, handleSubmit, reset } = form;

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("location[street]", data.location.street);
    formData.append("location[city]", data.location.city);
    formData.append("location[state]", data.location.state);
    formData.append("location[zipcode]", data.location.zipcode);
    Array.isArray(data.amenities) &&
      data.amenities.map((amenity) => {
        formData.append("amenities", amenity);
      });
    formData.append("beds", data.beds);
    formData.append("baths", data.baths);
    formData.append("square_feet", data.square_feet);
    formData.append("rates[nightly]", data.rates.nightly);
    formData.append("rates[weekly]", data.rates.weekly);
    formData.append("rates[monthly]", data.rates.monthly);
    formData.append("seller_info[name]", data.seller_info.name);
    formData.append("seller_info[email]", data.seller_info.email);
    formData.append("seller_info[phone]", data.seller_info.phone);

    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });

    console.log(formData.getAll("amenities"));

    try {
      const response = await axios.post(
        "http://localhost:3000/api/listing",
        formData
      );

      if (!response) {
        throw new Error("Network response was not ok");
      }

      toast.success("Listing created successfully");
      // Perform further actions with the response
      router.push(`/listing`);
      router.refresh();
    } catch (error) {
      toast.error("There was a problem with the fetch operation:");
      console.error("There was a problem with the fetch operation:", error);
    }
    reset();
  };

  return (
    <div className="lg:mt-9 mt-5">
      <h1 className="text-center lg:text-4xl text-2xl font-semibold lg:mb-6 mb-4">
        Create New Listing
      </h1>
      <div className="shadow-inherit ">
        <form
          className="lg:px-9 px-3 pb-9 space-y-5 border mx-auto rounded-md max-w-[70rem] bg-[#DEE4E7] dark:bg-[#37474F]"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="lg:mt-9 mb-[4rem]">
            <Select
              label="Property-Type"
              className="font-semibold"
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

          <div className="">
            <Input
              type="text"
              defaultValue=""
              label="Listing Name"
              labelPlacement="outside"
              placeholder="Enter Listing Name"
              className="text-lg font-semibold"
              size="lg"
              {...register("name")}
            />
          </div>

          <div>
            <Textarea
              label="Description"
              placeholder="Add an optional description of property"
              defaultValue=""
              minRows={8}
              className="mt-[3rem]"
              classNames={{ base: "max-w-full", label: "text-lg font-semibold" }}
              labelPlacement="outside"
              size="lg"
              {...register("description")}
            />
          </div>

          <div className="pt-9">
            <h2 className="mb-5 text-lg font-semibold">Location</h2>
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

          <div className="lg:flex grid gap-4 pt-9">
            <Input
              label="Beds"
              labelPlacement="outside"
              type="text"
              defaultValue=""
              size="lg"
              placeholder="Enter number of beds"
              className="font-semibold"
              {...register("beds")}
            />
            <Input
              label="Baths"
              labelPlacement="outside"
              type="text"
              defaultValue=""
              size="lg"
              placeholder="Enter number of baths"
              className="font-semibold"
              {...register("baths")}
            />
            <Input
              label="Square Metre"
              labelPlacement="outside"
              type="text"
              defaultValue=""
              size="lg"
              placeholder="Enter area of total floor space"
              className="font-semibold"
              {...register("square_feet")}
            />
          </div>

          <div className="pt-9">
            <Controller
              name="amenities"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CheckboxGroup
                  label="Select Amenities"
                  onChange={onChange}
                  orientation="horizontal"
                  classNames={{
                    base: "w-full ",
                    label: "text-lg font-semibold",
                    wrapper:
                      "grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-2 gap-4  ",
                  }}
                >
                  {amenities.map((amenity, index) => (
                    <Checkbox
                      key={index}
                      defaultValue=""
                      value={amenity.value}
                      color="success"
                      classNames={{
                        base: "font-semibold italic font-red-300",
                        
                      }}
                      
                      // className="font-semibold italic "
                    >
                      {amenity.label}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              )}
            />
          </div>

          <div>
            <h2 className="lg:pb-5 pb-3 mt-[4rem] text-lg font-semibold">
              Rates (Leave blank if not applicable )
            </h2>
            <div className="lg:flex grid gap-9 ">
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

          <div className="pt-9 grid gap-5 pb-9">
            <h2 className="text-lg font-semibold">Host Details</h2>
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
              {...register("images")}
              multiple
              accept="image/*"
            />
          </div>

          <div className="pt-9 max-w-full flex">
            <Button type="submit" className="flex-grow bg-green-400">Submit Listing</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewListForm;
