'use server'

import User from "@/database/models/User";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag, { ITag } from "@/database/models/Tag";
import { FilterQuery } from "mongoose";
import Question from "@/database/models/Question";



export async function getTopInteractedTags(params:GetTopInteractedTagsParams) {
    try {
        connectToDatabase();
        const {userId}=params;
        
        const user=await User.findById(userId);
        if(!user) throw new Error('User not found');
        
        return [{
            _id:'1',
            name:'tag1'
        },{
            _id:'2',
            name:'tag2'
        },{
            _id:'3',
            name:'tag3'
        }]
    } catch (error) {
        console.log(error);
    }
}

export async function getAllTags(params:GetAllTagsParams) {
    try {
        connectToDatabase();
        const {searchQuery,filter,page=1,pageSize=20}=params;

        const skipAmount=pageSize*(page-1);

        const query:FilterQuery<typeof Tag>={};
        if(searchQuery){
            query.$or=[
                {name:{$regex:searchQuery,$options:'i'}}
            ]
        }
        let filterOptions={};
        
        switch(filter){
            case 'popular':
                filterOptions={questions:-1};
                break;
                case 'recent':
                    filterOptions={createdAt:-1};
                    break;
                case 'name':
                    filterOptions={name:1};
                    break;    
                case 'old':
                    filterOptions={createdAt:1};
                    break; 

        }

        const tags=await Tag.find(query)        
        .sort(filterOptions)
        .skip(skipAmount)
        .limit(pageSize);

        const totalTags=await Tag.countDocuments(query);

        const isNext=totalTags> skipAmount+ tags.length;

        return {tags,isNext};
    } catch (error) {
        console.log(error);
        throw new Error('Error in getAllTags');
    }
}
export async function getQuestionsByTagId(params:GetQuestionsByTagIdParams) {
    try {
        connectToDatabase();

        const {tagId,searchQuery,page=1,pageSize=10}=params;

        const skipAmount=pageSize*(page-1);

        const tagFilter:FilterQuery<ITag>={_id:tagId};

        const tag= await Tag.findOne(tagFilter).populate({
            path:'questions',
            model:Question,
            match: searchQuery 
            ? {title:{$regex: searchQuery, $options: 'i'}}
            :{},
            options: {
                sort: {createdAt:-1},
                skip: skipAmount,
                limit: pageSize+1
            },
            populate:[
                {path:'tags',model:Tag,select:'_id name'},
                {path:'author',model:User,select:'_id clerkId name picture'},
            ]
        })
        if(!tag) throw new Error('Tag not found');
        
        const questions= tag.questions
       

        const isNext=tag.questions.length> pageSize;

        return {tagTitle:tag.name,questions,isNext};
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getTopPopularTags (params:GetAllTagsParams) {
    try {
        connectToDatabase();
        const tags=await Tag.aggregate([
            {
                $project:{name:1, numberOfQuestions:{$size:'$questions'}}
            },
            {
                $sort:{numberOfQuestions:-1}
            },
            {
                $limit:5
            }
        ])
        
        return {tags};
    } catch (error) {
        console.log(error);
    }
}

// export async function getAllUsers(params:GetAllUsersParams) {
//     try {
//         connectToDatabase();
        
//     } catch (error) {
//         console.log(error);
//     }
// }