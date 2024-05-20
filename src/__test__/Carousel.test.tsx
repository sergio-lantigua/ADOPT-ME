import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../Carousel";

test("lest users clicks on thumbnails to make them the hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = (await carousel.findByTestId("hero")) as HTMLImageElement;

  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const thumb = (await carousel.findByTestId(
      `thumbnail${i}`,
    )) as HTMLImageElement;

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await thumb.click();

    expect(hero.src).toContain(image);
    expect(Array.from(thumb.classList)).toContain("opacity-50");
  }

  carousel.unmount();
});
