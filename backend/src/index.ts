import { Hono } from 'hono'

const app = new Hono()

// Signup Page
app.post('/api/v1/user/signup', (c) => {
  return c.text('Signup Page!')
})

// Signin Page
app.post('/api/v1/user/signin', (c) => {
  return c.text('Signin Page!')
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
