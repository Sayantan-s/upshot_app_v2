import { GEMINI_API_KEY } from '@api/config';
import { GoogleGenAI, SchemaUnion } from '@google/genai';

class MODEL {
  static pro_preview = Symbol('gemini-2.5-flash-preview-04-17');
}

interface IGenerateStructuredOPs {
  schema: SchemaUnion;
  model: symbol;
  prompt: string;
}

export class LLM {
  private instance: GoogleGenAI;
  private static clientInstance: GoogleGenAI | null;
  static models = MODEL;
  constructor() {
    this.instance = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });
  }

  private static get client() {
    if (!LLM.clientInstance) LLM.clientInstance = new LLM().instance;
    return LLM.clientInstance;
  }

  static async generateStructuredOPs({
    model: llmModel,
    schema,
    prompt,
  }: IGenerateStructuredOPs) {
    const config = {
      responseMimeType: 'application/json',
      responseSchema: schema,
    };
    const model = llmModel.description;

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];
    const response = await LLM.client.models.generateContent({
      model,
      config,
      contents,
    });

    const result = JSON.parse(response.text);

    return result;
  }
}
