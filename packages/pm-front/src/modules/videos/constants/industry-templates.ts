// Industry-specific templates for Discovery Video creation.
// Each template pre-fills the target role and surfaces role-specific fields
// in the Company Basics section of the form.

export type IndustryField = {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea';
  hint?: string;
};

export type IndustryTemplate = {
  id: string;
  label: string;
  description: string;
  targetRoleDefault: string;
  industryDefault: string;
  industrySpecificFields: IndustryField[];
};

export const INDUSTRY_TEMPLATES: IndustryTemplate[] = [
  {
    id: 'mortgage',
    label: 'Mortgage',
    description: 'Loan Officers & MLOs',
    targetRoleDefault: 'Mortgage Loan Officers',
    industryDefault: 'Mortgage',
    industrySpecificFields: [
      {
        key: 'nmlsNumber',
        label: 'NMLS Company ID',
        placeholder: 'e.g., 12345',
        type: 'text',
        hint: 'Your company NMLS license number',
      },
      {
        key: 'productionVolume',
        label: 'Production Volume (top producers)',
        placeholder: 'e.g., $50M+ per year',
        type: 'text',
      },
      {
        key: 'licensingStates',
        label: 'Licensed States',
        placeholder: 'e.g., FL, TX, CA, NY',
        type: 'text',
      },
      {
        key: 'loanTypes',
        label: 'Loan Products Offered',
        placeholder: 'Conventional, FHA, VA, Jumbo, USDA...',
        type: 'text',
      },
      {
        key: 'leadGenSupport',
        label: 'Lead Generation Support',
        placeholder: 'e.g., 5–10 warm leads per month provided',
        type: 'text',
      },
    ],
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    description: 'Agents, Brokers & Team Leads',
    targetRoleDefault: 'Real Estate Agents',
    industryDefault: 'Real Estate',
    industrySpecificFields: [
      {
        key: 'licenseType',
        label: 'Hiring For (License Type)',
        placeholder: 'Sales Agents, Brokers, Team Leads',
        type: 'text',
      },
      {
        key: 'marketArea',
        label: 'Market Area',
        placeholder: 'e.g., South Florida, Dallas–Fort Worth',
        type: 'text',
      },
      {
        key: 'transactionVolume',
        label: 'Avg Agent Transaction Volume',
        placeholder: 'e.g., 20–40 transactions per year',
        type: 'text',
      },
      {
        key: 'commissionSplits',
        label: 'Commission Splits / Cap Model',
        placeholder: 'e.g., 70/30 with $20K cap, then 100%',
        type: 'text',
      },
      {
        key: 'leadSources',
        label: 'Lead Sources Provided',
        placeholder: 'e.g., Zillow, sphere marketing, in-house leads',
        type: 'text',
      },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    description: 'Agents & Producers',
    targetRoleDefault: 'Insurance Agents',
    industryDefault: 'Insurance',
    industrySpecificFields: [
      {
        key: 'linesOfAuthority',
        label: 'Lines of Authority',
        placeholder: 'Life, Health, P&C, Medicare...',
        type: 'text',
      },
      {
        key: 'carrierAppointments',
        label: 'Carrier Appointments',
        placeholder: 'e.g., State Farm, Allstate, UnitedHealth',
        type: 'text',
      },
      {
        key: 'bookOfBusiness',
        label: 'Average Book of Business (top agents)',
        placeholder: 'e.g., $300K annual premium',
        type: 'text',
      },
      {
        key: 'licensingSupport',
        label: 'Licensing Support',
        placeholder: 'e.g., Paid exam prep, study materials provided',
        type: 'text',
      },
    ],
  },
  {
    id: 'financial-advisory',
    label: 'Financial Advisory',
    description: 'Advisors & Financial Planners',
    targetRoleDefault: 'Financial Advisors',
    industryDefault: 'Financial Advisory',
    industrySpecificFields: [
      {
        key: 'aumSupport',
        label: 'AUM Support / Minimum',
        placeholder: 'e.g., Support advisors with $5M+ AUM',
        type: 'text',
      },
      {
        key: 'certifications',
        label: 'Certifications Common on Team',
        placeholder: 'CFP, CFA, ChFC, RICP...',
        type: 'text',
      },
      {
        key: 'custodian',
        label: 'Custodian(s)',
        placeholder: 'e.g., Schwab, Fidelity, TD Ameritrade',
        type: 'text',
      },
      {
        key: 'feeStructure',
        label: 'Fee Structure',
        placeholder: 'Fee-only, AUM-based (1%), commission, hybrid',
        type: 'text',
      },
      {
        key: 'practiceModel',
        label: 'Practice Model',
        placeholder: 'e.g., Ensemble RIA, independent broker-dealer',
        type: 'text',
      },
    ],
  },
  {
    id: 'staffing',
    label: 'Staffing',
    description: 'Recruiters & Account Managers',
    targetRoleDefault: 'Recruiters / Account Managers',
    industryDefault: 'Staffing',
    industrySpecificFields: [
      {
        key: 'specialties',
        label: 'Staffing Specialties',
        placeholder: 'Tech, Healthcare, Finance, Engineering...',
        type: 'text',
      },
      {
        key: 'placementTypes',
        label: 'Placement Types',
        placeholder: 'Perm, Temp, Contract, Contract-to-hire',
        type: 'text',
      },
      {
        key: 'industriesServed',
        label: 'Industries Served',
        placeholder: 'e.g., Fortune 500, startups, healthcare systems',
        type: 'text',
      },
      {
        key: 'billingStructure',
        label: 'Commission / Billing Structure',
        placeholder: 'e.g., 10–15% of perm placements, hourly markup',
        type: 'text',
      },
    ],
  },
  {
    id: 'home-services',
    label: 'Home Services',
    description: 'Technicians & Contractors',
    targetRoleDefault: 'Service Technicians',
    industryDefault: 'Home Services',
    industrySpecificFields: [
      {
        key: 'trade',
        label: 'Trade / Specialty',
        placeholder: 'HVAC, Plumbing, Electrical, Roofing, Solar...',
        type: 'text',
      },
      {
        key: 'tradeRequirements',
        label: 'Required Certifications / Licenses',
        placeholder: 'e.g., EPA 608, NATE cert, state electrical license',
        type: 'text',
      },
      {
        key: 'serviceArea',
        label: 'Service Area',
        placeholder: 'e.g., 50-mile radius from Tampa, FL',
        type: 'text',
      },
      {
        key: 'vehicleEquipment',
        label: 'Company Vehicle / Equipment',
        placeholder: 'e.g., Fully equipped company truck provided',
        type: 'text',
      },
    ],
  },
  {
    id: 'law',
    label: 'Law',
    description: 'Attorneys & Legal Professionals',
    targetRoleDefault: 'Attorneys',
    industryDefault: 'Law',
    industrySpecificFields: [
      {
        key: 'practiceAreas',
        label: 'Practice Areas',
        placeholder: 'Personal injury, family law, corporate, real estate...',
        type: 'text',
      },
      {
        key: 'barAdmissions',
        label: 'Bar Admissions Required',
        placeholder: 'e.g., Florida Bar, New York Bar',
        type: 'text',
      },
      {
        key: 'caseTypes',
        label: 'Types of Cases Handled',
        placeholder: 'e.g., High-volume PI, complex litigation, transactional',
        type: 'text',
      },
      {
        key: 'compensationModel',
        label: 'Compensation Model',
        placeholder: 'Salary + bonus, origination credit, contingency fee share',
        type: 'text',
      },
    ],
  },
  {
    id: 'accounting',
    label: 'Accounting',
    description: 'CPAs & Tax Professionals',
    targetRoleDefault: 'CPAs / Accountants',
    industryDefault: 'Accounting',
    industrySpecificFields: [
      {
        key: 'accountingSpecializations',
        label: 'Specializations',
        placeholder: 'Tax preparation, audit, advisory, bookkeeping, forensic...',
        type: 'text',
      },
      {
        key: 'firmSize',
        label: 'Firm Size / Type',
        placeholder: 'e.g., 15-person regional CPA firm, Big 4 alumni network',
        type: 'text',
      },
      {
        key: 'clientTypes',
        label: 'Client Base',
        placeholder: 'Individuals, SMB ($1–50M revenue), corporate, nonprofit',
        type: 'text',
      },
      {
        key: 'cpeSupport',
        label: 'CPE / Continuing Education Support',
        placeholder: 'e.g., Paid CPE credits, exam fees covered',
        type: 'text',
      },
    ],
  },
  {
    id: 'custom',
    label: 'Custom',
    description: 'Define your own fields',
    targetRoleDefault: '',
    industryDefault: 'Other',
    industrySpecificFields: [],
  },
];

export const DEFAULT_TEMPLATE_ID = 'mortgage';

export function getTemplateById(id: string): IndustryTemplate | undefined {
  return INDUSTRY_TEMPLATES.find((t) => t.id === id);
}
