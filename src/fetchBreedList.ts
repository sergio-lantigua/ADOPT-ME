import { QueryFunction } from "@tanstack/react-query";
import { IBreedListAPIResponse, Animal } from "./APIResponseTypes";

const fetchBreedList: QueryFunction<
  IBreedListAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) {
    return [];
  }

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
  );

  if (!apiRes.ok) {
    throw new Error("Error fetching the breed animal");
  }

  return apiRes.json();
};

export default fetchBreedList;
