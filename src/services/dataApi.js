import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getData: build.query({
      query: (symbol) => `data/all/${symbol}`,
    }),
  }),
});
export const { useLazyGetDataQuery, useGetDataQuery } = dataApi;
