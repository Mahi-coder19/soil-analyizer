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

type SupportedLanguage = "en" | "hi" | "ta";

type AnalysisDashboardProps = {
  data: SoilAnalysisResponse;
  cached?: boolean;
  language?: SupportedLanguage;
};

const messages: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    soilHealthTitle: "Soil health",
    soilHealthDescription: "Summary and nutrient status",
    soilSummaryHeading: "Soil summary",
    soilTypeLabel: "Soil type",
    phStatusLabel: "pH status",
    fertilityLabel: "Fertility",
    nutrientStatusHeading: "Nutrient status",
    recommendedCropsTitle: "Recommended crops",
    recommendedCropsDescription: "Top 3 suitable crops",
    suitabilityBadge: "suitability",
    idealSeasonLabel: "Ideal season",
    expectedYieldTitle: "Expected yield",
    expectedYieldDescription: "Estimate vs state average",
    estimatedYieldLabel: "Estimated yield",
    stateAverageLabel: "State average",
    performanceLabel: "Performance",
    sowingHarvestTitle: "Sowing & harvest",
    sowingHarvestDescription: "Best timing and duration",
    sowLabel: "Sow",
    harvestLabel: "Harvest",
    cropDurationLabel: "Crop duration",
    daysSuffix: "days",
    irrigationTitle: "Irrigation",
    irrigationDescription: "Water requirement and frequency",
    waterRequirementLabel: "Water requirement",
    frequencyLabel: "Frequency",
    dripLabel: "Drip",
    fertilizerTitle: "Fertilizer",
    fertilizerDescription: "Recommendations and organic options",
    organicLabel: "Organic",
    weatherInsightTitle: "Weather insight",
    weatherInsightDescription: "Location-based weather (optional)",
    currentTempLabel: "Current temp",
    rainLabel: "Rain",
    alertsLabel: "Alerts",
    weatherComingSoon: "Coming soon. Weather API can be integrated later.",
    riskAnalysisTitle: "Risk analysis",
    riskAnalysisDescription: "Pest and yield risks",
    riskLevelLabel: "Risk level",
    suggestionLabel: "Suggestion",
    soilImprovementTitle: "Soil improvement",
    soilImprovementDescription: "pH and condition suggestions",
  },
  hi: {
    soilHealthTitle: "मृदा स्वास्थ्य",
    soilHealthDescription: "सारांश और पोषक स्थिति",
    soilSummaryHeading: "मृदा सारांश",
    soilTypeLabel: "मृदा प्रकार",
    phStatusLabel: "pH स्थिति",
    fertilityLabel: "उर्वरता",
    nutrientStatusHeading: "पोषक स्थिति",
    recommendedCropsTitle: "अनुशंसित फसलें",
    recommendedCropsDescription: "शीर्ष 3 उपयुक्त फसलें",
    suitabilityBadge: "उपयुक्तता",
    idealSeasonLabel: "उपयुक्त मौसम",
    expectedYieldTitle: "अपेक्षित उत्पादन",
    expectedYieldDescription: "अनुमान बनाम राज्य औसत",
    estimatedYieldLabel: "अनुमानित उत्पादन",
    stateAverageLabel: "राज्य औसत",
    performanceLabel: "प्रदर्शन",
    sowingHarvestTitle: "बुवाई और कटाई",
    sowingHarvestDescription: "सर्वोत्तम समय और अवधि",
    sowLabel: "बुवाई",
    harvestLabel: "कटाई",
    cropDurationLabel: "फसल अवधि",
    daysSuffix: "दिन",
    irrigationTitle: "सिंचाई",
    irrigationDescription: "जल आवश्यकता और आवृत्ति",
    waterRequirementLabel: "जल आवश्यकता",
    frequencyLabel: "आवृत्ति",
    dripLabel: "ड्रिप",
    fertilizerTitle: "उर्वरक",
    fertilizerDescription: "सिफारिशें और जैविक विकल्प",
    organicLabel: "जैविक",
    weatherInsightTitle: "मौसम जानकारी",
    weatherInsightDescription: "स्थान आधारित मौसम (वैकल्पिक)",
    currentTempLabel: "वर्तमान तापमान",
    rainLabel: "वर्षा",
    alertsLabel: "चेतावनी",
    weatherComingSoon: "जल्द ही आ रहा है। मौसम API बाद में जोड़ा जा सकता है।",
    riskAnalysisTitle: "जोखिम विश्लेषण",
    riskAnalysisDescription: "कीट और उत्पादन जोखिम",
    riskLevelLabel: "जोखिम स्तर",
    suggestionLabel: "सुझाव",
    soilImprovementTitle: "मृदा सुधार",
    soilImprovementDescription: "pH और स्थिति सुझाव",
  },
  ta: {
    soilHealthTitle: "மண் ஆரோக்கியம்",
    soilHealthDescription: "சுருக்கம் மற்றும் ஊட்டச்சத்து நிலை",
    soilSummaryHeading: "மண் சுருக்கம்",
    soilTypeLabel: "மண் வகை",
    phStatusLabel: "pH நிலை",
    fertilityLabel: "செயற்கருமை",
    nutrientStatusHeading: "ஊட்டச்சத்து நிலை",
    recommendedCropsTitle: "பரிந்துரைக்கப்பட்ட பயிர்கள்",
    recommendedCropsDescription: "முதல் 3 பொருத்தமான பயிர்கள்",
    suitabilityBadge: "பொருத்தம்",
    idealSeasonLabel: "சரியான பருவம்",
    expectedYieldTitle: "எதிர்பார்க்கப்படும் விளைச்சல்",
    expectedYieldDescription: "மதிப்பு vs மாநில சராசரி",
    estimatedYieldLabel: "மதிப்பிடப்பட்ட விளைச்சல்",
    stateAverageLabel: "மாநில சராசரி",
    performanceLabel: "செயல்திறன்",
    sowingHarvestTitle: "விதைப்பு & அறுவடை",
    sowingHarvestDescription: "சிறந்த நேரம் மற்றும் காலம்",
    sowLabel: "விதைப்பு",
    harvestLabel: "அறுவடை",
    cropDurationLabel: "பயிர் காலம்",
    daysSuffix: "நாட்கள்",
    irrigationTitle: "பாசனம்",
    irrigationDescription: "தண்ணீர் தேவையும் அடிக்கடித்தன்மையும்",
    waterRequirementLabel: "தண்ணீர் தேவையை",
    frequencyLabel: "அடிக்கடித்தனம்",
    dripLabel: "ட்ரிப்",
    fertilizerTitle: "உரம்",
    fertilizerDescription: "பரிந்துரைகள் மற்றும் இயற்கை விருப்பங்கள்",
    organicLabel: "இயற்கை",
    weatherInsightTitle: "வானிலை தகவல்",
    weatherInsightDescription: "இடத்தை சார்ந்த வானிலை (விருப்பம்)",
    currentTempLabel: "தற்போதைய வெப்பநிலை",
    rainLabel: "மழை",
    alertsLabel: "எச்சரிக்கைகள்",
    weatherComingSoon: "விரைவில் வருகிறது. வானிலை API பின்னர் சேர்க்கலாம்.",
    riskAnalysisTitle: "அபாய ஆய்வு",
    riskAnalysisDescription: "பூச்சி மற்றும் விளைச்சல் அபாயங்கள்",
    riskLevelLabel: "அபாய நிலை",
    suggestionLabel: "பரிந்துரை",
    soilImprovementTitle: "மண் மேம்பாடு",
    soilImprovementDescription: "pH மற்றும் நிலை குறித்த பரிந்துரைகள்",
  },
};

