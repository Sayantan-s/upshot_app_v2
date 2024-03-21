import { CodegenConfig } from '@graphql-codegen/cli';

const LOCAL_BE_URI = `http://localhost:8080/api/v1/gql`;
const config: CodegenConfig = {
  schema: {
    [LOCAL_BE_URI]: {
      headers: {
        codegen: 'true',
      },
    },
  },
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['apps/client/src/**/*.{ts,tsx}'],
  generates: {
    './apps/client/src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
