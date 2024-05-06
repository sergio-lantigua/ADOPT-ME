import { createContext } from "react";
import { IPet } from "./APIResponseTypes";

const AdoptedPetContext = createContext<
  [IPet | null, (adoptedPet: IPet) => void]
>([
  {
    id: 1337,
    name: "fiso",
    animal: "dog",
    description: "lorem ipsum",
    breed: "Beagle",
    images: [],
    city: "Seattle",
    state: "WA",
  },
  () => {},
]);

export default AdoptedPetContext;
