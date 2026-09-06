import { beforeEach, describe, expect, jest, test } from "@jest/globals";

import {
  applyThemeMode,
  DATA_THEME_ATTRIBUTE,
  DATA_THEME_MODE_ATTRIBUTE,
  getOppositeTheme,
  isThemeMode,
  resolveTheme,
  THEME_MODE_DARK,
  THEME_MODE_LIGHT,
  THEME_MODE_SYSTEM,
  THEME_STORAGE_KEY,
} from "./theme";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = jest.fn(() => ({ matches, addEventListener: jest.fn(), removeEventListener: jest.fn() })) as unknown as typeof window.matchMedia;
}

describe("theme", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute(DATA_THEME_ATTRIBUTE);
    document.documentElement.removeAttribute(DATA_THEME_MODE_ATTRIBUTE);
    window.localStorage.clear();
    mockMatchMedia(false);
  });

  test("resolveTheme should follow the system preference only in system mode", () => {
    expect(resolveTheme(THEME_MODE_SYSTEM, true)).toBe(THEME_MODE_DARK);
    expect(resolveTheme(THEME_MODE_SYSTEM, false)).toBe(THEME_MODE_LIGHT);
    expect(resolveTheme(THEME_MODE_LIGHT, true)).toBe(THEME_MODE_LIGHT);
    expect(resolveTheme(THEME_MODE_DARK, false)).toBe(THEME_MODE_DARK);
  });

  test("getOppositeTheme should flip between dark and light", () => {
    expect(getOppositeTheme(THEME_MODE_DARK)).toBe(THEME_MODE_LIGHT);
    expect(getOppositeTheme(THEME_MODE_LIGHT)).toBe(THEME_MODE_DARK);
  });

  test("isThemeMode should accept only the known modes", () => {
    expect(isThemeMode(THEME_MODE_SYSTEM)).toBe(true);
    expect(isThemeMode("sepia")).toBe(false);
    expect(isThemeMode(null)).toBe(false);
  });

  test("applyThemeMode should stamp both attributes and remember an explicit choice", () => {
    const theme = applyThemeMode(THEME_MODE_DARK);

    expect(theme).toBe(THEME_MODE_DARK);
    expect(document.documentElement.getAttribute(DATA_THEME_ATTRIBUTE)).toBe(THEME_MODE_DARK);
    expect(document.documentElement.getAttribute(DATA_THEME_MODE_ATTRIBUTE)).toBe(THEME_MODE_DARK);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_MODE_DARK);
  });

  test("applyThemeMode should forget the stored choice when returning to system", () => {
    applyThemeMode(THEME_MODE_LIGHT);
    mockMatchMedia(true);

    const theme = applyThemeMode(THEME_MODE_SYSTEM);

    expect(theme).toBe(THEME_MODE_DARK);
    expect(document.documentElement.getAttribute(DATA_THEME_MODE_ATTRIBUTE)).toBe(THEME_MODE_SYSTEM);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });
});
