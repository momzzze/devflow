import { getUsersQuestions } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import NoResult from "./NoResult";
import { SearchParamsProps } from "@/types";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const QuestionsTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUsersQuestions({ userId });

  return (
    <div className="mt-10 flex w-full flex-col space-x-1 shadow-none">
      {result!.questions.length > 0 ? (
        result!.questions.map((q) => (
          <QuestionCard
            key={q._id}
            _id={q._id}
            clerkId={clerkId}
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
  );
};

export default QuestionsTab;
