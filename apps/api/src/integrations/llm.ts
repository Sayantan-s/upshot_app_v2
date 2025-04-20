import { GEMINI_API_KEY } from '@api/config';
import {
  ContentListUnion,
  GenerateContentConfig,
  GoogleGenAI,
  SchemaUnion,
} from '@google/genai';

class MODEL {
  static pro_preview = Symbol('gemini-2.5-flash-preview-04-17');
}

interface IGenerateStructuredOPs {
  schema: SchemaUnion;
  model: symbol;
  prompt: string;
  systemPrompt?: string;
}

export class LLM {
  private _instance: GoogleGenAI;
  private static _clientInstance: GoogleGenAI | null;
  static models = MODEL;
  constructor() {
    this._instance = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });
  }

  private static get _client() {
    if (!LLM._clientInstance) LLM._clientInstance = new LLM()._instance;
    return LLM._clientInstance;
  }

  static async generateStructuredOPs<TData>({
    model: llmModel,
    schema,
    prompt,
    systemPrompt,
  }: IGenerateStructuredOPs) {
    const config: GenerateContentConfig = {
      responseMimeType: 'application/json',
      responseSchema: schema,
    };

    if (systemPrompt.trim() !== '' && systemPrompt.length > 20)
      config.systemInstruction = systemPrompt;

    const model = llmModel.description;

    const contents: ContentListUnion = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    const response = await LLM._client.models.generateContent({
      model,
      config,
      contents,
    });

    const result: TData = JSON.parse(response.text);

    return result;
  }
}
