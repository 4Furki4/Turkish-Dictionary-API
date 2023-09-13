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
  .put("/:name", updateWord)
  .delete("/:name", deleteWord);

export default words;
