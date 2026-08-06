import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import ChatComponent from "./component/ChatComponent";
import UserList from "./component/UserList";
import {
  type chatInterface,
  type conversactionInterface,
  type userOnUserListInterface,
} from "../../types/chat.interface";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [selectedUser, setSelectedUser] =
    useState<userOnUserListInterface | null>();
  const location = useLocation();
  const targetUser = location.state?.user;

  const [chatHistory, setChatHistory] = useState<chatInterface[]>([]);
  const [userList, setUserList] = useState<conversactionInterface[]>([]);

  const connectUser = async () => {
    try {
      if (!socket.connected) {
        socket.connect();
      }

      socket.emit("register");
      // setSelectedUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectUser();
  }, []);

  useEffect(() => {
    socket.on("conversaction-list", (payload) => {
      setUserList(payload);
    });

    return () => {
      socket.off("conversaction-list");
    };
  }, []);

  useEffect(() => {
    const conversaction = userList.find(
      (val) => val.user.id === selectedUser?.id,
    );

    if (!conversaction) {
      return;
    }

    setChatHistory(conversaction.chat);
  }, [selectedUser, userList]);

  useEffect(() => {
    if (!targetUser || userList.length === 0) {
      return;
    }

    const conversacton = userList.find((val) => {
      return val.user.id === targetUser.id;
    });

    if (conversacton) {
      setChatHistory(conversacton.chat);
      setSelectedUser(conversacton.user);
    } else {
      setSelectedUser(targetUser);
      setChatHistory([])
    }
  }, [targetUser, userList]);

  useEffect(()=>{
    setChatHistory([]);
    setSelectedUser(targetUser)
  },[targetUser])

  return (
    <div
      className="h-[calc(100vh-6rem)] rounded-3xl overflow-hidden border
       border-white/30 bg-gradient-to-br from-[#fff8f8] via-[#f8e8ec] to-[#efd2d9]
        shadow-xl flex"
    >
      {/* Mobile Friend List */}
      <div
        className={`
          w-full
          md:w-80
          md:block
          ${selectedUser ? "hidden" : "block"}
        `}
      >
        <UserList
          userList={userList}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      {/* Chat */}
      <div
        className={`
          flex-1
          ${selectedUser ? "block" : "hidden"}
          md:block
        `}
      >
        <ChatComponent
          setChatHistory={setChatHistory}
          chatHistory={chatHistory}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
    </div>
  );
};

export default Chat;
