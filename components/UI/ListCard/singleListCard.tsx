import React from "react";
import Image from "next/image";

const SingleListCard = ({image}: any) => {
  return (
    <div>
      <div className="grid grid-cols-1">
        <Image
          src={image}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-full lg:h-[400px] rounded-t-xl"
        />
      </div>
    </div>
  );
};

export default SingleListCard;
