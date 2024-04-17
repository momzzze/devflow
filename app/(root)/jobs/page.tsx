import JobCard from "@/components/cards/JobCard";
import Filters from "@/components/shared/Filters";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { getCountries, getJobs } from "@/lib/actions/jobs.action";
import React from "react";

interface Props {
  searchParams: {
    q: string;
    location: string;
    page: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const countries = await getCountries();
  const page = parseInt(searchParams?.page ?? 1);

  const jobs = await getJobs({
    searchQuery: searchParams,
    page: searchParams?.page ?? 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job title, company, or keywords"
          otherClasses="flex-1"
        />
        <Filters
          filters={countries}
          otherClasses="min-h-[56px] sm:min-w-[175px]"
          containerClasses="flex-1"
          location="true"
        />
      </div>
      <div>
        {jobs!.length > 0 ? (
          jobs!.map((job: any) => (
            <JobCard
              key={job.job_id}
              id={job.job_id}
              employer_name={job?.employer_name}
              employer_logo={job?.employer_logo || ""}
              employer_website={job?.employer_website || ""}
              job_employment_type={job?.job_employment_type}
              job_title={job?.job_title}
              job_description={job?.job_description}
              job_apply_link={job?.job_apply_link}
              job_city={job?.job_city}
              job_country={job?.job_country}
              job_state={job?.job_state || ""}
            />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto mt-10 max-w-4xl text-center">
            <p>No jobs found</p>
          </div>
        )}
      </div>
      <div className="mt-10">
        {jobs!.length > 0 && (
          <Pagination pageNumber={page} isNext={jobs.length === 10} />
        )}
      </div>
    </>
  );
};

export default Page;
