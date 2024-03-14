import React, { FC, useState, useEffect } from "react";
import SingleListCard from "@/components/UI/ListCard/singleListCard";
import ListCard from "@/components/UI/ListCard/listCard";
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
interface SingleListProps {
  params: {
    id: string;
  };
}

async function fetchListing(params: { id: string }) {
  const res = await fetch(`http://localhost:3000/api/listing/${params.id}`, {
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
    <div className="w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4 ml-[-10px]">
      <SingleListCard image={singleList.images[0]} />
      <div className="mt-6">
        <Link href={`/listing/`}>
          <ArrowBackIcon className="text-3xl mr-3" />
          Back to Listing
        </Link>
      </div>

      <Card className="mt-9">
        <CardHeader className="grid gap-4">
          <h1>{singleList.type}</h1>
        </CardHeader>
        <CardBody className="gap-5">
          <p className="lg:text-4xl text-3xl">{singleList.name}</p>
          <p className="flex justify-start gap-4 text-sm items-center">
            <LocationOnOutlinedIcon className="text-red-500" /> {singleList.location.street}
            , {singleList.location.city} {singleList.location.state}
          </p>
        </CardBody>
        <h2 className="bg-yellow-500 py-3 text-lg  pl-8 mx-3 mt-4 rounded-t-lg lg:mb-2 mb-8">
          Rates & Options
        </h2>
        <div className="lg:flex lg:flex-row lg:justify-around lg:mt-9 lg:mb-9 mb-6 grid gap-y-9">
          <div className="flex items-center justify-center">
            <div>
              {singleList.rates.nightly ? (
                <div className="flex items-center gap-3">
                  <p className="text-default-500">Nightly</p>
                  <p className="text-2xl text-blue-400 font-bold">
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
                  <p className="text-default-500">Weekly</p>
                  <p className="text-2xl text-blue-400 font-bold">
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
                  <p className="text-default-500">Monthly</p>
                  <p className="text-2xl text-blue-400 font-bold">
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
    </div>
  );
};

export default SingleListPage;
