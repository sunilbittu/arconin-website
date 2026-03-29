export interface ServiceTab {
  key: string;
  label: string;
  overview: string;
  services: string[];
}

export const interiorsTabs: ServiceTab[] = [
  {
    key: "residential",
    label: "Residential",
    overview:
      "We create home interiors that are deeply personal, functional, and aesthetically refined. Every room is designed to reflect the lifestyle and personality of its inhabitants.",
    services: [
      "Living Room & Family Space Design",
      "Bedroom & Private Suite Design",
      "Kitchen & Dining Design",
      "Bathroom & Spa Design",
      "Home Office & Study Design",
      "Pooja Room & Cultural Spaces",
    ],
  },
  {
    key: "commercial",
    label: "Commercial",
    overview:
      "Our commercial interiors are designed to enhance brand identity, boost productivity, and create memorable experiences for employees and visitors.",
    services: [
      "Corporate Office Interiors",
      "Retail Store & Showroom Design",
      "Restaurant & Cafe Interiors",
      "Hotel & Hospitality Interiors",
      "Healthcare & Wellness Interiors",
      "Co-working & Flex Space Design",
    ],
  },
  {
    key: "industrial",
    label: "Industrial",
    overview:
      "Functional, safe, and compliant — our industrial interiors optimize workflow and employee well-being while meeting stringent operational standards.",
    services: [
      "Factory & Workshop Interiors",
      "Warehouse Office & Control Room Design",
      "Cleanroom & Lab Interiors",
      "Cafeteria & Break Room Design",
      "Reception & Visitor Areas",
      "Safety & Signage Systems",
    ],
  },
  {
    key: "home-upgrades",
    label: "Home Upgrades",
    overview:
      "Refresh your living spaces without a full renovation. Our home upgrade services focus on impactful transformations — new finishes, smart storage, lighting upgrades, and modern fixtures.",
    services: [
      "Kitchen Makeover & Modular Upgrades",
      "Bathroom Refresh & Fixture Upgrades",
      "Wardrobe & Storage Solutions",
      "Lighting & Ambiance Upgrades",
      "Wall Treatment & Accent Walls",
      "Smart Home Integration",
    ],
  },
];
