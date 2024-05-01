import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isError) {
    return <h1>{results.status} </h1>;
  }

  if (results.isLoading || results.isFetching) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];
  return (
    <div className="my-0 mx-auto w-11/12 rounded-lg bg-gray-200 p-4 shadow-lg">
      <Carousel images={pet.images} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="mx-1 my-0 text-center text-6xl">{pet.name} </h1>
        <h2 className="mt-1 ml-0 mb-5 mr-0 text-center">
          {" "}
          {`${pet.animal} - ${pet.breed} - ${pet.city} - ${pet.state}`}
        </h2>
        <button
          className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}{" "}
        </button>
        <p className="px-0 py-4 leading-normal"> {pet.description} </p>
        {showModal ? (
          <Modal>
            <div>
              <h1 className="text-lg">Would you like to adopt {pet.name}</h1>
              <div className="buttons">
                <button
                  className="mr-4 inline-block rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50"
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button
                  className="mr-4 inline-block rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
