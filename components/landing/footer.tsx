import { Leaf } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-display text-sm font-semibold">SoilSense</span>
                </Link>

                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} SoilSense — AI-powered soil analysis for Indian agriculture.
                </p>
            </div>
        </footer>
    );
}
