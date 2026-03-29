export interface TechSection {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

export const techSections: TechSection[] = [
  {
    title: "Construction Monitoring App",
    tagline: "Real-Time Visibility",
    description:
      "Our proprietary construction monitoring app gives clients and project managers real-time visibility into every aspect of the build. Track progress, approve milestones, view photos, and communicate — all from your smartphone.",
    features: [
      "Live progress tracking with photo updates",
      "Milestone approval & quality checkpoints",
      "Budget tracking & payment schedules",
      "Direct messaging with project team",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Digital Design & BIM",
    tagline: "Precision Engineering",
    description:
      "Building Information Modeling (BIM) is at the core of our design process. We create intelligent 3D models that capture every detail — structure, MEP, finishes — enabling clash detection, cost estimation, and seamless coordination before construction begins.",
    features: [
      "3D BIM models for all projects",
      "Clash detection & resolution",
      "Quantity surveying from BIM data",
      "Coordination across design disciplines",
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
  {
    title: "3D Visualization & Walkthroughs",
    tagline: "See Before You Build",
    description:
      "Experience your project before a single brick is laid. Our photorealistic 3D renders and immersive walkthroughs let you explore every room, material, and lighting condition — empowering confident decision-making.",
    features: [
      "Photorealistic exterior & interior renders",
      "Interactive 360° virtual walkthroughs",
      "Material & lighting simulation",
      "VR-ready experience for immersive preview",
    ],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
  },
  {
    title: "Construction Management Platform",
    tagline: "Efficient Execution",
    description:
      "Our integrated construction management platform streamlines project execution with scheduling, resource planning, and quality control. Data-driven insights help us deliver on time and within budget.",
    features: [
      "Gantt charts & scheduling tools",
      "Resource & workforce planning",
      "Quality control checklists",
      "Automated progress reporting",
    ],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
];
