import "@testing-library/jest-dom/jest-globals";

import { faker } from "@faker-js/faker";
import { describe, expect, test } from "@jest/globals";
import { render, screen, within } from "@testing-library/react";

import { HomeBanner } from "./HomeBanner";

const REPOSITORY_URL = "https://github.com/maurogioberti/next-clean-architecture";
const LAYER_NAMES = ["Domain", "Application", "Infrastructure", "Crosscutting"];

describe("HomeBanner", () => {
  test("should render the message as the page heading", () => {
    const message = faker.lorem.sentence();

    render(<HomeBanner message={message} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(message);
  });

  test("should list the four architecture layers", () => {
    render(<HomeBanner message={faker.lorem.sentence()} />);

    const layers = screen.getByRole("list", { name: "Architecture layers" });

    expect(within(layers).getAllByRole("listitem")).toHaveLength(LAYER_NAMES.length);
    for (const name of LAYER_NAMES) {
      expect(within(layers).getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
  });

  test("should link to the repository", () => {
    render(<HomeBanner message={faker.lorem.sentence()} />);

    expect(screen.getByRole("link", { name: "Read the source" })).toHaveAttribute("href", REPOSITORY_URL);
  });
});
