import React from "react";
import Image from "next/image";

const SingleListCard = ({image}: any) => {
  return (
    <>
      <div className="grid grid-cols-1">
        <Image
          src={image}
          alt="main picture of the listing"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-full lg:h-[400px] rounded-t-md"    
        />
      </div>
    </>
  );
};

export default SingleListCard;
