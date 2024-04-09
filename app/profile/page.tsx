"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import {toast } from 'react-toastify';

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;
  // console.log(session);

  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserListings = async (userId: string) => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/listing/user/${userId}`);
        if (res.status === 200) {
          const data = await res.json();
          setUserListings(data);
        }
      } catch (error) {
        console.error("Error in fetching listings " + error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      fetchUserListings(session.user.id);
    }
  }, [session]);

  const handleDeleteListing = async (listingId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this listing?");
    if(!confirmed) return;
    try {
      const res = await fetch(`/api/listing/${listingId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        const updatedListing = userListings.filter((listing: any) => listing._id !== listingId);
        setUserListings(updatedListing);
        toast.success("Listing deleted successfully");

      } else {
        toast.error("Error deleting listing");
      }
    } catch (error) {
      toast.error("Error deleting listing: " + error);
    }
    
  }
  return (
    <section className="w-full min-h-screen lg:max-w-[90rem] lg:mx-auto lg:px-9 mb-[2rem]">
      <div className="lg:flex grid gap-3">
        <div className="w-full md:w-1/4 lg:mt-9">
          <h1 className="lg:text-3xl text-lg font-semibold text-center mt-1">
            Your Profile
          </h1>
          <div className="flex items-center justify-center mt-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={
                  profileImage ||
                  // "https://i.pravatar.cc/150?u=a04258114e29526708c"
                  "https://www.vectorstock.com/royalty-free-vector/male-avatar-profile-picture-vector-10211761"
                }
                alt="profile_image"
                width={200}
                height={200}
                priority
              />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="lg:text-2xl text-lg font-semibold text-center">
              {profileName}
            </h2>
            <p className="lg:text-lg text-sm text-center">{profileEmail}</p>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <h1 className="text-lg font-semibold mb-9 ">Your Listings</h1>
          {!loading && userListings.length === 0 && (
            <p className="text-center">You have not created any listings yet</p>
          )}
          {loading ? (
            <Spinner label="Loading" color="warning" labelColor="warning" size="lg" />
          ) : (
            <div>
              {userListings.map((listing: any) => (
                <div key={listing._id} className="mb-9">
                  <Link href={`/listing/${listing._id}`}>
                    <Image
                      src={listing.images[0]}
                      alt={listing.name}
                      className="object-cover w-full lg:h-[300px] rounded-t-xl"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </Link>
                  <div>
                    <h2 className="text-lg font-semibold">{listing.name}</h2>
                    <p className="text-gray-600">
                      {listing.location.street} {listing.location.city}{" "}
                      {listing.location.state}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <Link href={`/listing/${listing._id}/edit`}>
                      <Button className="bg-green-400">Edit</Button>
                    </Link>
                    <Button className="bg-red-500 text-white" onClick={()=> handleDeleteListing(listing._id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
