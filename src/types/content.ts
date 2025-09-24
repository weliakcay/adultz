export type PersonaProfile = {
  summary: string;
  traits: string[];
  compatibility: string[];
  voice: string;
};

export type ProductSpecs = {
  heightCm: number;
  weightKg: number;
  material: string;
  skeleton: string;
  options: string[];
};

export type ProductOptions = {
  skinTones: string[];
  hair: string[];
  eyes: string[];
  skeletons?: string[];
  accessories?: string[];
};

export type MediaAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type VideoAsset = {
  src: string;
  alt: string;
  type: "video/mp4" | "video/webm";
};

export type FAQItem = {
  q: string;
  a: string;
};

export type ProductDoll = {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  currency: "TRY";
  leadTimeDays: number;
  persona: PersonaProfile;
  specs: ProductSpecs;
  options: ProductOptions;
  gallery: MediaAsset[];
  videos: VideoAsset[];
  faq: FAQItem[];
};

export type AccessoryCategory = "modern" | "gizli";

export type ProductAccessory = {
  slug: string;
  name: string;
  category: AccessoryCategory;
  price: number;
  badges: string[];
  specs: string;
  gallery: MediaAsset[];
  faq: FAQItem[];
};

export type Post = {
  slug: string;
  title: string;
  cover: MediaAsset;
  excerpt: string;
  content: string;
  readingMinutes: number;
  topics: string[];
  relatedProducts: string[];
};

export type PersonaChatKB = {
  personaId: string;
  system: string;
  kb: string[];
};
