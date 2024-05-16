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
    <nav className="fixed flex flex-row h-24 w-full items-center justify-center md:justify-between md:flex-col md:h-full md:w-24 md:left-0 bottom-0 bg-black">
      <div className="flex md:flex-col">
        <div className="m-6 hidden sm:block">
          <MenuIcon className="m-6 " />
        </div>
        <div className="flex flex-row md:flex-col items-center justify-center">
          <div className="m-2">
            <HomeIcon />
          </div>
          <div className="m-2 hidden sm:block">
            <IdentificationIcon />
          </div>
          <div className="m-2">
            <DashboardIcon />
          </div>
          <div className="m-2">
            <QrCodeIcon />
          </div>
          <div className="m-2 hidden sm:block">
            <KeyIcon />
          </div>
          <div className="m-2">
            <NotificationsIcon />
          </div>
        </div>
      </div>
      <Link href="/configuracion">
        <div className="m-2">
          <SettingsIcon />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
