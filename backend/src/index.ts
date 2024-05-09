import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


/** 
 * *Bindings is an object that has DATABASE_URL, it basically defines shape of object that Hono will expect to work with.
 */
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_TOKEN: string
	}
}>();

// Signup Page
app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
}).$extends(withAccelerate())

  const body = await c.req.json();

  try{
    const user = await prisma.user.create({
      data:{
        email: body.email,
        password: body.password,
        name: body.name
      }
    })

    const jwt = await sign({id: user.id}, c.env.JWT_TOKEN);

    return c.json({jwt})
  } catch(e){
    return c.status(403)
  }
})

// Signin Page
app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  
  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })

  if(!user){
    c.status(403);
    return c.json({error: "No such user exits!"})
  }

  const jwt = await sign({id:user.id}, c.env.JWT_TOKEN);
  return c.json({jwt})
})

// Blog
app.put('/api/v1/blog', (c) => {
  return c.text('Blog Article!')
})

// Get Blog Article
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Sahil Adhav!')
})

// Blog bulk
app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Blog List!')
})

export default app
