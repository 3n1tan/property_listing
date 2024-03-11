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
          "my-auto grid max-w-7xl grid-cols-1 gap-9  p-4 lg:grid-cols-2 xl:grid-cols-3",
        )}
      >
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