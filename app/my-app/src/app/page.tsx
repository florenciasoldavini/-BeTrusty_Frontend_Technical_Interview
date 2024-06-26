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
import ArrowRightIcon from "../components/icons/ArrowRightIcon";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon";
import ProfilePicture from "../../public/assets/profile-picture.png";
import ShowAllIcon from "../../public/assets/show-all-images-icon.png";

export default function ApartmentDetail() {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const images = [
    { src: "/assets/room-1.png", width: 600, height: 400 },
    { src: "/assets/room-2.png", width: 600, height: 400 },
    { src: "/assets/room-3.png", width: 600, height: 400 },
    { src: "/assets/room-4.png", width: 600, height: 400 },
    // Add more images as needed
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
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

      <div className="relative">
        {/* Gallery for Desktop */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4">
          <div className="col-span-2 row-span-2">
            <Image
              src={images[0].src}
              alt="Image 1"
              width={images[0].width}
              height={images[0].height}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src={images[1].src}
              alt="Image 2"
              width={images[1].width}
              height={images[1].height}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <button className="w-full h-full bg-black text-white font-roboto">
              Ver los detalles de las habitaciones
            </button>
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src={images[3].src}
              alt="Image 4"
              width={images[3].width}
              height={images[3].height}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1 relative">
            <Image
              src={images[2].src}
              alt="Image 3"
              width={images[2].width}
              height={images[2].height}
              className="w-full h-full object-cover"
            />
              <button className="absolute h-10 w-56 bottom-4 right-4 bg-white text-black flex flex-row text-center font-roboto font-semibold justify-center items-center rounded">
            <Image
              src={ShowAllIcon}
              alt="icon"
              width="auto"
              height="30"
            />
              Mostrar todas las fotos
            </button>
          </div>
        </div>

        {/* Carousel for Mobile */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div
              className="carousel-inner relative w-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                display: "flex",
              }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Image
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handlePrevSlide}
              className="h-11 w-11 bg-black bg-opacity-30 absolute left-2 top-1/2 transform -translate-y-1/2 border border-white rounded-full flex items-center justify-center"
            >
              <ArrowLeftIcon />
            </button>
            <button
              onClick={handleNextSlide}
              className="h-11 w-11 bg-black bg-opacity-30 absolute right-2 top-1/2 transform -translate-y-1/2 border border-white rounded-full flex items-center justify-center"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row-reverse">
        <div className="font-roboto flex flex-col gap-6 items-center">
          <div className="max-w-80 mx-auto rounded-lg overflow-hidden border border-white border-opacity-30">
            <table className="table-fixed w-full border-collapse">
              <tbody>
                <tr>
                  <td
                    className="border-t border-r border-white border-opacity-30 py-4 px-5"
                    colSpan="2"
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="text-center flex flex-col">
                        <p className="font-semibold text-2xl">
                          ${propertyMockData.pricePerNight} USD por noche
                        </p>
                        <p>Precio por habitación</p>
                      </div>
                      <button>
                        <PencilIcon />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-r border-white border-opacity-30 text-center font-bold py-4">
                    CHECK-IN
                    <DatePicker
                      placeholderText="dd/mm/aaaa"
                      selected={checkInDate}
                      onChange={handleCheckInChange}
                      dateFormat="dd/MM/yyyy"
                      className="w-40 bg-transparent shadow-md rounded-lg p-2 text-center"
                    />
                  </td>
                  <td className="border-t border-white border-opacity-30 text-center font-bold py-4">
                    CHECK-OUT
                    <DatePicker
                      placeholderText="dd/mm/aaaa"
                      selected={checkOutDate}
                      onChange={handleCheckOutChange}
                      dateFormat="dd/MM/yyyy"
                      className="w-40 bg-transparent shadow-md rounded-lg p-2 text-center"
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    className="border-t border-r border-white border-opacity-30 text-center py-4 px-5"
                    colSpan="2"
                  >
                    Cantidad de días: {numberOfDays}
                  </td>
                </tr>
                <tr>
                  <td
                    className="border-t border-r border-white border-opacity-30 text-center py-4 px-5"
                    colSpan="2"
                  >
                    Depósito reembolsable: $60 USD
                  </td>
                </tr>
                <tr>
                  <td
                    className="border-t border-r border-white border-opacity-30 text-center py-4 px-5"
                    colSpan="2"
                  >
                    Ingreso total: $
                    {propertyMockData.pricePerNight * numberOfDays} USD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <button className="h-8 w-80 py-2 text-black bg-blue rounded-2xl flex items-center justify-center">
              Invitar inquilino
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 p-6">
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
            <h2 className="font-roboto font-bold text-xl ">Descripción</h2>
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
