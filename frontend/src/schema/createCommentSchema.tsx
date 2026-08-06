import z from "zod";

export const commentSchema = z.object({
    comment:z.string().min(1).max(113)
})

export type commentSchemaType = z.infer<typeof commentSchema>