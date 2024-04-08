'use server'

import User from "@/database/models/User";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/models/Tag";



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


// export async function getAllUsers(params:GetAllUsersParams) {
//     try {
//         connectToDatabase();
        
//     } catch (error) {
//         console.log(error);
//     }
// }