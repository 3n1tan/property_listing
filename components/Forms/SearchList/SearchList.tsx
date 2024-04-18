"use client";
import React from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { apartments } from "./data";
import { useForm, Controller, FieldValue } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormValues = {
  location: string;
  listType: string;
};

const SearchList = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      location: "",
      listType: "",
    },
  });

  const router = useRouter();

  const { control, handleSubmit, register, reset } = form;

    const onSubmit = async (data: FormValues) => {
        console.log(data);

        if (data.location === "" && data.listType === "all") {
            router.push("/listing");
        } else {
            const query = `?location=${data.location}&listType=${data.listType}`;
            router.push(`/listing/search-results${query}`);

        }
    };
  return (
    <section>
      <form 
        action="" 
        onSubmit={handleSubmit(onSubmit)}      
        encType="multipart/form-data"
      >
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          <Input
            type="text"
            label=""
            placeholder="Enter Location (City, State, Zip, etc)"
            className="lg:max-w-xl"
            size="lg"
            radius="sm"
            {...register("location")}
          />
          <Select
            label="Property-Type"
            className=""
            labelPlacement="inside"
            size="sm"
            {...register("listType")}
          >
            {apartments.map((apartment) => (
              <SelectItem key={apartment.value} value={apartment.value}>
                {apartment.label}
              </SelectItem>
            ))}
          </Select>
          {/* <Select label="Property-Type" className="" size="sm" {...register("listType")}>
            {apartments.map((apartment) => (
              <SelectItem key={apartment.value} value={apartment.value}>
                {apartment.label}
              </SelectItem>
            ))}
          </Select> */}
          <Button color="primary" className="h-12 w-full lg:w-fit bg-green-600" type="submit">
            Search
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SearchList;
