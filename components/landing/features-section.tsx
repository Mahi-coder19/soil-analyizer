"use client";

import {
    Zap,
    MapPin,
    Languages,
    BarChart3,
    Droplets,
    ShieldCheck,
} from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "AI-Powered Analysis",
        desc: "GPT-4o analyzes your soil data and generates professional-grade agronomic recommendations in seconds.",
        color: "text-amber-500",
        bg: "bg-amber-50 dark:bg-amber-950/30",
        border: "border-amber-200 dark:border-amber-800/40",
    },
    {
        icon: MapPin,
        title: "Region-Specific",
        desc: "Recommendations tailored to your Indian state and district — crops, yields, and practices that actually work locally.",
        color: "text-forest-500",
        bg: "bg-forest-50 dark:bg-forest-950/30",
        border: "border-forest-200 dark:border-forest-800/40",
    },
    {
        icon: Languages,
        title: "Multi-Language",
        desc: "Get results in English, Hindi, or Tamil. JSON keys stay universal while content speaks your language.",
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-950/30",
        border: "border-blue-200 dark:border-blue-800/40",
    },
    {
        icon: BarChart3,
        title: "Yield Predictions",
        desc: "Compare your estimated yield against real state averages. Know your performance before you sow.",
        color: "text-earth-600",
        bg: "bg-earth-50 dark:bg-earth-900/30",
        border: "border-earth-200 dark:border-earth-700/40",
    },
    {
        icon: Droplets,
        title: "Irrigation Planning",
        desc: "Water requirement, frequency, and drip suggestions calibrated for your soil moisture and region.",
        color: "text-sky-500",
        bg: "bg-sky-50 dark:bg-sky-950/30",
        border: "border-sky-200 dark:border-sky-800/40",
    },
    {
        icon: ShieldCheck,
        title: "Risk Assessment",
        desc: "Know your pest risks, weather threats, and soil issues before they become problems.",
        color: "text-terracotta-500",
        bg: "bg-red-50 dark:bg-red-950/30",
        border: "border-red-200 dark:border-red-800/40",
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-28 px-6 relative">
            {/* Subtle divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
                        Capabilities
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                        Everything your soil needs,
                        <br />
                        <span className="text-muted-foreground">analyzed in one place</span>
                    </h2>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className={`group relative rounded-2xl border ${f.border} ${f.bg} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-black/5`}
                        >
                            {/* Icon */}
                            <div
                                className={`w-11 h-11 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3`}
                            >
                                <f.icon className={`w-5 h-5 ${f.color}`} />
                            </div>

                            <h3 className="font-display font-semibold text-lg mb-2">
                                {f.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {f.desc}
                            </p>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
