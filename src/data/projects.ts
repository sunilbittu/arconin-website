export interface Project {
  title: string;
  category: "Residential" | "Commercial" | "Interior" | "Construction";
  image: string;
  location: string;
  scope: string;
  timeline: string;
}

export const projects: Project[] = [
  {
    title: "The Glass Pavilion",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    location: "Jubilee Hills, Hyderabad",
    scope: "Architecture & Interiors",
    timeline: "12 Months",
  },
  {
    title: "Horizon Tower",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    location: "HITEC City, Hyderabad",
    scope: "Full Design-Build",
    timeline: "24 Months",
  },
  {
    title: "Serene Living",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    location: "Banjara Hills, Hyderabad",
    scope: "Interior Design & Execution",
    timeline: "6 Months",
  },
  {
    title: "Urban Loft Studio",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    location: "Gachibowli, Hyderabad",
    scope: "Renovation & Interior Design",
    timeline: "4 Months",
  },
  {
    title: "Minimalist Villa",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    location: "Shamshabad, Hyderabad",
    scope: "Architecture & Construction",
    timeline: "18 Months",
  },
  {
    title: "The Nexus Office",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    location: "Madhapur, Hyderabad",
    scope: "Full Design-Build",
    timeline: "14 Months",
  },
  {
    title: "Heritage Restoration",
    category: "Construction",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    location: "Old City, Hyderabad",
    scope: "Renovation & Restoration",
    timeline: "10 Months",
  },
  {
    title: "Green Haven Apartments",
    category: "Construction",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    location: "Kondapur, Hyderabad",
    scope: "Residential Construction",
    timeline: "30 Months",
  },
];

export const projectCategories = ["All", "Residential", "Commercial", "Interior", "Construction"] as const;
