"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const FavIcon =  ({ listing }: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const checkFav = async () => {
      try {
        const res = await fetch("/api/favourites/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ listingId: listing._id }),
        });
        if (res.ok) {
          const data = await res.json();
          setIsLiked(data.isFavourite);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkFav();
  }, [listing._id, userId]);

  const handleFav = async () => {
    if (!userId) return toast.error("Please login to add to favourites");
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingId: listing._id }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.text);
        setIsLiked(data.isFavourite);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return isLiked ? (
    <Button
      isIconOnly
      className="absolute left-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
      radius="full"
      size="sm"
      variant="flat"
      onPress={handleFav}
    >
      <Icon className="text-danger-400" icon="solar:heart-bold" width={24} />
    </Button>
  ) : (
    <Button
      isIconOnly
      className="absolute left-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
      radius="full"
      size="sm"
      variant="flat"
      onPress={handleFav}
    >
      <Icon
        className="text-default-900/50"
        icon="solar:heart-bold"
        width={24}
      />
    </Button>
  );
};

export default FavIcon;
