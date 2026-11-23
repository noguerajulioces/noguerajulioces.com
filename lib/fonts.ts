import { Doto, Geist_Mono, Inter } from "next/font/google";

// The same font files the page loaded from Google Fonts (checked byte for byte). styles/tokens.css reads these
// variables into --font-sans, --font-mono and --font-dot. Vietnamese covers the ẽ in Avañe'ẽ.
// Inter loads as a variable font: given a weight list, Turbopack slices the wght axis to 400–600, which shifts glyph
// outlines slightly; the full axis is the exact file browsers got before.
const inter = Inter({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-inter" });
const geistMono = Geist_Mono({ weight: ["400", "500"], subsets: ["latin", "latin-ext"], variable: "--font-geist-mono" });
const doto = Doto({ weight: "800", subsets: ["latin"], variable: "--font-doto" });

export const fontVariables = `${inter.variable} ${geistMono.variable} ${doto.variable}`;
