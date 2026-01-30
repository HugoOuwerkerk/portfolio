import { ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";
import { StravaCard } from "../components/strava-card";
import { TravelGrid } from "../components/travel-grid";
import { getTrips } from "../lib/travel-data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Personal Dashboard | Hugo Ouwerkerk",
    description: "Insights into my latest activities, running data and travel logs.",
};

export default function PersonalPage() {
    const trips = getTrips();

    return (
        <main className="bg-[#050505] text-slate-200 font-mono p-6 md:p-12">
            <div className="max-w-6xl mx-auto min-h-[calc(100vh-6rem)] flex flex-col">
                <div className="flex-grow text-inherit">
                    {/* HERO */}
                    <div className="mb-12 flex items-center gap-4">
                        <Link href="/#about" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#E0115F] tracking-widest uppercase">PERSONAL_DASHBOARD</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Left Column */}
                        <div className="space-y-8">
                            <section>
                                <SectionHeader title="RECENT_STRAVA_ACTIVITY" />
                                <div className="space-y-4">
                                    <StravaCard />
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="md:col-span-2 space-y-12">
                            <section>
                                <SectionHeader title="TRAVEL_GALLERY" />
                                <TravelGrid trips={trips} />
                            </section>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
                    HUGO_OUWERKERK // <span className="text-[#E0115F]">Personal Page</span>
                </div>
            </div>
        </main>
    );
}

function SectionHeader({ title, subtitle }: { title: string, subtitle?: string }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <Terminal size={16} className="text-[#E0115F]" />
            <div className="text-sm font-bold text-slate-500 tracking-widest">{title}</div>
            {subtitle && <div className="text-sm text-slate-700">| {subtitle}</div>}
        </div>
    )
}
