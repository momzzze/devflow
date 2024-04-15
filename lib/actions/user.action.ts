"use server"

import User from "@/database/models/User";
import {FilterQuery} from "mongoose";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams, GetUserStatsParams, ToggleSaveQuestionParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/models/Question";
import Tag from "@/database/models/Tag";
import Answer from "@/database/models/Answer";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

export async function getUserById(params: GetUserByIdParams) {
    try {
        connectToDatabase();
        const { userId } = params;
        const user = await User.findOne({ clerkId: userId });
        return user;
    } catch (error) {
        console.log(error);
    }
}

export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase();

        const newUser = await User.create(userData)
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser(params: UpdateUserParams) {
    try {
        connectToDatabase();
        const { clerkId, updateData, path } = params

        await User.findOneAndUpdate({ clerkId }, updateData,{
            new:true,        
        })
        revalidatePath(path);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase();
        const { clerkId } = params

        const user = await User.findOneAndDelete({ clerkId });
        if (!user) {
            throw new Error('User not found');
        }
        // delete user from db
        // and questions, answers, comments, etc.

        // const userQuestionIds = await Question.find({ author: user._id }).distinct('_id');
        await Question.deleteMany({ author: user._id });

        // TODO: delete users answers, comments, etc.
        const deleteUser = await User.findByIdAndDelete(user._id);
        return deleteUser;
    } catch (error) {
        console.log(error);
    }
}


export async function getAllUsers(params: GetAllUsersParams) {
    try {
        connectToDatabase();
        const {searchQuery,filter, page=1, pageSize=20}=params;
        
        const skipAmount=pageSize*(page-1);




        const query:FilterQuery<typeof User>={};
        if(searchQuery){
            query.$or=[
                {name:{$regex:new RegExp(searchQuery, 'i')}},
                {username:{$regex:new RegExp(searchQuery, 'i')}},
                {email:{$regex:new RegExp(searchQuery, 'i')}}
            ]
        }

        let sortOptions={};
        switch(filter){
            case 'new_users':
                sortOptions={joinedAt:-1};
                break;
            case 'old_users':
                sortOptions={joinedAt:1};
                break;
            case 'top_contributors':
                sortOptions={totalQuestions:-1};
                break;
        }

        const users=await User.find(query)
        .skip(skipAmount)
        .limit(pageSize)
        .sort(sortOptions);

        const totalUsers=await User.countDocuments(query);
        const isNext=totalUsers> skipAmount+ users.length;
        
        return {users,isNext};
    } catch (error) {
        console.log(error);
    }
}

