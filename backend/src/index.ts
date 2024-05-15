import { Hono } from "hono";
import { cors } from "hono/cors";
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";
import { profileRouter } from "./routes/profile";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

/**
 * *Bindings is an object that has DATABASE_URL, it basically defines shape of object that Hono will expect to work with.
 */
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
}>();

app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/profile", profileRouter);

export default app;
