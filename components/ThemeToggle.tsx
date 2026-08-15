"use client";

const STORAGE_KEY = "van-theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#f4efe6" : "#070506");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle light and dark mode"
      onClick={() => {
        const next =
          document.documentElement.getAttribute("data-theme") === "light"
            ? "dark"
            : "light";
        applyTheme(next);
      }}
    >
      <span className="theme-toggle-when-dark">Light</span>
      <span className="theme-toggle-when-light">Dark</span>
    </button>
  );
}

export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;
