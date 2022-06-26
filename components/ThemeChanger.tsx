import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="h-12 w-12"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon-stars dark:text-gray-200"></i>}
    </button>
  );
};

export default ThemeChanger;
