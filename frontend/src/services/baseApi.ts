import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3000",
        credentials:'include',
        
        prepareHeaders:(headers)=>{
            const token = window.sessionStorage.getItem("accessToken")
            if(token){
              headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes:['posts','follow','likes',"user",'comments'],
    endpoints:()=>({})
}) 
