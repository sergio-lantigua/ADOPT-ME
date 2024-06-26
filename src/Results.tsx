import Pet from "./Pet";
import { IPet } from "./APIResponseTypes";

const Results = ({ pets }: { pets: IPet[] }) => {
  return !pets.length ? (
    <h1 className="text-center text-[80px]">No Pets found</h1>
  ) : (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet) => (
        <Pet
          name={pet.name}
          key={pet.id}
          animal={pet.animal}
          images={pet.images}
          breed={pet.breed}
          location={`${pet.city}, ${pet.state}`}
          id={pet.id}
        />
      ))}
    </div>
  );
};

export default Results;
