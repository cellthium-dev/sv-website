export interface Badge {
  icon: string;
  text: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export interface Testimonial {
  rating: number;
  text: string;
  author: string;
  meta: string;
}

export interface Article {
  id: string;
  category: string;
  date: string;
  image: string;
  title: string;
  excerpt: string;
  link: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string[];
}

export interface FormData {
  requestType: string;
  customerType: string;
  description: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone: string;
  street?: string;
  zip?: string;
  city?: string;
  preferredTime?: string;
  privacy: boolean;
  newsletter: boolean;
}

export interface BookingData {
  date: Date | null;
  time: string | null;
  appointmentType: string;
}
