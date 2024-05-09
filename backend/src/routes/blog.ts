import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

/**
 * *Bindings is an object that has DATABASE_URL, it basically defines shape of object that Hono will expect to work with.
 */
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middlewear
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization");
  const jwt = token?.split(" ")[1] || "";
  const user = await verify(jwt, c.env.JWT_TOKEN);

  if (user) {
    c.set("userId", user.id);
    next();
  } else {
    c.status(403);
    return c.json({ error: "Please log in to view blogs!" });
  }

  await next();
});

// Blog
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("userId");
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({ id: blog.id });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ content: blog });
});

// Get Blog Article
blogRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const blog = await prisma.blog.findFirst({
      where: {
        id: body.id,
      },
    });
    return c.json({ content: blog });
  } catch (e) {
    c.status(404);
    return c.json({ error: "No such blog exists with this id!" });
  }
});

// Blog bulk
/**
 * !TODO: Add Pagination here
 */
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany();
  return c.json({ blogs });
});
