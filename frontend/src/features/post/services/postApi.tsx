import { baseApi } from "../../../services/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints:(builder)=>({
    fetchPostsWithOutLogin : builder.query({
        query:()=>({
            url:"/post/without-login",
            method:"GET",
        }),
        providesTags:['posts','comments']
    }),
    fetchPostWithLogin:builder.query({
        query:()=>({
            url:'/post/scroll',
            method:"GET",
        }),
        providesTags:['posts','follow','likes','comments'],
    }),
    likeOrUnlikePost : builder.mutation({
        query:(postId)=>({
            url:"/like",
            method:"POST",
            body:postId
        }),
        invalidatesTags:['likes']
    }),
    createPost:builder.mutation({
        query:(formData)=>({
            url:"/post/create",
            method:'POST',
            body:formData
        })
    }),
    removePostImages : builder.mutation({
        query:({imageId,postId})=>({
            url:'/post/remove-post-img',
            method:"DELETE",
            body:{imageId,postId}
        }),
        invalidatesTags:['posts']
    }),
    updatePost:builder.mutation({
        query:(formData)=>({
            url:"/post/update-post",
            method:"PATCH",
            body:formData
        }),
        invalidatesTags:['posts']
    }),
    deletePost:builder.mutation({
        query:(id)=>({
            url:"/post/delete-post",
            method:"DELETE",
            body:id
        }),
        invalidatesTags:['posts']
    }),
  })
}) 

export const {useFetchPostWithLoginQuery,
    useFetchPostsWithOutLoginQuery,
    useLikeOrUnlikePostMutation,
useCreatePostMutation,
useRemovePostImagesMutation,
useUpdatePostMutation,
useDeletePostMutation} = postApi