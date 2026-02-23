"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Leaf,
    Droplets,
    Thermometer,
    TrendingUp,
    TrendingDown,
    Calendar,
    ShieldAlert,
    Wrench,
    Sprout,
    FlaskConical,
    CloudRain,
    ChevronRight,
    RotateCcw,
    Award,
    Gauge,
    Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SoilAnalysisResponse, SoilAnalysisInput } from "@/lib/soil-analysis-types";

type StoredResult = {
    data: SoilAnalysisResponse;
    cached: boolean;
    language: string;
    input: SoilAnalysisInput;
};

// ─── Utility Components ───

function SectionHeader({
    icon: Icon,
    title,
    subtitle,
    accentColor = "text-primary",
}: {
    icon: React.ElementType;
    title: string;
    subtitle?: string;
    accentColor?: string;
}) {
    return (
        <div className="flex items-start gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 ${accentColor}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h2 className="font-display text-xl font-semibold">{title}</h2>
                {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
        </div>
    );
}

function MetricCard({
    label,
    value,
    subvalue,
    icon: Icon,
    trend,
    className,
}: {
    label: string;
    value: string | number;
    subvalue?: string;
    icon?: React.ElementType;
    trend?: "up" | "down" | "neutral";
    className?: string;
}) {
    return (
        <div className={cn("rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5", className)}>
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {label}
                </span>
                {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-display">{value}</span>
                {trend && (
                    <span className={cn("text-sm font-medium", trend === "up" ? "text-forest-500" : trend === "down" ? "text-red-500" : "text-muted-foreground")}>
                        {trend === "up" && <TrendingUp className="w-4 h-4 inline mr-1" />}
                        {trend === "down" && <TrendingDown className="w-4 h-4 inline mr-1" />}
                    </span>
                )}
            </div>
            {subvalue && <p className="text-xs text-muted-foreground mt-1">{subvalue}</p>}
        </div>
    );
}

function NutrientGauge({
    label,
    level,
    symbol,
}: {
    label: string;
    level: "Low" | "Optimal" | "High";
    symbol: string;
}) {
    const colors = {
        Low: { bar: "bg-red-500", bg: "bg-red-50 dark:bg-red-950/40", text: "text-red-700 dark:text-red-300", width: "33%" },
        Optimal: { bar: "bg-forest-500", bg: "bg-forest-50 dark:bg-forest-950/40", text: "text-forest-700 dark:text-forest-300", width: "66%" },
        High: { bar: "bg-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-300", width: "100%" },
    };
    const c = colors[level];

    return (
        <div className={cn("rounded-xl p-4 border transition-all hover:shadow-md", c.bg, `border-${level === "Low" ? "red" : level === "Optimal" ? "forest" : "amber"}-200 dark:border-${level === "Low" ? "red" : level === "Optimal" ? "forest" : "amber"}-800/40`)}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-display">{symbol}</span>
                    <span className="text-sm text-muted-foreground">{label}</span>
                </div>
                <Badge variant="outline" className={cn("text-xs font-medium", c.text)}>
                    {level}
                </Badge>
            </div>
            <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000 ease-out", c.bar)}
                    style={{ width: c.width }}
                />
            </div>
        </div>
    );
}

function CropCard({
    name,
    suitability,
    reason,
    season,
    rank,
}: {
    name: string;
    suitability: number;
    reason: string;
    season: string;
    rank: number;
}) {
    const ringColor = suitability >= 80 ? "text-forest-500" : suitability >= 60 ? "text-amber-500" : "text-earth-500";
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (suitability / 100) * circumference;

    return (
        <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/20">
            <div className="flex items-start gap-5">
                {/* Circular progress */}
                <div className="relative w-20 h-20 shrink-0">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary" />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            className={cn(ringColor, "transition-all duration-1000 ease-out")}
                            style={{ '--circumference': circumference, '--dash-offset': offset } as React.CSSProperties}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-lg font-bold font-display">{suitability}</span>
                        <span className="text-[9px] text-muted-foreground -mt-0.5">%</span>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        {rank <= 3 && (
                            <span className={cn(
                                "w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold text-white",
                                rank === 1 ? "bg-amber-500" : rank === 2 ? "bg-stone-400" : "bg-amber-700"
                            )}>
                                {rank}
                            </span>
                        )}
                        <h3 className="font-display text-lg font-semibold truncate">{name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{reason}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{season}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
            <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-0.5">{label}</span>
                <span className="text-sm">{value}</span>
            </div>
        </div>
    );
}

function FertilizerCard({
    nutrient,
    recommendation,
    organic,
}: {
    nutrient: string;
    recommendation: string;
    organic: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
            <h4 className="font-display font-semibold text-base mb-2">{nutrient}</h4>
            <p className="text-sm text-muted-foreground mb-3">{recommendation}</p>
            <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-md bg-forest-50 dark:bg-forest-950/40 text-forest-700 dark:text-forest-300 font-medium">
                    🌱 Organic
                </span>
                <span className="text-muted-foreground">{organic}</span>
            </div>
        </div>
    );
}

// ─── Main Dashboard ───

export function ResultsDashboard() {
    const [result, setResult] = useState<StoredResult | null>(null);
    const router = useRouter();

    useEffect(() => {
        const raw = sessionStorage.getItem("soil-result");
        if (!raw) {
            router.replace("/analyze");
            return;
        }
        try {
            setResult(JSON.parse(raw));
        } catch {
            router.replace("/analyze");
        }
    }, [router]);

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading results…</p>
                </div>
            </div>
        );
    }

    const { data, input } = result;
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

    const perfPositive = yieldPrediction.performancePercent >= 0;

    return (
        <div className="min-h-screen pb-20">
            {/* ─── Header ─── */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-800 via-forest-900 to-earth-900" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-forest-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl" />
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
                    <defs>
                        <pattern id="result-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#result-dots)" />
                </svg>

                <div className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-12">
                    {/* Nav */}
                    <div className="flex items-center justify-between mb-10">
                        <Link
                            href="/"
                            className="group flex items-center gap-2 text-sm text-forest-200/70 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                            Home
                        </Link>
                        <Link
                            href="/analyze"
                            className="flex items-center gap-2 text-sm text-forest-200/70 hover:text-white transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            New Analysis
                        </Link>
                    </div>

                    {/* Hero info */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                    <Leaf className="w-4 h-4 text-forest-300" />
                                </div>
                                <span className="text-sm text-forest-300 font-medium">SoilSense Report</span>
                            </div>
                            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                                {soilSummary.soilType} Soil Analysis
                            </h1>
                            <p className="text-forest-200/60 text-sm flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" />
                                {input.location}
                            </p>
                        </div>

                        {/* Quick stats in header */}
                        <div className="flex flex-wrap gap-3">
                            <div className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                <p className="text-[10px] uppercase tracking-wider text-forest-300/80 mb-0.5">pH Status</p>
                                <p className="text-sm font-semibold text-white">{soilSummary.phStatus}</p>
                            </div>
                            <div className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                <p className="text-[10px] uppercase tracking-wider text-forest-300/80 mb-0.5">Fertility</p>
                                <p className="text-sm font-semibold text-white">{soilSummary.fertilityLevel}</p>
                            </div>
                            <div className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                <p className="text-[10px] uppercase tracking-wider text-forest-300/80 mb-0.5">Performance</p>
                                <p className={cn("text-sm font-semibold", perfPositive ? "text-green-400" : "text-red-400")}>
                                    {perfPositive ? "+" : ""}{yieldPrediction.performancePercent}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Dashboard Content ─── */}
            <div className="max-w-6xl mx-auto px-6 -mt-1">
                {/* Nutrient Status */}
                <section className="mb-10 animate-slide-up-fade">
                    <SectionHeader icon={Gauge} title="Nutrient Status" subtitle="NPK levels from your soil test" accentColor="text-forest-500" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <NutrientGauge label="Nitrogen" level={nutrientStatus.nitrogen} symbol="N" />
                        <NutrientGauge label="Phosphorus" level={nutrientStatus.phosphorus} symbol="P" />
                        <NutrientGauge label="Potassium" level={nutrientStatus.potassium} symbol="K" />
                    </div>
                </section>

                {/* Recommended Crops */}
                <section className="mb-10 animate-slide-up-fade delay-100">
                    <SectionHeader icon={Sprout} title="Recommended Crops" subtitle="Top crops suited for your soil and region" accentColor="text-forest-500" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recommendedCrops.map((crop, i) => (
                            <CropCard
                                key={i}
                                name={crop.name}
                                suitability={crop.suitabilityPercent}
                                reason={crop.whyRecommended}
                                season={crop.idealSeason}
                                rank={i + 1}
                            />
                        ))}
                    </div>
                </section>

                {/* Yield Prediction */}
                <section className="mb-10 animate-slide-up-fade delay-200">
                    <SectionHeader icon={Target} title="Yield Prediction" subtitle="Estimated vs state average" accentColor="text-amber-500" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <MetricCard
                            label="Estimated Yield"
                            value={`${yieldPrediction.estimatedYieldPerAcre}`}
                            subvalue={`${yieldPrediction.unit} / acre`}
                            icon={TrendingUp}
                        />
                        <MetricCard
                            label="State Average"
                            value={`${yieldPrediction.stateAverage}`}
                            subvalue={`${yieldPrediction.unit} / acre`}
                            icon={Award}
                        />
                        <MetricCard
                            label="Performance"
                            value={`${perfPositive ? "+" : ""}${yieldPrediction.performancePercent}%`}
                            subvalue={perfPositive ? "Above average" : "Below average"}
                            trend={perfPositive ? "up" : "down"}
                            className={perfPositive ? "border-forest-200 dark:border-forest-800/40" : "border-red-200 dark:border-red-800/40"}
                        />
                    </div>
                </section>

                {/* Two column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Sowing & Harvest */}
                    <section className="animate-slide-up-fade delay-300">
                        <SectionHeader icon={Calendar} title="Sowing & Harvest" subtitle="Optimal timing for your region" accentColor="text-earth-500" />
                        <div className="rounded-2xl border border-border bg-card p-6">
                            <div className="space-y-0">
                                <InfoRow icon={Sprout} label="Best Sowing Window" value={sowingHarvest.bestSowingMonthRange} />
                                <InfoRow icon={Award} label="Harvest Window" value={sowingHarvest.harvestMonthRange} />
                                <InfoRow icon={Calendar} label="Crop Duration" value={`${sowingHarvest.cropDurationDays} days`} />
                            </div>
                            {/* Visual timeline */}
                            <div className="mt-5 pt-4 border-t border-border">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-forest-400 via-amber-400 to-earth-400 relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
                                    <span>Sow</span>
                                    <span>Grow</span>
                                    <span>Harvest</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Irrigation */}
                    <section className="animate-slide-up-fade delay-400">
                        <SectionHeader icon={Droplets} title="Irrigation Plan" subtitle="Water management for your soil" accentColor="text-blue-500" />
                        <div className="rounded-2xl border border-border bg-card p-6">
                            <InfoRow icon={Droplets} label="Water Requirement" value={irrigation.waterRequirement} />
                            <InfoRow icon={Calendar} label="Frequency" value={irrigation.irrigationFrequency} />
                            <InfoRow icon={Target} label="Drip Suggestion" value={irrigation.dripSuggestion} />
                        </div>
                    </section>
                </div>

                {/* Fertilizer Recommendations */}
                <section className="mb-10 animate-slide-up-fade delay-500">
                    <SectionHeader icon={FlaskConical} title="Fertilizer Plan" subtitle="Nutrient-specific recommendations" accentColor="text-amber-600" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {fertilizerRecommendations.map((rec, i) => (
                            <FertilizerCard
                                key={i}
                                nutrient={rec.nutrient}
                                recommendation={rec.recommendation}
                                organic={rec.organicAlternative}
                            />
                        ))}
                    </div>
                </section>

                {/* Two column: Weather + Risk */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Weather Insight */}
                    <section className="animate-slide-up-fade delay-600">
                        <SectionHeader icon={CloudRain} title="Weather Insight" subtitle="Location-based conditions" accentColor="text-sky-500" />
                        <div className="rounded-2xl border border-border bg-card p-6">
                            {weatherInsight && typeof weatherInsight === "object" ? (
                                <>
                                    {weatherInsight.currentTemperature && (
                                        <InfoRow icon={Thermometer} label="Current Temperature" value={weatherInsight.currentTemperature} />
                                    )}
                                    {weatherInsight.rainForecast && (
                                        <InfoRow icon={CloudRain} label="Rain Forecast" value={weatherInsight.rainForecast} />
                                    )}
                                    {weatherInsight.riskAlerts && (
                                        <InfoRow icon={ShieldAlert} label="Weather Alerts" value={weatherInsight.riskAlerts} />
                                    )}
                                </>
                            ) : (
                                <p className="text-sm text-muted-foreground py-4 text-center">
                                    Weather data will be available with API integration.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Risk Analysis */}
                    <section className="animate-slide-up-fade delay-700">
                        <SectionHeader icon={ShieldAlert} title="Risk Analysis" subtitle="Potential threats and mitigation" accentColor="text-terracotta-500" />
                        <div className="rounded-2xl border border-border bg-card p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Risk Level</span>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "font-medium",
                                        riskAnalysis.riskLevel.toLowerCase().includes("low")
                                            ? "text-forest-600 border-forest-300 dark:text-forest-400 dark:border-forest-700"
                                            : riskAnalysis.riskLevel.toLowerCase().includes("high")
                                                ? "text-red-600 border-red-300 dark:text-red-400 dark:border-red-700"
                                                : "text-amber-600 border-amber-300 dark:text-amber-400 dark:border-amber-700"
                                    )}
                                >
                                    {riskAnalysis.riskLevel}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{riskAnalysis.reason}</p>
                            <div className="rounded-lg bg-secondary/60 p-3">
                                <p className="text-xs font-medium text-muted-foreground mb-1">Suggestion</p>
                                <p className="text-sm">{riskAnalysis.suggestion}</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Soil Improvement */}
                <section className="mb-10 animate-slide-up-fade delay-800">
                    <SectionHeader icon={Wrench} title="Soil Improvement" subtitle="Steps to enhance your soil health" accentColor="text-earth-600" />
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <div className="space-y-3">
                            {soilImprovementSuggestions.map((suggestion, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 group"
                                >
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                                        <ChevronRight className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <p className="text-sm leading-relaxed">{suggestion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="text-center pt-6 pb-10 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                        Want to analyze different soil conditions?
                    </p>
                    <Link
                        href="/analyze"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Run New Analysis
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Need MapPin which is imported via lucide-react
function MapPin(props: React.ComponentProps<"svg">) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}
