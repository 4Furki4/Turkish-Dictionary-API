import Elysia from "elysia";
import {
  addMeaning,
  deleteMeaning,
  deleteMeanings,
  updateMeaning,
} from "../handlers/meaning";

const meanings = new Elysia({ prefix: "meanings" })
  .put("/:id", updateMeaning)
  .post("/:wordId", addMeaning)
  .delete("/:id", deleteMeaning)
  .delete("/", deleteMeanings);

export default meanings;
