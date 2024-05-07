import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchQuery } from "./petApiService";
import { all } from "./searchParamsSlice";
import { RootState } from "./store";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { Animal, ISearchParams } from "./APIResponseTypes";
import Loading from "./Loading";
import Pagination from "./Pagination";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);

  const adoptedPet = useSelector((state: RootState) => state.adoptedPet.value);
  const requestParams = useSelector(
    (state: RootState) => state.searchParamsSlice.value,
  );
  const {
    data: petsRequestData,
    isLoading,
    isFetching,
    isError,
  } = useSearchQuery(requestParams);
  const dispatch = useDispatch();

  const numerOfResults = petsRequestData?.numberOfResults ?? 0;
  const pets = petsRequestData?.pets ?? [];
  const handlePagination: (a: number) => void = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const obj = {
      ...requestParams,
      page: pageNumber,
    } as ISearchParams;
    dispatch(all(obj));
  };

  return (
    <div className="mx-auto my-0 w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: (formData.get("animal") as Animal) ?? ("" as Animal),
            location: formData.get("location")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
            page: 0,
          };

          dispatch(all(obj));
        }}
      >
        {adoptedPet ? (
          <div className="clip-path float-left mb-0 ml-3 mr-5 mt-0 h-40 w-40">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            className="search-input"
            id="location"
            placeholder="Location"
            name="location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            className="mb-5 block w-60"
            name="animal"
            id="animal"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            className="search-input disabled:opacity-30"
            name="breed"
            id="breed"
            disabled={!breeds.length}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
          Submit
        </button>
      </form>

      <Pagination
        elementsPerPage={10}
        quantity={numerOfResults}
        handlePage={handlePagination}
        currentPage={currentPage}
      />
      {isError ? (
        <h1 className="text-center">
          An error occur while proccesing the request, try again later.
        </h1>
      ) : isLoading || isFetching ? (
        <Loading />
      ) : (
        <Results pets={pets} />
      )}
    </div>
  );
};

export default SearchParams;
