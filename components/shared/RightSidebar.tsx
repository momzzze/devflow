import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const hotQuestioonsMock = [
  {
    _id: 1,
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  {
    _id: 2,
    title: "How can an air conditioning machine exist?",
  },
  {
    _id: 3,
    title: "Interrogated every time crossing UK Border as citizen",
  },
  {
    _id: 4,
    title: "Low digit addition generator",
  },
  {
    _id: 5,
    title: "What is an example of 3 numbers that do not make up a vector?",
  },
];

const popularTagsMock = [
  {
    _id: 1,
    name: "javascript",
    totalQuestions: 5,
  },
  {
    _id: 2,
    name: "react",
    totalQuestions: 3,
  },
  {
    _id: 3,
    name: "nextjs",
    totalQuestions: 1,
  },
  {
    _id: 4,
    name: "typescript",
    totalQuestions: 4,
  },
  {
    _id: 5,
    name: "nodejs",
    totalQuestions: 2,
  },
  {
    _id: 6,
    name: "express",
    totalQuestions: 1,
  },
  {
    _id: 7,
    name: "mongodb",
    totalQuestions: 3,
  },
  {
    _id: 8,
    name: "postgresql",
    totalQuestions: 1,
  },
  {
    _id: 9,
    name: "docker",
    totalQuestions: 2,
  },
  {
    _id: 10,
    name: "kubernetes",
    totalQuestions: 1,
  },
  {
    _id: 11,
    name: "tailwindcss",
    totalQuestions: 1,
  },
  {
    _id: 12,
    name: "chakraui",
    totalQuestions: 1,
  },
  {
    _id: 13,
    name: "framer-motion",
    totalQuestions: 1,
  },
  {
    _id: 14,
    name: "firebase",
    totalQuestions: 1,
  },
  {
    _id: 15,
    name: "aws",
    totalQuestions: 1,
  },
  {
    _id: 16,
    name: "azure",
    totalQuestions: 1,
  },
  {
    _id: 17,
    name: "google-cloud",
    totalQuestions: 1,
  },
  {
    _id: 18,
    name: "vercel",
    totalQuestions: 1,
  },
  {
    _id: 19,
    name: "netlify",
    totalQuestions: 1,
  },
  {
    _id: 20,
    name: "heroku",
    totalQuestions: 1,
  },
  {
    _id: 21,
    name: "digitalocean",
    totalQuestions: 1,
  },
];
const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="p-4">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestioonsMock.map((q) => (
            <Link
              href={`/questions/${q._id}`}
              className="flex cursor-pointer items-center justify-between gap-7"
              key={q.title}
            >
              <p className="body-medium text-dark500_light700">{q.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt={q.title}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTagsMock.map((tag) => (
            <RenderTag
              key={tag.name}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