export async function toggleSaveQuestion(params:ToggleSaveQuestionParams) {
    try {
        connectToDatabase();
        
        const {userId,questionId,path}=params;

        const user=await User.findById(userId);
        if(!user) throw new Error('User not found');

        const isQuestionSaved=user.saved.includes(questionId);
        if(isQuestionSaved){
            await User.findByIdAndUpdate(userId,{$pull:{saved:questionId}}, {new:true});
        }else{
            // add question to saved
            await User.findByIdAndUpdate(userId,{$addToSet:{saved:questionId}}, {new:true});

        }
            

        revalidatePath(path);
    } catch (error) {
        console.log(error);
    }
}
export async function getSavedQuestions(params:GetSavedQuestionsParams) {
    try {
        connectToDatabase();
        const {clerkId,searchQuery,filter,page=1,pageSize=1}=params;
        
        const skipAmount=pageSize*(page-1)

        const query:FilterQuery<typeof Question>=searchQuery
        ? {title: {$regex: new RegExp(searchQuery, 'i')}}
        : {}

        let filterOptions={};

        switch(filter){
            case 'most_recent':
                filterOptions={createdAt:-1};
                break;
                case 'oldest':
                    filterOptions={createdAt:1};
                    break;
            case 'most_viewed':
                filterOptions={views:-1};
                break;
                case 'most_voted':
                    filterOptions={upvotes:-1};
                    break;
                case 'most_answered':
                    filterOptions={answers:-1};
                    break;
        }

        const user= await User.findOne({clerkId}).populate({
            path:'saved',
            match: query,
            options: {
                sort: filterOptions,
                skip: skipAmount,
                limit: pageSize+1,
            },
            populate:[
                {path:'tags',model:Tag,select:'_id name'},
                {path:'author',model:User,select:'_id clerkId name picture'},
            ]
        })
        
        const isNext=user.saved.length> pageSize;        
        
        if(!user) throw new Error('User not found');

        const savedQuestions= user.saved

        return {questions:savedQuestions,isNext};

    } catch (error) {
        console.log(error);
    }
}
export async function getUserInfo(params: GetUserByIdParams) {
    try {
        connectToDatabase();
        const { userId } = params;
        
        const user = await User.findOne({ clerkId: userId });
        if(!user){
            throw new Error('User not found');
        }

        const totalQuestions=await Question.countDocuments({author: user._id});
        const totalAnswers=await Answer.countDocuments({author: user._id});
        
        const [questionUpvotes]=await Question.aggregate([
            {$match:{author:user._id}},
            {$project:{
                _id:0, upvotes: {$size: '$upvotes'},                
            }},
            {$group:{_id:null, totalUpvotes:{$sum:'$upvotes'}}}
        ]);

        const [questionViews]=await Answer.aggregate([
            {$match:{author:user._id}},           
            {$group:{_id:null, totalViews:{$sum:'$views'}}}
        ]);


        const [answerUpvotes]=await Answer.aggregate([
            {$match:{author:user._id}},
            {$project:{
                _id:0, upvotes: {$size: '$upvotes'},                
            }},
            {$group:{_id:null, totalUpvotes:{$sum:'$upvotes'}}}
        ]);

        const criteria=[
            {type: 'QUESTION_COUNT'as BadgeCriteriaType, count: totalQuestions},
            {type: 'ANSWER_COUNT'as BadgeCriteriaType, count: totalAnswers},
            {type: 'QUESTION_UPVOTES'as BadgeCriteriaType, count: questionUpvotes?.totalUpvotes || 0},
            {type: 'ANSWER_UPVOTES'as BadgeCriteriaType, count: answerUpvotes?.totalUpvotes || 0},
            {type: 'TOTAL_VIEWS'as BadgeCriteriaType, count: questionViews?.totalViews || 0},
        ]
         const badgeCounts= assignBadges({criteria});

        
        return {user,totalQuestions,totalAnswers,badgeCounts,reputation: user.reputation};
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function getUsersQuestions(params:GetUserStatsParams) {
    try {
        connectToDatabase();
        const {userId,page=1,pageSize=10}=params;

        const skipAmount=pageSize*(page-1);

        const totalQuestions=await Question.countDocuments({author:userId})
        const userQuestions=await Question.find({author:userId})
        .sort({createdAt:-1,views:-1, upvotes:-1})
        .populate('tags','_id name')
        .populate('author','_id clerkId name picture')
        .skip(skipAmount)
        .limit(pageSize);
        
        const isNext=totalQuestions> skipAmount+ userQuestions.length;

        return {totalQuestions, questions:userQuestions,isNext};
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function getUsersAnswers(params:GetUserStatsParams) {
    try {
        connectToDatabase();
        const {userId, page=1,pageSize=10}=params;
        const skipAmount=pageSize*(page-1);
        const totalAnswers=await Answer.countDocuments({author:userId})
        
        const userAnswers=await Answer.find({author:userId})
        .sort({ upvotes:-1})
        .populate('question','_id title')
        .populate('author','_id clerkId name picture')
        .skip(skipAmount)
        .limit(pageSize);
        const isNext=totalAnswers> skipAmount+ userAnswers.length;    
        return {totalAnswers, answers:userAnswers,isNext};
    } catch (error) {
        console.log(error);
        throw error;
    }
}



// export async function getAllUsers(params:GetAllUsersParams) {
//     try {
//         connectToDatabase();
        
//     } catch (error) {
//         console.log(error);
//     }
// }