import React from "react";
import ListCard from "../ListCard/listCard";

async function fetchListings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/listing`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Error fetching listings");
  }

  return res.json();
}
const RecentListing = async () => {
  const listings = await fetchListings();

  const recentListings = listings
    .sort(() => Math.floor (Math.random() - 0.5))
    .slice(0, 3);
  return (
    <section className="max-w-full mx-auto px-9 lg:mt-[9rem] mt-[4rem] ml-[-10px] lg:ml-0">
      <h1 className="lg:text-5xl text-2xl text-center">Latest Listings</h1>

      <div className="lg:flex grid lg:justify-around gap-y-9 lg:mt-[4rem] mt-7 ">
        {recentListings.map((listing: any) => (
          <ListCard key={listing._id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

export default RecentListing;
