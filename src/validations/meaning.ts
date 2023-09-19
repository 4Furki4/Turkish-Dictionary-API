import { z } from "zod";

export const meaningSchema = z.object({
  attributes: z
    .array(
      z.string({
        invalid_type_error: "Attributes must be an array of strings",
      })
    )
    .optional(),
  partOfSpeech: z.enum(
    [
      "noun",
      "verb",
      "adjective",
      "adverb",
      "preposition",
      "conjunction",
      "interjection",
    ],
    {
      invalid_type_error:
        "Part of speech must be a noun, verb, adjective, adverb, preposition, conjunction, or interjection",
      required_error: "Part of speech is required",
    }
  ),
  definition: z.object({
    definition: z.string({
      required_error: "Definition is required",
      invalid_type_error: "Definition must be a string",
    }),
    example: z
      .object({
        sentence: z.string({
          invalid_type_error: "Example sentence must be a string",
        }),
        author: z
          .string({
            invalid_type_error: "Example author must be a string",
          })
          .optional(),
      })
      .optional(),
  }),
});
