import "@testing-library/jest-dom/jest-globals";

import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { DATA_THEME_ATTRIBUTE, DATA_THEME_MODE_ATTRIBUTE, THEME_MODE_DARK, THEME_MODE_LIGHT, THEME_MODE_SYSTEM } from "./theme";
import { THEME_TOGGLE_LABEL, ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.setAttribute(DATA_THEME_ATTRIBUTE, THEME_MODE_DARK);
    document.documentElement.setAttribute(DATA_THEME_MODE_ATTRIBUTE, THEME_MODE_DARK);
    window.localStorage.clear();
    window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() })) as unknown as typeof window.matchMedia;
  });

  test("should render one accessible button", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("button", { name: THEME_TOGGLE_LABEL })).toBeInTheDocument();
  });

  test("should switch to the opposite theme on click", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: THEME_TOGGLE_LABEL }));

    expect(document.documentElement.getAttribute(DATA_THEME_ATTRIBUTE)).toBe(THEME_MODE_LIGHT);
    expect(document.documentElement.getAttribute(DATA_THEME_MODE_ATTRIBUTE)).toBe(THEME_MODE_LIGHT);
  });

  test("should follow the system again on shift+click", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: THEME_TOGGLE_LABEL }), { shiftKey: true });

    expect(document.documentElement.getAttribute(DATA_THEME_MODE_ATTRIBUTE)).toBe(THEME_MODE_SYSTEM);
    expect(document.documentElement.getAttribute(DATA_THEME_ATTRIBUTE)).toBe(THEME_MODE_LIGHT);
  });
});
