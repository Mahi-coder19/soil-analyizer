"use client";

import { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { soilAnalysisInputSchema, type SoilAnalysisInput } from "@/lib/soil-analysis-types";
import type { SoilAnalysisResponse } from "@/lib/soil-analysis-types";

type SoilInputFormProps = {
  onSuccess: (data: SoilAnalysisResponse, cached?: boolean, language?: string) => void;
  onError: (message: string) => void;
  disabled?: boolean;
  onLanguageChange?: (language: string) => void;
};

const defaultValues: SoilAnalysisInput = {
  ph: 7,
  nitrogen: 50,
  phosphorus: 40,
  potassium: 30,
  soilMoisture: 50,
  temperature: 28,
  humidity: 70,
  location: "",
  language: "en",
};

export function SoilInputForm({ onSuccess, onError, disabled, onLanguageChange }: SoilInputFormProps) {
  const [form, setForm] = useState<SoilAnalysisInput>(defaultValues);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof SoilAnalysisInput, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "language" && typeof value === "string" && onLanguageChange) {
      onLanguageChange(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = soilAnalysisInputSchema.safeParse(form);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg = Object.entries(first)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join("; ");
      onError(msg || "Invalid input");
      return;
    }
    setLoading(true);
    onError("");
    try {
      const res = await fetch("/api/soil-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok) {
        onError(json.error || "Analysis failed");
        return;
      }
      onSuccess(json.data as SoilAnalysisResponse, json.cached, form.language);
    } catch {
      onError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <FieldGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="ph">pH value</FieldLabel>
            <Input
              id="ph"
              type="number"
              step="0.1"
              min="0"
              max="14"
              value={form.ph}
              onChange={(e) => {
                const n = e.target.valueAsNumber;
                update("ph", Number.isFinite(n) ? n : form.ph);
              }}
              disabled={isDisabled}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="nitrogen">Nitrogen (N)</FieldLabel>
            <Input
              id="nitrogen"
              type="number"
              min="0"
              value={form.nitrogen}
              onChange={(e) => {
                const n = e.target.valueAsNumber;
                update("nitrogen", Number.isFinite(n) ? n : form.nitrogen);
              }}
              disabled={isDisabled}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phosphorus">Phosphorus (P)</FieldLabel>
            <Input
              id="phosphorus"
              type="number"
              min="0"
              value={form.phosphorus}
              onChange={(e) => {
                const n = e.target.valueAsNumber;
                update("phosphorus", Number.isFinite(n) ? n : form.phosphorus);
              }}
              disabled={isDisabled}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="potassium">Potassium (K)</FieldLabel>
            <Input
              id="potassium"
              type="number"
              min="0"
              value={form.potassium}
              onChange={(e) => {
                const n = e.target.valueAsNumber;
                update("potassium", Number.isFinite(n) ? n : form.potassium);
              }}
              disabled={isDisabled}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="soilMoisture">Soil moisture (%)</FieldLabel>
            <Input
              id="soilMoisture"
              type="number"
              min="0"
              max="100"
              value={form.soilMoisture}
              onChange={(e) => {
                const n = e.target.valueAsNumber;
                update("soilMoisture", Number.isFinite(n) ? n : form.soilMoisture);
              }}
              disabled={isDisabled}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="temperature">Temperature (°C)</FieldLabel>
            <Input
              id="temperature"
              type="number"
              value={form.temperature}
              onChange={(e) => {
                const n = e.target.valueAsNumber;
                update("temperature", Number.isFinite(n) ? n : form.temperature);
              }}
              disabled={isDisabled}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="humidity">Humidity (%)</FieldLabel>
            <Input
              id="humidity"
              type="number"
              min="0"
              max="100"
              value={form.humidity}
              onChange={(e) => {
                const n = e.target.valueAsNumber;
                update("humidity", Number.isFinite(n) ? n : form.humidity);
              }}
              disabled={isDisabled}
            />
          </Field>
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="location">Location (state / district)</FieldLabel>
            <Input
              id="location"
              type="text"
              placeholder="e.g. Punjab, Ludhiana"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              disabled={isDisabled}
            />
          </Field>
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="language">Language</FieldLabel>
            <select
              id="language"
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.language}
              onChange={(e) => update("language", e.target.value)}
              disabled={isDisabled}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
            </select>
          </Field>
        </div>
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isDisabled}>
            {loading ? "Analyzing…" : "Analyze soil"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
