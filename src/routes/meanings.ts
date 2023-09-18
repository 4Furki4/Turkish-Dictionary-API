import Elysia from "elysia";
import { addMeaning, updateMeaning } from "../handlers/meaning";

const meanings = new Elysia({ prefix: "meanings" })
  .put("/:id", updateMeaning)
  .post("/:wordId", addMeaning);

export default meanings;
