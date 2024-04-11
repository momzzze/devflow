import { getUsersAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUsersAnswers({ userId, page: 1 });

  return (
    <>
      {result!.answers.map((item) => (
        <>
          <AnswerCard
            clerkId={clerkId}
            _id={item._id}
            question={item.question}
            author={item.author}
            upvotes={item.upvotes.length}
            createdAt={item.createdAt}
          />
        </>
      ))}
    </>
  );
};

export default AnswersTab;
