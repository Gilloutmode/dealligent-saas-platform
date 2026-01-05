// =============================================================================
// DEALIGENT PLATFORM - MARKET INTELLIGENCE
// Competitive Intelligence & Deal Analytics
// =============================================================================

export const companyInfo = {
  name: "Dealigent",
  brandName: "Dealigent",
  productName: "Dealigent Intelligence",
  logo: "⚡",
  tagline: "AI-Powered Market Intelligence Platform",
  description: "Next-generation competitive intelligence platform with AI-driven insights and deal analytics",
  category: "AI-powered competitive intelligence and market analysis platform",
  website: "https://dealigent.ai",
  founded: 2024,
  headquarters: "Global",
  deploymentOptions: ["Cloud", "Enterprise", "On-premise"],
}

export const targetIndustries = [
  {
    name: "Aerospace",
    priority: "Tier 1",
    icon: "✈️",
    subsegments: ["Commercial aircraft", "Military aircraft", "Engines", "Structures"],
    profiles: "Large OEMs and Tier-1 suppliers (Airbus, Safran)",
    partTypes: "Structural brackets, protective housings, thermal/fluidic components",
    challenges: "Weight reduction with certification constraints",
  },
  {
    name: "Space",
    priority: "NewSpace Start-ups",
    icon: "🚀",
    subsegments: ["Small satellites", "Propulsion", "Structures", "Pressure systems"],
    profiles: "Primes and specialized component suppliers, mostly small companies and start-ups",
    partTypes: "Pressurized tanks, lightweight brackets, thermal management parts",
    challenges: "Miniaturization, fast design iteration, mass constraints",
  },
  {
    name: "Defense",
    priority: "Tier 1",
    icon: "🛡️",
    subsegments: ["Land systems", "Naval", "Missiles", "Drones"],
    profiles: "Large primes and Tier-1 integrators",
    partTypes: "Structural and protective parts, high-reliability housings",
    challenges: "Performance under extreme conditions, long lifecycle support",
  },
  {
    name: "Automotive",
    priority: "Tier 1",
    icon: "🚗",
    subsegments: ["EV and hybrid powertrain", "Industrial vehicle platforms"],
    profiles: "Global OEMs and Tier-1 suppliers",
    partTypes: "Castable gearbox housings, structural brackets, thermal parts",
    challenges: "Short development cycles, cost and weight trade-offs at scale",
  },
]

export const competitors = [
  { id: "ntop", name: "nTop", website: "https://www.ntop.com/", threatLevel: "high", marketShare: 25, description: "Plateforme de design génératif avec moteur géométrique implicite" },
  { id: "ptc-creo", name: "PTC Creo Generative Design", website: "https://www.ptc.com/", threatLevel: "high", marketShare: 20, description: "Module de design génératif intégré à l'écosystème PTC" },
  { id: "altair-inspire", name: "Altair Inspire", website: "https://altair.com/inspire/", threatLevel: "medium", marketShare: 18, description: "Solution d'optimisation topologique et simulation" },
  { id: "dassault-catia", name: "Dassault CATIA", website: "https://www.3ds.com/", threatLevel: "high", marketShare: 22, description: "Suite CAO enterprise avec capacités génératives" },
  { id: "autodesk-fusion", name: "Autodesk Fusion 360", website: "https://www.autodesk.com/", threatLevel: "medium", marketShare: 15, description: "Plateforme cloud CAO/FAO avec design génératif" },
  { id: "siemens-nx", name: "Siemens NX", website: "https://plm.sw.siemens.com/", threatLevel: "medium", marketShare: 17, description: "Solution PLM intégrée avec optimisation topologique" },
  { id: "infinitform", name: "InfinitForm", website: "https://infinitform.com/", threatLevel: "low", marketShare: 5, description: "Startup design génératif en mode stealth" },
  { id: "ansys-discovery", name: "Ansys Discovery", website: "https://www.ansys.com/", threatLevel: "medium", marketShare: 12, description: "Simulation en temps réel avec optimisation" },
]

