import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchPets from "./fetchPets";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];


const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        animal: "",
        location: "",
        breed: "",
    });
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    const petsResults = useQuery(["pets", requestParams], fetchPets);

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
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    location: formData.get("location") ?? "",
                    breed: formData.get("breed") ?? ""
                };

                setRequestParams(obj);
            }}>
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        placeholder="Location"
                        name="location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        name="animal"
                        id="animal"
                        onChange={e => {
                            setAnimal(e.target.value);
                        }}>
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
                        name="breed"
                        id="breed"
                    >
                        <option />
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            {
                <Results pets={pets} />
            }
        </div >
    );
};

export default SearchParams;