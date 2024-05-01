import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";
import { Animal } from "./APIResponseTypes";

export default function useBreedList(animal: Animal) {
  const resultsBreeds = useQuery(["breeds", animal], fetchBreedList);

  return [resultsBreeds?.data?.breeds ?? [], resultsBreeds.status] as [
    string[],
    QueryStatus,
  ];
}
