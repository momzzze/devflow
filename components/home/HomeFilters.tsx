"use client";
import React from "react";
import { Button } from "../ui/button";
interface Props {
  filters: {
    name: string;
    value: string;
  }[];
}
const HomeFilters = ({ filters }: Props) => {
  const active = "newest";
  return (
    <div className="mt-10 flex-wrap gap-4 md:flex">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-500 hover:text-primary-100"
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-200"
          }`}
          onClick={() => {}}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
