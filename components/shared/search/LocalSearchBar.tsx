"use client";
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          width={24}
          height={24}
          src={imgSrc}
          alt="Search Input"
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {
          console.log("TODO Search");
        }}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          width={24}
          height={24}
          src={imgSrc}
          alt="Search Input"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
