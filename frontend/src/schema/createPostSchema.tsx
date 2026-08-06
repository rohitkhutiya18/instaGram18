import {z} from 'zod';

export const createPostSchema = z.object({
        caption : z.string().min(5,'caption should be min 5char').max(113,'caption cant be more than 113')
})

export type createPostSchemaType = z.infer<typeof createPostSchema>