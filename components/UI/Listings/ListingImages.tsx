"use client";
import React from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

interface ListingImagesProps {
  images: string[];
}

const ListingImages: React.FC<ListingImagesProps> = ({ images }) => {
  return (
    <Gallery>
      <section>
        <div className="mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt="listing image"
                  width={1800}
                  height={500}
                  layout="responsive"
                  className="object-cover h-[400px] mx-auto rounded-xl hover:cursor-pointer"
                  priority={true}
                />
              )}
            </Item>
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
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1024"
                    height="768"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt="listing image"
                        width={800}
                        height={500}
                        layout="responsive"
                        className="object-cover h-[500px] mx-auto rounded-xl hover:cursor-pointer"
                        // removeWrapper={false}
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default ListingImages;
