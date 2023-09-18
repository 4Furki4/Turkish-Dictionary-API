import Elysia from "elysia";
import { updateMeaning } from "../handlers/meaning";

const meanings = new Elysia({ prefix: "meanings" }).put("/:id", updateMeaning);

export default meanings;
