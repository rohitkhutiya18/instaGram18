import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { useLikeOrUnlikePostMutation } from "../services/postApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface prop {
  postActionProp: {
    likes: string;
    comments: string;
    isLiked: boolean;
    postId: string;
    setShowComments:(args:boolean)=>void
  };
}

const PostActions = ({ postActionProp }: prop) => {
  const token = window.sessionStorage.getItem("accessToken");
  const [requestLikeOrUnLike] = useLikeOrUnlikePostMutation();
  const navigate = useNavigate();

  

  const handleLikeOrUnLike = async (postId: string) => {
    try {
      if (!token) {
        toast.warning("login first before like any post");
        navigate("/login");
        return;
      }
      const res = await requestLikeOrUnLike({ postId }).unwrap();
      console.log(res);
    } catch (error) {
      console.log("there is an error int the handleLikeOrUnLike", error);
    }
  };

  return (
    <div>
      {" "}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              handleLikeOrUnLike(postActionProp.postId);
            }}
            className={`flex items-center gap-2 cursor-pointer transition hover:text-red-500 
          ${postActionProp.isLiked ? "text-red-500" : "text-zinc-700"}`}
          >
            <Heart size={22} />
            <span className="font-medium">{postActionProp.likes}</span>
          </button>

          <button 
          onClick={()=>postActionProp.setShowComments(true)}
          className="flex items-center gap-2 cursor-pointer text-zinc-700 transition hover:text-blue-500">
            <MessageCircle size={22} />
            <span className="font-medium">{postActionProp.comments}</span>
          </button>
        </div>

        {/* <button className="text-zinc-700 transition hover:text-amber-500">
          <Bookmark size={22} />
        </button> */}
      </div>
    </div>
  );
};

export default PostActions;
