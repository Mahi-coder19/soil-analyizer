"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    MapPin,
    FlaskConical,
    CloudSun,
    CheckCircle2,
    Leaf,
    Loader2,
    Languages,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SoilAnalysisInput } from "@/lib/soil-analysis-types";

const STEPS = [
    { id: "location", label: "Location", icon: MapPin },
    { id: "soil", label: "Soil Data", icon: FlaskConical },
    { id: "climate", label: "Climate", icon: CloudSun },
    { id: "review", label: "Review", icon: CheckCircle2 },
] as const;

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

function StepIndicator({ current }: { current: number }) {
    return (
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10">
            {STEPS.map((step, i) => {
                const done = i < current;
                const active = i === current;
                return (
                    <div key={step.id} className="flex items-center gap-1 sm:gap-2">
                        {/* Step circle */}
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${done
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                        : active
                                            ? "bg-foreground text-background shadow-lg shadow-foreground/15"
                                            : "bg-secondary text-muted-foreground"
                                    }`}
                            >
                                {done ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                    <step.icon className="w-5 h-5" />
                                )}
                            </div>
                            <span
                                className={`text-[10px] font-medium hidden sm:block transition-colors ${active ? "text-foreground" : "text-muted-foreground"
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Connector */}
                        {i < STEPS.length - 1 && (
                            <div className="w-8 sm:w-14 h-[2px] rounded-full mb-5 sm:mb-5 overflow-hidden bg-secondary">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-500"
                                    style={{ width: done ? "100%" : "0%" }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function FieldBlock({
    label,
    hint,
    children,
}: {
    label: string;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            {children}
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
    );
}

function ReviewRow({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium">{value}</span>
        </div>
    );
}

const languageOptions = [
    { value: "en", label: "English", flag: "🇬🇧" },
    { value: "hi", label: "Hindi", flag: "🇮🇳" },
    { value: "ta", label: "Tamil", flag: "🇮🇳" },
];

export function MultiStepForm() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<SoilAnalysisInput>(defaultValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const update = (key: keyof SoilAnalysisInput, value: string | number) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const numUpdate = (key: keyof SoilAnalysisInput, e: React.ChangeEvent<HTMLInputElement>) => {
        const n = e.target.valueAsNumber;
        if (Number.isFinite(n)) update(key, n);
    };

    const canNext = () => {
        if (step === 0) return form.location.trim().length > 0;
        return true;
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/soil-analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (!res.ok) {
                setError(json.error || "Analysis failed");
                setLoading(false);
                return;
            }
            // Store result in sessionStorage for the results page
            sessionStorage.setItem(
                "soil-result",
                JSON.stringify({
                    data: json.data,
                    cached: json.cached,
                    language: form.language,
                    input: form,
                })
            );
            router.push("/results");
        } catch {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    };

    const next = () => {
        if (step === STEPS.length - 1) {
            handleSubmit();
        } else {
            setStep((s) => Math.min(s + 1, STEPS.length - 1));
        }
    };
    const prev = () => setStep((s) => Math.max(s - 1, 0));

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            {/* Back to home */}
            <Link
                href="/"
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back to home
            </Link>

            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display text-lg font-semibold">SoilSense</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-center mb-2">
                Soil Analysis
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-8 max-w-md">
                Fill in your soil and climate data step by step to get personalized recommendations.
            </p>

            {/* Step indicator */}
            <StepIndicator current={step} />

            {/* Form card */}
            <div className="w-full max-w-lg">
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm animate-scale-in">
                    {/* Step 1: Location */}
                    {step === 0 && (
                        <div className="space-y-6 animate-slide-up-fade">
                            <div>
                                <h2 className="font-display text-xl font-semibold mb-1">
                                    Where is your farm?
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    We tailor everything to your region — crops, yields, and practices.
                                </p>
                            </div>

                            <FieldBlock
                                label="Location (State, District)"
                                hint="e.g. Punjab, Ludhiana or Tamil Nadu, Coimbatore"
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter state and district"
                                    value={form.location}
                                    onChange={(e) => update("location", e.target.value)}
                                    className="h-12"
                                />
                            </FieldBlock>

                            <FieldBlock label="Report Language">
                                <div className="grid grid-cols-3 gap-2">
                                    {languageOptions.map((lang) => (
                                        <button
                                            key={lang.value}
                                            type="button"
                                            onClick={() => update("language", lang.value)}
                                            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-sm font-medium transition-all ${form.language === lang.value
                                                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                                                    : "border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            <span>{lang.flag}</span>
                                            <span>{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </FieldBlock>
                        </div>
                    )}

                    {/* Step 2: Soil Data */}
                    {step === 1 && (
                        <div className="space-y-6 animate-slide-up-fade">
                            <div>
                                <h2 className="font-display text-xl font-semibold mb-1">
                                    Soil parameters
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Enter the values from your soil test report.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FieldBlock label="pH Value" hint="0 – 14 scale">
                                    <Input
                                        type="number"
                                        step="0.1"
                                        min={0}
                                        max={14}
                                        value={form.ph}
                                        onChange={(e) => numUpdate("ph", e)}
                                        className="h-12"
                                    />
                                </FieldBlock>
                                <FieldBlock label="Soil Moisture (%)" hint="0 – 100%">
                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={form.soilMoisture}
                                        onChange={(e) => numUpdate("soilMoisture", e)}
                                        className="h-12"
                                    />
                                </FieldBlock>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                                    NPK Values (mg/kg)
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    <FieldBlock label="Nitrogen (N)">
                                        <Input
                                            type="number"
                                            min={0}
                                            value={form.nitrogen}
                                            onChange={(e) => numUpdate("nitrogen", e)}
                                            className="h-12"
                                        />
                                    </FieldBlock>
                                    <FieldBlock label="Phosphorus (P)">
                                        <Input
                                            type="number"
                                            min={0}
                                            value={form.phosphorus}
                                            onChange={(e) => numUpdate("phosphorus", e)}
                                            className="h-12"
                                        />
                                    </FieldBlock>
                                    <FieldBlock label="Potassium (K)">
                                        <Input
                                            type="number"
                                            min={0}
                                            value={form.potassium}
                                            onChange={(e) => numUpdate("potassium", e)}
                                            className="h-12"
                                        />
                                    </FieldBlock>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Climate */}
                    {step === 2 && (
                        <div className="space-y-6 animate-slide-up-fade">
                            <div>
                                <h2 className="font-display text-xl font-semibold mb-1">
                                    Climate conditions
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Current or average weather at your farm location.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FieldBlock label="Temperature (°C)" hint="Average ambient">
                                    <Input
                                        type="number"
                                        value={form.temperature}
                                        onChange={(e) => numUpdate("temperature", e)}
                                        className="h-12"
                                    />
                                </FieldBlock>
                                <FieldBlock label="Humidity (%)" hint="0 – 100%">
                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={form.humidity}
                                        onChange={(e) => numUpdate("humidity", e)}
                                        className="h-12"
                                    />
                                </FieldBlock>
                            </div>

                            {/* Quick climate visual */}
                            <div className="rounded-xl bg-secondary/60 p-4 flex items-center gap-4">
                                <CloudSun className="w-8 h-8 text-amber-500 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Climate preview</p>
                                    <p className="text-xs text-muted-foreground">
                                        {form.temperature}°C with {form.humidity}% humidity in {form.location || "your region"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 3 && (
                        <div className="space-y-6 animate-slide-up-fade">
                            <div>
                                <h2 className="font-display text-xl font-semibold mb-1">
                                    Review your data
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Confirm everything looks correct before we analyze.
                                </p>
                            </div>

                            <div className="rounded-xl border border-border divide-y divide-border">
                                <div className="px-4">
                                    <ReviewRow label="Location" value={form.location} />
                                    <ReviewRow
                                        label="Language"
                                        value={
                                            languageOptions.find((l) => l.value === form.language)
                                                ?.label || "English"
                                        }
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl border border-border">
                                <div className="px-4 py-2 border-b border-border">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        Soil
                                    </span>
                                </div>
                                <div className="px-4">
                                    <ReviewRow label="pH" value={form.ph} />
                                    <ReviewRow label="Nitrogen (N)" value={`${form.nitrogen} mg/kg`} />
                                    <ReviewRow label="Phosphorus (P)" value={`${form.phosphorus} mg/kg`} />
                                    <ReviewRow label="Potassium (K)" value={`${form.potassium} mg/kg`} />
                                    <ReviewRow label="Soil Moisture" value={`${form.soilMoisture}%`} />
                                </div>
                            </div>

                            <div className="rounded-xl border border-border">
                                <div className="px-4 py-2 border-b border-border">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        Climate
                                    </span>
                                </div>
                                <div className="px-4">
                                    <ReviewRow label="Temperature" value={`${form.temperature}°C`} />
                                    <ReviewRow label="Humidity" value={`${form.humidity}%`} />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm" role="alert">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-6">
                    <div>
                        {step > 0 && (
                            <Button
                                variant="outline"
                                onClick={prev}
                                disabled={loading}
                                className="rounded-xl px-6"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        )}
                    </div>

                    <Button
                        onClick={next}
                        disabled={!canNext() || loading}
                        className="rounded-xl px-8 ml-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Analyzing…
                            </>
                        ) : step === STEPS.length - 1 ? (
                            <>
                                Analyze Soil
                                <FlaskConical className="w-4 h-4 ml-2" />
                            </>
                        ) : (
                            <>
                                Continue
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
