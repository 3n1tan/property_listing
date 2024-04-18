'use client';
import React, {useState} from 'react'
import { Button } from '@nextui-org/react'
import {Icon} from "@iconify/react";
import { cn } from '@/components/NavBar/cn';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';


const FavIcon = ({listing}:any) => {

  const [isLiked, setIsLiked] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleFav = async () => {
    if (!userId) {
      toast.error("Please login to add to favourites");
      return;
    }

    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingId: listing._id }),
      });
      if (res.ok) {
        // const data = await res.json();
        setIsLiked(!isLiked);
        toast.success("Added to favourites");
      }
    } catch (error) {
      toast.error("Error adding listing to favourites");
    }

  };
  return (
    <Button
    isIconOnly
    className="absolute left-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
    radius="full"
    size="sm"
    variant="flat"
    // onPress={() => setIsLiked(!isLiked)}
    onPress={handleFav}
    // onClick={handleFav}
  >
    <Icon
    // className="text-default-900/50 text-danger-400"
      className={cn("text-default-900/50", {
        "text-danger-400": isLiked,
      })}
      icon="solar:heart-bold"
      width={16}
    />
  </Button>

  )
}

export default FavIcon