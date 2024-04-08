"use server"

import Question from "@/database/models/Question";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Answer from "@/database/models/Answer";



export async function createAnswer(params:CreateAnswerParams) {
    try {
        connectToDatabase();
        const {content,author,question,path}=params;
        const newAnswer=await Answer.create({
            content,
            author,
            question
        });
        
        await Question.findByIdAndUpdate(question,{
            $push:{answers:newAnswer._id}
        })
        
        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAnswers(params:GetAnswersParams) {
    try {
        connectToDatabase();

        const {questionId}=params;        
        const answers=await Answer.find({question:questionId})
        .populate('author','_id clerkId name picture')
        .sort({createdAt:-1});
        
        return {answers};
    } catch (error) {
        console.log(error);
        throw error;
    }
}



// export async function getTopInteractedTags(params:any) {
//     try {
        
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }