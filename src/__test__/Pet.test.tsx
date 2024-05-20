import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Pet from "../Pet";
import { StaticRouter } from "react-router-dom/server";

test("display a default thumbnail", async () => {
  const pet = render(
    <StaticRouter location={undefined}>
      <Pet
        name={""}
        animal={"dog"}
        breed={""}
        images={[]}
        location={""}
        id={0}
      />
    </StaticRouter>,
  );
  const petThumbnail = (await pet.findByTestId(
    "thumbnail",
  )) as HTMLImageElement;
  expect(petThumbnail.src).toContain("none.jpg");
  pet.unmount();
});

test("displays a non-dafault thumbnail", async () => {
  const pet = render(
    <StaticRouter location={undefined}>
      <Pet
        images={["1.jpg", "2.jpg", "3.jpg"]}
        name={""}
        animal={"dog"}
        breed={""}
        location={""}
        id={0}
      />
    </StaticRouter>,
  );
  const petThumbnail = (await pet.findByTestId(
    "thumbnail",
  )) as HTMLImageElement;
  expect(petThumbnail.src).toContain("1.jpg");
  pet.unmount();
});
