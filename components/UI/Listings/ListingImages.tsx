import React from "react";
import Image from "next/image";

interface ListingImagesProps {
  images: string[];
}

const ListingImages: React.FC<ListingImagesProps> = ({ images }) => {
  return (
    <section>
      <div className="mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt="listing image"
            width={800}
            height={500}
            layout="responsive"  
            // fill
            className="object-cover h-[400px] mx-auto rounded-xl"
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  alt="listing image"
                  width={800}
                  height={500}
                  layout="responsive"
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ListingImages;
