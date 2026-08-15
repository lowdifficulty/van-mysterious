export type NavItem = { href: string; label: string; hidden?: boolean };

export type StillContent = {
  id: string;
  title: string;
  caption: string;
  ratio: string;
  imageUrl?: string;
};

export type SiteBlockType = "text" | "image" | "quote" | "cta" | "contact";

export type SiteBlock = {
  id: string;
  type: SiteBlockType;
  visible: boolean;
  kicker?: string;
  title?: string;
  body?: string;
  buttonLabel?: string;
  buttonHref?: string;
  imageUrl?: string;
  quoteName?: string;
};

export type ExperienceContent = {
  tier: string;
  name: string;
  price: string;
  length: string;
  summary: string;
  includes: string[];
};

export type DiaryEntry = {
  slug: string;
  title: string;
  date: string;
  kicker: string;
  excerpt: string;
  body: string[];
};

export type ReviewContent = {
  quote: string;
  name: string;
  role: string;
};

export type QuestionContent = { q: string; a: string };

export type PageCopy = {
  kicker: string;
  title: string;
  lede: string;
};

export type SiteContent = {
  site: {
    name: string;
    tagline: string;
    blurb: string;
    homeKicker: string;
    homeLede: string;
    footerLine: string;
    footerNote: string;
    seoTitle?: string;
    seoDescription?: string;
    defaultTheme?: "dark" | "light";
    blocks: SiteBlock[];
  };
  nav: NavItem[];
  chapters: NavItem[];
  enter: {
    kicker: string;
    agreeLead: string;
    detailsLead: string;
  };
  about: PageCopy & { paragraphs: string[] };
  gallery: PageCopy & { stills: StillContent[] };
  experiences: PageCopy & { items: ExperienceContent[] };
  diary: PageCopy & { entries: DiaryEntry[] };
  reviews: PageCopy & { items: ReviewContent[] };
  qa: PageCopy & { items: QuestionContent[] };
  contact: PageCopy;
  games: PageCopy & {
    fogKicker: string;
    fogTitle: string;
    fogLede: string;
    matchKicker: string;
    matchTitle: string;
    matchLede: string;
  };
  policies: {
    kicker: string;
    title: string;
    sections: { heading: string; body: string }[];
  };
};
