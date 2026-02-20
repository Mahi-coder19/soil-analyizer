"use client";

import { useState } from "react";
import { SoilInputForm } from "./soil-input-form";
import { AnalysisDashboard } from "./analysis-dashboard";
import type { SoilAnalysisResponse } from "@/lib/soil-analysis-types";
import { Button } from "@/components/ui/button";

export function SoilAnalysisPage() {
  const [result, setResult] = useState<SoilAnalysisResponse | null>(null);
  const [cached, setCached] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi" | "ta">("en");

  const handleSuccess = (data: SoilAnalysisResponse, fromCache?: boolean, lang?: string) => {
    setResult(data);
    setCached(!!fromCache);
    if (lang === "en" || lang === "hi" || lang === "ta") {
      setLanguage(lang);
    }
    setError("");
  };

  const handleError = (message: string) => {
    setError(message);
  };

  const handleAnalyzeAgain = () => {
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight font-display">
          Smart Soil Analysis
        </h1>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Enter your soil and climate data to get crop recommendations, yield estimates, and agronomic advice.
        </p>
      </header>

      {!result ? (
        <>
          <div className="w-full max-w-xl mx-auto rounded-2xl border border-border bg-card p-6 shadow-sm">
            <SoilInputForm
              onSuccess={handleSuccess}
              onError={handleError}
              disabled={loading}
              onLanguageChange={(lang) => {
                if (lang === "en" || lang === "hi" || lang === "ta") {
                  setLanguage(lang);
                }
              }}
            />
          </div>
          {error && (
            <div
              className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm max-w-xl w-full"
              role="alert"
            >
              {error}
            </div>
          )}
        </>
      ) : (
        <div className="w-full space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="outline" onClick={handleAnalyzeAgain}>
              Analyze again
            </Button>
          </div>
          <AnalysisDashboard data={result} cached={cached} language={language} />
        </div>
      )}
    </div>
  );
}
