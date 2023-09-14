import { Context } from "elysia";

type handlerContext = Context<
  {
    body: unknown;
    params: Record<never, string>;
    query: undefined;
    headers: undefined;
    response: unknown;
  },
  {}
>;

type Word = {
  id: string;
  name: string;
  meanings: Meaning[];
  root?: string;
  phonetics?: string;
  audio?: string;
  prefix?: string;
  suffix?: string;
  attributes?: Attribute[];
  relatedWords: string[];
  relatedPhrases: string[];
};

type Meaning = {
  id: string;
  partOfSpeech?: PartOfSpeech;
  definition: Definition;
  attributes?: Attribute[];
  Word: Word?;
  wordId: string?;
};

type Definition = {
  definition: string;
  example?: Example;
};

type Example = {
  sentence: string;
  author?: string;
};

enum PartOfSpeech {
  noun,
  verb,
  adjective,
  adverb,
  preposition,
  conjunction,
  interjection,
}

enum Attribute {
  plural,
  properNoun,
  trope,
  slang,
  archaic,
}
type MeaningInput = Omit<Meaning, "id" | "Word" | "wordId">;

type WordInput = Omit<Word, "id" | "meanings"> & {
  meanings: MeaningInput[];
};
