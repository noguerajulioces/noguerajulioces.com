// English copy: the source of truth. es.ts and pt.ts must match this shape, so a missing or extra key is a type error.
// Proper nouns that read the same in every language (companies, tools, native language names) live in data/.
export const en = {
  meta: {
    title: "Julio Noguera · Software Engineer",
    description: "Independent software engineer from Paraguay. I build and scale Rails backends for startups.",
  },
  nav: {
    label: "Sections",
    about: "About",
    journey: "Journey",
    now: "Now",
    languages: "Languages",
    stack: "Stack",
    contact: "Contact",
  },
  controls: {
    language: "Language: ",
    theme: "Switch theme",
  },
  clock: {
    label: "Local time in Encarnación",
    zone: "Encarnación · UTC−3",
    fallback: "Julio works from Paraguay, UTC−3.",
    line: (time: string, offsets: string) => `It's ${time} in Encarnación · ${offsets}`,
    offset: (hours: number, city: string) => (hours >= 0 ? `${hours} h ahead of ${city}` : `${-hours} h behind ${city}`),
    cities: ["New York", "Berlin"],
  },
  hero: {
    role: "Software Engineer",
    country: "Paraguay",
    lead: "I build and scale Rails backends for startups.",
    experience: "10 years shipping software, 7+ of them in production Rails, for teams in Norway, the US, Colombia and Argentina.",
    // "<before>RaceTracker<between>Luxus<after>", each name a link to the Now chapter
    clients: { before: "Today I work independently with ", between: " and ", after: "." },
    focus: "Geolocation platforms, ERPs and APIs for mobile apps. Backend first, comfortable across the stack.",
    status: "Open to new clients and full-time roles, working remotely with teams anywhere in the world.",
    emailMe: "Email me",
    findMe: "Find me on",
    today: "Today",
  },
  email: {
    copy: "Copy email",
    copied: "Copied",
  },
  dates: {
    present: "Present",
    ongoing: "Ongoing",
  },
  badges: {
    remote: "Remote",
    onsite: "On-site",
    hybrid: "Hybrid",
    fulltime: "Full-time",
    parttime: "Part-time",
    freelance: "Freelance",
  },
  tags: {
    education: "Education",
    leadership: "Leadership",
  },
  chapters: {
    enc: {
      meta: "Encarnación, Paraguay · 2013",
      title: "Foundations",
      text: "Business Informatics at Universidad Nacional de Itapúa, while building software for restaurants and small businesses and running IT for a faculty.",
    },
    lis: {
      meta: "Lisboa, Portugal · 2016",
      title: "Information Systems in Lisbon",
      text: "Information Systems and Web and Multimedia Management at Universidade Nova de Lisboa.",
    },
    bog: {
      meta: "Bogotá, Colombia · 2018 — 2022",
      title: "Rails backend and education",
      text: "At Platzi I coordinated course content in Spanish, Portuguese and English. At SMART ONE I built the Rails backend and the APIs behind a mobility app.",
    },
    remote: {
      meta: "Paraguay · 2022 — 2024",
      title: "Remote engineering for international teams",
      text: "From Paraguay, I led geolocation and ERP projects for Geotec (Argentina) and delivered client projects for Dezerta Labs (California).",
    },
    now: {
      meta: "Encarnación · 2023 — today",
      title: "Independent software engineer",
      text: "From Encarnación I work with RaceTracker in Norway and Luxus in Paraguay.",
    },
    world: {
      meta: "11 countries · 4 languages",
      title: "Languages & travel",
    },
  },
  education: {
    uni: { title: "Bachelor's in Business Informatics", place: "Encarnación, Paraguay" },
    nova: { title: "Information Systems, Web and Multimedia Management", place: "Lisboa, Portugal" },
  },
  jobs: {
    freelance: {
      title: "Desktop apps for small businesses and restaurants",
      place: "Encarnación, Paraguay",
      bullets: [
        "Built custom desktop apps for operations and customer management.",
        "Added Rails for the web parts. My first Ruby in production.",
      ],
    },
    uniIt: {
      title: "Head of IT, Faculty of Agricultural Sciences",
      place: "Encarnación, Paraguay",
      bullets: [
        "Built and maintained the faculty's website.",
        "Ran the servers and kept every computer working, hardware and software.",
      ],
    },
    platzi: {
      title: "Course Director · Student Advocate",
      place: "Bogotá, Colombia",
      bullets: [
        "Led educators across countries to create courses in Spanish, Portuguese and English.",
        "Supported students and built multilingual content and learning paths.",
      ],
    },
    smartone: {
      title: "Backend Developer",
      place: "Bogotá, Colombia",
      bullets: [
        "Maintained and improved web applications in production, keeping them fast and secure.",
        "Built new features and the APIs behind the company's mobile apps.",
        "Reviewed and debugged code from junior developers.",
      ],
    },
    geotec: {
      title: "Backend Developer",
      place: "Clients in Europe and South America",
      bullets: [
        "Led geolocation and ERP projects for clients in Europe and South America.",
        "Owned backend features end to end: performance, scalability and security.",
        "Mentored less experienced developers and reviewed their code.",
      ],
    },
    dezerta: {
      title: "Ruby on Rails Engineer",
      place: "Santa Clara, US",
      bullets: [
        "Built backend features for client projects with custom requirements, from the data model to production.",
        "Optimized performance and kept applications scalable and secure as client needs changed.",
      ],
    },
  },
  independent: {
    org: "Independent",
    title: "Software Engineer",
    clients: "Clients",
  },
  clients: {
    racetracker: {
      title: "Software Engineer",
      place: "Norway · Remote",
      description: "Registration, timing and live tracking for race organizers, from local road races to Norseman Xtreme Triathlon. I build across the Rails backend and the React front end.",
      today: "Race-day software · Norway · Remote",
    },
    luxus: {
      title: "Software Engineer",
      place: "Asunción, Paraguay",
      description: "Software for Paraguay's leading distributor of premium fashion: more than 30 international brands, wholesale across the country since 2011.",
      today: "Premium fashion distributor · Paraguay",
    },
  },
  world: {
    levels: { native: "Native", fluent: "Fluent", professional: "Professional" },
    quote: "Don't be afraid of getting it wrong. Be afraid of never trying.",
    passport: "Passport",
    count: "11 countries · 3 called home",
    lived: "Lived",
    visited: "Visited",
    places: {
      PY: "Paraguay",
      PT: "Lisboa",
      CO: "Bogotá",
      BR: "Brazil",
      AR: "Argentina",
      UY: "Uruguay",
      BO: "Bolivia",
      MX: "Mexico",
      PA: "Panama",
      ES: "Spain",
      GB: "England",
    },
  },
  stack: {
    title: "Stack",
    groups: {
      backend: "Backend",
      data: "Data",
      frontend: "Frontend",
      cloud: "Cloud · DevOps",
      ai: "AI",
      earlier: "Earlier",
    },
  },
  contact: {
    title: "Let's build something",
    text: "A Rails backend to ship or to scale? Write to me in English, Español or Português.",
  },
  footer: {
    thanks: "for stopping by",
  },
} as const;

// The shape every locale must fill: en's keys and tuple lengths, with any string in place of en's literals.
type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => Widen<R>
    : { readonly [K in keyof T]: Widen<T[K]> };

export type Messages = Widen<typeof en>;
