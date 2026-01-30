"use client";

import { useState, useEffect } from "react";
import { Activity, MapPin, Zap } from "lucide-react";

// Polyline Decoder
function decodePolyline(str: string, precision?: number) {
    let index = 0,
        lat = 0,
        lng = 0,
        coordinates = [],
        shift = 0,
        result = 0,
        byte = null,
        latitude_change,
        longitude_change,
        factor = Math.pow(10, precision || 5);

    while (index < str.length) {
        byte = null;
        shift = 0;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
}

export function StravaCard() {
    const [activity, setActivity] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/strava');
                const data = await res.json();
                if (!data.error) {
                    setActivity(data);
                }
            } catch (error) {
                console.error("Failed to fetch Strava activity", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const getPolylinePath = (encodedPolyline: string) => {
        const coordinates = decodePolyline(encodedPolyline);
        if (coordinates.length === 0) return null;

        let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
        coordinates.forEach(([lat, lng]) => {
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
            if (lng < minLng) minLng = lng;
            if (lng > maxLng) maxLng = lng;
        });

        const width = maxLng - minLng;
        const height = maxLat - minLat;

        const pathData = coordinates.map(([lat, lng], i) => {
            const x = (lng - minLng) / width * 300;
            const y = 150 - ((lat - minLat) / height * 150);
            return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
        }).join(" ");

        return { pathData };
    };

    const mapData = activity?.mapPolyline ? getPolylinePath(activity.mapPolyline) : null;


    if (loading) {
        return (
            <div className="border border-slate-800 bg-[#050505] p-6 rounded-xl animate-pulse h-64 flex items-center justify-center">
                <span className="text-slate-600 font-mono text-xs">CONNECTING_TO_STRAVA...</span>
            </div>
        )
    }

    if (!activity) {
        return (
            <div className="border border-slate-800 bg-[#050505] p-6 rounded-xl h-64 flex items-center justify-center">
                <span className="text-slate-600 font-mono text-xs">NO_SIGNAL_RECEIVED</span>
            </div>
        )
    }

    return (
        <div className="border border-[#E0115F]/20 bg-[#050505] p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Activity size={100} />
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#E0115F]/10 flex items-center justify-center border border-[#E0115F]/20 text-[#E0115F]">
                        <Zap size={18} />
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 font-mono">LATEST_ACTIVITY</div>
                        <div className="text-white font-bold">{activity.name}</div>
                    </div>
                </div>
                <div className="text-xs font-mono text-[#E0115F] border border-[#E0115F]/20 px-2 py-1 rounded">
                    {activity.type.toUpperCase()}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
                <div>
                    <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase tracking-tight">DISTANCE</div>
                    <div className="text-lg md:text-xl font-bold text-white font-mono whitespace-nowrap">
                        {activity.distance}<span className="text-xs text-slate-500 ml-1 font-normal">km</span>
                    </div>
                </div>
                <div>
                    <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase tracking-tight">PACE / ELEV</div>
                    <div className="text-lg md:text-xl font-bold text-white font-mono whitespace-nowrap">
                        {activity.pace !== "N/A" ? (
                            <>
                                {activity.pace.split(" ")[0]}<span className="text-xs text-slate-500 ml-0.5 font-normal">/km</span>
                            </>
                        ) : (
                            activity.elevation
                        )}
                    </div>
                </div>
                <div>
                    <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase tracking-tight">DURATION</div>
                    <div className="text-lg md:text-xl font-bold text-white font-mono whitespace-nowrap">
                        {activity.time}
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="w-full h-32 bg-[#111] rounded border border-slate-800 flex items-center justify-center relative overflow-hidden">
                {mapData ? (
                    <svg viewBox="0 0 300 150" className="w-full h-full p-4 opacity-80" preserveAspectRatio="xMidYMid meet">
                        <path
                            d={mapData.pathData}
                            fill="none"
                            stroke="#E0115F"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_4px_#E0115F]"
                        />
                    </svg>
                ) : (
                    <div className="flex items-center gap-2 text-slate-700 font-mono text-xs opacity-50">
                        <MapPin size={14} /> LOCATION_HIDDEN
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-20 pointer-events-none" />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
                <span>TIMESTAMP: {activity.date}</span>
                <span className="text-[#E0115F]">LIVE_LOG</span>
            </div>
        </div>
    );
}
