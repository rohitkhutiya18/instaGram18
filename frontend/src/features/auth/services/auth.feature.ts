import { baseApi } from "../../../services/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getOTP: builder.mutation({
      query: (email) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: email,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/user/create",
        method: "POST",
        body: formData,
      }),
    }),
    loginUser : builder.mutation({
      query:(data)=>({
        url:"/auth/login",
        method:"POST",
        body:data
      })
    })
  }),
});

export const {
  useRegisterUserMutation,
  useGetOTPMutation,
  useVerifyOTPMutation,
  useLoginUserMutation
} = authApi;
