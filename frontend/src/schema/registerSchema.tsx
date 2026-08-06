import {z} from 'zod'

export const  registerSchema = z.object({
    userName:z.string().trim().min(1,'userName is required'),
    email:z.string().email('enter vaild email').min(1,'email is required'),
    bio:z.string().max(113,'you can write maximum 113 words in bio').min(5,'atleast 5 words are required for bio'),
    password:z.string().min(5,'five char are required to create password').max(8,'maximun 8 char password you can generate')
})

export type registerFormType = z.infer<typeof registerSchema>;