export interface userOnUserListInterface {
  profilePic: { url: string; public_id: string };
  userName: string;
  email: string;
  id: string;
  
}

export interface chatInterface {
  createdAt: string;
  id: string;
  message: string;
  sender:{id:string}
  conversactionId:string;
}

export interface conversactionInterface {
  id: string;
  user: userOnUserListInterface;
  chat: chatInterface[];
  lastMessage:string
}
