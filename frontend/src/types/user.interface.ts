import type { postImages } from "./Scroll.Feed.Interface";

export interface userInterface {
  name: string;
  email: string;
  profileImageUrl: string;
  userId: string;
}

export interface userProfileImageInterface {
  url: string;
  publicId: string;
}


export interface userProfilePostInterface {
  caption: string;
  comments: string;
  createdAt: string;
  id: string;
  images: postImages[];
  likes: string;
  updatedAt: string;
  userId: string;
}

export interface userProfileInterface {
  id?:string;
  userName: string;
  email: string;
  profilePic: userProfileImageInterface | null;
  userId: string;
  bio: string;
  postCount: string;
  followerCount: string;
  followingCount: string;
  createdAt: string;
  userPostData:userProfilePostInterface[]
}

