import z from "zod";

export const updatePostSchema = z.object({
    caption:z.string().min(5,'caption should be 5 char long').max(113,'caption should be 113 char long')
})

export type updatePostSchemaType = z.infer<typeof updatePostSchema>