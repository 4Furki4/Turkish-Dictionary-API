import { MeaningInput, handlerContext } from "../../types";
import prisma from "../db";
import { meaningSchema } from "../validations/meaning";

export async function addMeaning(context: handlerContext) {
  const meaningData: MeaningInput = await context.request.json();
  const { wordId } = context.params as { wordId: string };
  try {
    await meaningSchema.parse(meaningData);
  } catch (error) {
    context.set.status = 400;
    return { error };
  }
  try {
    const createdMeaning = await prisma.meaning.create({
      data: {
        ...meaningData,
        wordId,
      },
    });
    context.set.status = 201;
    return { data: createdMeaning };
  } catch (error) {
    context.set.status = 500;
    return { error };
  }
}

export async function updateMeaning(context: handlerContext) {
  const { id } = context.params as { id: string };
  const meaning: MeaningInput = await context.request.json();

  try {
    const updatedMeaning = await prisma.meaning.update({
      where: {
        id,
      },
      data: {
        ...meaning,
      },
    });
    context.set.status = 200;
    return { data: updatedMeaning };
  } catch (err) {
    context.set.status = 500;
    return { error: err };
  }
}
