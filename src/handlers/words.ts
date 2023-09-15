import { WordInput, handlerContext } from "../../types";
import { wordSchema } from "../validations/words";
import prisma from "../db";
export function getWords(context: handlerContext) {}

export function getWord(context: handlerContext) {}

export async function addWord(context: handlerContext) {
  const wordData: WordInput = await context.request.json();
  try {
    wordSchema.parse(wordData);
    await prisma.$connect();
    const createdWord = await prisma.word.create({
      data: {
        ...wordData,
        meanings: {
          createMany: {
            data: wordData.meanings,
          },
        },
      },
    });
    context.set.status = 201;
    return { data: createdWord };
  } catch (err) {
    context.set.status = 400;
    return { error: err };
  } finally {
    await prisma.$disconnect();
  }
}

export function updateWord(context: handlerContext) {}

export function deleteWord(context: handlerContext) {}
