import CommentHeader from "./component/CommentHeader";
import Comments from "./component/Comments";
import CommentInputs from "./component/CommentInputs";
import { useState } from "react";
interface props {
  isOpen: boolean;
  onClose: () => void;
  post: string;
}
const CommentModal = ({ isOpen, onClose, post }: props) => {
  const [replyTo, setReplyTo] = useState<string | null>(null);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
    bg-black/30 backdrop-blur-sm"
    >
      <div
        className="
      w-[430px] rounded-3xl border border-white/30
      bg-gradient-to-b from-[#f6d1d0] via-[#eab0ae] to-[#d78985]
      shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      backdrop-blur-xl p-6
      "
      >
        {/* Header */}
        <CommentHeader onClose={onClose} />

        {/* Comments */}
        <Comments replyTo={replyTo} setReplyTo={setReplyTo} postId={post} />

        {/* Input */}
        <CommentInputs replyTo={replyTo} setReplyTo={setReplyTo} post={post} />
      </div>
    </div>
  );
};

export default CommentModal;
