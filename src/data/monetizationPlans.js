export const monetizationSections = [
  {
    id: "company-connect",
    title: "Company Connect Plans",
    description: "Plans that unlock hiring actions for companies.",
    columns: [
      { key: "name", label: "Plan" },
      { key: "priceInr", label: "Price (INR)", type: "currency" },
      { key: "connects", label: "Connects" },
      { key: "validityDays", label: "Validity (days)" },
      { key: "visibility", label: "Visibility" },
      { key: "features", label: "Features" },
      { key: "tags", label: "Tags", type: "tags" }
    ],
    fields: [
      { key: "name", label: "Plan Name", type: "text" },
      { key: "priceInr", label: "Price (INR)", type: "number" },
      { key: "connects", label: "Connects Count", type: "number" },
      { key: "validityDays", label: "Validity (days)", type: "number" },
      { key: "taxRules", label: "Tax Rules", type: "text" },
      { key: "enterprise", label: "Enterprise Plan", type: "boolean" },
      { key: "visibility", label: "Visibility", type: "select", options: ["Visible", "Hidden"] },
      { key: "bestseller", label: "Bestseller", type: "boolean" },
      { key: "recommended", label: "Recommended", type: "boolean" },
      { key: "resumeDownloads", label: "Resume Downloads Allowed", type: "boolean" },
      { key: "contactUnlock", label: "Contact Unlock Allowed", type: "boolean" },
      { key: "testRequest", label: "Test Request Eligible", type: "boolean" },
      { key: "discountEligible", label: "Discount Eligible", type: "boolean" },
      { key: "dedicatedRm", label: "Dedicated RM", type: "boolean" }
    ],
    items: [
      {
        id: "company-starter",
        name: "Starter",
        priceInr: "",
        connects: "",
        validityDays: "",
        taxRules: "GST as applicable",
        enterprise: false,
        visibility: "Visible",
        bestseller: false,
        recommended: true,
        resumeDownloads: true,
        contactUnlock: true,
        testRequest: true,
        discountEligible: true,
        dedicatedRm: false,
        tags: ["Recommended"]
      },
      {
        id: "company-growth",
        name: "Growth",
        priceInr: "",
        connects: "",
        validityDays: "",
        taxRules: "GST as applicable",
        enterprise: false,
        visibility: "Visible",
        bestseller: true,
        recommended: false,
        resumeDownloads: true,
        contactUnlock: true,
        testRequest: true,
        discountEligible: true,
        dedicatedRm: false,
        tags: ["Bestseller"]
      },
      {
        id: "company-enterprise",
        name: "Enterprise",
        priceInr: "",
        connects: "",
        validityDays: "",
        taxRules: "Custom tax rules",
        enterprise: true,
        visibility: "Visible",
        bestseller: false,
        recommended: false,
        resumeDownloads: true,
        contactUnlock: true,
        testRequest: true,
        discountEligible: true,
        dedicatedRm: true,
        tags: ["Enterprise"]
      }
    ]
  },
  {
    id: "student-test-credits",
    title: "Student Test Credit Plans",
    description: "Student plans with tests and BG Campus credits.",
    columns: [
      { key: "name", label: "Plan" },
      { key: "priceInr", label: "Price (INR)", type: "currency" },
      { key: "testsIncluded", label: "Tests Included" },
      { key: "bgCampusCredits", label: "BG Campus Credits" },
      { key: "validityDays", label: "Validity (days)" },
      { key: "visibility", label: "Visibility" }
    ],
    fields: [
      { key: "name", label: "Plan Name", type: "text" },
      { key: "priceInr", label: "Price (INR)", type: "number" },
      { key: "testsIncluded", label: "Tests Included", type: "number" },
      { key: "bgCampusCredits", label: "BG Campus Credits", type: "number" },
      { key: "validityDays", label: "Validity (days)", type: "number" },
      { key: "freeQuota", label: "Free Quota Limit", type: "number" },
      { key: "visibility", label: "Visibility", type: "select", options: ["Visible", "Hidden"] }
    ],
    items: [
      {
        id: "student-starter",
        name: "Starter",
        priceInr: "",
        testsIncluded: "",
        bgCampusCredits: 25,
        validityDays: "",
        freeQuota: "",
        visibility: "Visible"
      },
      {
        id: "student-explorer",
        name: "Explorer",
        priceInr: "",
        testsIncluded: "",
        bgCampusCredits: 75,
        validityDays: "",
        freeQuota: "",
        visibility: "Visible"
      },
      {
        id: "student-scorer",
        name: "Scorer",
        priceInr: "",
        testsIncluded: "",
        bgCampusCredits: 200,
        validityDays: "",
        freeQuota: "",
        visibility: "Visible"
      }
    ]
  },
  {
    id: "ai-mentor-packs",
    title: "AI Mentor On-Demand Packs",
    description: "Standalone packs that stack with plan credits.",
    columns: [
      { key: "name", label: "Pack" },
      { key: "priceInr", label: "Price (INR)", type: "currency" },
      { key: "credits", label: "Credits" },
      { key: "validityMonths", label: "Validity (months)" }
    ],
    fields: [
      { key: "name", label: "Pack Name", type: "text" },
      { key: "priceInr", label: "Price (INR)", type: "number" },
      { key: "credits", label: "Credits", type: "number" },
      { key: "validityMonths", label: "Validity (months)", type: "number" }
    ],
    items: [
      { id: "ai-pack-micro", name: "Micro", priceInr: 99, credits: 20, validityMonths: 6 },
      { id: "ai-pack-standard", name: "Standard", priceInr: 199, credits: 50, validityMonths: 6 },
      { id: "ai-pack-power", name: "Power", priceInr: 349, credits: 100, validityMonths: 6 }
    ]
  },
  {
    id: "on-demand-tests",
    title: "On-Demand Test Pricing",
    description: "Per-test pricing configuration for students.",
    columns: [
      { key: "name", label: "Pricing" },
      { key: "basePriceInr", label: "Base Price (INR)", type: "currency" },
      { key: "validityMonths", label: "Validity (months)" },
      { key: "status", label: "Status" }
    ],
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "basePriceInr", label: "Base Price (INR)", type: "number" },
      { key: "validityMonths", label: "Validity (months)", type: "number" },
      { key: "status", label: "Status", type: "select", options: ["Enabled", "Disabled"] }
    ],
    items: [
      {
        id: "on-demand-tests-default",
        name: "On-demand tests",
        basePriceInr: 25,
        validityMonths: 1,
        status: "Enabled"
      }
    ]
  }
];
