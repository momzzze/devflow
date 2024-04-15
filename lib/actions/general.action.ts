'use server'

import Question from "@/database/models/Question";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import Tag from "@/database/models/Tag";
import User from "@/database/models/User";
import Answer from "@/database/models/Answer";

const SearchableTypes = ['question', 'tag', 'user', 'answer'];

export async function globalSearch(params: SearchParams) {
    try {
        await connectToDatabase();
        const { query, type } = params;

        const regexQuery = { $regex: query, $options: 'i' };

        let results = [];

        const modelsAndTypes = [
            { model: Question, searchField: 'title', type: 'question' },
            { model: User, searchField: 'name', type: 'user' },
            { model: Answer, searchField: 'content', type: 'answer' },
            { model: Tag, searchField: 'name', type: 'tag' },
        ]
        const typeLower = type?.toLowerCase();

        if (!typeLower || !SearchableTypes.includes(typeLower)) {

            for (const { model, searchField, type } of modelsAndTypes) {
                const queryResults = await model
                    .find({ [searchField]: regexQuery }).limit(2);

                results.push(
                    ...queryResults.map((item) => ({
                        title: type === 'answer'
                            ? `Answers containing ${query}`
                            : item[searchField],
                        type,
                        id: type === 'user'
                            ? item.clerkId
                            : type === 'answer'
                                ? item.question
                                : item._id
                    }))
                );
            }
        } else {
            // abstraction to search by type
            const modelInfo = modelsAndTypes.find((item) => item.type === type);

            if (!modelInfo) {
                throw new Error('Invalid search type')
            }

            const queryResults = await modelInfo.model
                .find({ [modelInfo.searchField]: regexQuery })
                .limit(8);

            results = queryResults.map((item) => ({
                title: type === 'answer'
                    ? `Answers containing ${query}`
                    : item[modelInfo.searchField],
                type,
                id: type === 'user'
                    ? item.clerkId
                    : type === 'answer'
                        ? item.question
                        : item._id
            }));
        }
        return JSON.stringify(results);
    } catch (error) {
        console.log(error);
        throw error;
    }
}