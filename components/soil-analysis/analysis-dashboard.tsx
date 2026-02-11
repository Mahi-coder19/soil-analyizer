"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SoilAnalysisResponse } from "@/lib/soil-analysis-types";

function NutrientBadge({
  level,
  label,
}: {
  level: "Low" | "Optimal" | "High";
  label: string;
}) {
  const style =
    level === "Low"
      ? "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300 border-red-200 dark:border-red-800"
      : level === "Optimal"
        ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300 border-green-200 dark:border-green-800"
        : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800";
  return (
    <span className={cn("inline-flex items-center gap-1.5")}>
      <span className="text-muted-foreground text-sm">{label}:</span>
      <Badge variant="outline" className={cn("border", style)}>
        {level}
      </Badge>
    </span>
  );
}

type DashboardSectionProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
};

function DashboardSection({
  children,
  title,
  description,
  className,
}: DashboardSectionProps) {
  return (
    <Card className={cn("animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both", className)}>
      <CardHeader>
        <CardTitle className="font-display">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

type AnalysisDashboardProps = {
  data: SoilAnalysisResponse;
  cached?: boolean;
};

export function AnalysisDashboard({ data, cached }: AnalysisDashboardProps) {
  const {
    soilSummary,
    nutrientStatus,
    recommendedCrops,
    yieldPrediction,
    sowingHarvest,
    irrigation,
    fertilizerRecommendations,
    riskAnalysis,
    soilImprovementSuggestions,
    weatherInsight,
  } = data;

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      {/* {cached && (
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-xs">
            Loaded from cache (same inputs)
          </Badge>
        </div>
      )} */}

      <DashboardSection
        title="Soil health"
        description="Summary and nutrient status"
        className="delay-0"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Soil summary</h4>
            <ul className="space-y-1 text-sm">
              <li><strong>Soil type:</strong> {soilSummary.soilType}</li>
              <li><strong>pH status:</strong> {soilSummary.phStatus}</li>
              <li><strong>Fertility:</strong> {soilSummary.fertilityLevel}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Nutrient status</h4>
            <div className="flex flex-wrap gap-3">
              <NutrientBadge level={nutrientStatus.nitrogen} label="N" />
              <NutrientBadge level={nutrientStatus.phosphorus} label="P" />
              <NutrientBadge level={nutrientStatus.potassium} label="K" />
            </div>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Recommended crops"
        description="Top 3 suitable crops"
        className="delay-75"
      >
        <ul className="space-y-4">
          {recommendedCrops.map((crop, i) => (
            <li key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-medium">{crop.name}</span>
                <Badge variant="secondary">{crop.suitabilityPercent}% suitability</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{crop.whyRecommended}</p>
              <p className="text-xs text-muted-foreground mt-1">Ideal season: {crop.idealSeason}</p>
            </li>
          ))}
        </ul>
      </DashboardSection>

      <DashboardSection
        title="Expected yield"
        description="Estimate vs state average"
        className="delay-150"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Estimated yield</p>
            <p className="text-xl font-semibold">
              {yieldPrediction.estimatedYieldPerAcre} {yieldPrediction.unit}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">State average</p>
            <p className="text-xl font-semibold">
              {yieldPrediction.stateAverage} {yieldPrediction.unit}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Performance</p>
            <p className={cn(
              "text-xl font-semibold",
              yieldPrediction.performancePercent >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {yieldPrediction.performancePercent >= 0 ? "+" : ""}
              {yieldPrediction.performancePercent}% vs average
            </p>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Sowing & harvest"
        description="Best timing and duration"
        className="delay-200"
      >
        <ul className="space-y-2 text-sm">
          <li><strong>Sow:</strong> {sowingHarvest.bestSowingMonthRange}</li>
          <li><strong>Harvest:</strong> {sowingHarvest.harvestMonthRange}</li>
          <li><strong>Crop duration:</strong> {sowingHarvest.cropDurationDays} days</li>
        </ul>
      </DashboardSection>

      <DashboardSection
        title="Irrigation"
        description="Water requirement and frequency"
        className="delay-300"
      >
        <ul className="space-y-2 text-sm">
          <li><strong>Water requirement:</strong> {irrigation.waterRequirement}</li>
          <li><strong>Frequency:</strong> {irrigation.irrigationFrequency}</li>
          <li><strong>Drip:</strong> {irrigation.dripSuggestion}</li>
        </ul>
      </DashboardSection>

      <DashboardSection
        title="Fertilizer"
        description="Recommendations and organic options"
        className="delay-[400ms]"
      >
        <ul className="space-y-4">
          {fertilizerRecommendations.map((rec, i) => (
            <li key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <p className="font-medium text-sm">{rec.nutrient}</p>
              <p className="text-sm text-muted-foreground">{rec.recommendation}</p>
              <p className="text-xs text-muted-foreground mt-1">Organic: {rec.organicAlternative}</p>
            </li>
          ))}
        </ul>
      </DashboardSection>

      <DashboardSection
        title="Weather insight"
        description="Location-based weather (optional)"
        className="delay-500"
      >
        {weatherInsight && typeof weatherInsight === "object" ? (
          <ul className="space-y-2 text-sm">
            {weatherInsight.currentTemperature && (
              <li><strong>Current temp:</strong> {weatherInsight.currentTemperature}</li>
            )}
            {weatherInsight.rainForecast && (
              <li><strong>Rain:</strong> {weatherInsight.rainForecast}</li>
            )}
            {weatherInsight.riskAlerts && (
              <li><strong>Alerts:</strong> {weatherInsight.riskAlerts}</li>
            )}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Coming soon. Weather API can be integrated later.</p>
        )}
      </DashboardSection>

      <DashboardSection
        title="Risk analysis"
        description="Pest and yield risks"
        className="delay-700"
      >
        <div className="space-y-2">
          <p><strong>Risk level:</strong> {riskAnalysis.riskLevel}</p>
          <p className="text-sm text-muted-foreground">{riskAnalysis.reason}</p>
          <p className="text-sm"><strong>Suggestion:</strong> {riskAnalysis.suggestion}</p>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Soil improvement"
        description="pH and condition suggestions"
        className="delay-1000"
      >
        <ul className="list-disc list-inside space-y-1 text-sm">
          {soilImprovementSuggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </DashboardSection>
    </div>
  );
}
