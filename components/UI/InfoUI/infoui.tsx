import React from "react";
import InfoBox from "../InfoBox/infobox";

const InfoUI = () => {
  return (
      <div className="xl:mt-9 mt-5 lg:flex gap-9 lg:max-w-fit xl:mx-auto grid mx-1">
        <InfoBox
            title="For Rents" 
            description="Discover your ideal rental properties. Save listings and get in touch with property owners."
            button_title="Browse Properties"
            link="/listing"
            backgroundColor="bg-yellow-400"
        />
        <InfoBox
            title="For Property Owners" 
            description="List your properties and connect with potential tenants. Offer rentals for short or extended terms."
            button_title="Add Listing"
            link="/listing/create"
            backgroundColor="bg-green-100"
        />
      </div>
  );
};

export default InfoUI;
