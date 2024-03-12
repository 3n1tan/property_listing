import React from 'react'
import PlaceListItem from '@/components/UI/ListCard/card';
import { cn } from './cn';
import ListCard from '@/components/UI/ListCard/listCard';


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

async function fetchListings() {
  const res= await fetch ("http://localhost:3000/api/listing", {cache: "no-store"});
  if(!res.ok) {
    throw new Error ("Fetching Listings failed")
  }
  return res.json();
}
const ListingsPage = async () => {
  const listings = await fetchListings();
  
  return (
    <div className='w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4'>
      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-1 gap-9  p-4 lg:grid-cols-2 xl:grid-cols-3",
        )}
      >

      {listings.map((listing: any) =>(
        <ListCard key={listing._id} listing={listing} />
      ))}


        
      </div>
    </div>
  )
}

export default ListingsPage