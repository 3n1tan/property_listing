import React from "react";
import { Spinner } from "@nextui-org/react";

const LoadingPage = () => {
  return (
    <div className="w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4">
      <div className="flex justify-center items-center mt-[10rem]">
        <Spinner label="Loading" color="warning" labelColor="warning" size="lg" />
      </div>
    </div>
  );
};

export default LoadingPage;
