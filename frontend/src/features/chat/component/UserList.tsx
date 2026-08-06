import { handleDate } from "../../../customFunction/handleData";
import type {
  conversactionInterface,
  userOnUserListInterface,
} from "../../../types/chat.interface";

interface Props {
  selectedUser: userOnUserListInterface | any;
  setSelectedUser: (user: any) => void;
  userList: conversactionInterface[];
}

const UserList = ({ selectedUser, setSelectedUser, userList }: Props) => {
  return (
    <div className="w-80 border-r border-white/30 bg-white/20">
      {/* Search */}
      <div className="p-5">
        <input
          placeholder="Search..."
          className="w-full rounded-2xl
            bg-white/60
            px-4 py-3
            outline-none
            placeholder:text-[#8a7775]"
        />
      </div>

      <div className="space-y-2 px-3 pb-3 overflow-y-auto h-full">
        {userList.length > 0 ? (
          userList.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedUser(item.user)}
              className="cursor-pointer flex items-center gap-3 rounded-2xl p-3 hover:bg-white/60 transition"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#f9d8d6] to-[#f3b8b4] flex items-center justify-center overflow-hidden font-semibold text-lg text-white">
                {item.user?.profilePic?.url ? (
                  <img
                    src={item.user.profilePic.url}
                    alt={item.user?.userName || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    {item.user?.userName?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-[#4f4444]">
                  {item.user?.userName}
                </h2>

                <p className="text-sm text-[#7c6d6b] truncate">
                  {handleDate(item.lastMessage)} 
                </p>
              </div>
            </div>
          )) // for single user
        ) : (
          <div
            key={selectedUser?.id}
            onClick={() => setSelectedUser(selectedUser)}
            className="cursor-pointer flex items-center gap-3 rounded-2xl p-3 hover:bg-white/60 transition"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#f9d8d6] to-[#f3b8b4] flex items-center justify-center overflow-hidden font-semibold text-lg text-white">
              {selectedUser && selectedUser?.profilePic?.url ? (
                <img
                  src={selectedUser && selectedUser?.profilePic.url}
                  alt={(selectedUser && selectedUser?.userName) || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>
                  {(selectedUser &&
                    selectedUser?.userName?.charAt(0)?.toUpperCase()) ||
                    "U"}
                </span>
              )}
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-[#4f4444]">
                {selectedUser && selectedUser?.userName}
              </h2>

              {/* <p className="text-sm text-[#7c6d6b] truncate">
                {handleDate(selectedUser?.lastMessage)} ago
              </p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
