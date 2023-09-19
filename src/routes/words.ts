import Elysia from "elysia";
import {
  getWords,
  getWord,
  addWord,
  updateWord,
  deleteWord,
} from "../handlers/words";

const words = new Elysia({ prefix: "words" })
  .get("/", getWords)
  .get("/:name", getWord)
  .post("/", addWord)
  .put("/:id", updateWord)
  .delete("/:id", deleteWord);

export default words;
