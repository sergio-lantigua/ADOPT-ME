import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";


export default function useBreedList(animal) {
    const resultsBreeds = useQuery(["animal", animal], fetchBreedList);

    return [resultsBreeds?.data?.breeds ?? [], resultsBreeds.status];
}