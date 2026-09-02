export const THEME_MODE_SYSTEM = "system";
export const THEME_MODE_DARK = "dark";
export const THEME_MODE_LIGHT = "light";

export const THEME_STORAGE_KEY = "theme-mode";
export const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";
export const DATA_THEME_ATTRIBUTE = "data-theme";
export const DATA_THEME_MODE_ATTRIBUTE = "data-theme-mode";

const THEME_MODE_VALUES = [THEME_MODE_SYSTEM, THEME_MODE_DARK, THEME_MODE_LIGHT] as const;

/** What the visitor chose: an explicit theme, or follow the operating system. */
export type ThemeMode = (typeof THEME_MODE_VALUES)[number];
/** What is actually painted once "system" has been resolved. */
export type ResolvedTheme = Exclude<ThemeMode, typeof THEME_MODE_SYSTEM>;

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && (THEME_MODE_VALUES as readonly string[]).includes(value);
}

export function resolveTheme(mode: ThemeMode, prefersDark: boolean): ResolvedTheme {
  if (mode === THEME_MODE_SYSTEM) {
    return prefersDark ? THEME_MODE_DARK : THEME_MODE_LIGHT;
  }

  return mode;
}

export function getOppositeTheme(theme: ResolvedTheme): ResolvedTheme {
  return theme === THEME_MODE_DARK ? THEME_MODE_LIGHT : THEME_MODE_DARK;
}

export function getSystemPrefersDark(): boolean {
  return window.matchMedia(DARK_MEDIA_QUERY).matches;
}

export function readThemeMode(): ThemeMode {
  const mode = document.documentElement.getAttribute(DATA_THEME_MODE_ATTRIBUTE);
  return isThemeMode(mode) ? mode : THEME_MODE_SYSTEM;
}

export function readResolvedTheme(): ResolvedTheme {
  const theme = document.documentElement.getAttribute(DATA_THEME_ATTRIBUTE);

  if (theme === THEME_MODE_DARK || theme === THEME_MODE_LIGHT) {
    return theme;
  }

  return resolveTheme(readThemeMode(), getSystemPrefersDark());
}

/** Paints the theme for `mode`, remembers an explicit choice, forgets it for "system". */
export function applyThemeMode(mode: ThemeMode): ResolvedTheme {
  const theme = resolveTheme(mode, getSystemPrefersDark());
  const root = document.documentElement;

  root.setAttribute(DATA_THEME_MODE_ATTRIBUTE, mode);
  root.setAttribute(DATA_THEME_ATTRIBUTE, theme);

  try {
    if (mode === THEME_MODE_SYSTEM) {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the theme still applies.
  }

  return theme;
}

/**
 * Inlined in <head> so the first paint already has the right palette. It
 * mirrors applyThemeMode() without importing anything: read the stored mode,
 * resolve "system" against the media query, stamp both attributes.
 */
export const themeInitScript = `
(() => {
  const root = document.documentElement;
  const prefersDark = window.matchMedia(${JSON.stringify(DARK_MEDIA_QUERY)}).matches;
  let mode = ${JSON.stringify(THEME_MODE_SYSTEM)};

  try {
    const stored = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (stored === ${JSON.stringify(THEME_MODE_DARK)} || stored === ${JSON.stringify(THEME_MODE_LIGHT)}) {
      mode = stored;
    }
  } catch {}

  root.setAttribute(${JSON.stringify(DATA_THEME_MODE_ATTRIBUTE)}, mode);
  root.setAttribute(
    ${JSON.stringify(DATA_THEME_ATTRIBUTE)},
    mode === ${JSON.stringify(THEME_MODE_SYSTEM)}
      ? (prefersDark ? ${JSON.stringify(THEME_MODE_DARK)} : ${JSON.stringify(THEME_MODE_LIGHT)})
      : mode
  );
})();
`.trim();
