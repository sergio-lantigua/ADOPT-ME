import { expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import useBreedList from "../useBreedList";
import { Animal } from "../APIResponseTypes";
import store from "../store";

test("gives empty list with no animal provided", () => {
  const { result } = renderHook(() => useBreedList("" as Animal), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("loaded");
});

test("gives back breeds with animal", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];
  fetchMock.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    }),
  );

  const { result } = renderHook(() => useBreedList("dog" as Animal), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  await waitFor(function () {
    expect(result.current[1]).toBe("loaded");
  });

  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});
