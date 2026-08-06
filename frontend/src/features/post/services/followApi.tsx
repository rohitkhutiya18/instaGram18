import { baseApi } from "../../../services/baseApi";

const followApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        followUser : builder.mutation({
             query:(id)=>({
                url:"/follow/follow-user",
                method:"POST",
                body:id
             }),
             invalidatesTags:['follow']
        }),
        unFollowUser : builder.mutation({
             query:(id)=>({
                url:"/follow/unfollow-user",
                method:"POST",
                body:id
             }),
             invalidatesTags:['follow']
        }),
        friendsList:builder.query({
            query:()=>({
                url:'/follow/get-friends-list',
                method:"GET",
            })
        })
    })
})


export const {useFollowUserMutation,
    useUnFollowUserMutation,
useFriendsListQuery} = followApi