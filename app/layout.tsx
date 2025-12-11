import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";

/**
 * Font Configuration
 * 
 * DM Serif Display - Elegant serif font used for headings and decorative text
 * Loaded from Google Fonts with specific configuration
 */
const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"], // Character set for Latin alphabets
  style: ["italic"], // Italic style for emphasis
  variable: "--font-dm-serif", // CSS variable for use in components
});

/**
 * Manrope - Modern sans-serif font used for body text and UI elements
 * Provides excellent readability and clean appearance
 */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope", // CSS variable for use in components
});

/**
 * Page Metadata
 * Defines the browser tab title and description for SEO
 */
export const metadata: Metadata = {
  title: "Wedding Company",
  description: "Wedding planning and management services",
};

/**
 * Root Layout Component
 * Wraps all pages in the application
 * Sets up fonts, language, and global structure
 * 
 * @param children - Child components/pages to render
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply both font variables to the body for global access */}
      <body className={`${dmSerifDisplay.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
