import { MeaningInput, WordInput, handlerContext } from "../../types";
import { wordSchema } from "../validations/words";
import prisma from "../db";

export async function getWords(context: handlerContext) {
  type QueryStrings = "take" | "skip";
  const { take, skip } = context.query as Record<
    QueryStrings,
    string | undefined
  >;
  const parsedTake = parseInt(take ?? "5");
  const parsedSkip = parseInt(skip ?? "0");
  try {
    const words = await prisma.word.findMany({
      include: {
        meanings: true,
      },
      skip: isNaN(parsedSkip) ? 0 : parsedSkip,
      take: isNaN(parsedTake) ? 5 : parsedTake,
    });
    context.set.status = 200;
    return words;
  } catch (err) {
    console.log(err);
    context.set.status = 500;
    return { error: err };
  }
}

export async function getWord(context: handlerContext) {
  const { name } = context.params as { name: string };
  const parsedName = decodeURI(name);
  try {
    const word = await prisma.word.findMany({
      where: {
        name: parsedName,
      },
      include: {
        meanings: true,
      },
    });
    if (word.length === 0) {
      context.set.status = 404;
      return { message: "Word not found" };
    }
    context.set.status = 200;
    return { data: word };
  } catch (err) {
    context.set.status = 500;
    return { error: err };
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

export async function updateWord(context: handlerContext) {
  const { id } = context.params as { id: string };
  const wordData: WordInput = await context.request.json();
  try {
    await wordSchema.parse(wordData);
  } catch (err) {
    context.set.status = 400;
    return { error: err };
  }
  try {
    const word = await prisma.word.update({
      where: {
        id,
      },
      data: {
        ...wordData,
        meanings: {
          createMany: {
            data: wordData.meanings,
          },
        },
      },
      include: {
        meanings: true,
      },
    });
    context.set.status = 200;
    return { data: word };
  } catch (err) {
    context.set.status = 500;
    return { error: err };
  }
}

export async function deleteWord(context: handlerContext) {
  const { id } = context.params as { id: string };
  try {
    await prisma.word.delete({
      where: {
        id,
      },
    });
    context.set.status = 200;
    return;
  } catch (err) {
    context.set.status = 500;
    return { error: err };
  }
}
