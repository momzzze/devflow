import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      </div>
      <div className="mb-5 mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 flex-1" />
      </div>

      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <Skeleton key={item} className="h-60 w-full rounded-2xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
