"use client";
import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";
import ListCard from "@/components/UI/ListCard/listCard";
import { cn } from "../cn";

const SavedFavPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedListings = async () => {
      try {
        const res = await fetch("/api/favourites");
        if (res.ok) {
          const data = await res.json();
          setListings(data);
        }
      } catch (error) {
        console.error("Error fetching listings " + error);
        toast.error("Error fetching saved listings " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedListings();
  }, []);

  return loading ? (
    <Spinner className="flex justify-center" />
  ) : (
    <section className="w-full min-h-screen lg:max-w-[90rem] lg:mx-auto lg:px-9 mb-[2rem]">
      <div className="pt-9">
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-y-[3rem] gap-x-2 lg:ml-9">
          {listings.length === 0 ? (
            <p className="lg:text-2xl">No saved listings</p>
          ) : (
            listings.map((listing: any) => (
              <ListCard key={listing._id} listing={listing} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedFavPage;
