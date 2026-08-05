import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ThemeContext,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type Theme,
} from "./ThemeContext";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark" || value === "system";

const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(stored) ? stored : "system";
};

/** Background colors used for the mobile <meta name="theme-color"> tag so the
 *  browser chrome matches the active theme. Mirrors --bg in index.css. */
const THEME_COLOR: Record<ResolvedTheme, string> = {
  light: "#ffffff",
  dark: "#0d1015",
};

const applyResolvedTheme = (resolved: ResolvedTheme) => {
  document.documentElement.dataset.theme = resolved;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[resolved]);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [systemDark, setSystemDark] = useState<boolean>(
    () => window.matchMedia(DARK_QUERY).matches,
  );

  // resolvedTheme is derived — no state, so no setState-in-effect.
  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (systemDark ? "dark" : "light") : theme;

  // Keep the OS preference in sync; setState inside a listener callback is fine.
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const handleChange = () => setSystemDark(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  // Push the resolved theme to the DOM and persist the preference. These are
  // external side-effects only (no React state updates).
  useEffect(() => {
    applyResolvedTheme(resolvedTheme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [resolvedTheme, theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
