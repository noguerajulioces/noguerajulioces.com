// The career, told as chapters beside the globe. Facts live here; the words for each id live in messages/.
import type { Messages } from "@/messages";

// One globe position per chapter (components/JourneyGlobe.tsx); also the key of the chapter's copy in messages.chapters.
export type Step = keyof Messages["chapters"];

type Month = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
export type YearMonth = `${number}-${Month}`;
export type Period = { from: YearMonth; to: YearMonth | "present" };

export type Badge = keyof Messages["badges"];
// A tool name as written, or a word that is translated (messages.tags)
export type Tag = string | { word: keyof Messages["tags"] };
// A company tile: the logo file in public/logos, or only the monogram. `full` logos bring their own coloured ground.
export type Logo = { mono: string; src?: string; full?: true };

export type Education = { kind: "education"; id: keyof Messages["education"]; org: string; logo: Logo; years: readonly [number, number] };
export type Job = { kind: "job"; id: keyof Messages["jobs"]; org: string; logo: Logo; badges: readonly Badge[]; period: Period; tags: readonly Tag[] };
export type Client = {
  id: keyof Messages["clients"];
  org: string;
  logo: Logo;
  period: Period | "ongoing";
  link: { href: string; label: string };
  tags: readonly string[];
};

export type Chapter =
  | { kind: "rows"; id: string; step: Step; rows: readonly (Education | Job)[] }
  | { kind: "now"; id: string; step: Step; badges: readonly Badge[]; period: Period; clients: readonly Client[] }
  | { kind: "world"; id: string; step: Step };

const uni: Logo = { mono: "UNI", src: "/logos/uni.jpg" };

export const clients: readonly Client[] = [
  {
    id: "racetracker",
    org: "RaceTracker",
    logo: { mono: "RT", src: "/logos/racetracker.png" },
    period: { from: "2023-07", to: "present" },
    link: { href: "https://racetracker.no", label: "racetracker.no" },
    tags: ["Ruby on Rails", "React", "AWS EC2", "AWS S3"],
  },
  {
    id: "luxus",
    org: "Luxus",
    logo: { mono: "LX", src: "/logos/luxus.png" },
    period: "ongoing",
    link: { href: "https://luxus.com.py", label: "luxus.com.py" },
    tags: ["Next.js", "WordPress", "PHP", "Ruby on Rails"],
  },
];

export const chapters: readonly Chapter[] = [
  {
    kind: "rows",
    id: "journey",
    step: "enc",
    rows: [
      { kind: "education", id: "uni", org: "Universidad Nacional de Itapúa", logo: uni, years: [2013, 2018] },
      {
        kind: "job",
        id: "freelance",
        org: "Freelance",
        logo: { mono: "FR" },
        badges: ["remote"],
        period: { from: "2016-06", to: "2017-07" },
        tags: ["C#", ".NET", "SQL Server", "Ruby on Rails"],
      },
      {
        kind: "job",
        id: "uniIt",
        org: "Universidad Nacional de Itapúa",
        logo: uni,
        badges: ["onsite"],
        period: { from: "2018-01", to: "2018-08" },
        tags: ["PHP", "WordPress", "JavaScript"],
      },
    ],
  },
  {
    kind: "rows",
    id: "lisboa",
    step: "lis",
    rows: [{ kind: "education", id: "nova", org: "Universidade Nova de Lisboa", logo: { mono: "NOVA", src: "/logos/nova.png" }, years: [2016, 2017] }],
  },
  {
    kind: "rows",
    id: "bogota",
    step: "bog",
    rows: [
      {
        kind: "job",
        id: "platzi",
        org: "Platzi",
        logo: { mono: "PZ", src: "/logos/platzi.webp" },
        badges: ["hybrid"],
        period: { from: "2018-09", to: "2019-07" },
        tags: [{ word: "education" }, { word: "leadership" }, "Português"],
      },
      {
        kind: "job",
        id: "smartone",
        org: "SMART ONE",
        logo: { mono: "S1", src: "/logos/smartone.png", full: true },
        badges: ["onsite", "fulltime"],
        period: { from: "2019-07", to: "2022-02" },
        tags: ["Ruby", "Ruby on Rails", "MongoDB", "Firebase", "AWS EC2", "Elastic Beanstalk"],
      },
    ],
  },
  {
    kind: "rows",
    id: "remote",
    step: "remote",
    rows: [
      {
        kind: "job",
        id: "geotec",
        org: "Geotec",
        logo: { mono: "GT", src: "/logos/geotec.png" },
        badges: ["remote", "fulltime"],
        period: { from: "2022-02", to: "2024-10" },
        tags: ["Ruby on Rails", "Turbo", "API"],
      },
      {
        kind: "job",
        id: "dezerta",
        org: "Dezerta Labs",
        logo: { mono: "DL", src: "/logos/dezerta.png", full: true },
        badges: ["remote", "parttime"],
        period: { from: "2023-07", to: "2024-12" },
        tags: ["Ruby on Rails", "MongoDB"],
      },
    ],
  },
  { kind: "now", id: "now", step: "now", badges: ["remote", "freelance"], period: { from: "2023-07", to: "present" }, clients },
  { kind: "world", id: "languages", step: "world" },
];

// Languages & travel. Language names are native, so they read the same on every page.
export const spoken = [
  { lang: "es", flag: "es", name: "Español", level: "native" },
  { lang: "gn", flag: "py", name: "Avañe'ẽ", note: "Guaraní", level: "native" },
  { lang: "pt", flag: "br", name: "Português", level: "fluent" },
  { lang: "en", flag: "us", name: "English", level: "professional" },
] as const satisfies readonly { lang: string; flag: string; name: string; note?: string; level: keyof Messages["world"]["levels"] }[];

// Guaraní proverb; its translation is messages.world.quote
export const proverb = "“Ani rekyhyjéti rejavyrô guarã. Ekyhyje nereñeha'ãiro guarã.”";

export const stamps: readonly { code: keyof Messages["world"]["places"]; home?: true }[] = [
  { code: "PY", home: true },
  { code: "PT", home: true },
  { code: "CO", home: true },
  { code: "BR" },
  { code: "AR" },
  { code: "UY" },
  { code: "BO" },
  { code: "MX" },
  { code: "PA" },
  { code: "ES" },
  { code: "GB" },
];