function getMessages(language?: SupportedLanguage) {
  if (!language) return messages.en;
  return messages[language] ?? messages.en;
}

export function AnalysisDashboard({ data, cached, language = "en" }: AnalysisDashboardProps) {
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
  const t = getMessages(language);

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
        title={t.soilHealthTitle}
        description={t.soilHealthDescription}
        className="delay-0"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              {t.soilSummaryHeading}
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <strong>{t.soilTypeLabel}:</strong> {soilSummary.soilType}
              </li>
              <li>
                <strong>{t.phStatusLabel}:</strong> {soilSummary.phStatus}
              </li>
              <li>
                <strong>{t.fertilityLabel}:</strong> {soilSummary.fertilityLevel}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              {t.nutrientStatusHeading}
            </h4>
            <div className="flex flex-wrap gap-3">
              <NutrientBadge level={nutrientStatus.nitrogen} label="N" />
              <NutrientBadge level={nutrientStatus.phosphorus} label="P" />
              <NutrientBadge level={nutrientStatus.potassium} label="K" />
            </div>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection
        title={t.recommendedCropsTitle}
        description={t.recommendedCropsDescription}
        className="delay-75"
      >
        <ul className="space-y-4">
          {recommendedCrops.map((crop, i) => (
            <li key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-medium">{crop.name}</span>
                <Badge variant="secondary">
                  {crop.suitabilityPercent}% {t.suitabilityBadge}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{crop.whyRecommended}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.idealSeasonLabel}: {crop.idealSeason}
              </p>
            </li>
          ))}
        </ul>
      </DashboardSection>

      <DashboardSection
        title={t.expectedYieldTitle}
        description={t.expectedYieldDescription}
        className="delay-150"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">{t.estimatedYieldLabel}</p>
            <p className="text-xl font-semibold">
              {yieldPrediction.estimatedYieldPerAcre} {yieldPrediction.unit}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t.stateAverageLabel}</p>
            <p className="text-xl font-semibold">
              {yieldPrediction.stateAverage} {yieldPrediction.unit}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t.performanceLabel}</p>
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
        title={t.sowingHarvestTitle}
        description={t.sowingHarvestDescription}
        className="delay-200"
      >
        <ul className="space-y-2 text-sm">
          <li>
            <strong>{t.sowLabel}:</strong> {sowingHarvest.bestSowingMonthRange}
          </li>
          <li>
            <strong>{t.harvestLabel}:</strong> {sowingHarvest.harvestMonthRange}
          </li>
          <li>
            <strong>{t.cropDurationLabel}:</strong> {sowingHarvest.cropDurationDays} {t.daysSuffix}
          </li>
        </ul>
      </DashboardSection>

      <DashboardSection
        title={t.irrigationTitle}
        description={t.irrigationDescription}
        className="delay-300"
      >
        <ul className="space-y-2 text-sm">
          <li>
            <strong>{t.waterRequirementLabel}:</strong> {irrigation.waterRequirement}
          </li>
          <li>
            <strong>{t.frequencyLabel}:</strong> {irrigation.irrigationFrequency}
          </li>
          <li>
            <strong>{t.dripLabel}:</strong> {irrigation.dripSuggestion}
          </li>
        </ul>
      </DashboardSection>

      <DashboardSection
        title={t.fertilizerTitle}
        description={t.fertilizerDescription}
        className="delay-[400ms]"
      >
        <ul className="space-y-4">
          {fertilizerRecommendations.map((rec, i) => (
            <li key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <p className="font-medium text-sm">{rec.nutrient}</p>
              <p className="text-sm text-muted-foreground">{rec.recommendation}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.organicLabel}: {rec.organicAlternative}
              </p>
            </li>
          ))}
        </ul>
      </DashboardSection>

      <DashboardSection
        title={t.weatherInsightTitle}
        description={t.weatherInsightDescription}
        className="delay-500"
      >
        {weatherInsight && typeof weatherInsight === "object" ? (
          <ul className="space-y-2 text-sm">
            {weatherInsight.currentTemperature && (
              <li>
                <strong>{t.currentTempLabel}:</strong> {weatherInsight.currentTemperature}
              </li>
            )}
            {weatherInsight.rainForecast && (
              <li>
                <strong>{t.rainLabel}:</strong> {weatherInsight.rainForecast}
              </li>
            )}
            {weatherInsight.riskAlerts && (
              <li>
                <strong>{t.alertsLabel}:</strong> {weatherInsight.riskAlerts}
              </li>
            )}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">{t.weatherComingSoon}</p>
        )}
      </DashboardSection>

      <DashboardSection
        title={t.riskAnalysisTitle}
        description={t.riskAnalysisDescription}
        className="delay-700"
      >
        <div className="space-y-2">
          <p>
            <strong>{t.riskLevelLabel}:</strong> {riskAnalysis.riskLevel}
          </p>
          <p className="text-sm text-muted-foreground">{riskAnalysis.reason}</p>
          <p className="text-sm">
            <strong>{t.suggestionLabel}:</strong> {riskAnalysis.suggestion}
          </p>
        </div>
      </DashboardSection>

      <DashboardSection
        title={t.soilImprovementTitle}
        description={t.soilImprovementDescription}
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
