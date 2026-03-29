export interface NavChild {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  to: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "About", to: "/about" },
  {
    label: "Architecture",
    to: "/architecture",
    children: [
      { label: "Residential", to: "/architecture?tab=residential" },
      { label: "Commercial", to: "/architecture?tab=commercial" },
      { label: "Industrial", to: "/architecture?tab=industrial" },
      { label: "Urban & Community", to: "/architecture?tab=urban" },
    ],
  },
  {
    label: "Construction",
    to: "/construction",
    children: [
      { label: "Residential", to: "/construction?tab=residential" },
      { label: "Commercial", to: "/construction?tab=commercial" },
      { label: "Industrial", to: "/construction?tab=industrial" },
      { label: "Design-Build", to: "/construction?tab=design-build" },
      { label: "Renovation", to: "/construction?tab=renovation" },
    ],
  },
  { label: "Consulting", to: "/consulting" },
  {
    label: "Interiors",
    to: "/interiors",
    children: [
      { label: "Residential", to: "/interiors?tab=residential" },
      { label: "Commercial", to: "/interiors?tab=commercial" },
      { label: "Industrial", to: "/interiors?tab=industrial" },
      { label: "Home Upgrades", to: "/interiors?tab=home-upgrades" },
    ],
  },
  {
    label: "Innovation",
    to: "/innovation",
    children: [
      { label: "Smart Interior System", to: "/innovation?tab=smart-interior" },
      { label: "Digital Monitoring", to: "/innovation?tab=digital-monitoring" },
      { label: "Sustainable Solutions", to: "/innovation?tab=sustainable" },
      { label: "Future Tech", to: "/innovation?tab=future-tech" },
    ],
  },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Technology", to: "/technology" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];
