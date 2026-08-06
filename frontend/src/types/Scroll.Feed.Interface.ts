export interface postImages{
    url:string,
    publicId:string
}

export interface userProfilePic{
    url:string,
    publicId:string
}

export interface scrollFeedInterface{
comments: string;
followers: string;
followings: string;
likes: string;
post_caption: string;
post_id: string;
post_images:postImages[];
user_email: string;
user_userName: string;
user_id:string
post_createdAt:string;
isLiked?:boolean;
isFollowing?:boolean;
user_profilePic?:userProfilePic
}