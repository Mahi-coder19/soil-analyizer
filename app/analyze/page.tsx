import { MultiStepForm } from "@/components/analyze/multi-step-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analyze Your Soil | SoilSense",
    description: "Enter your soil and climate data to get AI-powered crop recommendations.",
};

export default function AnalyzePage() {
    return (
        <div className="min-h-screen relative">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-earth-50 via-background to-forest-50/40 dark:from-earth-900/20 dark:via-background dark:to-forest-900/10" />
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="form-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="0.8" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#form-grid)" />
                </svg>
            </div>

            <MultiStepForm />
        </div>
    );
}
