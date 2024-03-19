"use client";
import {
  Button,
  SelectItem,
  Select,
  Checkbox,
  CheckboxGroup,
  Input,
} from "@nextui-org/react";
import React from "react";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { apartments } from "@/components/UI/HeroBanner/data";

const NewListForm = () => {

    const {register} = useForm()
  return (
    <div>
        <h1>Create New Listing</h1>
        <div>
            <form action="" >
            <Select
              label="Property-Type"
              className=""
              size="sm"
              {...register("type")}
            >
              {apartments.map((apartment) => (
                <SelectItem key={apartment.value} value={apartment.value}>
                  {apartment.label}
                </SelectItem>
              ))}
            </Select>

            <div>
            <Input
              type="text"
              label=""
              placeholder="Enter Seller's Name)"
              className="lg:max-w-xl"
              size="lg"
              radius="sm"
              {...register("seller_info.name")}
            />
            <Input
              type="email"
              label=""
              placeholder="Enter Seller's Email)"
              className="lg:max-w-xl"
              size="lg"
              radius="sm"
              {...register("seller_info.email")}
            />
            <Input
              type="text"
              label=""
              placeholder="Enter Seller's Tel)"
              className="lg:max-w-xl"
              size="lg"
              radius="sm"
              {...register("seller_info.phone")}
            />
            </div>
            </form>
        </div>
    </div>
  )
}

export default NewListForm