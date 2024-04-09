'use client';
import React from 'react'
import { Button } from '@nextui-org/react'
import {Icon} from "@iconify/react";
import { cn } from '@/components/NavBar/cn';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
const FavIcon = ({listing}:any) => {

  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <Button
    isIconOnly
    className="absolute left-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
    radius="full"
    size="sm"
    variant="flat"
    onPress={() => setIsLiked(!isLiked)}
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