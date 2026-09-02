"use client";

import { useEffect, type MouseEvent } from "react";

import {
  applyThemeMode,
  DARK_MEDIA_QUERY,
  getOppositeTheme,
  readResolvedTheme,
  readThemeMode,
  THEME_MODE_SYSTEM,
} from "./theme";

const ICON_SIZE = 18;
const MEDIA_CHANGE_EVENT = "change";

export const THEME_TOGGLE_LABEL = "Toggle color theme";

/**
 * The button holds no React state: the current theme is an attribute on <html>
 * that the inline init script sets before the first paint, and the icon is
 * chosen by the `dark:` variant in CSS. The server-rendered markup is therefore
 * identical to what the client renders, so there is nothing to mismatch on
 * hydration and no wrong icon flashes before JavaScript runs.
 */
export function ThemeToggle() {
  useEffect(() => {
    const media = window.matchMedia(DARK_MEDIA_QUERY);
    const followSystem = () => {
      if (readThemeMode() === THEME_MODE_SYSTEM) {
        applyThemeMode(THEME_MODE_SYSTEM);
      }
    };

    media.addEventListener(MEDIA_CHANGE_EVENT, followSystem);

    return () => media.removeEventListener(MEDIA_CHANGE_EVENT, followSystem);
  }, []);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // Shift+click returns to following the operating system.
    applyThemeMode(event.shiftKey ? THEME_MODE_SYSTEM : getOppositeTheme(readResolvedTheme()));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={THEME_TOGGLE_LABEL}
      title={`${THEME_TOGGLE_LABEL} (Shift+click follows the system)`}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-vs-border bg-vs-background-secondary text-vs-foreground-muted transition-colors hover:border-vs-primary hover:text-vs-primary"
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
    </button>
  );
}

function SunIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" className={className} width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" className={className} width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </svg>
  );
}
