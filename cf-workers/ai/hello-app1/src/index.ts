import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/message", (c) => {
  return c.text("Hello Hono!");
});

app.get("/hello-ai", async(c) => {
  const results = await c.env.AI.run("@cf/meta/llama-3.1-8b-instruct-awq", {
    messages: [
      {"role": "user","content":"Say Hello world in 5 different languages"}
    ]
  })
  return c.json(results)
});


export default app;
