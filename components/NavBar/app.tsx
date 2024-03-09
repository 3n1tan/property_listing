"use client";

import React, { useState } from "react";
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

import { AcmeIcon } from "./social";

import NotificationsCard from "./notifications-card";
import { ThemeSwitcher } from "../DarkMode/switch_theme";
import Image from "next/image";

export default function Component() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleLinkClick = () => {
      setIsMenuOpen(false);
    };
  return (
    <Navbar
      classNames={{
        base: "lg:bg-transparent lg:backdrop-filter-none",
        item: "data-[active=true]:text-primary",
        wrapper: "px-4 sm:px-6 max-w-[110rem] py-9",
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand className="max-w-fit lg:mr-9">
        <NavbarMenuToggle className="mr-2 h-6 lg:hidden" />
        <div className="flex items-center lg:ml-0 ml-[3rem]">
          <Link href="/">
            <AcmeIcon />
            <p className="font-bold text-inherit">3N1T | PROPERTIES </p>
          </Link>
        </div>
      </NavbarBrand>
      <NavbarContent
        className="ml-[20rem] hidden h-12 w-full max-w-fit gap-9 rounded-full bg-content2 px-4 dark:bg-content1 lg:flex"
        justify="start"
      >
        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            aria-current="page"
            className="flex gap-2 text-inherit"
            href="/listing"
          >
            Listing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/listing/create">
            Add Listing
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className="hidden lg:flex h-12 max-w-fit items-center gap-0 rounded-full p-0 lg:bg-content2 lg:px-5 lg:dark:bg-content1"
        justify="center"
      >
        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="#">
            Login or Register
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className="ml-auto flex h-12 max-w-fit items-center gap-0 rounded-full p-0 lg:bg-content2 lg:px-1 lg:dark:bg-content1"
        justify="end"
      >
        {/* <NavbarItem className="hidden sm:flex">
          <Button isIconOnly radius="full" variant="light">
            <Icon className="text-default-500" icon="solar:magnifer-linear" width={22} />
          </Button>
        </NavbarItem> */}
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitcher />
          {/* <Button isIconOnly radius="full" variant="light">
            <Icon className="text-default-500" icon="solar:sun-linear" width={24} />
          </Button> */}
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button isIconOnly radius="full" variant="light">
            <Icon
              className="text-default-500"
              icon="solar:settings-linear"
              width={24}
            />
          </Button>
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
                <Badge color="danger" content="5" showOutline={false} size="md">
                  <Icon
                    className="text-default-500"
                    icon="solar:bell-linear"
                    width={22}
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
                    src="https://i.pravatar.cc/150?u=a04258114e29526708c"
                    width={30}
                    height={30}
                    alt=""
                    className="rounded-full"
                  />
                </Badge>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">johndoe@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="flex items-center gap-[3rem] pt-[3rem]">
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/" onClick={handleLinkClick}>
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/listing" onClick={handleLinkClick}>
            Listing
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/listing/create" onClick={handleLinkClick}>
            Add Listing
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="flex gap-2 text-inherit" href="#" onClick={handleLinkClick}>
            Login or Register
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ThemeSwitcher />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
