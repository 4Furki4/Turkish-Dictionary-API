import { WordInput, handlerContext } from "../../types";
import { wordSchema } from "../validations/words";
import prisma from "../db";
export function getWords(context: handlerContext) {}

export async function getWord(context: handlerContext) {
  let { name } = context.params as { name: string };
  // make url parameter has utf-8 encoding
  name = decodeURI(name);
  try {
    await prisma.$connect();
    const word = await prisma.word.findMany({
      where: {
        name,
      },
      include: {
        meanings: true,
      },
    });
    if (word.length === 0) {
      context.set.status = 404;
      return { error: "Word not found" };
    }
    context.set.status = 200;
    return { data: word };
  } catch (err) {
    context.set.status = 500;
    return { error: err };
  } finally {
    await prisma.$disconnect();
  }
}

export async function addWord(context: handlerContext) {
  const wordData: WordInput = await context.request.json();
  try {
    wordSchema.parse(wordData);
  } catch (error) {
    context.set.status = 400;
    return { error };
  }
  try {
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
    context.set.status = 500;
    return { error: err };
  } finally {
  }
}

export function updateWord(context: handlerContext) {}

export function deleteWord(context: handlerContext) {}
