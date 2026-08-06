import type { chatInterface } from "../../../types/chat.interface";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import SendMessageInput from "./SendMessageInput";

interface Props {
  chatHistory:chatInterface[] ;
  setChatHistory:(args:any)=>void
  selectedUser: any;
  setSelectedUser: (user: any) => void;
}

const ChatComponent = ({
  selectedUser,
  setSelectedUser,
  chatHistory,
  setChatHistory
}: Props) => {
  if (!selectedUser) return null;

  return (
    <div className="flex flex-col h-full">

      <ChatHeader
        user={selectedUser}
        onBack={() => setSelectedUser(null)}
      />

      <div className="flex-1 overflow-hidden">
        <MessageBubble 
        setChatHistory={setChatHistory}
        chatHistory={chatHistory}
        />
      </div>

      <SendMessageInput 
      setChatHistory={setChatHistory}
      user={selectedUser} />
    </div>
  );
};

export default ChatComponent;