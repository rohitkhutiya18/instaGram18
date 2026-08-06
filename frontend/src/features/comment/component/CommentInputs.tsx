import { useForm } from "react-hook-form";
import type { commentSchemaType } from "../../../schema/createCommentSchema";
import { useCreateCommentMutation } from "../services/commentApi";

interface props {
  post: string;
  replyTo: string | null;
  setReplyTo: (args: string) => void;
}

const CommentInputs = ({ post, replyTo }: props) => {
  const { register, handleSubmit } = useForm<commentSchemaType>();
  const [requestingComment] = useCreateCommentMutation();

  const onSubmit = async (formData: commentSchemaType) => {
    try {
      let data = {
        postId: post,
        comment: formData.comment,
      };
      if (replyTo && replyTo?.length > 0) {
        data = Object.assign(data, { parentComment: replyTo });
      }

      const res = await requestingComment(data).unwrap();
      console.log(res);
    } catch (error) {
      console.log("there is an error in the comment input component", error);
    }
  };

  return (
    <div>
      {" "}
      <div className="mt-5">
        {replyTo && (
          <p className="text-xs text-[#654846] mb-2">Replying to comment...</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <input
            {...register("comment")}
            placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
            className="flex-1 rounded-2xl bg-white/50 px-4 py-3 outline-none text-[#4f4444]
             placeholder:text-[#927775]"
          />

          <button className="rounded-2xl px-5 bg-[#aa625e] text-white font-semibold hover:bg-[#92514e]">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentInputs;
