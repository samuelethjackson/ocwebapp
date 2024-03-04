"use client"

import React from "react";
import Link from "next/link";
import CloseIcon from "./icons/closeIcon";
import { useState } from "react";

interface MenuNavigationItemProps {
  label: string;
  isMenuClicked: boolean;
  setIsMenuClicked: (value: boolean) => void;
}

const MenuNavigationItem: React.FC<MenuNavigationItemProps> = ({
  label,
  isMenuClicked,
  setIsMenuClicked
}) => {

  return (
    <div className="h-6 flex center">
      {isMenuClicked ? (
        <div className="opacity-100 pt-0.5">
          <Link href={""}
          onClick={() => {
            setIsMenuClicked(false); // Set hover state to true
          }}>
            <CloseIcon />
          </Link>
        </div>
      ) : (
        <div
          onClick={() => {
            setIsMenuClicked(true); // Set hover state to true
          }}
          className="w-full text-base text-right md:text-left font-normal leading-tight"
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default MenuNavigationItem;

