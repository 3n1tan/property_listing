import React from "react";
import { cn } from "./cn";
import ListCard from "@/components/UI/ListCard/listCard";
import PaginationButton from "@/components/Pagination/PaginationButton";

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/listing`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Fetching Listings failed");
  }
  return res.json();
}
const ListingsPage = async ({
  searchParams,
} : {
  searchParams: {[key: string]: string | string[] | undefined};
}) => {
  const page = searchParams["page"] ?? '1'
  const per_page = searchParams["per_page"] ?? '3'

  const start = (Number(page) - 1 ) * Number(per_page)
  const end = start + Number(per_page)
  const listings = await fetchListings();
  const paginatedListings = listings.slice(start, end)

  listings.sort(
    (a: Listing, b: Listing) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4 ml-[-10px]">
      <div
        className={cn(
          "mx-auto grid max-w-[110rem] grid-cols-1 gap-9  p-4 lg:grid-cols-2 xl:grid-cols-3 lg:mt-9"
        )}
      >
        {paginatedListings.map((listing: any) => (
          <ListCard key={listing._id} listing={listing} />
        ))}
      </div>  

      <PaginationButton
        hasNextPage={end < listings.length}
        hasPreviousPage={start > 0}
        listingCount={listings.length}
       
      />
    </div>
  );
};

export default ListingsPage;
