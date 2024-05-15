"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import propertyMockData from "../../mockData.json";
import "react-datepicker/dist/react-datepicker.css";
import PencilIcon from "../components/icons/PencilIcon";
import ShareIcon from "../components/icons/ShareIcon";
import LocationIcon from "../components/icons/LocationIcon";
import PropertyIcon from "../components/icons/PropertyIcon";
import BedIcon from "../components/icons/BedIcon";
import BathtubIcon from "../components/icons/BathtubIcon";
import WifiIcon from "../components/icons/WifiIcon";
import CarIcon from "../components/icons/CarIcon";
import ProfilePicture from "../../public/assets/profile-picture.png";

export default function ApartmentDetail() {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    calculateNumberOfDays();
  }, [checkInDate, checkOutDate]);

  const calculateNumberOfDays = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumberOfDays(diffDays);
    } else {
      setNumberOfDays(0);
    }
  };

  const handleCheckInChange = (date: Date | null) => {
    if (checkOutDate && date && date > checkOutDate) {
      alert("Check-in date cannot be after check-out date");
      return;
    }
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date: Date | null) => {
    if (checkInDate && date && date < checkInDate) {
      alert("Check-out date cannot be before check-in date");
      return;
    }
    setCheckOutDate(date);
  };

  return (
    <div className="text-white font-poppins font-normal text-base">
      <div className="h-20 p-5 bg-transparent flex flex-row items-center justify-between">
        <h1 className="font-roboto text-2xl font-bold">
          {propertyMockData.name}
        </h1>
        <div className="h-11 flex flex-row gap-2.5">
          <button className="h-11 w-11 bg-blue bg-opacity-20 rounded-full flex items-center justify-center">
            <PencilIcon />
          </button>
          <button className="h-11 w-11 bg-blue flex rounded-full items-center justify-center">
            <ShareIcon />
          </button>
        </div>
      </div>

<div>
      {/* HERE GOES TEH GALLERY/CARROUSEL*/}
</div>

      <div className="flex flex-col sm:flex-row-reverse">
        <div className="flex flex-col gap-6">
        <table className="table-auto w-80 border-collapse">
  <tbody>
    <tr>
    <td className="py-5 border border-white border-opacity-30" colspan="2">
      <div className="flex flex-row items-center justify-between">
        <div className="text-center flex flex-col">
          <p>${propertyMockData.pricePerNight} USD por noche</p>
          <p>Precio por habitación</p>
        </div>
        <button>
          <PencilIcon />
        </button>
      </div>
    </td>
    </tr>
    <tr>
      <td className="text-center border border-white border-opacity-30">
        CHECK-IN
        <DatePicker
          placeholderText="dd/mm/aaaa"
          selected={checkInDate}
          onChange={handleCheckInChange}
          dateFormat="dd/MM/yyyy"
          className="bg-transparent shadow-md rounded-lg p-2 text-center"
        />
      </td>
      <td className=" text-center border border-white border-opacity-30">
        CHECK-OUT
        <DatePicker
          placeholderText="dd/mm/aaaa"
          selected={checkOutDate}
          onChange={handleCheckOutChange}
          dateFormat="dd/MM/yyyy"
          className="bg-transparent shadow-md rounded-lg p-2 text-center"
        />
      </td>
    </tr>
    <tr>
      <td className="text-center border border-white border-opacity-30" colspan="2">
        Cantidad de días: {numberOfDays}
      </td>
    </tr>
    <tr>
      <td className="text-center border border-white border-opacity-30" colspan="2">
        Depósito reembolsable: $60 USD
      </td>
    </tr>
    <tr>
      <td className="text-center border border-white border-opacity-30" colspan="2">
        Ingreso total: $
        {propertyMockData.pricePerNight * numberOfDays} USD
      </td>
    </tr>
  </tbody>
</table>
          <div>
            <button className="h-8 w-80 py- px- text-black bg-blue rounded-2xl">
              Invitar inquilino
            </button>
          </div>
        </div>

        <div>
          <div>
            <ul className="flex flex-col gap-2.5">
              <li className="flex flex-row items-center">
                <LocationIcon />
                <p>Av. San Martín 315, Mendoza, Argentina</p>
              </li>
              <li className="flex flex-row items-center gap-2.5">
                <PropertyIcon />
                <p>Departamento</p>
              </li>
              <li className="flex flex-row items-center gap-2.5">
                <BedIcon />
                <p>3 hábitaciones</p>
              </li>
              <li className="flex flex-row items-center gap-2.5">
                <BathtubIcon />
                <p>1 baño</p>
              </li>
              <li className="flex flex-row items-center gap-2.5">
                <WifiIcon />
                <p>WiFi</p>
              </li>
              <li className="flex flex-row items-center gap-2.5">
                <CarIcon />
                <p>Estacionamiento gratuito</p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-roboto font-bold text-xl">Descripción</h2>
            <p>{propertyMockData.description}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="font-roboto font-bold text-xl">Propietario</h2>
            <div className="flex flex-row items-center">
              <Image
                src={ProfilePicture}
                alt="Property Owner"
                width={50}
                height={50}
              />
              <p>
                {propertyMockData.owner.name} {propertyMockData.owner.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
