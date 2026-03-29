export interface ServiceTab {
  key: string;
  label: string;
  overview: string;
  features: string[];
}

export const innovationTabs: ServiceTab[] = [
  {
    key: "smart-interior",
    label: "Smart Interior System",
    overview:
      "Our proprietary Smart Interior System integrates IoT, automation, and intelligent design to create spaces that adapt to your lifestyle. Control lighting, climate, security, and entertainment from a single interface.",
    features: [
      "Automated Lighting & Climate Control",
      "Voice-Activated Room Management",
      "Smart Security & Access Systems",
      "Energy Monitoring & Optimization",
      "Integrated Entertainment Systems",
      "Personalized Scene & Mood Settings",
    ],
  },
  {
    key: "digital-monitoring",
    label: "Digital Monitoring",
    overview:
      "Real-time construction monitoring through our digital platform. Track progress, manage quality, and stay informed — all from your phone. Our monitoring app gives clients unprecedented visibility into their project.",
    features: [
      "Real-Time Progress Tracking Dashboard",
      "Photo & Video Documentation",
      "Milestone & Quality Checkpoints",
      "Automated Report Generation",
      "Client Communication Portal",
      "Budget & Timeline Alerts",
    ],
  },
  {
    key: "sustainable",
    label: "Sustainable Solutions",
    overview:
      "Sustainability isn't an afterthought — it's embedded in our design DNA. We integrate green building practices, energy-efficient systems, and eco-friendly materials into every project.",
    features: [
      "Solar & Renewable Energy Integration",
      "Rainwater Harvesting Systems",
      "Green Building Certification (IGBC/LEED)",
      "Sustainable Material Sourcing",
      "Waste Reduction & Recycling Programs",
      "Energy-Efficient HVAC & Insulation",
    ],
  },
  {
    key: "future-tech",
    label: "Future Tech",
    overview:
      "We're constantly exploring emerging technologies to push the boundaries of architecture and construction. From 3D printing to AI-driven design, we bring the future of building to life.",
    features: [
      "3D Printing for Construction Components",
      "AI-Powered Design Optimization",
      "Digital Twin Technology for Buildings",
      "Drone-Based Site Surveying",
      "AR/VR Design Visualization",
      "Predictive Maintenance Systems",
    ],
  },
];
