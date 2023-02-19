import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://127.0.0.1:8080/graphql",
  documents: "src/**/*.tsx",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
