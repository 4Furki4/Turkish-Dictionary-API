import { describe, expect, it } from "bun:test";
import Elysia from "elysia";
import { meaningSchema } from "../../validations/meaning";
const baseUrl = "http://localhost:3000";
describe("meaning handler", () => {
  it("request sent with corrupted data should return 400", async () => {
    const validationHandler = async (context: any) => {
      const meaningData = await context.request.json();
      try {
        await meaningSchema.parse(meaningData);
        context.set.status = 200;
      } catch (error) {
        context.set.status = 400;
        console.log(error);
      }
    };

    const corruptedData = {
      definition: {
        definition: "Durumlar, hâller, vaziyetler",
        example: {
          sentence:
            "Ey Türk istikbalinin evladı! İşte, bu ahval ve şerait içinde dahi vazifen, Türk istiklal ve cumhuriyetini kurtarmaktır.",
          author: "Mustafa Kemal ATATÜRK",
        },
      },
      partOfSpeech: "isim",
      attributes: [],
    };
    const app = new Elysia().post("/api/meanings/:wordId", validationHandler);
    const request = new Request(`${baseUrl}/api/meanings/1`, {
      method: "POST",
      body: JSON.stringify(corruptedData),
    });
    const response = await app.handle(request);
    console.log(response.status);
    expect(response.status).toEqual(400);
  });
});
