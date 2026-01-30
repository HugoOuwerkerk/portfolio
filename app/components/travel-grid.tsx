"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderOpen, Image as ImageIcon, X } from "lucide-react";
import { Trip } from "../lib/travel-data";

export function TravelGrid({ trips }: { trips: Trip[] }) {
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trips.map((trip) => (
                    <motion.div
                        key={trip.slug}
                        layoutId={`card-${trip.slug}`}
                        onClick={() => setSelectedTrip(trip)}
                        whileHover={{ y: -5 }}
                        className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer"
                    >
                        {trip.cover ? (
                            <Image
                                src={trip.cover}
                                alt={trip.title}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-700 font-mono text-xs p-4 text-center border mr-2">
                                <FolderOpen size={24} className="mb-2 opacity-50" />
                                NO_IMG
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 pointer-events-none" />

                        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                            <div className="text-[#E0115F] font-mono text-xs mb-1 flex items-center gap-1">
                                <FolderOpen size={12} /> {trip.imageCount} FILES
                            </div>
                            <h3 className="text-white font-bold text-lg flex items-center justify-between">
                                {trip.title}
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedTrip && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedTrip(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedTrip.slug}`}
                            className="bg-[#0a0a0a] w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-slate-800 flex flex-col shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#0a0a0a] z-10 sticky top-0">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">{selectedTrip.title}</h2>
                                    <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                                        <FolderOpen size={12} /> /travel/{selectedTrip.slug}
                                        <span className="text-slate-700">|</span>
                                        {selectedTrip.images.length} IMAGES_INDEXED
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedTrip(null)}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                {selectedTrip.images.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {selectedTrip.images.map((img, idx) => (
                                            <div
                                                key={img}
                                                className="relative aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-800 group"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${selectedTrip.title} ${idx}`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute font-mono text-[10px] text-white/50 bottom-2 left-2 bg-black/50 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    IMG_{idx + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                                        <ImageIcon size={48} className="mb-4 text-slate-600" />
                                        <h3 className="text-xl font-bold text-white mb-2">LOOKS_LIKE_I_WAS_OFFLINE</h3>
                                        <p className="text-sm font-mono text-slate-500 uppercase">
                                            No evidence found. I probably enjoyed the view too much.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
