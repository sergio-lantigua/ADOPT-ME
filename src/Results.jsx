import Pet from "./Pet";


const Results = ({ pets }) => {
    return (
        <div className="search">
            {
                !pets.length ? (
                    <h1>No Pets found</h1>
                ) : (
                    pets.map((pet => (
                        < Pet
                            name={pet.name}
                            key={pet.id}
                            animal={pet.animal}
                            images={pet.images}
                            breed={pet.breed}
                            location={`${pet.city}, ${pet.state}`}
                            id={pet.id}
                        />
                    )))
                )
            }
        </div>
    );
};

export default Results;