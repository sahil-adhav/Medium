import z from "zod";

// Signup
export const signupInput = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
  name: z.string().min(2),
});

// Signin

export const signinInput = z.object({
  username: z.string(),
  password: z.string(),
});

// Blog

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
