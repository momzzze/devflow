"use client";
/* eslint-disable camelcase */
import { Job } from "@/types";
import Image from "next/image";
import React from "react";
import JobLocation from "../shared/JobLocation";
import Link from "next/link";
import { Button } from "../ui/button";

const JobCard = ({
  id,
  employer_name,
  employer_logo,
  employer_website,
  job_apply_link,
  job_city,
  job_country,
  job_description,
  job_employment_type,
  job_state,
  job_title,
}: Job) => {
  return (
    <div className="card-wrapper my-5 rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col gap-5 md:flex-row">
        <Image
          src={employer_logo || "/assets/images/site-logo.svg"}
          alt="employer logo"
          width={64}
          height={64}
          className="rounded-md object-contain"
        />
        <div className="w-full">
          <div className="flex-between flex-wrap gap-2">
            <p className="text-dark200_light800">{job_title}</p>
            <div className="hidden sm:flex">
              <JobLocation
                job_country={job_country || ""}
                job_city={job_city || ""}
                job_state={job_state || ""}
              />
            </div>
          </div>
          <div>
            <div className="w-2/3">
              <p className="text-dark200_light800 mt-5 line-clamp-3">
                {job_description
                  ?.split("\n")
                  .find((sentence) => sentence.length > 20)}
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/clock-2.svg"
                  alt="clock"
                  width={20}
                  height={20}
                />

                <p className="body-medium text-light-500">
                  {job_employment_type}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/currency-dollar-circle.svg"
                  alt="dollar symbol"
                  width={20}
                  height={20}
                />

                <p className="body-medium text-light-500">Not disclosed</p>
              </div>
            </div>
            <Link
              href={job_apply_link!}
              target="_blank"
              className="flex items-center"
            >
              <Button className="primary-text-gradient">View job</Button>
              <Image
                src="/assets/icons/arrow-up-right.svg"
                alt="arrow up right"
                width={16}
                height={16}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
