export type Badge = {
  icon: string;
  text: string;
};

export type Service = {
  icon: string;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
};

export type Testimonial = {
  rating: number;
  text: string;
  author: string;
  meta: string;
};

export type Article = {
  id: string;
  category: string;
  date: string;
  image: string;
  title: string;
  excerpt: string;
  link: string;
};

export type TimelineItem = {
  date: string;
  title: string;
  company: string;
  description: string[];
};

export type FormData = {
  // Step 1 – Anliegen
  requestType: string;
  // Step 2 – Anlage
  customerType: string;
  zip: string;
  kwp: string;
  baujahr: string;
  // Context-specific Anlage fields
  aktenzeichen: string;
  schadenstag: string;
  installationsart: string;
  speichertyp: string;
  gegenstand: string;
  themenfeld: string;
  // Step 3 – Details
  description: string;
  // Step 4 – Kontakt
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  contactMethod: string;
  preferredTime: string;
  privacy: boolean;
  newsletter: boolean;
};

export type BookingData = {
  date: Date | null;
  time: string | null;
  appointmentType: string;
};
