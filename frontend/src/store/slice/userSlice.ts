import { createSlice } from "@reduxjs/toolkit";
import type {  userProfileInterface } from "../../types/user.interface";

const initialState: userProfileInterface = {
   userName:"",
      email:"",
      profilePic: {url:"",public_id:""},
      userId:"",
      bio:"",
      postCount:"",
      followerCount:"",
      followingCount:"",
      createdAt:"",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.email = action.payload.email,
        state.userName = action.payload.name,
        state.profilePic = action.payload.url,
       state.userId = action.payload.id

      const userData = {
        name: state.userName,
        email: state.email,
        profileImageUrl: state.profilePic?.url,
        userId:state.userId
      };

      window.localStorage.setItem("userData", JSON.stringify(userData));
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
