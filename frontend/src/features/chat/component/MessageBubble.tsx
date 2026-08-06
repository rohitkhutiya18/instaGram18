import { useEffect } from "react";
import { socket } from "../../../socket/socket";
import type { chatInterface } from "../../../types/chat.interface";


interface props {
  chatHistory : chatInterface[] ;
  setChatHistory:(args:any)=>void
}

const MessageBubble = ({chatHistory,setChatHistory}:props) => {

  const myId = JSON.parse(window.localStorage.getItem('userData') || '{}')

  useEffect(() => {
   
    socket.on('newMessage',(payload)=>{
      console.log(payload.sender)
        console.log(myId)
      setChatHistory((prev:chatInterface[])=>[...(prev ?? []),payload])

    })
    return () => {
      socket.off("newMessage");
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6 bg-[#fff7f6]/40 space-y-5">
      {chatHistory && chatHistory.map((msg) => (
       <div
    key={msg.id}
    className={`flex ${
      msg?.sender === myId.userId
        ? "justify-end"
        : "justify-start"
    }`
  }
  >
    <div
      className={`max-w-md rounded-3xl px-5 py-3 ${
        msg?.sender === myId.userId
        ? "bg-gradient-to-r from-[#f3b8b4] to-[#f9d8d6]"
        : "bg-white"
      }`}
    >
      {msg.message}
    </div>
  </div>
        
      ))}
    </div>
  );
};

export default MessageBubble;