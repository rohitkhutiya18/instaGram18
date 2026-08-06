import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        userProfile : builder.query({
            query:()=>({
                url:"/user/profile",
                method:"GET",
            }),
            providesTags:['user']
        }),
        deleteProfilePic:builder.mutation({
            query:(public_id)=>({
               method:"DELETE",
               url:"delete-profile-pic",
               body:public_id
            }),
            invalidatesTags:['user']
        }),
        updateUserData:builder.mutation({
            query:(updatedData)=>({
                url:'/user/update-user-profile',
            method:"PATCH",
            body:updatedData
        }),
        invalidatesTags:['user']
        }),
      
        updateProfilePic:builder.mutation({
            query:(formData)=>({
                url:'user/update-profile-pic',
                method:"PATCH",
                body:formData
            })
        }),
        createrProifle:builder.query({
            query:({userId})=>({
                url:"/user/creater-profile",
                method:"GET",
                params:{userId}
            })
        }),
        chatList:builder.query({
            query:(reciverId)=>({
                url:"/user/chat-list",
                method:"GET",
                body:{reciverId}
            })
        })
        
    })
})

export const {
    useUserProfileQuery,
    useDeleteProfilePicMutation,
    useUpdateProfilePicMutation,
    useUpdateUserDataMutation,
    useCreaterProifleQuery,
    useLazyChatListQuery
} = userApi