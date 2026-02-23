"use client";

import Link from "next/link";
import { ArrowRight, Sprout, Droplets, Sun } from "lucide-react";

function OrganicBlob({ className }: { className?: string }) {
    return (
        <div
            className={`absolute rounded-full animate-morph blur-3xl opacity-20 ${className}`}
        />
    );
}

function FloatingIcon({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`absolute glass rounded-2xl p-3 shadow-xl animate-float ${className}`}
        >
            {children}
        </div>
    );
}

function StatPill({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10">
            <span className="text-sm font-bold text-primary">{value}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    );
}

export function HeroSection() {
    return (
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0">
                {/* Main gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-forest-50 via-earth-50 to-amber-50 dark:from-forest-900/40 dark:via-earth-900 dark:to-amber-900/30" />

                {/* Organic mesh pattern */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.04]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="30" cy="30" r="1" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Organic blobs */}
                <OrganicBlob className="w-[500px] h-[500px] bg-forest-300 dark:bg-forest-600 -top-20 -right-32" />
                <OrganicBlob className="w-[400px] h-[400px] bg-amber-300 dark:bg-amber-700 bottom-10 -left-20 delay-300" />
                <OrganicBlob className="w-[300px] h-[300px] bg-earth-300 dark:bg-earth-600 top-1/3 left-1/3 delay-700" />

                {/* Topographic lines */}
                <svg
                    className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.06]"
                    viewBox="0 0 1440 200"
                    preserveAspectRatio="none"
                >
                    {[0, 1, 2, 3, 4].map((i) => (
                        <path
                            key={i}
                            d={`M0 ${160 - i * 20} Q360 ${120 - i * 25} 720 ${140 - i * 20} T1440 ${130 - i * 22}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                        />
                    ))}
                </svg>
            </div>

            {/* Floating icons */}
            <FloatingIcon className="top-[18%] right-[12%] hidden lg:flex animate-float">
                <Sprout className="w-6 h-6 text-forest-500" />
            </FloatingIcon>
            <FloatingIcon className="top-[55%] right-[8%] hidden lg:flex animate-float-slow delay-300">
                <Droplets className="w-6 h-6 text-blue-500" />
            </FloatingIcon>
            {/* <FloatingIcon className="bottom-[22%] left-[8%] hidden lg:flex animate-float delay-500">
                <Sun className="w-6 h-6 text-amber-500" />
            </FloatingIcon> */}

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="animate-slide-up-fade">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            AI-Powered Soil Intelligence
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="animate-slide-up-fade delay-100 text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-6">
                        Understand your{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-r from-forest-600 via-forest-500 to-forest-700 bg-clip-text text-transparent">
                                soil
                            </span>
                            <svg
                                className="absolute -bottom-2 left-0 w-full h-3 text-forest-400/40"
                                viewBox="0 0 200 12"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0 8 Q50 0 100 6 T200 4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                        ,<br />
                        grow with{" "}
                        <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-earth-500 bg-clip-text text-transparent">
                            confidence
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="animate-slide-up-fade delay-200 text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
                        Enter your soil parameters and get instant, AI-powered crop recommendations,
                        yield predictions, and agronomic advice — tailored to your Indian state and district.
                    </p>

                    {/* CTA buttons */}
                    <div className="animate-slide-up-fade delay-300 flex flex-wrap items-center gap-4 mb-14">
                        <Link
                            href="/analyze"
                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background text-base font-semibold shadow-2xl shadow-foreground/15 hover:shadow-foreground/25 transition-all hover:-translate-y-0.5"
                        >
                            Analyze Your Soil
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="#how-it-works"
                            className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-base font-medium text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-foreground/20"
                        >
                            See how it works
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="animate-slide-up-fade delay-400 flex flex-wrap gap-3">
                        <StatPill value="7+" label="Soil Parameters" />
                        <StatPill value="3" label="Languages" />
                        <StatPill value="AI" label="Powered Analysis" />
                    </div>
                </div>

                {/* Right side — organic illustration */}
                <div className="hidden xl:block absolute top-1/2 right-12 -translate-y-1/2 w-[400px] h-[400px]">
                    {/* Central soil cross-section illustration */}
                    <div className="relative w-full h-full">
                        {/* Soil layers */}
                        <div className="absolute inset-0 rounded-[3rem] overflow-hidden rotate-3 shadow-2xl animate-float-slow">
                            {/* Sky */}
                            <div className="h-[25%] bg-gradient-to-b from-sky-200 to-sky-100 dark:from-sky-900 dark:to-sky-800 relative">
                                {/* Clouds */}
                                <div className="absolute top-4 left-8 w-12 h-4 bg-white/60 rounded-full" />
                                <div className="absolute top-3 left-14 w-8 h-3 bg-white/40 rounded-full" />
                                <div className="absolute top-6 right-12 w-10 h-3 bg-white/50 rounded-full" />
                            </div>
                            {/* Grass */}
                            <div className="h-[8%] bg-gradient-to-b from-forest-400 to-forest-500 relative">
                                {/* Grass blades SVG */}
                                <svg className="absolute -top-3 inset-x-0 w-full h-6" viewBox="0 0 400 20" preserveAspectRatio="none">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <line
                                            key={i}
                                            x1={i * 10 + 5}
                                            y1="20"
                                            x2={i * 10 + 3 + Math.random() * 4}
                                            y2={6 + Math.random() * 8}
                                            stroke="#4ea856"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    ))}
                                </svg>
                                {/* Small plant */}
                                <div className="absolute -top-8 left-1/3">
                                    <div className="w-1 h-8 bg-forest-600 rounded-full mx-auto" />
                                    <div className="absolute -top-2 -left-3 w-4 h-3 bg-forest-500 rounded-full rotate-[-30deg]" />
                                    <div className="absolute -top-1 left-1 w-4 h-3 bg-forest-400 rounded-full rotate-[20deg]" />
                                </div>
                                {/* Another plant */}
                                <div className="absolute -top-10 right-1/4">
                                    <div className="w-1 h-10 bg-forest-700 rounded-full mx-auto" />
                                    <div className="absolute -top-2 -left-3 w-5 h-3 bg-forest-500 rounded-full rotate-[-25deg]" />
                                    <div className="absolute -top-3 left-1 w-5 h-4 bg-forest-400 rounded-full rotate-[30deg]" />
                                    <div className="absolute top-1 -left-2 w-4 h-3 bg-forest-600 rounded-full rotate-[-40deg]" />
                                </div>
                            </div>
                            {/* Topsoil */}
                            <div className="h-[22%] bg-gradient-to-b from-earth-700 to-earth-800 relative">
                                {/* Organic matter dots */}
                                <div className="absolute top-2 left-8 w-2 h-2 rounded-full bg-earth-600 opacity-60" />
                                <div className="absolute top-6 left-20 w-1.5 h-1.5 rounded-full bg-earth-500 opacity-40" />
                                <div className="absolute top-4 right-12 w-2.5 h-1 rounded-full bg-earth-600 opacity-50 rotate-45" />
                                <div className="absolute bottom-3 left-1/3 w-3 h-1 bg-amber-800/40 rounded-full rotate-12" />
                                {/* Root lines */}
                                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 80">
                                    <path d="M130 0 Q135 30 120 60 Q115 75 110 80" fill="none" stroke="#a07a4a" strokeWidth="1.5" />
                                    <path d="M280 0 Q285 25 290 50 Q292 65 300 80" fill="none" stroke="#a07a4a" strokeWidth="1" />
                                </svg>
                            </div>
                            {/* Subsoil */}
                            <div className="h-[25%] bg-gradient-to-b from-earth-800 to-earth-900 relative">
                                {/* Rock fragments */}
                                <div className="absolute top-4 left-12 w-5 h-3 rounded bg-stone-500/30 rotate-12" />
                                <div className="absolute bottom-4 right-16 w-4 h-4 rounded bg-stone-600/25 rotate-[-20deg]" />
                                <div className="absolute top-8 right-1/3 w-3 h-2 rounded bg-stone-500/20 rotate-6" />
                            </div>
                            {/* Bedrock */}
                            <div className="h-[20%] bg-gradient-to-b from-stone-700 to-stone-800 relative">
                                <div className="absolute top-2 left-0 right-0 h-[1px] bg-stone-600/30" />
                                <div className="absolute top-6 left-4 right-8 h-[1px] bg-stone-600/20" />
                            </div>
                        </div>

                        {/* Labels floating */}
                        <div className="absolute -left-16 top-[18%] glass rounded-xl px-3 py-1.5 text-xs font-medium text-forest-700 dark:text-forest-300 shadow-lg animate-float delay-200">
                            pH 6.8
                        </div>
                        <div className="absolute -right-12 top-[42%] glass rounded-xl px-3 py-1.5 text-xs font-medium text-earth-700 dark:text-earth-300 shadow-lg animate-float-slow delay-500">
                            N: 50 mg/kg
                        </div>
                        <div className="absolute -left-8 bottom-[30%] glass rounded-xl px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 shadow-lg animate-float delay-700">
                            K: Optimal
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-slide-up-fade delay-700">
                <span className="text-xs text-muted-foreground">Scroll to explore</span>
                <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
                    <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                </div>
            </div>
        </section>
    );
}
