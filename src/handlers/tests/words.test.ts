import { describe, it, expect } from "bun:test";
import { addWord } from "../words";
import Elysia from "elysia";
const baseUrl = "http://localhost:3000";
const corruptedData = {
  name: "Ahval",
  meanings: [
    {
      attributes: [""],
      partOfSpeech: "noun",
      definition: {
        definition: "Durumlar, hâller, vaziyetler",
        example: {
          sentence:
            "Ey Türk istikbalinin evladı! İşte, bu ahval ve şerait içinde dahi vazifen, Türk istiklal ve cumhuriyetini kurtarmaktır.",
          author: "Mustafa Kemal ATATÜRK",
        },
      },
    },
  ],
  attributes: ["plural"],
  relatedWords: [],
  relatedPhrases: [],
  root: "Arapça",
  phonetics: "ahva:li",
  suffix: "li",
};

const data = {
  name: "Ahval",
  meanings: [
    {
      attributes: [],
      partOfSpeech: "noun",
      definition: {
        definition: "Durumlar, hâller, vaziyetler",
        example: {
          sentence:
            "Ey Türk istikbalinin evladı! İşte, bu ahval ve şerait içinde dahi vazifen, Türk istiklal ve cumhuriyetini kurtarmaktır.",
          author: "Mustafa Kemal ATATÜRK",
        },
      },
    },
  ],
  attributes: ["plural"],
  relatedWords: [],
  relatedPhrases: [],
  root: "Arapça",
  phonetics: "ahva:li",
  suffix: "li",
};
describe("Post request to /api/words", () => {
  it("should return 400 status code", async () => {
    const app = new Elysia().post(`/api/words`, addWord);

    const response = await app.handle(
      new Request(`${baseUrl}/api/words`, {
        method: "POST",
        body: JSON.stringify(corruptedData),
      })
    );

    expect(response.status).toBe(400);
  });

  it("should return 201 status code", async () => {
    const app = new Elysia().post(`/api/words`, addWord);

    const response = await app.handle(
      new Request(`${baseUrl}/api/words`, {
        method: "POST",
        body: JSON.stringify(data),
      })
    );

    expect(response.status).toBe(201);
  });
});
