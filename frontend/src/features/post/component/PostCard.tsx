import { useNavigate } from "react-router-dom";
import Label from "../../../component/ui/label/Label";
import type { scrollFeedInterface } from "../../../types/Scroll.Feed.Interface";
import PostActions from "./PostActions";
import PostCardCaption from "./PostCardCaption";
import PostCardHeader from "./PostCardHeader";
import { useDeletePostMutation } from "../services/postApi";
import { toast } from "react-toastify";
import { useState } from "react";
import CommentModal from "../../comment/CommentModal";
import { handleDate } from "../../../customFunction/handleData";

interface prop {
  postCardProp:scrollFeedInterface
}

const PostCard = ({postCardProp}:prop) => {
const navigate = useNavigate()
const [requestDeletePost] = useDeletePostMutation()

 const [showComments, setShowComments] = useState(false);

const updatePost = ()=>{
  const data = {
    postCaption:postCardProp.post_caption,
     postImages:postCardProp.post_images,
    postId:postCardProp.post_id }
    navigate(`/update-post/${postCardProp.post_id}`,{state:{data}})
    return;
 }

 const deletePost = async ()=>{
    try {
       await requestDeletePost({id:postCardProp.post_id}).unwrap()

      toast.success("post delete success");
    } catch (error) {
      console.log("there is an error deletepost function in the postCart component",error)
    }
 }

  const postActionProp = {
    likes:postCardProp.likes,
    comments:postCardProp.comments,
    isLiked:postCardProp?.isLiked || false,
    postId:postCardProp.post_id,
    setShowComments:setShowComments
  }

  const postCardCaptionProp = {
    caption : postCardProp.post_caption,
    userName:postCardProp.user_userName
  }

  const postCardHeaderProp = {
    userName:postCardProp.user_userName,
    isFollowed:postCardProp?.isFollowing || false ,
    postCreaterId : postCardProp.user_id,
    user_profilePic:postCardProp?.user_profilePic || {url:"",publicId:""},
    updatePost:updatePost,
    deletePost:deletePost,
  }

//   const handleDate = (date: string) => {
//   const createdTime = new Date(date).getTime();
//   const currentTime = Date.now();

//   const diff = Math.floor((currentTime - createdTime) / 1000); // seconds

//   if (diff < 60) {
//     return `${diff}sec ago`;
//   }

//   if (diff < 3600) {
//     return `${Math.floor(diff / 60)}min ago`;
//   }

//   if (diff < 86400) {
//     return `${Math.floor(diff / 3600)}h ago`;
//   }

//   if (diff < 604800) {
//     return `${Math.floor(diff / 86400)}d ago`;
//   }

//   return new Date(date).toLocaleDateString();
// };


 

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-xl">
      {/* Header */}
  <PostCardHeader postCardHeaderProp={postCardHeaderProp}/>

      {/* Post Image */}
      <img
        src={postCardProp.post_images?.[0]?.url || ""}
        alt="post"
        className="h-auto w-full object-cover"
      />

      {/* Actions */}
    <PostActions postActionProp={postActionProp}/>

      {/* Caption */}
     <PostCardCaption postCardCaptionProp={postCardCaptionProp}/>

     <Label
     children={handleDate(postCardProp.post_createdAt)}
     className="ml-4 text-xs"
     />

        <CommentModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        post={postCardProp.post_id}
      />

    </article>
  );
};

export default PostCard;