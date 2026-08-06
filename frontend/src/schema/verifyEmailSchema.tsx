import {z }from "zod";

export const verifyEmailSchema = z.object({
        email:z.string().email().min(1, "email is required"),
        otp:z.string().trim().min(4,'otp i required').optional()
})

export type verifyEmailFromType = z.infer<typeof verifyEmailSchema>