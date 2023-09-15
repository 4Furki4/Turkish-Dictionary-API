import { z } from "zod";

export const wordSchema = z.object({
  name: z.string({
    required_error: "Word name is required",
    invalid_type_error: "Word name must be a string",
  }),
  meanings: z.array(
    z.object({
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
    })
  ),
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
