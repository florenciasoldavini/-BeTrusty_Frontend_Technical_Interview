import React from "react";
import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import DashboardIcon from "./icons/DashboardIcon";
import QrCodeIcon from "./icons/QrCodeIcon";
import NotificationsIcon from "./icons/NotificationsIcon";
import SettingsIcon from "./icons/SettingsIcon";
import MenuIcon from "./icons/MenuIcon";
import IdentificationIcon from "./icons/IdentificationIcon";
import KeyIcon from "./icons/KeyIcon";

const Navbar = () => {
  return (
    <nav className="fixed flex flex-row h-24 w-full items-center justify-between md:flex-col md:h-full md:w-24 md:left-0 bottom-0 bg-black">
      <MenuIcon className="m-2 sm:hidden" />
      <div className="flex flex-row md:flex-col">
        <HomeIcon className="m-2" />
        <IdentificationIcon className="m-2" />
        <DashboardIcon className="m-2" />
        <QrCodeIcon className="m-2" />
        <KeyIcon className="m-2" />
        <NotificationsIcon className="m-2" />
      </div>
      <Link href="/configuracion">
        <SettingsIcon className="m-2" />
      </Link>
    </nav>
  );
};

export default Navbar;
