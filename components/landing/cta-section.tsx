"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
    return (
        <section className="py-28 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative">
                {/* CTA Card */}
                <div className="relative rounded-[2rem] overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-forest-800 via-forest-900 to-earth-900" />

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-forest-600/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-600/15 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

                    {/* Dot pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
                        <defs>
                            <pattern id="cta-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                                <circle cx="12" cy="12" r="1" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#cta-dots)" />
                    </svg>

                    {/* Content */}
                    <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-20 text-center">
                        <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-6 animate-pulse-soft" />

                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                            Ready to unlock your
                            <br />
                            soil&apos;s potential?
                        </h2>
                        <p className="text-forest-200/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                            Join thousands of Indian farmers using AI-powered soil analysis for better yields and smarter agriculture.
                        </p>

                        <Link
                            href="/analyze"
                            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-forest-900 text-base font-semibold shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all hover:-translate-y-0.5 hover:bg-forest-50"
                        >
                            Start Free Analysis
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <p className="text-forest-300/50 text-xs mt-6">
                            No sign-up required • Results in under 30 seconds
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
