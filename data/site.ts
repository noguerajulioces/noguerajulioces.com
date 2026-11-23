// Facts about Julio that read the same in every language. Copy that changes per language lives in messages/.
export const site = {
  url: "https://noguerajulioces.com",
  name: "Julio Noguera",
  initials: "JN",
  year: 2026,
  // Public email, used in one place only.
  email: "noguerajulio24@gmail.com",
  socials: [
    { name: "GitHub", href: "https://github.com/noguerajulioces" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/noguerajulio/" },
    { name: "X", href: "https://x.com/noguerajulioces" },
  ],
  photo: { src: "/photo/photo-warm-mono-144.webp", srcSet: "/photo/photo-warm-mono-144.webp 144w, /photo/photo-warm-mono-288.webp 288w" },
  // Guaraní, shown as written in every language
  thanks: "Aguyje",
} as const;