export const features = [
  {
    category: "Generative Design",
    name: "Topology Optimization",
    differentiator: false,
    description: "Optimizes material distribution to meet structural objectives under constraints",
    value: "Faster identification of high-performance lightweight concepts",
    icon: "🔷",
  },
  {
    category: "Generative Design",
    name: "Topology Weaving",
    differentiator: true,
    description: "Stress-based structural path generation with geometry parametric control",
    value: "Fastest early-stage lightweight concept generation",
    icon: "🕸️",
  },
  {
    category: "Generative Design",
    name: "Topology Enclosure",
    differentiator: true,
    description: "Creates protective and housing concepts within packaging constraints",
    value: "Rapid generation of robust protection parts with manufacturability awareness",
    icon: "📦",
  },
  {
    category: "Manufacturing-driven Design",
    name: "Design for AM",
    differentiator: false,
    description: "Embeds AM constraints early (overhangs, supports, build orientation)",
    value: "Reduces AM redesign loops",
    icon: "🖨️",
  },
  {
    category: "Manufacturing-driven Design",
    name: "Design for Casting",
    differentiator: true,
    description: "Guides geometry to satisfy casting manufacturability requirements",
    value: "Improves first-time-right castability",
    icon: "🔧",
  },
  {
    category: "Manufacturing-driven Design",
    name: "Design for Machining",
    differentiator: true,
    description: "Assesses and guides machinability constraints within design iterations",
    value: "Improves feasibility and reduces CAM rework",
    icon: "⚙️",
  },
  {
    category: "Design Exploration",
    name: "Design Explorer",
    differentiator: true,
    description: "Tracks iterations and KPIs, compares variants with visual interface",
    value: "Reduces the need to rely on Excel sheets to track design iterations",
    icon: "📊",
  },
  {
    category: "Analysis",
    name: "Costing",
    differentiator: true,
    description: "Estimates manufacturing cost based on material, quantity, process",
    value: "Improves program cost-effectiveness",
    icon: "💰",
  },
  {
    category: "Analysis",
    name: "Carbon Footprint",
    differentiator: true,
    description: "Estimates carbon footprint based on material and manufacturing process",
    value: "Helps achieve sustainability objectives",
    icon: "🌱",
  },
]

