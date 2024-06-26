import QuestionCard from "@/components/cards/QuestionCard";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { QuestionFilters } from "@/coonstants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Collection | DevFlow",
  description:
    "DevFlow collection is place where you can find all your saved questions. Save questions to read later, or to refer back to them when you need help. Explore your saved questions.",
};

const page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestions({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams.page : 1,
    clerkId: userId,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[175px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-2 space-x-1 shadow-none">
        {result!.questions.length > 0 ? (
          result!.questions.map((q: any) => (
            <QuestionCard
              key={q._id}
              _id={q._id}
              title={q.title}
              tags={q.tags}
              author={q.author}
              upvotes={q.upvotes}
              answers={q.answers}
              views={q.views}
              createdAt={q.createdAt}
            />
          ))
        ) : (
          <NoResult
            title=" There’s no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result!.isNext}
        />
      </div>
    </>
  );
};

export default page;
