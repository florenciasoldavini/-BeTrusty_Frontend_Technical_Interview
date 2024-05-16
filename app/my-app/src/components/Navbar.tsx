"use client";

import React, { useState, useEffect } from "react";
import HomeIcon from "./icons/HomeIcon";
import DashboardIcon from "./icons/DashboardIcon"; // Assuming you have this icon
import QrCodeIcon from "./icons/QrCodeIcon";
import NotificationsIcon from "./icons/NotificationsIcon";
import SettingsIcon from "./icons/SettingsIcon";
import MenuIcon from "./icons/MenuIcon";
import IdentificationIcon from "./icons/IdentificationIcon";
import KeyIcon from "./icons/KeyIcon";

interface NavbarProps {
  // Define any props you might need here
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize () {
      setIsSmallScreen(window.innerWidth <= 768); // Assuming 768px as the breakpoint
    }

    window.addEventListener("resize", handleResize);

    // Call the handler right away so we have the correct initial state
    handleResize();

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 ${
        isSmallScreen ? "bottom-0 left-0 w-full" : "left-0"
      } p-4 bg-black text-white shadow-md`}
    >
      {isSmallScreen
        ? (
        <ul className="flex space-x-4">
          <HomeIcon />
          <DashboardIcon />
          <QrCodeIcon />
          <NotificationsIcon />
          <SettingsIcon />
        </ul>
          )
        : (
        <ul className="flex space-x-4">
          <MenuIcon />
          <div className="ml-4">
            <HomeIcon />
            <IdentificationIcon />
            <DashboardIcon />
            <QrCodeIcon />
            <KeyIcon />
            <NotificationsIcon />
          </div>
          <SettingsIcon />
        </ul>
          )}
    </nav>
  );
};

export default Navbar;
