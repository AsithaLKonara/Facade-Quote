import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import servicesData from '../../../data/services.json';
import pricingData from '../../../data/pricing.json';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Missing GROQ_API_KEY' }, { status: 500 });
    }

    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const serviceList = servicesData.services.map((s: any) => `${s.id} (${s.name})`).join(', ');
    const roleList = pricingData.roles.map((r: any) => r.id).join(', ');

    const systemPrompt = `You are a Senior Software Architect at "FACADE CENTER", a Sri Lanka-based premium software agency. 
Your job is to read client requests and break them down into modules using our role-based pricing model.

Available Roles: ${roleList}
Available Categories: FRONTEND, BACKEND, FULLSTACK, MOBILE, UI_UX, DEVOPS, QA, CONSULTATION, MAINTENANCE.
Available Service IDs: ${serviceList}

Pricing Strategy Rules:
1. Break projects into logical modules (e.g., Auth, Dashboard, Integration).
2. Assign the most appropriate Role (e.g., Architect for discovery, Senior for core logic, Junior for simple UI).
3. Estimate realistic hours based on complexity.
4. Identify Risk Levels: clearScope, standard, highUncertainty.

JSON Schema (Output ONLY the "items" array):
{
  "items": [
    {
      "id": "uuid",
      "name": "Module Name",
      "category": "Category",
      "serviceId": "Service ID (if matches)",
      "roleId": "Role ID",
      "quantity": 1,
      "options": {
        "complexity": "simple" | "medium" | "complex" | "enterprise",
        "riskLevel": "clearScope" | "standard" | "highUncertainty",
        "estimatedHours": number,
        "hostingRequired": boolean,
        "sslRequired": boolean,
        "apiIntegrationsCount": number
      }
    }
  ]
}

If a client mentions USD or is international, assume project level 'clientLocation' is 'export'. Output only the JSON items array.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    let content = chatCompletion.choices[0]?.message?.content || '{"items": []}';
    let parsedContent = JSON.parse(content).items || [];

    return NextResponse.json({ lineItems: parsedContent });

  } catch (error: any) {
    console.error('Groq AI Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to parse' }, { status: 500 });
  }
}
