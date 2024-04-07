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
import { amenities, apartments } from "@/components/UI/HeroBanner/data";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

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
  //   images: File[];
};

const EditListForm = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FormValues>();

  const { id } = useParams();
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues:  {

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
        // images: [],
    },
  });
  const { register, control, handleSubmit, reset, setValue} = form;

  useEffect(() => {
    setLoading(true);

    const fetchListData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/listing/${id}`
        );
        const data = response.data;
        console.log(data)
        setData(data);

        reset({
            name: data.name,
            type: data.type,
            description: data.description,
            location: {
                street: data.location.street,
                city: data.location.city,
                state: data.location.state,
                zipcode: data.location.zipcode,
            },
            beds: data.beds,
            baths: data.baths,
            square_feet: data.square_feet,
            amenities: data.amenities,
            rates: {
                nightly: data.rates.nightly,
                weekly: data.rates.weekly,
                monthly: data.rates.monthly,
            },
            seller_info: {
                name: data.seller_info.name,
                email: data.seller_info.email,
                phone: data.seller_info.phone,
            },
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing data: " + error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchListData();
  }, []);


  return (
    <div>
      <h1 className="text-center lg:text-4xl text-2xl font-semibold">
        Edit Listing
      </h1>
      <div className="shadow-inherit">
        <form
          className="lg:px-9 px-3 space-y-5 border mx-auto rounded-md max-w-[70rem]"
        //   onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
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
            <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value,  } }) => (
                    <Input
                    type="text"
                    label="Listing Name"
                    labelPlacement="outside"
                    placeholder="Enter Listing Name"
                    className=""
                    size="lg"
                    value={value}
                    onChange={onChange}
                    />
                )}
            >

            </Controller>

            {/* <Input
              type="text"
              label="Listing Name"
              labelPlacement="outside"
              placeholder="Enter Listing Name"
              className=""
              size="lg"
              {...register("name")}
            /> */}
          </div>

          <div>
            <Textarea
              label="Description"
              placeholder="Add an optional description of property"
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
              render={({ field: { onChange, value,  } }) => (
                <CheckboxGroup
                  label="Select Amenities"
                  onChange={onChange}
                //   defaultValue={value}
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
                    //   defaultValue=""
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
            <h2>Host Details</h2>
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

          {/* <div>
            <input
              type="file"
              {...register("images")}
              multiple
              accept="image/*"
            />
          </div> */}

          <Button type="submit">Update Listing</Button>
        </form>
      </div>
    </div>
  );
};

export default EditListForm;
