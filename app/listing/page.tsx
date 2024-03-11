'use client'
import React from 'react'
import listings from "@/properties.json"
import PlaceListItem from '@/components/UI/ListCard/card';
import { cn } from './cn';
import ListCard from '@/components/UI/ListCard/listCard';
// interface Property {
//   _id: string;
//   owner: string;
//   name: string;
//   type: string;
//   description: string;
//   location: {
//     street: string;
//     city: string;
//     state: string;
//     zipcode: string;
//   };
//   beds: number;
//   baths: number;
//   square_feet: number;
//   amenities: string[];
//   rates: {
//     weekly: number;
//     monthly: number;
//   };
//   seller_info: {
//     name: string;
//     email: string;
//     phone: string;
//   };
//   images: string[];
//   is_featured: boolean;
//   createdAt: string;
//   updatedAt: string;
// }
const ListingsPage = () => {
  // console.log(listings)
  
  return (
    <div className='w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4'>
      <div
        className={cn(
          "my-auto grid max-w-7xl grid-cols-1 lg:gap-5 gap-9 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        )}
      >
      {/* <PlaceListItem
          name='Lagos'
          price={3000}
          href='/'
          id='1'
          imageSrc='https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/1.jpeg' 
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      /> */}
      <ListCard />
      <ListCard />
      <ListCard />
      <ListCard />
      <ListCard />

        
      </div>
    </div>
  )
}

export default ListingsPage