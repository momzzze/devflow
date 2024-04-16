import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="flex flex-col gap-5 lg:flex-row">
          <Skeleton className="size-36 rounded-full object-cover" />
          <div className="mt-3">
            <Skeleton className="h-28 w-80" />
          </div>
        </div>
        <Skeleton className="h-12 w-[175px] rounded-md" />
      </div>

      <div className="mb-10 mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <Skeleton className="h-28 rounded-md" />
        <Skeleton className="h-28 rounded-md" />
        <Skeleton className="h-28 rounded-md" />
        <Skeleton className="h-28 rounded-md" />
      </div>
      <div className="mt-10 flex gap-10">
        <div className="flex">
          <Skeleton className="h-11 w-24 rounded-r-none" />
          <Skeleton className="h-11 w-24 rounded-l-none" />
        </div>
      </div>
      <div className="mt-5 flex w-full flex-col gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
