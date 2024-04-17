/* eslint-disable camelcase */
import Image from "next/image";
import React from "react";

interface Props {
  job_country: string;
  job_city: string;
  job_state: string;
}

const JobLocation = ({ job_country, job_city, job_state }: Props) => {
  return (
    <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-5 py-1.5">
      <Image
        src={`https://flagsapi.com/${job_country}/flat/64.png`}
        alt="location icon"
        width={16}
        height={16}
        className="rounded-full"
      />
      <p className="body-medium text-dark200_light800">
        {job_city && `${job_city} ,`}
        {job_state && ` ${job_state},`}
        {job_country && ` ${job_country}`}
      </p>
    </div>
  );
};

export default JobLocation;
