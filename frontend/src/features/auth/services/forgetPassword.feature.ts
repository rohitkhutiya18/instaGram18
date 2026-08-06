import { baseApi } from "../../../services/baseApi";

const forgetPassword = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getForgetOTP : builder.query({
            query:(email)=>({
                url:"/forget-password/send-otp-forget-password",
                method:"GET",
                params:{email}
            })
        }),
        verifyOTPForgetPassword : builder.mutation({
            query:(data)=>({
                url:"/forget-password/verify-email-forget-password",
                method:"POST",
                body:{email:data.email,otp:data.otp}
            })
        }),
        resetPassword : builder.mutation({
            query:(data)=>({
                url:"/forget-password/reset-password",
                method:"POST",
                body:{email:data.email,password:data.password,token:data.token}
            })
        })
    })
})

export const {
    useLazyGetForgetOTPQuery,
    useVerifyOTPForgetPasswordMutation,
    useResetPasswordMutation
} = forgetPassword