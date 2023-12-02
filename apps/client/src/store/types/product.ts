// GENERATION

export interface IGenerationRequest {
  productName: string;
  productMoto: string;
  setupInitialFiveAutomatedPosts: boolean;
  generateProductDescription: boolean;
}

export interface IGenerationResponse {
  description: string;
  logo?: string;
  cover?: string;
}

export interface IGenerateResponseTranscriptCVs {
  coverLetterText: string;
}
