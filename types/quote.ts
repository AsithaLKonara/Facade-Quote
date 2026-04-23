export type ServiceCategory = 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'MOBILE' | 'UI_UX' | 'DEVOPS' | 'QA' | 'CONSULTATION' | 'MAINTENANCE';

export type RoleId = 'junior' | 'mid' | 'senior' | 'architect' | 'qa' | 'devops' | 'pm' | 'designer';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  defaultRole: RoleId;
  baseHours: number;
  description: string;
}

export interface QuoteLineItem {
  id: string;
  name: string;
  category: ServiceCategory;
  serviceId?: string;
  roleId: RoleId;
  quantity: number; 
  options?: {
    complexity?: 'simple' | 'medium' | 'complex' | 'enterprise';
    riskLevel?: 'clearScope' | 'standard' | 'highUncertainty';
    estimatedHours?: number;
    // Pass-throughs
    sslRequired?: boolean;
    domainRequired?: boolean;
    hostingRequired?: boolean;
    apiIntegrationsCount?: number;
  };
  calculatedCost?: DetailedCost;
}

export interface DetailedCost {
  delivery: number;
  overhead: number;
  riskReserve: number;
  passThrough: number;
  subtotal: number;
  margin: number;
  finalPrice: number;
}

export interface ProjectQuoteRequest {
  projectName: string;
  clientLocation: 'local' | 'export';
  lineItems: QuoteLineItem[];
  globalOptions: {
    urgent: boolean;
    targetMargin?: number;
    timeline: 'express' | 'standard' | 'extended';
  };
}

export interface CostBreakdown {
  totalDelivery: number;
  totalOverhead: number;
  totalRisk: number;
  totalPassThrough: number;
  totalMargin: number;
  grandTotalLKR: number;
  grandTotalUSD: number;
}

export interface ProjectQuoteResponse {
  projectName: string;
  clientLocation: 'local' | 'export';
  lineItems: QuoteLineItem[];
  totalCostBreakdown: CostBreakdown;
  grandTotal: number;
  exchangeRate: number;
  estimatedTimeWeeks: number;
  status: 'valid' | 'invalid';
}

export interface Project {
  id: string;
  clientName: string;
  projectName: string;
  clientLocation: 'local' | 'export';
  status: 'lead' | 'discovery' | 'proposal' | 'development' | 'testing' | 'uat' | 'deployed' | 'completed';
  quote: ProjectQuoteResponse;
  dateCreated: string;
}
