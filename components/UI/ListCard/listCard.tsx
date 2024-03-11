import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Link from "next/link";

const ListCard = () => {
  return (
    <Card className="rounded-xl shadow-md relative w-[22rem]">
      <div className="relative w-[25rem] h-[12rem] overflow-hidden rounded-t-xl">
        <Image
          src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/1.jpeg"
          alt=""
          width={600}
          height={1}
          className="rounded-t-xl object-fit w-full"
        />
      </div>

      <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-red-500 font-bold text-right md:text-center lg:text-right">
        1.200€/mo
      </h3>

      <CardBody>
        <div className="font-medium text-small text-default-400">Apartment</div>
        <h3 className="text-xl tracking-tighter font-semibold mt-2">
          Luxurious Spacious Studio
        </h3>
        <div className="flex justify-center mt-7 gap-5">
          <p>
            <BedOutlinedIcon className="text-default-400 mr-2" />
            <span className="font-medium text-md text-default-400">2 Beds</span>
          </p>
          <p>
            <BathtubOutlinedIcon className="text-default-400 mr-2" />
            <span className="font-medium text-md text-default-400">1 Bath</span>
          </p>
          <p>
            <SpaceDashboardOutlinedIcon className="text-default-400 mr-2" />
            <span className="font-medium text-md text-default-400">
              40.5 m&sup2;
            </span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-800 mt-4 pb-5 dark:text-yellow-300">
          <p>
            <AccessTimeOutlinedIcon /> Nightly
          </p>
          <p>
            <AccessTimeOutlinedIcon /> Weekly
          </p>
          <p>
            <AccessTimeOutlinedIcon /> Monthly
          </p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="my-4">
        <div className="flex justify-between w-full items-center">
          <p>
            <LocationOnOutlinedIcon /> <span>Helsinki</span>
          </p>
          <Button className="bg-blue-400 text-white">
            <Link href="/">Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListCard;
