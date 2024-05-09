import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetPetQuery } from "./petApiService";
import { adopt } from "./adoptedPetSlice";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import Loading from "./Loading";

const Details = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("no id provided to details");
  }

  const [showModal, setShowModal] = useState(false);
  const {
    isLoading,
    data: pet,
    isError,
    status,
    isFetching,
  } = useGetPetQuery(+id);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  if (isError) {
    return <h1>{status} </h1>;
  }

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (!pet) {
    throw new Error("pet not found");
  }

  return (
    <div className="mx-auto my-0 w-11/12 rounded-lg bg-gray-200 p-4 shadow-lg">
      <Carousel images={pet.images} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="mx-1 my-0 text-center text-4xl sm:text-6xl">
          {pet.name}{" "}
        </h1>
        <h2 className="mb-5 ml-0 mr-0 mt-1 text-center">
          {" "}
          {`${pet.animal} - ${pet.breed} - ${pet.city} - ${pet.state}`}
        </h2>
        <button
          className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}{" "}
        </button>
        <p className="hyphens-auto px-0 py-4 text-justify leading-normal">
          {" "}
          {pet.description}{" "}
        </p>
        {showModal ? (
          <Modal>
            <div>
              <h1 className="text-lg">Would you like to adopt {pet.name}</h1>
              <div className="buttons">
                <button
                  className="mr-4 inline-block rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50"
                  onClick={() => {
                    dispatch(adopt(pet));
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

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
