type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

interface ISearchParams {
  location: string;
  breed: string;
  animal: Animal;
  page: number;
}

interface IPet {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
}

interface IPetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: IPet[];
}

interface IBreedListAPIResponse {
  animal: Animal;
  breeds: string[];
}

export { Animal, IPet, IPetAPIResponse, IBreedListAPIResponse, ISearchParams };
