import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Animal,
  IPet,
  IPetAPIResponse,
  ISearchParams,
} from "./APIResponseTypes";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id: number) => ({ url: "pets", params: { id } }),
      transformResponse: (response: { pets: IPet[] }) => response.pets[0],
    }),
    getBreeds: builder.query({
      query: (animal: Animal) => ({ url: "breeds", params: { animal } }),
      transformResponse: (response: { breeds: string[] }) => response.breeds,
    }),
    search: builder.query({
      query: ({ location, breed, animal, page }: ISearchParams) => ({
        url: "pets",
        params: { location, breed, animal, page },
      }),
      transformResponse: (response: IPetAPIResponse) => response,
    }),
  }),
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
