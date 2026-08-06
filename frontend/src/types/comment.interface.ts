import type { userProfileInterface } from "./user.interface";

export interface childCommentType{
    id:string,
    comment:string,
    createdAt:string,
    parentComment?:string;
    user:userProfileInterface 
     childComments:childCommentType[]
}

export interface commentInterface{
    id:string,
    comment:string,
    createdAt:string,
    parentComment?:string;
    user:userProfileInterface
    childComments:childCommentType[]
}
