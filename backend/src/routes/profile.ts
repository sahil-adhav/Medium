import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const profileRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
  Variables: {
    userId: string;
  };
}>();

profileRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization") || "";

  try {
    const user = await verify(jwt, c.env.JWT_TOKEN);

    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "Please log in to view blogs!" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "Please log in to view blogs!" });
  }
});

profileRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const jwt = c.req.header("Authorization") || "";
  const user = await verify(jwt, c.env.JWT_TOKEN);
  const blogs = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      username: true,
      posts: {
        select: {
          id: true,
          title: true,
          topic: true,
          content: true,
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  return c.json({ blogs });
});

profileRouter.delete("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const jwt = c.req.header("Authorization") || "";
  const user = await verify(jwt, c.env.JWT_TOKEN);
  const body = await c.req.json();

  const blogs = await prisma.blog.delete({
    where: {
      id: body.id,
    },
  });

  return c.json({ blogs });
});
