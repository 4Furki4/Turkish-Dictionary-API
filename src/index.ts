import { Elysia } from "elysia";
import words from "./routes/words";
import meanings from "./routes/meanings";

const app = new Elysia();

app.get("/", (context) => {
  return {
    message: "Hello World!",
  };
});
app.group("/api", (app) => app.use(words).use(meanings));

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
