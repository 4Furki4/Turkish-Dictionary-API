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

export async function deleteMeaning(context: handlerContext) {
  const { id } = context.params as { id: string };
  try {
    const response = await prisma.meaning.delete({
      where: {
        id,
      },
    });
    context.set.status = 200;
    return response;
  } catch (err: any) {
    if (err.code === "P2025") {
      context.set.status = 404;
      return { error: "Meaning not found" };
    }
    context.set.status = 500;
    return { error: err };
  }
}

export async function deleteMeanings(context: handlerContext) {
  const ids: string[] = await context.request.json();
  try {
    const deletedMeaningCount = await prisma.meaning.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    if (deletedMeaningCount.count === 0) {
      context.set.status = 404;
      return { message: "Nothing to delete" };
    }
    context.set.status = 200;
    return deletedMeaningCount;
  } catch (err) {
    context.set.status = 500;
    return { error: err };
  }
}
