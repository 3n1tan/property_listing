"use client";
import {
  Button,
  SelectItem,
  Select,
  Checkbox,
  CheckboxGroup,
  Input,
  Textarea,

} from "@nextui-org/react";
import React from "react";
import { useForm, Controller, FieldValue } from "react-hook-form";
import { amenities, apartments } from "@/components/Forms/SearchList/data";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";


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
      // images: [],
    },
  });
  const { register, control, handleSubmit, reset, setValue, getValues } = form;

  useEffect(() => {
    setLoading(true);

    const fetchListData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/listing/${id}`
        );
        const data = response.data;
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
  }, [id]);

  const cancelOperation = () => {
    router.push(`/profile`);
  }

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("location[street]", data.location.street);
    formData.append("location[city]", data.location.city);
    formData.append("location[state]", data.location.state);
    formData.append("location[zipcode]", data.location.zipcode);

    const amenities = getValues("amenities"); // getValues is from useForm

    amenities.forEach((amenity: string) => {
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

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/listing/${id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Listing updated successfully");
        router.push(`/listing/${id}`);
      }
    } catch (error) {
      console.error("Error updating listing: " + error);
      toast.error("Error updating listing");
    }
  };

  return (
    <div className="lg:mt-9 mt-5">
      <h1 className="text-center lg:text-4xl text-2xl font-semibold lg:mb-6 mb-4">
        Edit Listing
      </h1>
      <div className="shadow-inherit">
        <form
          className="lg:px-9 px-3 pb-9 space-y-5 border mx-auto rounded-md max-w-[70rem]"
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

          <div className="lg:mt-[3rem]">
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  label="Listing Name"
                  labelPlacement="outside"
                  placeholder="Enter Listing Name"
                  className="text-lg font-semibold"
                  size="lg"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Textarea
                  label="Description"
                  placeholder="Add an optional description of property"
                  minRows={8}
                  className="mt-[3rem]"
                  classNames={{ base: "max-w-full", label: "text-lg font-semibold" }}
                  labelPlacement="outside"
                  size="lg"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div className="pt-9">
            <h2 className="mb-5 text-lg font-semibold">Location</h2>
            <div className="grid gap-5">
              <Controller
                name="location.street"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Enter Street Name"
                    size="lg"
                    {...field}
                  />
                )}
              />
              <Controller
                name="location.city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Enter City"
                    size="lg"
                    {...field}
                  />
                )}
              />
              <Controller
                name="location.state"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Enter State/Region"
                    size="lg"
                    {...field}
                  />
                )}
              />
              <Controller
                name="location.zipcode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Enter Zip-Code"
                    size="lg"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="lg:flex grid gap-4 pt-9">
            <Controller
              name="beds"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Beds"
                  labelPlacement="outside"
                  type="text"
                  defaultValue=""
                  size="lg"
                  placeholder="Enter number of beds"
                  className="font-semibold"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="baths"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Baths"
                  labelPlacement="outside"
                  type="text"
                  defaultValue=""
                  size="lg"
                  placeholder="Enter number of baths"
                  className="font-semibold"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="square_feet"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Square Metre"
                  labelPlacement="outside"
                  type="text"
                  defaultValue=""
                  size="lg"
                  placeholder="Enter area of total floor space"
                  className="font-semibold"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div className="pt-9">
            <Controller
              name="amenities"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CheckboxGroup
                  label="Select Amenities"
                  value={value}
                  onChange={onChange}
                  orientation="horizontal"
                  classNames={{
                    base: "w-full",
                    label: "text-lg font-semibold",
                    wrapper:
                      "grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-2 gap-4 ",
                  }}
                >
                  {amenities.map((amenity, index) => (
                    <Checkbox
                      key={index}
                      onBlur={onBlur}
                      value={amenity.value}
                      color="success"
                      className="font-semibold italic"
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
              <Controller
                name="rates.nightly"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Nightly"
                    type="text"
                    labelPlacement="outside-left"
                    defaultValue=""
                    size="lg"
                    placeholder="Enter amount"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="rates.weekly"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Weekly"
                    type="text"
                    labelPlacement="outside-left"
                    defaultValue=""
                    size="lg"
                    placeholder="Enter amount"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="rates.monthly"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Monthly"
                    type="text"
                    labelPlacement="outside-left"
                    defaultValue=""
                    size="lg"
                    placeholder="Enter amount"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="pt-9 grid gap-5 pb-2">
            <h2 className="text-lg font-semibold">Host Details</h2>
            <Controller
              name="seller_info.name"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  defaultValue=""
                  label=""
                  placeholder="Enter Host's Name)"
                  className="lg:max-w-xl"
                  size="lg"
                  radius="sm"
                  {...field}
                />
              )}
            />
            <Controller
              name="seller_info.email"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  defaultValue=""
                  label=""
                  placeholder="Enter Host's Email"
                  className="lg:max-w-xl"
                  size="lg"
                  radius="sm"
                  {...field}
                />
              )}
            />
            <Controller
              name="seller_info.phone"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  defaultValue=""
                  label=""
                  placeholder="Enter Host's Tel"
                  className="lg:max-w-xl"
                  size="lg"
                  radius="sm"
                  {...field}
                />
              )}
            />
          </div>

          <div className="pt-9 max-w-full flex">
            <Button className="flex-grow bg-red-500" onClick={cancelOperation}> <Icon icon="ic:baseline-update-disabled" className="text-lg"/>Cancel Operation</Button>
          </div>
          <div className="max-w-full flex">
            <Button type="submit" className="flex-grow bg-green-400"> <Icon icon="grommet-icons:update" />Update Listing</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListForm;
