import { useGetBreedsQuery } from "./petApiService";
import { Animal } from "./APIResponseTypes";

export default function useBreedList(animal: Animal): [string[], string] {
  const { isLoading, data: breeds } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  if (!animal) {
    return [[], "loaded"];
  }
  return [breeds ?? [], isLoading ? "loading" : "loaded"];
}
