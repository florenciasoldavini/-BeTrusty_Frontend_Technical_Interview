import React from "react";
import Image from "next/image";
import Logo from "../components/Logo";
import ProfilePicture from "../../public/assets/profile-picture.png";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className="h-20 py-5 px-6 bg-black flex flex-row items-center justify-between">
      <Logo />
      <Image className="border-2 border-blue rounded-full" src={ProfilePicture} alt="Property Owner" width={50} height={50} />
    </div>
  );
};

export default TopBar;
