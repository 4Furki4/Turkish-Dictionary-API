import { z } from "zod";
import { meaningSchema } from "./meaning";
export const wordSchema = z.object({
  name: z.string({
    required_error: "Word name is required",
    invalid_type_error: "Word name must be a string",
  }),
  meanings: z.array(meaningSchema),
  attributes: z
    .array(
      z.string({
        invalid_type_error: "Attributes must be an array of strings",
      })
    )
    .optional(),
  relatedWords: z
    .array(
      z.string({
        invalid_type_error: "Related words must be an array of strings",
      })
    )
    .optional(),
  relatedPhrases: z
    .array(
      z.string({
        invalid_type_error: "Related phrases must be an array of strings",
      })
    )
    .optional(),
  root: z
    .string({
      invalid_type_error: "Root must be a string",
    })
    .optional(),
  phonetics: z
    .string({
      invalid_type_error: "Phonetics must be a string",
    })
    .optional(),
  audio: z
    .string({
      invalid_type_error: "Audio must be a string",
    })
    .optional(),
  prefix: z
    .string({
      invalid_type_error: "Prefix must be a string",
    })
    .optional(),
  suffix: z
    .string({
      invalid_type_error: "Suffix must be a string",
    })
    .optional(),
});
