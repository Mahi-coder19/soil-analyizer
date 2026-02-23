"use client";

import { FlaskConical, Brain, FileText } from "lucide-react";

const steps = [
    {
        num: "01",
        icon: FlaskConical,
        title: "Enter soil data",
        desc: "Input your pH, NPK values, moisture, temperature, humidity, and location through our guided form.",
        accent: "from-forest-500 to-forest-600",
    },
    {
        num: "02",
        icon: Brain,
        title: "AI analyzes",
        desc: "Our AI cross-references your data with regional agricultural databases to generate precise recommendations.",
        accent: "from-amber-500 to-amber-600",
    },
    {
        num: "03",
        icon: FileText,
        title: "Get your report",
        desc: "Receive crop recommendations, yield predictions, irrigation plans, risk analysis, and improvement tips.",
        accent: "from-earth-500 to-earth-600",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-28 px-6 bg-secondary/40 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-20">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
                        Process
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                        Three simple steps to
                        <br />
                        <span className="text-muted-foreground">smarter farming</span>
                    </h2>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-[2px]">
                        <div className="w-full h-full bg-gradient-to-r from-forest-300 via-amber-300 to-earth-300 dark:from-forest-700 dark:via-amber-700 dark:to-earth-700 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="relative flex flex-col items-center text-center group">
                                {/* Step number badge */}
                                <div className="relative mb-6">
                                    <div
                                        className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 relative overflow-hidden`}
                                    >
                                        {/* Inner pattern */}
                                        <div className="absolute inset-0 opacity-10">
                                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                                <circle cx="20" cy="20" r="15" fill="white" />
                                                <circle cx="80" cy="70" r="20" fill="white" />
                                            </svg>
                                        </div>
                                        <step.icon className="w-10 h-10 text-white relative z-10" />
                                    </div>
                                    {/* Step number */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-md">
                                        <span className="text-xs font-bold text-foreground">{step.num}</span>
                                    </div>
                                </div>

                                <h3 className="font-display font-semibold text-xl mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