export const customers = {
  won: [
    {
      name: "Toyota",
      type: "OEM",
      industry: "Automotive",
      dealValue: 70000,
      product: "Custom App",
      useCase: "Casting manufacturing project",
      logo: "🚗",
    },
    {
      name: "Orano",
      type: "Enterprise",
      industry: "Energy",
      dealValue: 56380,
      product: "Design",
      useCase: "Nuclear spare parts management",
      logo: "⚡",
    },
    {
      name: "Adidas",
      type: "Enterprise",
      industry: "Consumer Goods",
      dealValue: 48000,
      product: "Engineering Services",
      useCase: "Product design optimization",
      logo: "👟",
    },
    {
      name: "SAMC (Safran)",
      type: "Enterprise",
      industry: "Aerospace",
      dealValue: 40000,
      product: "Engineering Services",
      useCase: "Engineering methodology project",
      logo: "✈️",
    },
    {
      name: "Potez Aeronautique",
      type: "Enterprise",
      industry: "Aerospace",
      dealValue: 42500,
      product: "Engineering Services",
      useCase: "Aerospace engineering",
      logo: "🛩️",
    },
    {
      name: "ARQUUS",
      type: "Enterprise",
      industry: "Defense",
      dealValue: 20000,
      product: "Design",
      useCase: "Defense vehicle lightweighting",
      logo: "🛡️",
    },
    {
      name: "Liebherr",
      type: "Enterprise",
      industry: "Industrial",
      dealValue: 16500,
      product: "Engineering Services",
      useCase: "Hydraulic valve optimization",
      logo: "🏗️",
    },
    {
      name: "SODERN",
      type: "Enterprise",
      industry: "Aerospace",
      dealValue: 10000,
      product: "Design",
      useCase: "Space optronics lightweighting",
      logo: "🛰️",
    },
  ],
  pipeline: [
    {
      name: "Logitech",
      type: "Enterprise",
      industry: "Consumer Goods",
      dealValue: 30000,
      stage: "PO Received",
      probability: 90,
      useCase: "Mouse material optimization",
      logo: "🖱️",
    },
    {
      name: "MBDA",
      type: "Enterprise",
      industry: "Defense",
      dealValue: 8500,
      stage: "PO Received",
      probability: 90,
      useCase: "Missile systems lightweighting",
      logo: "🚀",
    },
    {
      name: "Safran Power Units",
      type: "Enterprise",
      industry: "Aerospace",
      dealValue: 45000,
      stage: "PO Received",
      probability: 85,
      useCase: "Engine components design",
      logo: "⚡",
    },
    {
      name: "Tetra Pak",
      type: "Enterprise",
      industry: "Industrial",
      dealValue: 50000,
      stage: "PO Received",
      probability: 85,
      useCase: "Jaw optimization",
      logo: "📦",
    },
    {
      name: "Thales Alenia Space",
      type: "Enterprise",
      industry: "Aerospace",
      dealValue: 10000,
      stage: "PO Received",
      probability: 80,
      useCase: "Satellite bracket optimization",
      logo: "🛰️",
    },
    {
      name: "Airbus",
      type: "OEM",
      industry: "Aerospace",
      dealValue: 30000,
      stage: "NDA Signed",
      probability: 60,
      useCase: "Titanium structural brackets",
      logo: "✈️",
    },
    {
      name: "Dyson",
      type: "Enterprise",
      industry: "Consumer Goods",
      dealValue: 20000,
      stage: "Quote Sent",
      probability: 50,
      useCase: "Impeller structural optimization",
      logo: "🌀",
    },
    {
      name: "Sauber F1",
      type: "Enterprise",
      industry: "Automotive",
      dealValue: 10000,
      stage: "New Deal",
      probability: 40,
      useCase: "Motorsport DfAM",
      logo: "🏎️",
    },
  ],
}

export const personas = [
  {
    title: "Mechanical/Design Engineer",
    seniority: "Individual Contributor",
    goals: "Shorten design loops, explore options rapidly, ensure manufacturability early",
    painPoints: "Late manufacturability checks, slow iteration across CAD/CAE/MFG, limited time for innovation",
    kpis: ["Time-to-design", "Iteration count", "Part performance vs spec", "First-time-right rate"],
    icon: "👷",
  },
  {
    title: "Simulation Engineer",
    seniority: "Individual Contributor",
    goals: "Provide rapid performance feedback and validate design trade-offs",
    painPoints: "Disconnected models, repetitive setup, late-stage redesign due to performance misses",
    kpis: ["Simulation turnaround time", "Correlation quality", "Number of loops avoided"],
    icon: "🔬",
  },
  {
    title: "Mechanical Engineering Manager",
    seniority: "Manager",
    goals: "Deliver programs on time with fewer redesign cycles and better resource allocation",
    painPoints: "Siloed teams, lack of iteration visibility, dependence on a few experts",
    kpis: ["Schedule adherence", "Engineering hours per part", "Knowledge reuse rate"],
    icon: "👔",
  },
  {
    title: "CTO / VP Engineering",
    seniority: "Executive",
    goals: "Standardize and scale best practices, de-risk new architectures, maintain competitive advantage",
    painPoints: "Tool sprawl, integration risk, change management across sites",
    kpis: ["Productivity at scale", "Platform adoption", "IP reuse", "Program risk reduction"],
    icon: "🎯",
  },
]

