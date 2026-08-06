import z from "zod";

export const updateUserSchema = z.object({
    bio:z.string(),
    name:z.string(),
    email:z.email()
})

export type updateUserSchemaInterface = z.infer<typeof updateUserSchema>;