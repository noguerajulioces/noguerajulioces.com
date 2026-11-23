import type { Messages } from "./en";

export const es: Messages = {
  meta: {
    title: "Julio Noguera · Ingeniero de software",
    description: "Ingeniero de software independiente de Paraguay. Construyo y escalo backends en Rails para startups.",
  },
  nav: {
    label: "Secciones",
    about: "Sobre mí",
    journey: "Recorrido",
    now: "Ahora",
    languages: "Idiomas",
    stack: "Stack",
    contact: "Contacto",
  },
  controls: {
    language: "Idioma: ",
    theme: "Cambiar tema",
  },
  clock: {
    label: "Hora local en Encarnación",
    zone: "Encarnación · UTC−3",
    fallback: "Julio trabaja desde Paraguay, UTC−3.",
    line: (time, offsets) => `Son las ${time} en Encarnación · ${offsets}`,
    offset: (hours, city) => (hours >= 0 ? `${hours} h adelante de ${city}` : `${-hours} h detrás de ${city}`),
    cities: ["Nueva York", "Berlín"],
  },
  hero: {
    role: "Ingeniero de software",
    country: "Paraguay",
    lead: "Construyo y escalo backends en Rails para startups.",
    experience: "10 años entregando software, más de 7 en Rails en producción, para equipos en Noruega, Estados Unidos, Colombia y Argentina.",
    clients: { before: "Hoy trabajo de forma independiente con ", between: " y ", after: "." },
    focus: "Plataformas de geolocalización, ERPs y APIs para apps móviles. Backend primero, cómodo en todo el stack.",
    status: "Disponible para nuevos clientes y puestos de tiempo completo, en remoto, con equipos de cualquier parte del mundo.",
    emailMe: "Escribime",
    findMe: "Encontrame en",
    today: "Hoy",
  },
  email: {
    copy: "Copiar email",
    copied: "Copiado",
  },
  dates: {
    present: "Presente",
    ongoing: "En curso",
  },
  badges: {
    remote: "Remoto",
    onsite: "Presencial",
    hybrid: "Híbrido",
    fulltime: "Tiempo completo",
    parttime: "Medio tiempo",
    freelance: "Freelance",
  },
  tags: {
    education: "Educación",
    leadership: "Liderazgo",
  },
  chapters: {
    enc: {
      meta: "Encarnación, Paraguay · 2013",
      title: "Bases",
      text: "Informática Empresarial en la Universidad Nacional de Itapúa, mientras desarrollaba software para restaurantes y pymes y dirigía el área de IT de una facultad.",
    },
    lis: {
      meta: "Lisboa, Portugal · 2016",
      title: "Sistemas de Información en Lisboa",
      text: "Sistemas de Información y Gestión Web y Multimedia en la Universidade Nova de Lisboa.",
    },
    bog: {
      meta: "Bogotá, Colombia · 2018 — 2022",
      title: "Backend en Rails y educación",
      text: "En Platzi coordiné contenido de cursos en español, portugués e inglés. En SMART ONE construí el backend en Rails y las APIs de una app de movilidad.",
    },
    remote: {
      meta: "Paraguay · 2022 — 2024",
      title: "Ingeniería remota para equipos internacionales",
      text: "Desde Paraguay, lideré proyectos de geolocalización y ERP para Geotec (Argentina) y entregué proyectos de clientes para Dezerta Labs (California).",
    },
    now: {
      meta: "Encarnación · 2023 — hoy",
      title: "Ingeniero de software independiente",
      text: "Desde Encarnación trabajo con RaceTracker en Noruega y Luxus en Paraguay.",
    },
    world: {
      meta: "11 países · 4 idiomas",
      title: "Idiomas y viajes",
    },
  },
  education: {
    uni: { title: "Licenciatura en Informática Empresarial", place: "Encarnación, Paraguay" },
    nova: { title: "Sistemas de Información, Gestión Web y Multimedia", place: "Lisboa, Portugal" },
  },
  jobs: {
    freelance: {
      title: "Apps de escritorio para pymes y restaurantes",
      place: "Encarnación, Paraguay",
      bullets: [
        "Construí apps de escritorio a medida para operaciones y gestión de clientes.",
        "Sumé Rails para la parte web. Mi primer Ruby en producción.",
      ],
    },
    uniIt: {
      title: "Jefe de IT, Facultad de Ciencias Agropecuarias",
      place: "Encarnación, Paraguay",
      bullets: [
        "Construí y mantuve el sitio web de la facultad.",
        "Administré los servidores y mantuve funcionando cada computadora, hardware y software.",
      ],
    },
    platzi: {
      title: "Director de cursos · Asesor de estudiantes",
      place: "Bogotá, Colombia",
      bullets: [
        "Coordiné docentes de varios países para crear cursos en español, portugués e inglés.",
        "Acompañé a estudiantes y armé contenido y rutas de aprendizaje multilingües.",
      ],
    },
    smartone: {
      title: "Backend Developer",
      place: "Bogotá, Colombia",
      bullets: [
        "Mantuve y mejoré aplicaciones web en producción, rápidas y seguras.",
        "Construí nuevas funcionalidades y las APIs detrás de las apps móviles de la empresa.",
        "Revisé y depuré código de desarrolladores junior.",
      ],
    },
    geotec: {
      title: "Backend Developer",
      place: "Clientes en Europa y Sudamérica",
      bullets: [
        "Lideré proyectos de geolocalización y ERP para clientes en Europa y Sudamérica.",
        "Fui dueño de funcionalidades de backend de punta a punta: rendimiento, escalabilidad y seguridad.",
        "Acompañé a desarrolladores con menos experiencia y revisé su código.",
      ],
    },
    dezerta: {
      title: "Ruby on Rails Engineer",
      place: "Santa Clara, US",
      bullets: [
        "Construí funcionalidades de backend para proyectos de clientes a medida, del modelo de datos a producción.",
        "Optimicé el rendimiento y mantuve las aplicaciones escalables y seguras a medida que cambiaban las necesidades.",
      ],
    },
  },
  independent: {
    org: "Independiente",
    title: "Software Engineer",
    clients: "Clientes",
  },
  clients: {
    racetracker: {
      title: "Software Engineer",
      place: "Noruega · Remoto",
      description: "Inscripción, cronometraje y seguimiento en vivo para organizadores de carreras, desde carreras locales hasta el Norseman Xtreme Triathlon. Trabajo en el backend de Rails y en el front end de React.",
      today: "Software para carreras · Noruega · Remoto",
    },
    luxus: {
      title: "Software Engineer",
      place: "Asunción, Paraguay",
      description: "Software para el principal distribuidor de indumentaria premium de Paraguay: más de 30 marcas internacionales, mayorista en todo el país desde 2011.",
      today: "Distribuidor de moda premium · Paraguay",
    },
  },
  world: {
    levels: { native: "Nativo", fluent: "Fluido", professional: "Profesional" },
    quote: "No tengas miedo de equivocarte. Tené miedo de no intentarlo.",
    passport: "Pasaporte",
    count: "11 países · 3 fueron hogar",
    lived: "Viví",
    visited: "Visité",
    places: {
      PY: "Paraguay",
      PT: "Lisboa",
      CO: "Bogotá",
      BR: "Brasil",
      AR: "Argentina",
      UY: "Uruguay",
      BO: "Bolivia",
      MX: "México",
      PA: "Panamá",
      ES: "España",
      GB: "Inglaterra",
    },
  },
  stack: {
    title: "Stack",
    groups: {
      backend: "Backend",
      data: "Datos",
      frontend: "Frontend",
      cloud: "Cloud · DevOps",
      ai: "IA",
      earlier: "Antes",
    },
  },
  contact: {
    title: "Construyamos algo",
    text: "¿Un backend en Rails para lanzar o escalar? Escribime en English, Español o Português.",
  },
  footer: {
    thanks: "por pasar",
  },
};