export const kpiMetrics = {
  timeSavings: {
    label: "Time Savings",
    value: "56-112h",
    description: "per part on average",
    details: [
      "Pressurized Space Tank: 7 days saved (10x faster)",
      "Aircraft bracket: 56 hours saved (3x faster)",
      "Gearbox Housing: 112 hours saved (10x faster)",
    ],
  },
  costSavings: {
    label: "Cost Savings",
    value: "€15,000+",
    description: "per part on average",
    details: [
      "€4,000 engineering hours saved",
      "€5,000 prototyping savings",
      "Avoided rework costs",
    ],
  },
  productivityGain: {
    label: "Productivity Gain",
    value: "60-85%",
    description: "improvement",
    details: [
      "Aircraft bracket: 85% time reduction",
      "10x more concepts evaluated in same time",
      "Multiple models per day vs one per week",
    ],
  },
  weightReduction: {
    label: "Weight Reduction",
    value: "30-45%",
    description: "average mass savings",
    details: [
      "96% displacement reduction",
      "85% Von Mises stress reduction",
      "30% weight reduction vs machining design",
    ],
  },
}

// Dashboard stats derived from customer data
export const dashboardStats = {
  totalPipelineValue: customers.pipeline.reduce((sum, c) => sum + c.dealValue, 0),
  wonDealsValue: customers.won.reduce((sum, c) => sum + c.dealValue, 0),
  activeDeals: customers.pipeline.length,
  wonDeals: customers.won.length,
  averageDealSize: Math.round(
    (customers.won.reduce((sum, c) => sum + c.dealValue, 0) +
     customers.pipeline.reduce((sum, c) => sum + c.dealValue, 0)) /
    (customers.won.length + customers.pipeline.length)
  ),
  competitorCount: competitors.length,
  featureCount: features.length,
  industryCount: targetIndustries.length,
}

// Recent activity feed
export const recentActivity = [
  {
    type: "deal_won",
    title: "Deal Won: Toyota Casting Project",
    description: "€70,000 - Casting manufacturing project closed",
    timestamp: "2025-01-03T14:30:00Z",
    icon: "🎉",
  },
  {
    type: "po_received",
    title: "PO Received: Logitech",
    description: "€30,000 - Mouse material optimization project",
    timestamp: "2025-01-02T10:15:00Z",
    icon: "📄",
  },
  {
    type: "competitor_alert",
    title: "Competitor Activity: nTop",
    description: "nTop launched new lattice optimization feature",
    timestamp: "2025-01-01T16:45:00Z",
    icon: "⚠️",
  },
  {
    type: "meeting",
    title: "Meeting: Airbus Technical Review",
    description: "Deep dive on titanium bracket optimization",
    timestamp: "2024-12-30T09:00:00Z",
    icon: "📅",
  },
  {
    type: "analysis_complete",
    title: "Analysis Complete: Safran Power Units",
    description: "Engine components thermal analysis finished",
    timestamp: "2024-12-28T11:30:00Z",
    icon: "✅",
  },
]

// Watchlist data
export const watchlistItems = [
  {
    competitor: competitors[0], // nTop
    lastUpdate: "2025-01-03",
    alerts: 3,
    score: 85,
    trend: "up",
    recentChanges: ["New lattice feature", "Partnership with Siemens", "Price increase 15%"],
  },
  {
    competitor: competitors[1], // PTC Creo
    lastUpdate: "2025-01-02",
    alerts: 1,
    score: 78,
    trend: "stable",
    recentChanges: ["Cloud version launched"],
  },
  {
    competitor: competitors[2], // Altair Inspire
    lastUpdate: "2024-12-28",
    alerts: 2,
    score: 72,
    trend: "down",
    recentChanges: ["Lost Airbus contract", "New CEO announced"],
  },
  {
    competitor: competitors[3], // Dassault CATIA
    lastUpdate: "2025-01-01",
    alerts: 2,
    score: 82,
    trend: "up",
    recentChanges: ["AI integration announced", "New automotive partnership"],
  },
]
