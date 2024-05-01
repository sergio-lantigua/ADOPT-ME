const fetchPets = async ({ queryKey }) => {
  const { animal, location, breed, page } = queryKey[1];
  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${page}`,
  );

  if (!apiRes.ok) {
    throw new Error("pets request failed");
  }

  return apiRes.json();
};

export default fetchPets;
