import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration
 * Customizes the utility-first CSS framework for this project
 */
export default {
  /**
   * Content Paths
   * Tells Tailwind which files to scan for class names
   * This enables tree-shaking to remove unused CSS
   */
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  /**
   * Theme Configuration
   * Extends the default Tailwind theme with custom values
   */
  theme: {
    extend: {
      /**
       * Custom Color Definitions
       * Uses CSS variables for dynamic theming
       */
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  
  /**
   * Plugins
   * Additional Tailwind plugins can be added here
   * Currently using no plugins
   */
  plugins: [],
} satisfies Config;
