import React, { FC, useState, useEffect } from "react";
import SingleListCard from "@/components/UI/ListCard/singleListCard";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  divider,
  Button,
} from "@nextui-org/react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import CheckIcon from "@mui/icons-material/Check";

interface SingleListProps {
  params: {
    id: string;
  };
}

async function fetchListing(params: { id: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/listing/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("failed, error ", res.status);
    throw new Error("Fetching Listings failed");
  }

  return res.json();
}

const SingleListPage: FC<SingleListProps> = async ({ params }) => {
  let singleList = await fetchListing(params);

  return (
    <div className="w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4 mx-auto">
      <SingleListCard image={singleList.images[0]} />
      <div className="mt-6">
        <Link href={`/listing/`}>
          <ArrowBackIcon className="text-3xl mr-3" />
          Back to Listing
        </Link>
      </div>

      <Card className="mt-9 bg-[#FBFFF4]">
        <CardHeader className="grid gap-4">
          <h1 className="text-default-400">{singleList.type}</h1>
        </CardHeader>
        <CardBody className="gap-5 dark:text-black">
          <p className="lg:text-4xl text-3xl font-semibold tracking-wide">
            {singleList.name}
          </p>
          <p className="flex justify-start gap-4 text-sm items-center">
            <LocationOnOutlinedIcon className="dark:text-yellow-400 text-red-400" />{" "}
            {singleList.location.street}, {singleList.location.city}{" "}
            {singleList.location.state}
          </p>
        </CardBody>
        <h2 className="bg-green-500 py-3 pl-8 mx-3 mt-4 rounded-t-lg lg:mb-2 mb-8 font-semibold text-xl">
          Rates & Options
        </h2>
        <div className="lg:flex lg:flex-row lg:justify-around lg:mt-9 lg:mb-9 mb-6 grid gap-y-9">
          <div className="flex items-center justify-center">
            <div>
              {singleList.rates.nightly ? (
                <div className="flex items-center gap-3">
                  <p className="text-default-500 text-sm lg:text-[1rem]">
                    Nightly
                  </p>
                  <p className="lg:text-2xl text-lg text-blue-400 font-bold">
                    {singleList.rates.nightly.toLocaleString()}€
                  </p>
                </div>
              ) : (
                <ClearIcon className="text-red-600 text-3xl" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="">
              {singleList.rates.weekly && (
                <div className="flex items-center gap-3">
                  <p className="text-default-500 text-sm lg:text-[1rem]">
                    Weekly
                  </p>
                  <p className="lg:text-2xl text-xl text-blue-400 font-bold">
                    {singleList.rates.weekly.toLocaleString()} €/wk
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="">
              {singleList.rates.monthly && (
                <div className="flex items-center gap-3">
                  <p className="text-default-500 text-sm lg:text-[1rem]">
                    Monthly
                  </p>
                  <p className="lg:text-2xl text-xl text-blue-400 font-bold">
                    {singleList.rates.monthly.toLocaleString()} €/mo
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      <div className="lg:mt-8 lg:mb-8 mt-4 mb-4">
        <Divider />
      </div>
      <Card className="bg-[#FBFFF4] dark:text-black">
        <CardHeader>
          <h2 className="font-semibold text-xl">Description & Details</h2>
        </CardHeader>
        <CardBody>
          <div className="flex justify-center mt-4  gap-5 text-blue-500">
            <p>
              <BedOutlinedIcon className="mr-2" />
              <span className="font-medium text-md">
                {singleList.beds} Beds
              </span>
            </p>
            <p>
              <BathtubOutlinedIcon className=" mr-2" />
              <span className="font-medium text-md">
                {singleList.baths} Bath
              </span>
            </p>
            <p>
              <SpaceDashboardOutlinedIcon className=" mr-2" />
              <span className="font-medium text-md">
                {singleList.square_feet} m&sup2;
              </span>
            </p>
          </div>
        </CardBody>
        <CardFooter className="flex justify-center tracking-wide lg:mt-[1rem] mb-8">
          <p className="text-sm text-center">{singleList.description}</p>
        </CardFooter>
      </Card>
      <div className="lg:mt-8 lg:mb-8 mt-4 mb-4">
        <Divider />
      </div>
      <Card className="bg-[#FBFFF4] dark:text-black pb-9">
        <CardHeader>
          <h2 className="font-semibold text-xl">Amenities</h2>
        </CardHeader>
        <CardBody>
          <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 list-none space-y-2">
            {Array.isArray(singleList.amenities) &&
              singleList.amenities.map((amenity: string[], index: number) => (
                <li key={index} className="inline-block font-semibold">
                  <CheckIcon className="text-green-700" /> {amenity}
                </li>
              ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};

export default SingleListPage;
