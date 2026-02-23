"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Leaf, Menu, X } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "glass shadow-sm py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6">
                        <Leaf className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-display text-lg font-semibold tracking-tight">
                        SoilSense
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    <a
                        href="#features"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Features
                    </a>
                    <a
                        href="#how-it-works"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        How it works
                    </a>
                    <Link
                        href="/analyze"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-foreground/10 hover:-translate-y-0.5"
                    >
                        Start Analysis
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4 animate-scale-in shadow-xl">
                    <div className="flex flex-col gap-3">
                        <a
                            href="#features"
                            className="px-4 py-2.5 rounded-xl text-sm hover:bg-secondary transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="px-4 py-2.5 rounded-xl text-sm hover:bg-secondary transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            How it works
                        </a>
                        <Link
                            href="/analyze"
                            className="px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium text-center"
                            onClick={() => setMobileOpen(false)}
                        >
                            Start Analysis
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
