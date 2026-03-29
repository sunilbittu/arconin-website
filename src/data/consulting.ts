export interface ConsultingSection {
  title: string;
  description: string;
  points: string[];
}

export const consultingSections: ConsultingSection[] = [
  {
    title: "Architectural Design Consultancy",
    description:
      "Expert guidance on building design, spatial planning, and regulatory compliance. We help you navigate complex design decisions with clarity and confidence.",
    points: [
      "Site Analysis & Feasibility Studies",
      "Building Design & Documentation",
      "Regulatory & Compliance Advisory",
      "Sustainability & Green Building Consulting",
    ],
  },
  {
    title: "Interior Design Consultancy",
    description:
      "Transform your interiors with professional design consultancy that balances aesthetics, functionality, and budget. From concept to material selection, we guide every detail.",
    points: [
      "Space Planning & Layout Optimization",
      "Material & Finish Selection",
      "Lighting & Ambiance Design",
      "Furniture & Decor Curation",
    ],
  },
  {
    title: "Engineering Consultancy",
    description:
      "Structural, MEP, and civil engineering expertise to ensure your project is safe, efficient, and built to last. We bring engineering precision to every decision.",
    points: [
      "Structural Engineering Analysis",
      "MEP (Mechanical, Electrical, Plumbing) Design",
      "Civil & Foundation Engineering",
      "Quality Assurance & Testing Protocols",
    ],
  },
  {
    title: "Project Planning & Management",
    description:
      "End-to-end project planning that keeps your build on track, on budget, and on quality. We apply tech-driven management tools to eliminate delays and cost overruns.",
    points: [
      "Project Scheduling & Timeline Management",
      "Budget Planning & Cost Control",
      "Vendor & Contractor Coordination",
      "Risk Assessment & Mitigation",
    ],
  },
  {
    title: "Design Review & Value Engineering",
    description:
      "Independent review of existing designs to optimize cost, performance, and buildability. We identify opportunities to improve without compromising quality.",
    points: [
      "Design Audit & Performance Review",
      "Cost Optimization Strategies",
      "Buildability & Constructability Analysis",
      "Material Substitution & Sourcing Advisory",
    ],
  },
  {
    title: "Turnkey Advisory Services",
    description:
      "Comprehensive advisory for clients seeking a complete, hands-off experience. We manage everything from design to handover, providing expert guidance at every stage.",
    points: [
      "Complete Project Advisory (Design to Handover)",
      "Stakeholder Communication & Reporting",
      "Procurement & Supply Chain Advisory",
      "Post-Completion Support & Maintenance Planning",
    ],
  },
  {
    title: "Smart Monitoring & Technology Integration",
    description:
      "Leverage cutting-edge technology to monitor, manage, and optimize your construction project. Our smart tools provide real-time visibility and data-driven decision making.",
    points: [
      "Real-Time Construction Monitoring App",
      "Digital Twin & BIM Implementation",
      "IoT-Based Site Safety Systems",
      "Data Analytics & Progress Dashboards",
    ],
  },
];
