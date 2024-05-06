import { QueryFunction } from "@tanstack/react-query";
import { Animal, IPetAPIResponse } from "./APIResponseTypes";

const fetchPets: QueryFunction<
  IPetAPIResponse,
  [
    "pets",
    {
      location: string;
      animal: Animal;
      breed: string;
      page: number;
    },
  ]
> = async ({ queryKey }) => {
  const { animal, location, breed, page } = queryKey[1];
  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${page}`,
  );

  if (!apiRes.ok) {
    throw new Error("pets request failed");
  }

  return apiRes.json();
};

export default fetchPets;
