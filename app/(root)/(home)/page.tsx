import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/coonstants/filters";
import Link from "next/link";
import React from "react";

const questionMock = [
  {
    _id: "1",
    title:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    tags: [
      { _id: "1", name: "LWC" },
      { _id: "2", name: "Salesforce" },
      { _id: "3", name: "Lightning" },
    ],
    author: {
      _id: "author1",
      name: "John Doe",
      picture: "path/to/john_doe_picture.png",
    },
    upvotes: 10,
    answers: [],
    views: 100,
    createdAt: new Date("2023-09-01T00:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to use Redux with React Hooks?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Redux" },
      { _id: "3", name: "React Hooks" },
    ],
    author: {
      _id: "author2",
      name: "Sara Smith",
      picture: "path/to/sara_smith_picture.png",
    },
    upvotes: 20,
    answers: [],
    views: 200,
    createdAt: new Date("2023-09-01T00:00:00.000Z"),
  },
  {
    _id: "3",
    title: "How to use React Router with TypeScript?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "React Router" },
      { _id: "3", name: "TypeScript" },
    ],
    author: {
      _id: "author3",
      name: "Tom Brown",
      picture: "path/to/tom_brown_picture.png",
    },
    upvotes: 30,
    answers: [],
    views: 300,
    createdAt: new Date("2023-09-01T00:00:00.000Z"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={`/ask-question`} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[175px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters filters={HomePageFilters} />
      <div className="mt-10 flex w-full flex-col space-x-1 shadow-none">
        {questionMock.length > 0 ? (
          questionMock.map((q) => (
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
            title=" There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
