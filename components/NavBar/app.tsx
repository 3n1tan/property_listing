"use client";

import React, { use, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Avatar,
  Badge,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { AcmeIcon } from "./social";
import { GoogleIcon } from "./social";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import NotificationsCard from "./notifications-card";
import { ThemeSwitcher } from "../DarkMode/switch_theme";
import Image from "next/image";
import { useGlobal } from "@/context/GlobalContext";
import { set } from "mongoose";

export default function Component() {
  const { status, data: session } = useSession();
  const profileImage = session?.user?.image;
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

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
    <Navbar
      classNames={{
        base: "bg-[#217b7e]",
        item: "data-[active=true]:text-primary",
        wrapper: "px-4 sm:px-6 lg:max-w-[90rem]  py-[3rem] ",
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      position="sticky"
    >
      <NavbarBrand className="max-w-fit lg:mr-9">
        <NavbarMenuToggle className="mr-2 h-6 lg:hidden" />
        <div className="flex items-center lg:ml-0 ml-[3rem]">
          <Link href="/">
            <AcmeIcon  className="text-white"/>
            <p className="font-bold text-xl text-white">3N1T | PROPERTIES </p>
          </Link>
        </div>
      </NavbarBrand>
      <NavbarContent
        className="xl:ml-[10rem] ml-[2rem] hidden h-10 max-w-fit gap-5 rounded-full bg-content2 px-5 lg:flex dark:bg-content1"
        justify="start"
      >
        <NavbarItem>
          <Link
            className={`${
              "/" === path
                ? "flex text-inherit text-[#0000FF] dark:text-[#FFFF00] tracking-widest font-semibold"
                : "flex text-inherit tracking-widest font-semibold"
            }`}
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`${
              "/listing" === path
                ? "flex text-inherit text-[#0000FF] dark:text-[#FFFF00] tracking-widest font-semibold"
                : "flex text-inherit tracking-widest font-semibold"
            }`}
            href="/listing"
          >
            Listing
          </Link>
        </NavbarItem>
        {session && (
          <NavbarItem>
            <Link
              className={`${
                "/listing/create" === path
                  ? "flex text-inherit text-[#0000FF] dark:text-[#FFFF00] tracking-widest font-semibold"
                  : "flex text-inherit tracking-widest font-semibold"
              }`}
              href="/listing/create"
            >
              Add Listing
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      {!session && (
        <NavbarContent
          className="hidden lg:flex max-w-fit items-center gap-0 rounded-full p-0 lg:bg-content2 lg:dark:bg-content1 xl:ml-[10rem]"
          justify="center"
        >
          <NavbarItem>
          {providers &&
            Object.values(providers).map((provider, index) => (
              <Button
                className="font-semibold text-md tracking-widest bg-gray-700 w-fit px-[1rem] text-white"
                href="#"
                key={index}
                onClick={() => signIn(provider.id)}
              >
                <GoogleIcon />
                Login
              </Button>
            ))}
          </NavbarItem>
        </NavbarContent>
      )}
      {session && (
        <NavbarContent
          className="ml-auto flex h-12 max-w-fit items-center gap-0 rounded-full p-0 lg:bg-content2 lg:px-1 lg:dark:bg-content1"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex">
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem className="flex">
            <Popover offset={12} placement="bottom-end">
              <PopoverTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className="overflow-visible"
                  radius="full"
                  variant="light"
                >
                  <Badge
                    color="danger"
                    content={`${count > 0 ? `${count}` : ""}`}
                    size="md"
                  >
                    <Icon 
                      icon="bi:envelope-at-fill" 
                      width={26}
                    />
  
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
                <NotificationsCard className="w-full shadow-none" />
              </PopoverContent>
            </Popover>
          </NavbarItem>
          <NavbarItem className="px-2">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="mt-1 h-8 w-8 outline-none transition-transform">
                  <Badge
                    className="border-transparent"
                    color="success"
                    content=""
                    placement="bottom-right"
                    shape="circle"
                    size="sm"
                  >
                    <Image
                      src={
                        profileImage ||
                        "https://i.pravatar.cc/150?u=a04258114e29526708c"
                      }
                      width={30}
                      height={30}
                      alt="profile image"
                      className="rounded-full"
                    />
                  </Badge>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session?.user?.email}</p>
                </DropdownItem>
                <DropdownItem key="profile" href="/profile">
                  Your Profile
                </DropdownItem>
                <DropdownItem key="saved_listing" href="/listing/saved">
                  Saved Listing
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  href="/api/auth/signout"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      )}

      {/* Mobile Menu */}
      <NavbarMenu className="flex items-center gap-[3rem] pt-[3rem] mt-7">
        <NavbarMenuItem>
          <Link
            className={`${
              "/" === path
                ? "w-full flex gap-2 text-inherit text-[#0000FF] dark:text-[#FFFF00]"
                : "flex gap-2 text-inherit w-full"
            }`}
            color="foreground"
            href="/"
            onClick={handleLinkClick}
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className={`${
              "/listing" === path
                ? "w-full flex gap-2 text-inherit text-[#0000FF] dark:text-[#FFFF00]"
                : "flex gap-2 text-inherit w-full"
            }`}
            color="foreground"
            href="/listing"
            onClick={handleLinkClick}
          >
            Listing
          </Link>
        </NavbarMenuItem>
        {session && (
          <NavbarMenuItem>
            <Link
              className={`${
                "/listing/create" === path
                  ? "w-full flex gap-2 text-inherit text-[#0000FF] dark:text-[#FFFF00]"
                  : "flex gap-2 text-inherit w-full"
              }`}
              color="foreground"
              href="/listing/create"
              onClick={handleLinkClick}
            >
              Add Listing
            </Link>
          </NavbarMenuItem>
        )}
        {!session && (
          <NavbarMenuItem>
            {providers &&
              Object.values(providers).map((provider, index) => (
                <Button
                  className=""
                  href="#"
                  key={index}
                  onClick={() => signIn(provider.id)}
                >
                  <GoogleIcon />
                  Login
                </Button>
              ))}
          </NavbarMenuItem>
        )}

        <NavbarMenuItem>
          <ThemeSwitcher />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
