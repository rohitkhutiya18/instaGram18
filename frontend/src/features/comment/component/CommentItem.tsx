import type { commentInterface } from "../../../types/comment.interface";

interface CommentItemProps {
  comment: commentInterface;
  setReplyTo: (id: string) => void;
}

const CommentItem = ({ comment, setReplyTo }: CommentItemProps) => {
  return (
    <div className="bg-white/40 rounded-xl p-3">
      <h4 className="font-semibold">{comment.user.userName}</h4>
      <p>{comment.comment}</p>

      <button
        className="text-xs text-blue-600 mt-2"
        onClick={() => setReplyTo(comment.id)}
      >
        Reply
      </button>

      {comment.childComments?.length > 0 && (
        <div className="ml-6 mt-3 space-y-2 border-l pl-3">
          {comment.childComments.map(child => (
            <CommentItem
              key={child.id}
              comment={child}
              setReplyTo={setReplyTo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem