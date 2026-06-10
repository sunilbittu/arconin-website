export interface Project {
  title: string;
  category: "Residential" | "Commercial" | "Interior" | "Construction";
  image: string;
  location: string;
  scope: string;
  area: string;
}

export const projects: Project[] = [
  {
    title: "Research Centre",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    location: "Moinabad, Hyderabad",
    scope: "Research Facility",
    area: "25,000 sqft",
  },
  {
    title: "Kshema General Insurance — Phase I",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    location: "Begumpet, Hyderabad",
    scope: "Turnkey Corporate Office",
    area: "12,500 sqft",
  },
  {
    title: "Kshema General Insurance — Phase II",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    location: "Begumpet, Hyderabad",
    scope: "Turnkey Corporate Office",
    area: "55,000 sqft",
  },
  {
    title: "Legend Chimes",
    category: "Construction",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    location: "Kokapet, Hyderabad",
    scope: "Residential Construction",
    area: "6,900 sqft",
  },
];

export const projectCategories = ["All", "Residential", "Commercial", "Interior", "Construction"] as const;

export interface PortfolioStat {
  value: string;
  label: string;
  detail?: string;
}

export const portfolioStats: PortfolioStat[] = [
  {
    value: "10+",
    label: "Turnkey Villa Interiors",
    detail: "3,700–9,500 sqft each",
  },
  {
    value: "100+",
    label: "2 & 3 BHK Apartment Interiors",
    detail: "Delivered across Hyderabad",
  },
];
