import { MeaningInput, handlerContext } from "../../types";
import prisma from "../db";

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
