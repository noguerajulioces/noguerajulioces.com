import type { Messages } from "./en";

export const pt: Messages = {
  meta: {
    title: "Julio Noguera · Engenheiro de software",
    description: "Engenheiro de software independente do Paraguai. Construo e escalo backends em Rails para startups.",
  },
  nav: {
    label: "Seções",
    about: "Sobre",
    journey: "Trajetória",
    now: "Agora",
    languages: "Idiomas",
    stack: "Stack",
    contact: "Contato",
  },
  controls: {
    language: "Idioma: ",
    theme: "Mudar tema",
  },
  clock: {
    label: "Hora local em Encarnación",
    zone: "Encarnación · UTC−3",
    fallback: "Julio trabalha do Paraguai, UTC−3.",
    line: (time, offsets) => `São ${time} em Encarnación · ${offsets}`,
    offset: (hours, city) => (hours >= 0 ? `${hours} h à frente de ${city}` : `${-hours} h atrás de ${city}`),
    cities: ["Nova York", "Berlim"],
  },
  hero: {
    role: "Engenheiro de software independente",
    country: "Paraguay",
    lead: "Construo e escalo backends em Rails para startups.",
    experience: "10 anos entregando software, mais de 7 em Rails em produção, para times na Noruega, nos Estados Unidos, na Colômbia e na Argentina.",
    clients: { before: "Hoje trabalho de forma independente com a ", between: " e a ", after: "." },
    focus: "Plataformas de geolocalização, ERPs e APIs para apps móveis. Backend primeiro, à vontade em todo o stack.",
    status: "Disponível para novos clientes e vagas em tempo integral, remoto, com times de qualquer lugar do mundo.",
    emailMe: "Me escreva",
    findMe: "Me encontre no",
    today: "Hoje",
  },
  email: {
    copy: "Copiar email",
    copied: "Copiado",
  },
  dates: {
    present: "Atual",
    ongoing: "Em andamento",
  },
  badges: {
    remote: "Remoto",
    onsite: "Presencial",
    hybrid: "Híbrido",
    fulltime: "Tempo integral",
    parttime: "Meio período",
    freelance: "Freelance",
  },
  tags: {
    education: "Educação",
    leadership: "Liderança",
  },
  chapters: {
    enc: {
      meta: "Encarnación, Paraguai · 2013",
      title: "Fundamentos",
      text: "Informática Empresarial na Universidad Nacional de Itapúa, enquanto desenvolvia software para restaurantes e pequenas empresas e coordenava a TI de uma faculdade.",
    },
    lis: {
      meta: "Lisboa, Portugal · 2016",
      title: "Sistemas de Informação em Lisboa",
      text: "Sistemas de Informação e Gestão Web e Multimídia na Universidade Nova de Lisboa.",
    },
    bog: {
      meta: "Bogotá, Colômbia · 2018 — 2022",
      title: "Backend em Rails e educação",
      text: "Na Platzi coordenei conteúdo de cursos em espanhol, português e inglês. Na SMART ONE construí o backend em Rails e as APIs de um app de mobilidade.",
    },
    remote: {
      meta: "Paraguai · 2022 — 2024",
      title: "Engenharia remota para times internacionais",
      text: "Do Paraguai, liderei projetos de geolocalização e ERP para a Geotec (Argentina) e entreguei projetos de clientes para a Dezerta Labs (Califórnia).",
    },
    now: {
      meta: "Encarnación · 2023 — hoje",
      title: "Engenheiro de software independente",
      text: "De Encarnación trabalho com a RaceTracker na Noruega e a Luxus no Paraguai.",
    },
    world: {
      meta: "11 países · 4 idiomas",
      title: "Idiomas e viagens",
    },
  },
  education: {
    uni: { title: "Licenciatura em Informática Empresarial", place: "Encarnación, Paraguay" },
    nova: { title: "Sistemas de Informação, Gestão Web e Multimídia", place: "Lisboa, Portugal" },
  },
  jobs: {
    freelance: {
      title: "Apps desktop para pequenas empresas e restaurantes",
      place: "Encarnación, Paraguay",
      bullets: [
        "Construí apps desktop sob medida para operações e gestão de clientes.",
        "Adicionei Rails para a parte web. Meu primeiro Ruby em produção.",
      ],
    },
    uniIt: {
      title: "Chefe de TI, Faculdade de Ciências Agrárias",
      place: "Encarnación, Paraguay",
      bullets: [
        "Construí e mantive o site da faculdade.",
        "Administrei os servidores e mantive cada computador funcionando, hardware e software.",
      ],
    },
    platzi: {
      title: "Diretor de cursos · Orientador de alunos",
      place: "Bogotá, Colombia",
      bullets: [
        "Coordenei professores de vários países para criar cursos em espanhol, português e inglês.",
        "Apoiei alunos e criei conteúdo e trilhas de aprendizagem multilíngues.",
      ],
    },
    smartone: {
      title: "Backend Developer",
      place: "Bogotá, Colombia",
      bullets: [
        "Mantive e melhorei aplicações web em produção, rápidas e seguras.",
        "Construí novas funcionalidades e as APIs por trás dos apps móveis da empresa.",
        "Revisei e depurei código de desenvolvedores júnior.",
      ],
    },
    geotec: {
      title: "Backend Developer",
      place: "Clientes na Europa e na América do Sul",
      bullets: [
        "Liderei projetos de geolocalização e ERP para clientes na Europa e na América do Sul.",
        "Fui dono de funcionalidades de backend de ponta a ponta: performance, escalabilidade e segurança.",
        "Fui mentor de desenvolvedores menos experientes e revisei o código deles.",
      ],
    },
    dezerta: {
      title: "Ruby on Rails Engineer",
      place: "Santa Clara, US",
      bullets: [
        "Construí funcionalidades de backend para projetos de clientes sob medida, do modelo de dados à produção.",
        "Otimizei a performance e mantive as aplicações escaláveis e seguras conforme as necessidades mudavam.",
      ],
    },
  },
  independent: {
    org: "Independente",
    title: "Software Engineer",
    clients: "Clientes",
  },
  clients: {
    racetracker: {
      title: "Software Engineer",
      place: "Noruega · Remoto",
      description: "Inscrição, cronometragem e rastreamento ao vivo para organizadores de provas, de corridas locais ao Norseman Xtreme Triathlon. Trabalho no backend em Rails e no front end em React.",
      today: "Software para corridas · Noruega · Remoto",
    },
    luxus: {
      title: "Software Engineer",
      place: "Asunción, Paraguay",
      description: "Software para a principal distribuidora de moda premium do Paraguai: mais de 30 marcas internacionais, atacado em todo o país desde 2011.",
      today: "Distribuidora de moda premium · Paraguai",
    },
  },
  world: {
    levels: { native: "Nativo", fluent: "Fluente", professional: "Profissional" },
    quote: "Não tenha medo de errar. Tenha medo de não tentar.",
    passport: "Passaporte",
    count: "11 países · 3 foram lar",
    lived: "Morei",
    visited: "Visitei",
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
      ES: "Espanha",
      GB: "Inglaterra",
    },
  },
  stack: {
    title: "Stack",
    groups: {
      backend: "Backend",
      data: "Dados",
      frontend: "Frontend",
      cloud: "Cloud · DevOps",
      ai: "IA",
      earlier: "Antes",
    },
  },
  contact: {
    title: "Vamos construir algo",
    text: "Um backend em Rails para lançar ou escalar? Me escreva em English, Español ou Português.",
  },
  footer: {
    thanks: "pela visita",
  },
};
