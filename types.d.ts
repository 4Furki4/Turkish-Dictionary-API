import { Context } from "elysia";

export type handlerContext = Context<
  {
    body: unknown;
    params: Record<never, string>;
    query: undefined;
    headers: undefined;
    response: unknown;
  },
  {}
>;
