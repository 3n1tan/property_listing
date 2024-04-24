import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Image,
} from "@nextui-org/react";
// import Image from "next/image";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Link from "next/link";
import {Icon} from "@iconify/react";
import FavIcon from "../FavouritesIcon/FavIcon";
// import { cn } from "./cn";

interface Listing {
  _id: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly: number;
    weekly: number;
    monthly: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ListCardProps {
  listing: Listing;
}
const ListCard: React.FC<ListCardProps> = ({ listing }) => {
  const getRate = (listing: Listing) => {
    const { rates } = listing;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}€/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}€/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}€/mo`;
    }
  };

  
  return (
    <Card className="rounded-xl shadow-md relative w-[24rem] mx-auto">
      <div className="relative w-[25rem] h-[12rem] overflow-hidden rounded-t-xl">
        <Link href={`/listing/${listing._id}`}>
        <Image
          isBlurred
          isZoomed
          src={listing.images[0]}
          alt=""
          width={600}
          height={1}
          // className="rounded-t-xl object-fit w-full -z-1"
          className=" w-full hover:scale-110 object-fit"
        />
        </Link>
      </div>

      <h3 className="absolute right-3 top-3 z-20 bg-white px-4 py-2 rounded-lg text-green-700 font-bold text-right md:text-center lg:text-right">
        {getRate(listing)}
      </h3>
      {/* <h3 className="absolute right-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        {getRate(listing)}
      </h3> */}

      <FavIcon listing={listing} />

      <CardBody>
        <div className="font-medium text-small text-default-400 capitalize">
          {listing.type}
        </div>
        <h3 className="text-xl tracking-tighter font-semibold mt-2 capitalize">
          {listing.name}
        </h3>
        <div className="flex justify-center mt-7 gap-5">
          <p>
            <BedOutlinedIcon className="text-default-400 mr-2" />
            <span className="font-medium text-md text-default-400">
              {listing.beds} Beds
            </span>
          </p>
          <p>
            <BathtubOutlinedIcon className="text-default-400 mr-2" />
            <span className="font-medium text-md text-default-400">
              {listing.baths} Bath
            </span>
          </p>
          <p>
            <SpaceDashboardOutlinedIcon className="text-default-400 mr-2" />
            <span className="font-medium text-md text-default-400">
              {listing.square_feet} m&sup2;
            </span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-800 mt-4 pb-5 dark:text-yellow-300">
          {listing.rates.nightly && (
            <p>
              <AccessTimeOutlinedIcon /> Nightly
            </p>
          )}

          {listing.rates.weekly && (
            <p>
              <AccessTimeOutlinedIcon /> Weekly
            </p>
          )}

          {listing.rates.monthly && (
            <p>
              <AccessTimeOutlinedIcon /> Monthly
            </p>
          )}
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="my-4">
        <div className="flex justify-between w-full items-center">
          <p>
            <LocationOnOutlinedIcon />{" "}
            <span>
              {listing.location.city} {listing.location.state}
            </span>
          </p>
          <Button className="bg-blue-400 text-white">
            <Link href={`/listing/${listing._id}`}>More Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListCard;
