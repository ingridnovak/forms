import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

const GRAPHQL_ENDPOINT = "http://localhost:4000/";

type GraphQLRequest = {
  document: { toString(): string };
  variables?: Record<string, unknown> | void;
};

const graphqlBaseQuery: BaseQueryFn<GraphQLRequest, unknown, unknown> = async ({
  document,
  variables,
}) => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: document.toString(), variables }),
    });
    const json = await response.json();
    if (json.errors) return { error: json.errors };
    return { data: json.data };
  } catch (error) {
    return { error };
  }
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: graphqlBaseQuery,
  tagTypes: ["Form", "Response"],
  endpoints: () => ({}),
});
