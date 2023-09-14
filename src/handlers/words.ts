import { WordInput, handlerContext } from "../../types";
import prisma from "../db";
import { wordSchema } from "../validations/words";
export function getWords(context: handlerContext) {}

export function getWord(context: handlerContext) {}

export async function addWord(context: handlerContext) {
  const data: WordInput = await context.request.json();
  data.meanings.forEach((meaning) => {});
  try {
    const validatedBody = wordSchema.parse(data);
  } catch (err) {
    // console.log(err);
    context.set.status = 400;
    return { error: err };
  }
  context.set.status = 201;
  return { data: "word created" };
}

export function updateWord(context: handlerContext) {}

export function deleteWord(context: handlerContext) {}
