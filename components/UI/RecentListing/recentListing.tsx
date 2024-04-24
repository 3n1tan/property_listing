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
    .sort(() => Math.floor(Math.random() - 0.5))
    .slice(0, 3);
  return (
    <section className="max-w-[110rem] xl:mx-auto px-9 lg:mt-[2rem] mt-[1rem] ml-[-10px]">
      <h1 className="lg:text-[2rem] text-3xl font-extrabold text-center tracking-widest lg:pb-3 pb-5 text-green-400">Latest Listings</h1>

      <div className="xl:grid-cols-3 lg:grid-cols-2 grid gap-y-9 lg:ml-[4rem] lg:mt-[2rem] mt-7 ">
        {recentListings.map((listing: any) => (
          <ListCard key={listing._id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

export default RecentListing;
