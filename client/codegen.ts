import type { CodegenConfig } from "@graphql-codegen/cli";

const TYPED_DOCUMENT_STRING = `
class TypedDocumentString<TResult, TVariables> {
  __apiType?: (variables: TVariables) => TResult;
  private _value: string;
  constructor(value: string) {
    this._value = value;
  }
  toString(): string {
    return this._value;
  }
}
`;

const config: CodegenConfig = {
  schema: "http://localhost:4000/",
  documents: ["src/api/operations/**/*.graphql"],
  generates: {
    "src/api/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        { add: { content: TYPED_DOCUMENT_STRING } },
        "typescript-rtk-query",
      ],
      config: {
        importBaseApiFrom: "./baseApi",
        importBaseApiAlternateName: "baseApi",
        exportHooks: true,
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
