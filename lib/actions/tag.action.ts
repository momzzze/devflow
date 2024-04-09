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
        // const {page=1,pageSize,filter,searchQuery}=params;
        const tags=await Tag.find({});
        return {tags};
    } catch (error) {
        console.log(error);
        throw new Error('Error in getAllTags');
    }
}
export async function getQuestionsByTagId(params:GetQuestionsByTagIdParams) {
    try {
        connectToDatabase();

        const {tagId, page=1, pageSize=10,searchQuery}=params;
        
        const tagFilter:FilterQuery<ITag>={_id:tagId};

        const tag= await Tag.findOne(tagFilter).populate({
            path:'questions',
            model:Question,
            match: searchQuery 
            ? {title:{$regex: searchQuery, $options: 'i'}}
            :{},
            options: {
                sort: {createdAt:-1},
            },
            populate:[
                {path:'tags',model:Tag,select:'_id name'},
                {path:'author',model:User,select:'_id clerkId name picture'},
            ]
        })
        if(!tag) throw new Error('Tag not found');
        console.log(tag);
        
        const questions= tag.questions

        return {tagTitle:tag.name,questions};
    } catch (error) {
        console.log(error);
        throw error
    }
}

// export async function getAllUsers(params:GetAllUsersParams) {
//     try {
//         connectToDatabase();
        
//     } catch (error) {
//         console.log(error);
//     }
// }