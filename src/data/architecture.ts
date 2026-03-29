export interface ServiceTab {
  key: string;
  label: string;
  overview: string;
  services: string[];
}

export const architectureTabs: ServiceTab[] = [
  {
    key: "residential",
    label: "Residential",
    overview:
      "We design homes that reflect the lifestyle, personality, and aspirations of each homeowner. From luxury villas to compact urban apartments, our residential architecture is rooted in engineering-driven precision and aesthetic sensibility.",
    services: [
      "Individual Villas & Bungalows",
      "Apartment Complexes",
      "Farmhouse & Weekend Home Architecture",
      "Duplex & Row Houses",
      "Gated Community Planning",
      "Green & Sustainable Housing",
    ],
  },
  {
    key: "commercial",
    label: "Commercial",
    overview:
      "Our commercial architecture balances brand identity, operational efficiency, and user experience. We design spaces that drive productivity and leave lasting impressions on clients and visitors alike.",
    services: [
      "Office Buildings & Corporate Campuses",
      "Retail Spaces & Showrooms",
      "Hotels & Hospitality Architecture",
      "Restaurants & Cafes",
      "Healthcare & Wellness Facilities",
      "Educational Institutions",
    ],
  },
  {
    key: "industrial",
    label: "Industrial",
    overview:
      "Industrial architecture demands functional precision, safety compliance, and scalability. Our designs optimize workflow, logistics, and environmental sustainability for manufacturing and warehousing facilities.",
    services: [
      "Factory & Manufacturing Units",
      "Warehouse & Logistics Centers",
      "Industrial Parks & SEZs",
      "Cold Storage & Food Processing Units",
      "Pharmaceutical & Cleanroom Facilities",
      "Utility & Infrastructure Buildings",
    ],
  },
  {
    key: "urban",
    label: "Urban & Community",
    overview:
      "We believe architecture shapes communities. Our urban and community projects focus on creating inclusive, livable spaces that foster connection, sustainability, and cultural expression.",
    services: [
      "Township & Master Planning",
      "Community Centers & Clubhouses",
      "Public Parks & Recreation Areas",
      "Mixed-Use Developments",
      "Religious & Cultural Buildings",
      "Urban Renewal & Redevelopment",
    ],
  },
];
