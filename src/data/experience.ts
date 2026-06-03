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

// Real career history (sourced from Roberto's LinkedIn, translated to English).
// Roberto: please verify accuracy and what's OK to show publicly.
export const roles: Role[] = [
  {
    company: "SoftServe",
    url: "https://www.softserveinc.com",
    role: "AI Product Manager",
    dateRange: "May 2024 – Present",
    summary:
      "Lead AI product initiatives for enterprise clients, from problem framing and discovery through delivery and adoption — typically across several concurrent client streams.",
    descriptions: [
      "Lead AI product initiatives for enterprise clients across discovery, delivery, and adoption.",
      "Translate ambiguous business problems into shippable, measurable AI products.",
    ],
  },
  {
    company: "SoftServe",
    url: "https://www.softserveinc.com",
    role: "Product Manager",
    dateRange: "Jul 2022 – May 2024",
    descriptions: [
      "Drove product discovery and delivery for enterprise clients at a global technology consultancy.",
      "Partnered with engineering and design to ship solutions to complex business challenges.",
    ],
  },
  {
    company: "Crabi",
    role: "Product Manager",
    dateRange: "Aug 2020 – Jul 2022",
    summary:
      "Crabi is a user-centric digital car insurer in Latin America, using mobile/web and driving-behavior data to personalize premiums.",
    descriptions: [
      "Built the first MVP of instant claim management, reducing claim time up to 5× while driving 4.8/5 customer satisfaction.",
      "Built a claim-management and product dashboard for real-time KPI tracking, reducing man-hours by 20%.",
      "Led the re-architecture enabling users to manage multiple policies from a single account; post-launch user acquisition grew 20%.",
    ],
  },
  {
    company: "Crabi",
    role: "Growth Manager",
    dateRange: "Oct 2019 – Jul 2020",
    descriptions: [
      "Grew monthly revenue 5×.",
      "Built the first sales team from scratch, lifting conversion from 2% to 10%.",
      "Implemented the first omnichannel platform, automating WhatsApp communication and increasing engagement.",
      "Launched the company's first word-of-mouth referral program, increasing referrals by 50%.",
    ],
  },
  {
    company: "Beliveo Corporation",
    role: "Customer Service Agent → Coach → Operations Manager",
    dateRange: "Oct 2015 – Oct 2019",
    summary:
      "Progressed from front-line agent to operations leadership at a contact-center partner to Fortune 100 companies.",
    descriptions: [
      "As Operations Manager, led a 150+ person business unit and co-developed strategic plans with leadership; achieved top-unit ranking for Comcast.",
      "Redesigned key tools and processes, improving efficiency and quality by 25%.",
      "Implemented Lean methodologies across operations, reducing cost and time.",
      "Earlier, as Coach, led a 20-person team to 1st of 10 teams four months running.",
    ],
  },
  {
    company: "Earlier — internships & analysis roles",
    role: "Service Design · Business Intelligence · Quality Analysis",
    dateRange: "2013 – 2018",
    descriptions: [
      "Service Design Intern, ITERA LABS (2018): interviewed 100+ users and ran design sprints toward a new service experience.",
      "Business Intelligence Intern, Proformas Verum (2018): built a company KPI dashboard that informed a decision driving a 10% revenue increase.",
      "Quality Analyst, Toka México (2013–2015): reported on 30+ operational metrics for the executive team and client.",
    ],
  },
];
