import { baseApi } from "../../../services/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
       getComment: builder.query({
      query: (postId:string) => ({
        url: "/comment/get-comment",
        method: "GET",
        params: {postId},
      }),
      providesTags:['comments']
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: "/comment/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    })
  }),
});

export const { useCreateCommentMutation, useGetCommentQuery } = commentApi;
