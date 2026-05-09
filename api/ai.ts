// Serverless function that proxies AI requests to Google Gemini.
// The API key lives in a Vercel environment variable (GEMINI_API_KEY) and is
// never exposed to the browser. Three "modes" map to the three AI features in
// the app: 'haccp', 'improvement', and 'chat'.

export const config = { runtime: "edge" };

type Mode = "haccp" | "improvement" | "chat";

interface RequestBody {
  mode: Mode;
  // For HACCP
  businessType?: string;
  foodCategories?: string[];
  // For Improvement Plan
  complianceData?: any;
  // For Chat
  messages?: { role: "user" | "model"; content: string }[];
  // For Chat - optional context about the business
  context?: any;
}

const SYSTEM_PROMPTS: Record<Mode, string> = {
  haccp: `You are a UK food safety expert helping generate a HACCP (Hazard Analysis Critical Control Point) plan for a food business. Your output must be FSA-compliant, practical, and specific to the business type provided.

Return ONLY valid JSON in this exact structure (no markdown, no code fences, no extra text):
{
  "title": "string - e.g. 'Cold Food Storage HACCP Plan'",
  "summary": "string - 1-2 sentences",
  "criticalControlPoints": [
    {
      "name": "string - e.g. 'Refrigeration Storage'",
      "hazard": "string - what could go wrong",
      "criticalLimit": "string - measurable limit, e.g. 'Below 5°C'",
      "monitoring": "string - how & how often",
      "correctiveAction": "string - what to do if limit breached",
      "verification": "string - how to verify procedure works",
      "records": "string - what records to keep"
    }
  ],
  "prerequisites": ["string array - e.g. 'Daily cleaning schedule', 'Pest control contract'"],
  "reviewFrequency": "string - e.g. 'Quarterly or after any process change'"
}

Generate 3-5 Critical Control Points relevant to the business type.`,

  improvement: `You are a UK compliance advisor analysing a food business's compliance status. Look at the data provided and generate a prioritised improvement plan to help them reach a 5-star FHRS rating.

Return ONLY valid JSON in this exact structure (no markdown, no code fences):
{
  "currentScore": number,
  "targetScore": number,
  "summary": "string - 1-2 sentence overview",
  "actions": [
    {
      "priority": "high" | "medium" | "low",
      "title": "string - short action title",
      "description": "string - what to do and why",
      "estimatedImpact": "string - e.g. '+8% to compliance score'",
      "deadline": "string - e.g. 'Within 7 days'",
      "category": "string - e.g. 'Training', 'Documentation', 'Equipment'"
    }
  ],
  "quickWins": ["string array - things doable in under 30 minutes"]
}

Provide 4-6 actions, ordered by priority (high first).`,

  chat: `You are a helpful UK food safety and compliance assistant for a food business owner/manager. Be concise, practical, and reference UK regulations (FSA, Natasha's Law, FHRS) where relevant. If the user asks about their specific data and you have context, use it; otherwise give general guidance and suggest they check the relevant section.

Keep answers under 200 words unless they explicitly ask for detail. Use plain text, no markdown formatting.`,
};

function buildUserPrompt(body: RequestBody): string {
  switch (body.mode) {
    case "haccp": {
      const cats = body.foodCategories?.length
        ? `\nFood categories handled: ${body.foodCategories.join(", ")}`
        : "";
      return `Generate a HACCP plan for: ${body.businessType || "general food business"}${cats}`;
    }
    case "improvement": {
      return `Compliance data:\n${JSON.stringify(body.complianceData || {}, null, 2)}\n\nGenerate an improvement plan.`;
    }
    case "chat": {
      // Chat handled separately because it uses message history
      return "";
    }
  }
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "AI is not configured. Add GEMINI_API_KEY to Vercel environment variables.",
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const systemPrompt = SYSTEM_PROMPTS[body.mode];
  if (!systemPrompt) {
    return new Response(JSON.stringify({ error: "Invalid mode" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Build Gemini request payload
  let contents: any[];
  if (body.mode === "chat") {
    // Use full message history for chat
    const history = (body.messages || []).map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));
    if (history.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    // Optionally inject context as a synthetic system note in the first user message
    if (body.context) {
      const ctxNote = `\n\n(Context about the business for reference: ${JSON.stringify(body.context).slice(0, 1500)})`;
      const first = history.find((h) => h.role === "user");
      if (first && first.parts[0]) {
        first.parts[0].text = first.parts[0].text + ctxNote;
      }
    }
    contents = history;
  } else {
    contents = [
      {
        role: "user",
        parts: [{ text: buildUserPrompt(body) }],
      },
    ];
  }

  // Call Gemini API
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const geminiPayload: any = {
    contents,
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      temperature: body.mode === "chat" ? 0.7 : 0.4,
      maxOutputTokens: body.mode === "haccp" ? 2048 : 1024,
    },
  };

  // Force JSON output for structured modes
  if (body.mode === "haccp" || body.mode === "improvement") {
    geminiPayload.generationConfig.responseMimeType = "application/json";
  }

  let geminiRes: Response;
  try {
    geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(geminiPayload),
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Failed to reach AI provider", detail: String(err?.message || err) }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }

  if (!geminiRes.ok) {
    const errText = await geminiRes.text();
    return new Response(
      JSON.stringify({ error: "AI provider error", status: geminiRes.status, detail: errText.slice(0, 500) }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }

  const data = await geminiRes.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    return new Response(
      JSON.stringify({ error: "Empty response from AI", raw: data }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }

  // For structured modes, parse the JSON output
  if (body.mode === "haccp" || body.mode === "improvement") {
    try {
      const parsed = JSON.parse(text);
      return new Response(JSON.stringify({ result: parsed }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch {
      // Fall through and return as text — frontend can handle it
      return new Response(JSON.stringify({ result: { raw: text } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
  }

  // Chat mode returns plain text
  return new Response(JSON.stringify({ result: text }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
