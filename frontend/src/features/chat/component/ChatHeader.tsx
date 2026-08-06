import { ArrowLeft } from "lucide-react";

interface Props {
  user: any;
  onBack: () => void;
}

const ChatHeader = ({ user, onBack }: Props) => {

  return (
    <div className="flex items-center gap-3 p-4 border-b bg-white/40">

      <button
        onClick={onBack}
        className="md:hidden p-2 rounded-full hover:bg-white"
      >
        <ArrowLeft size={20} />
      </button>

      <div
        className="
        h-10
        w-10
        rounded-full
        bg-pink-300
        flex
        items-center
        justify-center
        "
      >
        {user?.userName?.[0] || "U"}
      </div>

      <div>
        <h2 className="font-semibold">{user.userName}</h2>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;