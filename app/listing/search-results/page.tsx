"use client";
import React, { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import ListCard from "@/components/UI/ListCard/listCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { cn } from "../cn";
import SearchList from "@/components/Forms/SearchList/SearchList";

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

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const location = searchParams.get("location") || "";
  const listType = searchParams.get("listType") || "all";

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/listing/search?location=${location}&listType=${listType}`
        );
        if (res.ok) {
          const data = await res.json();
          setListings(data);
        } else {
          console.log("An error occurred");
          setListings([]);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, listType]);


  return (
    <>
      <section className="w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4 mx-auto">
        <div className="mt-9">
          <SearchList />
        </div>

        {loading ? (
            <Spinner />
        ) : (
            <div>
                <div className="mt-9">
                    <Link href="/listing">
                    <ArrowBackIcon className="text-3xl mr-3" />
                      <span className="lg:text-md">Back to Listing</span>
                    </Link>
                </div>
                <h1 className="text-3xl font-semibold my-9 text-center">Search Results</h1>
                {listings.length === 0 ? (
                    <div className="flex justify-center mt-[5rem]">
                        <h2 className="text-xl text-center">No listings found</h2>
                    </div>
                ) : (
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-y-[3rem] gap-x-2 lg:ml-9">
                        {listings.map((listing) => (
                            <ListCard key={listing._id} listing={listing} />
                        ))}
                    </div>
                
                )}
            </div>
        )}


        {/* {loading ? (
          <Spinner />
        ) : (
          <div className="w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4 ml-[-10px]">
            <div
              className={cn(
                "mx-auto grid max-w-7xl grid-cols-1 gap-9  p-4 lg:grid-cols-2 xl:grid-cols-3 lg:mt-9"
              )}
            >
              <h1>Search Results</h1>
              {listings.length === 0 ? (
                <div>
                  <h2>No listings found</h2>
                  <div className="lg:mt-[4rem] mt-9">
                    <Link href={`/listing/`}>
                      <ArrowBackIcon className="text-3xl mr-3" />
                      <span className="lg:text-2xl">Back to Listing</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  {listings.map((listing) => (
                    <ListCard key={listing._id} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )} */}
      </section>
    </>
  );

  //   return (
  //     <div>
  //         hello

  //         {listings.map((listing: any) => (
  //           <ListCard key={listing._id} listing={listing} />
  //         ))}
  //     </div>
  //   )

  //   return loading ? (
  //     <Spinner />
  //   ) : (
  //     <section className="w-full min-h-[100lvh] lg:max-w-[90rem] lg:mx-auto lg:px-9 px-4 ml-[-10px]">
  //       <div
  //         className={cn(
  //           "mx-auto grid max-w-7xl grid-cols-1 gap-9  p-4 lg:grid-cols-2 xl:grid-cols-3 lg:mt-9"
  //         )}
  //       >
  //         <h1>Search Results</h1>
  //         {listings.length === 0 ? (
  //             <div>
  //                 <h2>No listings found</h2>
  //                 <Link href="/listing">
  //                 <a>
  //                     <ArrowBackIcon />
  //                     Back to Listings
  //                 </a>
  //                 </Link>
  //             </div>
  //             ) : (
  //                 <div>
  //                     {listings.map((listing) => (
  //                         <ListCard key={listing._id} listing={listing} />
  //                     ))}
  //                 </div>
  //             )}

  //       </div>
  //     </section>
  //   );
};

export default SearchResultsPage;
