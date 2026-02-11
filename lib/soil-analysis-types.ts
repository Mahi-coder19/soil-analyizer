import { z } from "zod";

const nutrientLevel = z.enum(["Low", "Optimal", "High"]);

export const soilSummarySchema = z.object({
  soilType: z.string(),
  phStatus: z.string(),
  fertilityLevel: z.string(),
});

export const nutrientStatusSchema = z.object({
  nitrogen: nutrientLevel,
  phosphorus: nutrientLevel,
  potassium: nutrientLevel,
});

export const recommendedCropSchema = z.object({
  name: z.string(),
  suitabilityPercent: z.number(),
  whyRecommended: z.string(),
  idealSeason: z.string(),
});

export const yieldPredictionSchema = z.object({
  estimatedYieldPerAcre: z.number(),
  unit: z.string(),
  stateAverage: z.number(),
  performancePercent: z.number(),
});

export const sowingHarvestSchema = z.object({
  bestSowingMonthRange: z.string(),
  harvestMonthRange: z.string(),
  cropDurationDays: z.number(),
});

export const irrigationSchema = z.object({
  waterRequirement: z.string(),
  irrigationFrequency: z.string(),
  dripSuggestion: z.string(),
});

export const fertilizerRecommendationSchema = z.object({
  nutrient: z.string(),
  recommendation: z.string(),
  organicAlternative: z.string(),
});

export const riskAnalysisSchema = z.object({
  riskLevel: z.string(),
  reason: z.string(),
  suggestion: z.string(),
});

export const weatherInsightSchema = z
  .object({
    currentTemperature: z.string().nullable(),
    rainForecast: z.string().nullable(),
    riskAlerts: z.string().nullable(),
  })
  .nullable();

export const soilAnalysisResponseSchema = z.object({
  soilSummary: soilSummarySchema,
  nutrientStatus: nutrientStatusSchema,
  recommendedCrops: z.array(recommendedCropSchema),
  yieldPrediction: yieldPredictionSchema,
  sowingHarvest: sowingHarvestSchema,
  irrigation: irrigationSchema,
  fertilizerRecommendations: z.array(fertilizerRecommendationSchema),
  riskAnalysis: riskAnalysisSchema,
  soilImprovementSuggestions: z.array(z.string()),
  weatherInsight: weatherInsightSchema,
});

export type SoilAnalysisResponse = z.infer<typeof soilAnalysisResponseSchema>;
export type SoilSummary = z.infer<typeof soilSummarySchema>;
export type NutrientStatus = z.infer<typeof nutrientStatusSchema>;
export type RecommendedCrop = z.infer<typeof recommendedCropSchema>;
export type YieldPrediction = z.infer<typeof yieldPredictionSchema>;
export type SowingHarvest = z.infer<typeof sowingHarvestSchema>;
export type Irrigation = z.infer<typeof irrigationSchema>;
export type FertilizerRecommendation = z.infer<typeof fertilizerRecommendationSchema>;
export type RiskAnalysis = z.infer<typeof riskAnalysisSchema>;

export const soilAnalysisInputSchema = z.object({
  ph: z.number().min(0).max(14),
  nitrogen: z.number().min(0),
  phosphorus: z.number().min(0),
  potassium: z.number().min(0),
  soilMoisture: z.number().min(0).max(100),
  temperature: z.number(),
  humidity: z.number().min(0).max(100),
  location: z.string().min(1),
});

export type SoilAnalysisInput = z.infer<typeof soilAnalysisInputSchema>;
