import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import fetchPets from "./fetchPets";
import Pagination from "./Pagination";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [requestParams, setRequestParams] = useState({
    animal: "",
    location: "",
    breed: "",
    page: 0,
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  const petsResults = useQuery(["pets", requestParams], fetchPets);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    setRequestParams((obj) => {
      return {
        ...obj,
        page: pageNumber,
      };
    });
  };

  if (petsResults.isError) {
    return <h1>{petsResults.error.message} </h1>;
  }

  if (petsResults.isLoading || petsResults.isFetching) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pets = petsResults.data.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            location: formData.get("location") ?? "",
            breed: formData.get("breed") ?? "",
          };

          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="clip-path float-left mt-0 mr-5 mb-0 ml-3 h-40 w-40">
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
              setAnimal(e.target.value);
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
      {
        <>
          <Results pets={pets} />
          <Pagination
            elementsPerPage={10}
            quantity={63}
            handlePage={handlePagination}
            currentPage={currentPage}
          />
        </>
      }
    </div>
  );
};

export default SearchParams;
