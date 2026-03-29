export interface Position {
  num: string;
  title: string;
  type: string;
  location: string;
  description: string;
  responsibilities: string[];
}

export const positions: Position[] = [
  {
    num: "01",
    title: "Architects",
    type: "Full-time",
    location: "Hyderabad",
    description:
      "Join our architecture team to design residential, commercial, and industrial projects that push creative and engineering boundaries.",
    responsibilities: [
      "Develop architectural designs from concept to construction documentation",
      "Collaborate with engineering and interior design teams",
      "Conduct site analysis and feasibility studies",
      "Present design proposals to clients",
      "Ensure compliance with building codes and regulations",
    ],
  },
  {
    num: "02",
    title: "Civil Engineers",
    type: "Full-time",
    location: "Hyderabad",
    description:
      "We're looking for skilled civil engineers to manage and execute construction projects with precision, safety, and efficiency.",
    responsibilities: [
      "Plan and oversee construction operations on-site",
      "Ensure quality control and safety compliance",
      "Coordinate with architects, consultants, and contractors",
      "Monitor project timelines and budgets",
      "Implement technology-driven project management tools",
    ],
  },
  {
    num: "03",
    title: "Interior Designers",
    type: "Full-time",
    location: "Hyderabad",
    description:
      "Create stunning interior spaces that balance aesthetics, functionality, and client vision. Work on residential, commercial, and hospitality projects.",
    responsibilities: [
      "Develop interior design concepts and mood boards",
      "Select materials, finishes, furniture, and fixtures",
      "Create detailed drawings and 3D visualizations",
      "Coordinate with architects and construction teams",
      "Manage client relationships and design presentations",
    ],
  },
  {
    num: "04",
    title: "Project Managers",
    type: "Full-time",
    location: "Hyderabad",
    description:
      "Lead projects from inception to completion. We need experienced project managers who can drive timelines, budgets, and quality across multiple projects.",
    responsibilities: [
      "End-to-end project planning and execution",
      "Client communication and stakeholder management",
      "Budget management and cost control",
      "Team coordination and resource allocation",
      "Risk assessment and mitigation strategies",
    ],
  },
  {
    num: "05",
    title: "Sales & Marketing",
    type: "Full-time",
    location: "Hyderabad",
    description:
      "Drive business growth through strategic marketing and client acquisition. Build relationships and promote ARCONIN's brand across Hyderabad and beyond.",
    responsibilities: [
      "Develop and execute marketing strategies",
      "Generate leads and manage client pipelines",
      "Create marketing content and brand collateral",
      "Build and maintain client relationships",
      "Represent ARCONIN at industry events and exhibitions",
    ],
  },
];
