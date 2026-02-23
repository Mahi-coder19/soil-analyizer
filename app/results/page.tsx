import { ResultsDashboard } from "@/components/results/results-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analysis Results | SoilSense",
    description: "Your AI-powered soil analysis results and recommendations.",
};

export default function ResultsPage() {
    return <ResultsDashboard />;
}
