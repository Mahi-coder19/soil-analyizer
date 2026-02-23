import { NextResponse } from "next/server";
import { createHash } from "crypto";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { soilAnalyses } from "@/lib/db/schema";
import {
  soilAnalysisInputSchema,
  soilAnalysisResponseSchema,
} from "@/lib/soil-analysis-types";
import { buildUserMessage, SYSTEM_PROMPT } from "@/lib/soil-analysis-prompt";

function getInputHash(input: Record<string, unknown>): string {
  const normalized = {
    ph: Math.round((input.ph as number) * 100) / 100,
    nitrogen: input.nitrogen,
    phosphorus: input.phosphorus,
    potassium: input.potassium,
    soilMoisture: input.soilMoisture,
    temperature: input.temperature,
    humidity: input.humidity,
    location: String(input.location).trim().toLowerCase(),
    language: String(input.language ?? "en").toLowerCase(),
  };
  const str = JSON.stringify(normalized, Object.keys(normalized).sort());
  return createHash("sha256").update(str).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = soilAnalysisInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const input = parsed.data;
    const inputHash = getInputHash(input as unknown as Record<string, unknown>);

    const existing = await db
      .select({ result: soilAnalyses.result, createdAt: soilAnalyses.createdAt })
      .from(soilAnalyses)
      .where(eq(soilAnalyses.inputHash, inputHash))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({
        data: existing[0].result as object,
        cached: true,
        cachedAt: existing[0].createdAt,
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserMessage(input) },
      ],
      response_format: zodResponseFormat(
        soilAnalysisResponseSchema,
        "soil_analysis"
      ),
    });  

    

    const message = completion.choices[0]?.message;
    if (!message?.parsed) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const result = message.parsed;

    await db.insert(soilAnalyses).values({
      inputHash,
      inputPayload: input as unknown as object,
      result: result as unknown as object,
    });

    return NextResponse.json({ data: result, cached: false });
  } catch (err) {
    console.error("Soil analysis API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Analysis failed" },
      { status: 500 }
    );
  }
}
