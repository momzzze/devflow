"use server"


import Question from "@/database/models/Question";
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/models/Tag";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/models/User";
import { revalidatePath } from "next/cache";



export async function createQuestion(params: CreateQuestionParams) {
    try {
        connectToDatabase();
        const { title, content, tags, author, path } = params;
        const question = await Question.create({
            title,
            content,
            author,
        });
        const tagDocuments = [];

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
                { $setOnInsert: { name: tag }, $push: { question: question._id } },
                { upsert: true, new: true }
            )
            tagDocuments.push(existingTag);
        }
        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments } }
        })
        revalidatePath(path);
    } catch (error) {
        console.log(error);
    }
}

export async function getQuestions(params: GetQuestionsParams) {
    try {
        connectToDatabase();
        const questions = await Question.find({})
            .populate({ path: 'tags', model: Tag })
            .populate({ path: 'author', model: User })
            .sort({ createdAt: -1 });
        return { questions };

    } catch (error) {
        console.log(error);
    }
}