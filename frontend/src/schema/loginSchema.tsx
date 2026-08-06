import {z} from 'zod';
export const loginFormSchema = z.object({
    email:z.string().email().min(1,'email is required'),
    password:z.string().min(5,'password cant be less than 5 character').max(8,'password cant be less than 8 character')
})

export type loginFormType = z.infer<typeof loginFormSchema> 