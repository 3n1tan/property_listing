"use client";

import type { CardProps } from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader, Chip, CardFooter } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useGlobal } from "../../context/GlobalContext";

export default function Component(props: CardProps) {
  const { count, setCount } = useGlobal();

  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      try {
        const response = await fetch("/api/messages/unread-count");
        if (response.ok) {
          const data = await response.json();
          setCount(data);
        }
      } catch (error) {
        console.error("Error fetching messages");
      }
    };
    fetchUnreadMessagesCount();
  }, [setCount]);

  return (
    <Card className="w-full max-w-[420px]" {...props}>
      <CardHeader className="flex flex-col px-0 pb-0">
        <div className="flex w-full items-center justify-between px-5 py-2">
          <div className="inline-flex items-center gap-1">
            <h4 className="inline-block align-middle text-large font-medium ">
              Unread Messages
            </h4>
            <Chip size="sm" variant="flat">
              {count}
            </Chip>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="justify-center gap-2 px-4">
        <Button className="bg-green-600">
          <Link href={"/messages"}>View All Messages</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
