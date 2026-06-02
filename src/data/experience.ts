export interface Role {
  company: string;
  url?: string;
  logo?: string;
  role: string;
  dateRange: string;
  summary?: string;
  projects?: string[];
  descriptions: string[];
}

// Placeholder roles for S10 foundation. Real career history lands in S15 (resume).
export const roles: Role[] = [
  {
    company: "SoftServe",
    url: "https://www.softserveinc.com",
    role: "AI Product Manager",
    dateRange: "Current",
    summary:
      "Lead AI product initiatives for enterprise clients — from problem framing and discovery through delivery and adoption — typically across several concurrent client streams.",
    projects: ["softserve-ai-pm"],
    descriptions: [
      "Lead AI product initiatives for enterprise clients across discovery, delivery, and adoption.",
      "Translate ambiguous business problems into shippable, measurable AI products.",
    ],
  },
];
