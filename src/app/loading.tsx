import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
            <div className="relative">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />

                {/* Inner spinner */}
                <div className="relative h-16 w-16 rounded-full border-4 border-white/10 border-t-white animate-spin" />
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <h2 className="text-xl font-bold tracking-widest text-white uppercase animate-pulse">
                    OTTVirus
                </h2>
                <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">
                    Loading cinematic experience...
                </p>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        </div>
    );
}
