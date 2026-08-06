import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import userSlice from './slice/userSlice'
export const store = configureStore({
    reducer:{
        userReducer:userSlice,
        [baseApi.reducerPath] : baseApi.reducer
    },
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(baseApi.middleware)
     
})