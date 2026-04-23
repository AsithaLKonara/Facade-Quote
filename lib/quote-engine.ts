import servicesData from '../data/services.json';
import pricingData from '../data/pricing.json';
import { QuoteLineItem, ProjectQuoteRequest, ProjectQuoteResponse, DetailedCost, CostBreakdown } from '../types/quote';

export function calculateLineItemCost(item: QuoteLineItem, globalMargin?: number): DetailedCost {
    const { roleId, options, quantity } = item;
    
    // 1. Direct Delivery Cost
    const role = (pricingData.roles as any[]).find(r => r.id === roleId);
    const hourlyRate = role ? role.hourlyRateLKR : 3800;
    
    const complexity = options?.complexity || 'simple';
    const complexityFactor = (pricingData.complexityFactors as any)[complexity] || 1.0;
    
    const baseHours = options?.estimatedHours || 10;
    const deliveryCost = (baseHours * hourlyRate * complexityFactor) * quantity;

    // 2. Project Overhead (15% with min floor)
    const overheadPercentage = pricingData.overhead.percentage;
    const overhead = Math.max(deliveryCost * overheadPercentage, pricingData.overhead.minFeeLKR / (quantity || 1));

    // 3. Risk Reserve
    const riskLevel = options?.riskLevel || 'standard';
    const riskPercentage = (pricingData.riskFactors as any)[riskLevel] || 0.15;
    const riskReserve = deliveryCost * riskPercentage;

    // 4. Pass-through Costs
    let passThrough = 0;
    if (options?.sslRequired) passThrough += pricingData.passThrough.sslCert;
    if (options?.domainRequired) passThrough += pricingData.passThrough.domainReg;
    if (options?.hostingRequired) passThrough += pricingData.passThrough.hostingBase;
    if (options?.apiIntegrationsCount) passThrough += (options.apiIntegrationsCount * pricingData.passThrough.apiIntegrationBase);

    const subtotal = deliveryCost + overhead + riskReserve + passThrough;

    // 5. Margin Calculation (Gross Margin Formula: Price = Cost / (1 - Margin))
    const targetMargin = globalMargin || pricingData.margins.customBuild;
    const finalPrice = Math.round(subtotal / (1 - targetMargin));
    const marginAmount = finalPrice - subtotal;

    return {
        delivery: Math.round(deliveryCost),
        overhead: Math.round(overhead),
        riskReserve: Math.round(riskReserve),
        passThrough: Math.round(passThrough),
        subtotal: Math.round(subtotal),
        margin: Math.round(marginAmount),
        finalPrice
    };
}

export function calculateProjectQuote(project: ProjectQuoteRequest): ProjectQuoteResponse {
    let totalDelivery = 0;
    let totalOverhead = 0;
    let totalRisk = 0;
    let totalPassThrough = 0;
    let totalMargin = 0;
    let totalHours = 0;

    const processedLineItems = project.lineItems.map(item => {
        const cost = calculateLineItemCost(item, project.globalOptions.targetMargin);
        totalDelivery += cost.delivery;
        totalOverhead += cost.overhead;
        totalRisk += cost.riskReserve;
        totalPassThrough += cost.passThrough;
        totalMargin += cost.margin;
        
        totalHours += (item.options?.estimatedHours || 0) * ((pricingData.complexityFactors as any)[item.options?.complexity || 'simple'] || 1.0);
        
        return { ...item, calculatedCost: cost };
    });

    const grandTotalLKR = totalDelivery + totalOverhead + totalRisk + totalPassThrough + totalMargin;
    const usdRate = pricingData.exchangeRate.USD_to_LKR;
    const grandTotalUSD = grandTotalLKR / usdRate;

    // Timeline calculation (Standard: 40 hrs/week)
    let weeks = Math.ceil(totalHours / 40);
    if (project.globalOptions.timeline === 'express') {
        weeks = Math.max(1, Math.ceil(weeks * 0.7));
    } else if (project.globalOptions.timeline === 'extended') {
        weeks = Math.ceil(weeks * 1.4);
    }

    const totalCostBreakdown: CostBreakdown = {
        totalDelivery: Math.round(totalDelivery),
        totalOverhead: Math.round(totalOverhead),
        totalRisk: Math.round(totalRisk),
        totalPassThrough: Math.round(totalPassThrough),
        totalMargin: Math.round(totalMargin),
        grandTotalLKR: Math.round(grandTotalLKR),
        grandTotalUSD: Number(grandTotalUSD.toFixed(2))
    };

    return {
        projectName: project.projectName || 'Untitled Software Project',
        clientLocation: project.clientLocation,
        lineItems: processedLineItems,
        totalCostBreakdown,
        grandTotal: project.clientLocation === 'export' ? totalCostBreakdown.grandTotalUSD : totalCostBreakdown.grandTotalLKR,
        exchangeRate: usdRate,
        estimatedTimeWeeks: weeks,
        status: 'valid'
    };
}
