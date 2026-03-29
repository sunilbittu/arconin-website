export interface ServiceTab {
  key: string;
  label: string;
  overview: string;
  services: string[];
}

export const constructionTabs: ServiceTab[] = [
  {
    key: "residential",
    label: "Residential",
    overview:
      "We build homes with engineering precision and an uncompromising eye for quality. From foundation to finishing, every step follows a rigorous process backed by technology-driven project management.",
    services: [
      "Individual Home Construction",
      "Villa & Bungalow Construction",
      "Multi-Story Residential Complexes",
      "Farmhouse & Weekend Home Construction",
      "Gated Community Construction",
      "Turnkey Home Delivery",
    ],
  },
  {
    key: "commercial",
    label: "Commercial",
    overview:
      "Our commercial construction services deliver projects on time and within budget. We leverage modern construction techniques and real-time monitoring to ensure quality at every milestone.",
    services: [
      "Office Building Construction",
      "Retail & Shopping Complex Construction",
      "Hotel & Resort Construction",
      "Hospital & Healthcare Facility Construction",
      "Educational Institution Construction",
      "Convention Centers & Event Spaces",
    ],
  },
  {
    key: "industrial",
    label: "Industrial",
    overview:
      "We construct industrial facilities that meet stringent safety, compliance, and operational standards. Our expertise covers pre-engineered buildings, heavy structures, and specialized infrastructure.",
    services: [
      "Factory & Manufacturing Plant Construction",
      "Warehouse & Distribution Center Construction",
      "Pre-Engineered Building (PEB) Construction",
      "Cold Storage & Food Processing Facility Construction",
      "Infrastructure & Utility Construction",
      "Industrial Renovation & Retrofitting",
    ],
  },
  {
    key: "design-build",
    label: "Design-Build",
    overview:
      "Our integrated design-build approach streamlines the entire project lifecycle — from concept to completion — under one roof. This eliminates coordination gaps, reduces timelines, and ensures design integrity throughout construction.",
    services: [
      "Single-Point Accountability for Design & Construction",
      "Concept-to-Completion Project Delivery",
      "Value Engineering & Cost Optimization",
      "Fast-Track Project Scheduling",
      "Integrated Team Collaboration",
      "Post-Construction Support & Warranty",
    ],
  },
  {
    key: "renovation",
    label: "Renovation",
    overview:
      "We breathe new life into existing structures through thoughtful renovation that respects the original character while upgrading functionality, aesthetics, and compliance to modern standards.",
    services: [
      "Residential Renovation & Remodeling",
      "Commercial Space Renovation",
      "Heritage & Conservation Restoration",
      "Structural Strengthening & Retrofitting",
      "Facade & Exterior Upgrades",
      "Complete Interior Overhaul",
    ],
  },
];
