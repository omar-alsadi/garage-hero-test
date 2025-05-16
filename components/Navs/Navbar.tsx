import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { HiUser, HiLocationMarker, HiTranslate } from "react-icons/hi";
import { RiSearch2Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

const Nav = () => {
  return (
    <Navbar fluid rounded className="silver_bottom_border">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/gh_small_logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Garage Hero Logo"
            width={100}
            height={36}
            priority
          />
        </Link>
        <>
          <RxHamburgerMenu className="mr-3 size-5" />
          <TextInput
            id="search"
            type="text"
            icon={RiSearch2Line}
            placeholder="Search"
            className="search_bar"
          />
        </>
      </div>
      <div className="flex items-center justify-center p-2 md:order-2">
        <DarkThemeToggle className="p-0" />
        <HiUser className="size-5 text-gray-500 dark:text-gray-300" />
        <HiLocationMarker className="size-5 text-gray-500 dark:text-gray-300" />
        <HiTranslate className="mr-2 size-5 text-gray-500 dark:text-gray-300" />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://media.licdn.com/dms/image/v2/D4E03AQG4R2vw5QigSA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1670268769288?e=2147483647&v=beta&t=YhS3sguaB51VN74kphCP6UtW6aB7XzZWUoAFPhl7efI"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Omar Alsadi</span>
            <span className="block truncate text-sm font-medium">
              o.alsadi@garage-hero.com
            </span>
          </DropdownHeader>
          <DropdownItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownItem>
          <DropdownItem>Messages</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem className="text-red-700">Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
    </Navbar>
  );
};

export default Nav;
